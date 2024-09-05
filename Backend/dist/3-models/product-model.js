"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryModel = exports.ShoeModel = exports.ClothModel = exports.ProductModel = exports.ProductSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const app_config_1 = require("../2-utils/app-config");
const accessorySize_model_1 = require("./accessorySize-model");
const category_model_1 = require("./category-model");
const clothSize_model_1 = require("./clothSize-model");
const color_model_1 = require("./color-model");
const company_model_1 = require("./company-model");
const peopleAudience_model_1 = require("./peopleAudience-model");
const shoeSize_model_1 = require("./shoeSize-model");
const subCategory_model_1 = require("./subCategory-model");
exports.ProductSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: [true, "Missing company"],
    },
    name: {
        type: String,
        required: [true, "Missing name"],
        maxlength: [50, "Name too long"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [5, "Description has to be minimum 5 characters"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [2000, "Price can't be higher than 2000"],
    },
    discount: {
        type: Number,
        required: [true, "Missing discount"],
        min: [0, "Discount can't be negative"],
        max: [100, "Discount can't be higher than 100"],
    },
    categoryId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: [true, "Missing category"],
        ref: "CategoryModel",
    },
    subCategoryId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: [true, "Missing sub category"],
    },
    audienceId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: [true, "Missing audience"],
    },
    imageNames: [{ type: String }],
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});
exports.ProductSchema.virtual("category", {
    ref: category_model_1.CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true,
});
exports.ProductSchema.virtual("company", {
    ref: company_model_1.CompanyModel,
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
});
exports.ProductSchema.virtual("audience", {
    ref: peopleAudience_model_1.PeopleAudienceModel,
    localField: "audienceId",
    foreignField: "_id",
    justOne: true,
});
exports.ProductSchema.virtual("subCategory", {
    ref: subCategory_model_1.SubCategoryModel,
    localField: "subCategoryId",
    foreignField: "_id",
    justOne: true,
});
exports.ProductSchema.virtual("imagesUrl").get(function () {
    let baseImageUrl;
    switch (this.constructor) {
        case exports.ClothModel:
            baseImageUrl = app_config_1.appConfig.baseClothImageUrl;
            break;
        case exports.ShoeModel:
            baseImageUrl = app_config_1.appConfig.baseShoeImageUrl;
            break;
        case exports.AccessoryModel:
            baseImageUrl = app_config_1.appConfig.baseAccessoryImageUrl;
            break;
        default:
            throw new Error("Cant find this path");
    }
    return this.imageNames.map((image) => baseImageUrl + image);
});
exports.ProductModel = (0, mongoose_1.model)("ProductModel", exports.ProductSchema, "products");
const ClothSchema = new mongoose_1.Schema({
    stock: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
            color: { type: mongoose_1.Schema.Types.ObjectId, ref: color_model_1.ColorModel, required: true },
            size: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: clothSize_model_1.ClothSizeModel,
            },
            quantity: {
                type: Number,
                min: [0, "Quantity can't be negative"],
            },
        },
    ],
});
exports.ClothModel = (0, mongoose_1.model)("ClothModel", exports.ProductSchema, "products").discriminator("Cloth", ClothSchema);
const ShoeSchema = new mongoose_1.Schema({
    stock: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
            color: { type: mongoose_1.Schema.Types.ObjectId, ref: color_model_1.ColorModel },
            size: { type: mongoose_1.Schema.Types.ObjectId, ref: shoeSize_model_1.ShoeSizeModel },
            quantity: {
                type: Number,
                min: [0, "Quantity can't be negative"],
            },
        },
    ],
});
exports.ShoeModel = (0, mongoose_1.model)("ShoeModel", exports.ProductSchema, "products").discriminator("Shoe", ShoeSchema);
const AccessorySchema = new mongoose_1.Schema({
    stock: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
            color: { type: mongoose_1.Schema.Types.ObjectId, ref: color_model_1.ColorModel },
            size: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: accessorySize_model_1.AccessorySizeModel,
            },
            quantity: {
                type: Number,
                min: [0, "Quantity can't be negative"],
            },
        },
    ],
});
exports.AccessoryModel = (0, mongoose_1.model)("AccessoryModel", exports.ProductSchema, "products").discriminator("Accessory", AccessorySchema);
