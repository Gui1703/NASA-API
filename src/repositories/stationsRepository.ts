import db from "../dataBase.js";

export function getAll() {
  return db.stations.findMany();
}

export function create(name: string, planet: string, planetId: number) {
  return db.stations.create({ data: { name, planet, planetId } });
}

export function findByName(name: string) {
  return db.stations.findFirst({ where: { name } });
}

export function findLast(stationId: number) {
  return db.recharges.findFirst({
    where: { stationId },
    orderBy: { id: "desc" },
  });
}
