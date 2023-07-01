import db from "../dataBase.js";
export async function get() {
    const planet = await db.planets.findMany({ orderBy: { id: "asc" } });
    return planet;
}
export async function upsert(name, mass) {
    await db.planets.upsert({
        where: { name: name },
        update: {},
        create: {
            name: name,
            mass: mass,
        },
    });
}
export async function findByName(name) {
    const planet = await db.planets.findFirst({
        where: {
            name,
        },
    });
    return planet;
}
export async function updateHasStationTrue(planteId) {
    await db.planets.update({
        where: {
            id: planteId,
        },
        data: {
            hasStation: true,
        },
    });
    return;
}
