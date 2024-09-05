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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesRouter = void 0;
const express_1 = __importDefault(require("express"));
const company_model_1 = require("../3-models/company-model");
const enums_1 = require("../3-models/enums");
const companies_service_1 = require("../5-services/companies-service");
const imagesHandler_1 = require("../2-utils/imagesHandler");
class CompaniesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/companies", this.getAllCompanies);
        this.router.get("/companies/:_id([a-f0-9A-F]{24})", this.getOneCompany);
        this.router.post("/companies", this.addCompany);
        this.router.put("/companies/:_id([a-f0-9A-F]{24})", this.updateCompany);
        this.router.delete("/companies/:_id([a-f0-9A-F]{24})", this.deleteCompany);
        this.router.get("/brands/images/:folderPath/:imageName", imagesHandler_1.imagesHandler.getImageFile);
    }
    getAllCompanies(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield companies_service_1.companiesService.getAllCompanies();
                response.json(companies);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneCompany(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const company = yield companies_service_1.companiesService.getOneCompany(_id);
                response.json(company);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addCompany(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                const company = new company_model_1.CompanyModel(request.body);
                const addedCompany = yield companies_service_1.companiesService.addCompany({
                    company,
                    image,
                });
                response.status(enums_1.StatusCode.Created).json(addedCompany);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateCompany(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                request.body._id = request.params._id;
                const company = new company_model_1.CompanyModel(request.body);
                const updatedCompany = yield companies_service_1.companiesService.updateCompany({
                    company,
                    image,
                });
                response.json(updatedCompany);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteCompany(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield companies_service_1.companiesService.deleteCompany(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const companiesController = new CompaniesController();
exports.companiesRouter = companiesController.router;
