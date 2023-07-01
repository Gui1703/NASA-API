import db from "../dataBase.js";

export function get() {
  return db.planets.findMany({ orderBy: { id: "asc" } });
}

export async function upsert(name: string, mass: number) {
  await db.planets.upsert({
    where: { name: name },
    update: {},
    create: { name: name, mass: mass },
  });
}

export function findByName(name: string) {
  return db.planets.findFirst({ where: { name } });
}

export function updateHasStationTrue(planetId: number) {
  return db.planets.update({
    where: { id: planetId },
    data: { hasStation: true },
  });
}
