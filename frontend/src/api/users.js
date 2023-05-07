import { request } from "./request";

export const getAllUsers = async () => await request.get("/users");
