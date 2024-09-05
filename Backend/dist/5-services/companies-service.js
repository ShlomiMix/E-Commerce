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
exports.companiesService = void 0;
const imageHandler_1 = require("../2-utils/imageHandler");
const imagesHandler_1 = require("../2-utils/imagesHandler");
const client_errors_1 = require("../3-models/client-errors");
const company_model_1 = require("../3-models/company-model");
class CompaniesService {
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            const colors = yield company_model_1.CompanyModel.find().exec();
            return colors;
        });
    }
    getOneCompany(_id) {
        return company_model_1.CompanyModel.findById(_id).exec();
    }
    addCompany({ company, image }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = company.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            if (image) {
                imagesHandler_1.imagesHandler.configureFileSaver("1-assets", "company-images");
                const imageName = yield imageHandler_1.imageHandler.convertImageToImageName(image);
                company.imageName = imageName;
                console.log("Image saved with name:", imageName);
            }
            else {
                console.log("No image provided");
            }
            return company.save();
        });
    }
    updateCompany({ company, image, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = company.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            imagesHandler_1.imagesHandler.configureFileSaver("1-assets", "company-images");
            const newImageName = yield imageHandler_1.imageHandler.updateImageName(company_model_1.CompanyModel, company._id, image);
            company.imageName = newImageName;
            const updatedCompany = yield company_model_1.CompanyModel.findByIdAndUpdate(company._id, company, { new: true });
            if (!updatedCompany) {
                throw new client_errors_1.ResourceNotFoundError(company._id);
            }
            return updatedCompany;
        });
    }
    deleteCompany(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield company_model_1.CompanyModel.findById(_id);
            if (!company) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield company_model_1.CompanyModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.companiesService = new CompaniesService();
