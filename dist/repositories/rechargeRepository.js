import db from "../dataBase.js";
export async function findLastByStationId(stationId) {
    const recharge = await db.recharges.findFirst({
        where: { stationId },
        orderBy: { id: "desc" },
    });
    return recharge;
}
export async function findLastByUserId(userId) {
    const recharge = await db.recharges.findFirst({
        where: { userId },
        orderBy: { id: "desc" },
    });
    return recharge;
}
export async function create(stationId, end, userId) {
    const recharge = await db.recharges.create({
        data: { stationId, end, userId },
    });
    return recharge;
}
export async function getAllByStationId(stationId) {
    const recharges = await db.recharges.findMany({
        where: { stationId },
        include: {
            user: true,
        },
    });
    return recharges;
}
