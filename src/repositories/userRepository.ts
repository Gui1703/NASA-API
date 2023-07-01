import db from "../dataBase.js";

export function findByEmail(email: string) {
  return db.user.findFirst({ where: { email } });
}

export function create(name: string, email: string, password: string) {
  return db.user.create({ data: { name, email, password } });
}
