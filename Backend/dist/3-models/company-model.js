"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = exports.CompanySchema = void 0;
const mongoose_1 = require("mongoose");
const app_config_1 = require("../2-utils/app-config");
exports.CompanySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing company"],
        minlength: [1, "Company name must be longer then 1 characters"],
        maxlength: [50, "Company name can't be longer then 50 characters"],
        trim: true,
    },
    imageName: {
        type: String,
    },
}, {
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
exports.CompanySchema.virtual("imageUrl").get(function () {
    const baseImageUrl = app_config_1.appConfig.baseCompanyImageUrl;
    return baseImageUrl + this.imageName;
});
exports.CompanyModel = (0, mongoose_1.model)("CompanyModel", exports.CompanySchema, "companies");
