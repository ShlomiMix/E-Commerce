"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorModel = exports.ColorSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ColorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing color"],
        minlength: [2, "Color name must be longer then 1 characters"],
        maxlength: [20, "Color name can't be longer then 20 characters"],
        trim: true
    },
    hexCode: {
        type: String,
        required: [true, "Missing color hex code"]
    }
}, { versionKey: false });
exports.ColorModel = (0, mongoose_1.model)("ColorModel", exports.ColorSchema, "colors");
