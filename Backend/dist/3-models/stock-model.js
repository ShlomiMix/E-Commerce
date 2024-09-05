"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = exports.StockSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StockSchema = new mongoose_1.Schema({
    color: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing Color"],
        minlength: [3, "Color must be longer than 3 character"],
        maxlength: [20, "Color Size can't be longer than 20 characters"],
        trim: true
    },
    size: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing Color"],
        minlength: [3, "Color must be longer than 3 character"],
        maxlength: [20, "Color Size can't be longer than 20 characters"],
        trim: true
    },
    quantity: {
        type: Number,
        min: [0, "Minimum quantity must be equal or greater than 0"],
        trim: true
    }
}, { versionKey: false });
exports.StockModel = (0, mongoose_1.model)("StockModel", exports.StockSchema);
