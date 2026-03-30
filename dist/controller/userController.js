"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const dbConfig_1 = require("../dbconfig/dbConfig");
const User_1 = require("../entities/User");
const userRepo = dbConfig_1.AppDataSource.getRepository(User_1.User);
// 👉 CREATE
const createUser = async (req, res) => {
    const user = userRepo.create(req.body);
    await userRepo.save(user);
    res.json({
        message: "User Created ✅",
        data: user,
    });
};
exports.createUser = createUser;
// 👉 GET ALL
const getUsers = async (req, res) => {
    const users = await userRepo.find();
    res.json(users);
};
exports.getUsers = getUsers;
// 👉 UPDATE
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await userRepo.findOneBy({ id });
    if (!user) {
        return res.json({ message: "User not found ❌" });
    }
    userRepo.merge(user, req.body);
    await userRepo.save(user);
    res.json({
        message: "User Updated ✅",
        data: user,
    });
};
exports.updateUser = updateUser;
// 👉 DELETE
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userRepo.delete(id);
    if (result.affected === 0) {
        return res.json({ message: "User not found ❌" });
    }
    res.json({ message: "User Deleted ❌" });
};
exports.deleteUser = deleteUser;
