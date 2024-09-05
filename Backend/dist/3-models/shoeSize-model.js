"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoeSizeModel = exports.ShoeSizeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ShoeSizeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing shoe size"],
        minlength: [1, "Shoe size must be longer then 1 characters"],
        maxlength: [6, "Shoe size can't be longer then 50 characters"],
        trim: true
    }
}, { versionKey: false });
exports.ShoeSizeModel = (0, mongoose_1.model)("ShoeSizeModel", exports.ShoeSizeSchema, "shoesSize");
