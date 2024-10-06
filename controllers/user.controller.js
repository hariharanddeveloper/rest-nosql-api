const { UserModel } = require("../models");
const { SendResponse, StatusCodes } = require("../utils");

const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();

        SendResponse(res, StatusCodes.OK, users, ["Users data received successfully."]);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            SendResponse(res, StatusCodes.OK, user, ["User data received successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["User not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const new_user = new UserModel({
            name,
            email,
            password,
        });

        await new_user.save();
        SendResponse(res, StatusCodes.CREATED, new_user, ["User created successfully."]);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;

            await user.save();
            SendResponse(res, StatusCodes.OK, user, ["User updated successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["User not found."]);
        }
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            SendResponse(res, StatusCodes.OK, null, ["User deleted successfully."]);
        } else {
            SendResponse(res, StatusCodes.NOT_FOUND, null, ["User not found."]);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
