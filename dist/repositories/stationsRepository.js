import db from "../dataBase.js";
export async function getAll() {
    const stations = await db.stations.findMany();
    return stations;
}
export async function create(name, planet, planetId) {
    const createdStation = await db.stations.create({
        data: { name, planet, planetId },
    });
    return createdStation;
}
export async function findByName(name) {
    const station = await db.stations.findFirst({
        where: { name },
    });
    return station;
}
export async function findLast(stationId) {
    const station = await db.recharges.findFirst({
        where: { stationId },
        orderBy: { id: "desc" },
    });
    return station;
}
