"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peopleAudienceService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const peopleAudience_model_1 = require("../3-models/peopleAudience-model");
class PeopleAudienceService {
    populateFields() {
        return [
            "category",
            "company",
            "sizes",
            "audience",
            "colorIds",
            "subCategory",
        ];
    }
    getAllPeopleAudience() {
        return __awaiter(this, void 0, void 0, function* () {
            const audience = yield peopleAudience_model_1.PeopleAudienceModel.find().exec();
            return audience;
        });
    }
    getOneAudience(_id) {
        return peopleAudience_model_1.PeopleAudienceModel.findById(_id).exec();
    }
    addAudience(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = audience.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            return audience.save();
        });
    }
    updateAudience(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = audience.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const updatedAudience = peopleAudience_model_1.PeopleAudienceModel.findByIdAndUpdate(audience._id, audience, { new: true });
            if (!updatedAudience) {
                throw new client_errors_1.ResourceNotFoundError(audience._id);
            }
            return updatedAudience;
        });
    }
    deleteAudience(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const audienceToDelete = yield peopleAudience_model_1.PeopleAudienceModel.findById(_id);
            if (!audienceToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield peopleAudience_model_1.PeopleAudienceModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.peopleAudienceService = new PeopleAudienceService();
