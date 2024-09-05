"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryModel = exports.SubCategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.SubCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [1, "Name must be longer then 1 characters"],
        maxlength: [50, "Name can't be longer then 50 characters"],
        trim: true,
    },
}, { versionKey: false
});
exports.SubCategoryModel = (0, mongoose_1.model)("SubCategoryModel", exports.SubCategorySchema, "subCategories");
