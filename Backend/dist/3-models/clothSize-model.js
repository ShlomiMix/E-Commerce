"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothSizeModel = exports.ClothSizeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ClothSizeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing cloth size"],
        minlength: [1, "Cloth Size must be longer then 1 characters"],
        maxlength: [50, "Cloth Size can't be longer then 50 characters"],
        trim: true
    }
}, { versionKey: false });
exports.ClothSizeModel = (0, mongoose_1.model)("ClothSizeModel", exports.ClothSizeSchema, "clothesSizes");
