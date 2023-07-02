import dateScalar from "../types/dateScalar.js";
import dayjs from "dayjs";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as planetsDataBase from "../repositories/planetsReponsitory.js";
import * as stationsDataBase from "../repositories/stationsRepository.js";
import * as userDataBase from "../repositories/userRepository.js";
import * as rechargeDataBase from "../repositories/rechargeRepository.js";
import * as reservationsDataBase from "../repositories/reservationsRepository.js";

import * as stationService from "../service/stationService.js";
import * as dateService from "../service/dateService.js";
import * as rechargeService from "../service/rechargeService.js";
import * as reservationsService from "../service/reservationsService.js";

import * as error from "../utils/erro.js";
import getPlanets from "../utils/getPlantes.js";
import validateTokenAndReturnUserId from "../utils/validateToken.js";
import formatSeconds from "../utils/formatSeconds.js";

dayjs.locale("br");

const resolvers = {
  date: dateScalar,

  Query: {
    suitablePlanets: async () => {
      const planets = await getPlanets();

      for (const p of planets) {
        await planetsDataBase.upsert(p.pl_name, p.pl_bmassj);
      }

      return planetsDataBase.get();
    },

    stations: () => {
      return stationsDataBase.getAll();
    },

    stationHistory: async (_: any, { stationName }, context) => {
      await validateTokenAndReturnUserId(context.token);

      const station = await stationsDataBase.findByName(stationName);
      if (!station) throw error.notFound("Not found station with this name");

      const recharges = await rechargeDataBase.getAllByStationId(station.id);

      return recharges.map((r) => {
        const end = dayjs(r.end).valueOf();
        const start = dayjs(r.start).valueOf();
        const durationOnSeconds = dayjs(end).diff(start, "s");
        const duration = formatSeconds(durationOnSeconds);

        return {
          user: r.user.name,
          start: r.start,
          duration,
        };
      });
    },
  },

  Mutation: {
    async installStation(_: any, { data }) {
      const planet = await planetsDataBase.findByName(data.planet);

      const createdStation = await stationsDataBase.create(
        data.name,
        data.planet,
        planet.id
      );

      await planetsDataBase.updateHasStationTrue(planet.id);

      return createdStation;
    },

    async signUp(_: any, { data }) {
      const { name, email, password } = data;

      const findedUser = await userDataBase.findByEmail(email);
      if (findedUser)
        throw error.notFound(
          "There is already a registered user with this email"
        );

      const hashPassword = bcrypt.hashSync(password, 10);
      return userDataBase.create(name, email, hashPassword);
    },

    async login(_: any, { data }) {
      const { email, password } = data;

      const findedUser = await userDataBase.findByEmail(email);
      if (!findedUser) throw error.notFound("Not found a user com this email");

      const isPasswordValid = bcrypt.compareSync(password, findedUser.password);
      if (!isPasswordValid) throw error.forbidden("Invalid password");

      return jwt.sign({ user: findedUser }, process.env.JWT_SECRET);
    },

    async recharge(_: any, { data }, context) {
      const { id: userId } = validateTokenAndReturnUserId(context.token);
      const now = dayjs().toDate();
      const rechargeEnd = dayjs(data.date).toDate();

      if (data.reservationId) {
        const { stationId, end, start } = await reservationsDataBase.findById(
          data.reservationId
        );

        if (now.valueOf() < start.valueOf())
          throw error.forbidden("Booking time is not valid yet");

        await rechargeService.verifyStationAvailable(stationId);
        await rechargeService.verifyUserAvailable(userId);
        await reservationsService.verifyTimeAvailable(
          now,
          rechargeEnd,
          stationId
        );

        return rechargeDataBase.create(stationId, end, userId);
      }

      await dateService.validateIsAfet(_, rechargeEnd);

      const station = await stationService.findStationOrThowErro(
        data.stationName
      );
      await rechargeService.verifyStationAvailable(station.id);
      await rechargeService.verifyUserAvailable(userId);
      await reservationsService.verifyTimeAvailable(
        now,
        rechargeEnd,
        station.id
      );

      return rechargeDataBase.create(station.id, rechargeEnd, userId);
    },

    async reservation(_: any, { data }, context) {
      const user = validateTokenAndReturnUserId(context.token);
      const start = dayjs(data.start).toDate();
      const end = dayjs(data.end).toDate();

      await dateService.validateIsAfet(start, end);

      const station = await stationService.findStationOrThowErro(
        data.stationName
      );

      await reservationsService.verifyTimeAvailable(start, end, station.id);

      const reservation = await reservationsDataBase.create(
        station.id,
        user.id,
        start,
        end
      );
      return { ...reservation, station: station.name, user: user.name };
    },
  },
};

export default resolvers;
