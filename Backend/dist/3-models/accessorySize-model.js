"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessorySizeModel = exports.AccessorySizeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AccessorySizeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing Size"],
        minlength: [1, "Accessory Size must be longer than 1 character"],
        maxlength: [50, "Accessory Size can't be longer than 50 characters"],
        trim: true
    },
}, { versionKey: false });
exports.AccessorySizeModel = (0, mongoose_1.model)("AccessorySizeModel", exports.AccessorySizeSchema, "accessoriesSizes");
