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
exports.subCategoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../3-models/enums");
const subCategory_model_1 = require("../3-models/subCategory-model");
const subCategories_service_1 = require("../5-services/subCategories-service");
class SubCategoriesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/sub-categories", this.getAllSubCategories);
        this.router.get("/sub-categories/:_id([a-f0-9A-F]{24})", this.getOneSubCategory);
        this.router.post("/sub-categories/batch", this.addSubCategoriesArr);
        this.router.put("/sub-categories/update-batch", this.updateSubCategoriesArr);
        this.router.post("/sub-categories", this.addSubCategory);
        this.router.put("/sub-categories/:_id([a-f0-9A-F]{24})", this.updateSubCategory);
        this.router.delete("/sub-categories/:_id([a-f0-9A-F]{24})", this.deleteSubCategory);
    }
    getAllSubCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield subCategories_service_1.subCategoriesService.getAllSubCategories();
                response.json(categories);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneSubCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const category = yield subCategories_service_1.subCategoriesService.getOneSubCategory(_id);
                response.json(category);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addSubCategoriesArr(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategoriesArr = request.body;
                const addedSubCategories = yield subCategories_service_1.subCategoriesService.addSubCategoriesArr(subCategoriesArr);
                response.status(enums_1.StatusCode.Created).json(addedSubCategories);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateSubCategoriesArr(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategoriesArr = request.body;
                const updatedSubCategoriesArr = yield subCategories_service_1.subCategoriesService.updateSubCategoriesArr(subCategoriesArr);
                response.json(updatedSubCategoriesArr);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addSubCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = new subCategory_model_1.SubCategoryModel(request.body);
                const addedCategory = yield subCategories_service_1.subCategoriesService.addSubCategory(category);
                response.status(enums_1.StatusCode.Created).json(addedCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateSubCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const category = new subCategory_model_1.SubCategoryModel(request.body);
                const updatedCategory = yield subCategories_service_1.subCategoriesService.updateSubCategory(category);
                response.json(updatedCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteSubCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield subCategories_service_1.subCategoriesService.deleteSubCategory(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const subCategoriesController = new SubCategoriesController();
exports.subCategoriesRouter = subCategoriesController.router;
