import db from "../dataBase.js";

export function findLastByStationId(stationId: number) {
  return db.recharges.findFirst({
    where: { stationId },
    orderBy: { id: "desc" },
  });
}

export function findLastByUserId(userId: number) {
  return db.recharges.findFirst({
    where: { userId },
    orderBy: { id: "desc" },
  });
}

export function create(stationId: number, end: Date, userId: number) {
  return db.recharges.create({ data: { stationId, end, userId } });
}

export function getAllByStationId(stationId: number) {
  return db.recharges.findMany({
    where: { stationId },
    include: { user: true },
  });
}
