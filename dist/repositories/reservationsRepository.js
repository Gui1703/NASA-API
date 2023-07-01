import db from "../dataBase.js";
export async function create(stationId, userId, start, end) {
    const reservation = await db.reservations.create({
        data: { stationId, userId, start, end },
    });
    return reservation;
}
export async function getAllByStationId(stationId) {
    const reservations = await db.reservations.findMany({
        where: { stationId },
    });
    return reservations;
}
export async function findById(id) {
    const reservation = await db.reservations.findFirst({
        where: { id },
    });
    return reservation;
}
