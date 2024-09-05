"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "First name has to be minimum 2 characters"],
        maxlength: [50, "First name can't be higher then 50 characters"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name has to be minimum 2 characters"],
        maxlength: [50, "Last name can't be higher then 50 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [7, "Email has to be minimum 7 characters"],
        maxlength: [55, "Email can't be higher then 55 characters"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [6, "Password has to be minimum 6 characters"],
        maxlength: [255, "Password can't be higher then 55 characters"],
    },
    roleId: {
        type: Number,
        required: [true, "Missing role id"],
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});
exports.UserModel = (0, mongoose_1.model)("UserModel", exports.UserSchema, "users");
