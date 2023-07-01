import db from "../dataBase.js";
export async function findByEmail(email) {
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });
    return user;
}
export async function create(name, email, password) {
    const createdUser = await db.user.create({
        data: { name, email, password },
    });
    return createdUser;
}
