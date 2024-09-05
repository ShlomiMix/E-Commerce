"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleAudienceModel = exports.PeopleAudienceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PeopleAudienceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing PeopleCategory"],
        minlength: [2, "PeopleCategory name must be longer then 2 characters"],
        maxlength: [50, "PeopleCategory name can't be longer then 50 characters"],
        trim: true,
    },
}, { versionKey: false });
exports.PeopleAudienceModel = (0, mongoose_1.model)("PeopleCategoryModel", exports.PeopleAudienceSchema, "peopleAudience");
