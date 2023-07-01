import db from "../dataBase.js";

export function create(
  stationId: number,
  userId: number,
  start: Date,
  end: Date
) {
  return db.reservations.create({ data: { stationId, userId, start, end } });
}

export function getAllByStationId(stationId: number) {
  return db.reservations.findMany({ where: { stationId } });
}

export function findById(id: number) {
  return db.reservations.findFirst({ where: { id } });
}
