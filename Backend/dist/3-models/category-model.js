"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const app_config_1 = require("../2-utils/app-config");
const subCategory_model_1 = require("./subCategory-model");
exports.CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [1, "Name must be longer then 1 characters"],
        maxlength: [50, "Name can't be longer then 50 characters"],
        trim: true,
    },
    subCategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: subCategory_model_1.SubCategoryModel,
            required: [true, "Sub category is missing"],
        },
    ],
    imageName: {
        type: String,
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});
exports.CategorySchema.virtual("imageUrl").get(function () {
    const baseImageUrl = app_config_1.appConfig.baseCategoryImageUrl;
    return baseImageUrl + this.imageName;
});
exports.CategoryModel = (0, mongoose_1.model)("CategoryModel", exports.CategorySchema, "categories");
