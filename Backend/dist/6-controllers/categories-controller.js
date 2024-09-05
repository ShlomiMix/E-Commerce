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
exports.categoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const imagesHandler_1 = require("../2-utils/imagesHandler");
const category_model_1 = require("../3-models/category-model");
const enums_1 = require("../3-models/enums");
const categories_service_1 = require("../5-services/categories-service");
const subCategories_service_1 = require("../5-services/subCategories-service");
class CategoriesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/categories", this.getAllCategories);
        this.router.get("/categories/:_id([a-f0-9A-F]{24})", this.getOneCategory);
        this.router.get("/categories/sub-categories-by-category/:_id([a-f0-9A-F]{24})", this.getSubCategoriesByCategory);
        this.router.post("/categories", this.addCategory);
        this.router.put("/categories/:_id([a-f0-9A-F]{24})", this.updateCategory);
        this.router.delete("/categories/:_id([a-f0-9A-F]{24})", this.deleteCategory);
        this.router.get("/brands/images/:folderPath/:imageName", imagesHandler_1.imagesHandler.getImageFile);
    }
    getAllCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categories_service_1.categoriesService.getAllCategories();
                response.json(categories);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const category = yield categories_service_1.categoriesService.getOneCategory(_id);
                response.json(category);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getSubCategoriesByCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const subCategoriesByCategory = yield categories_service_1.categoriesService.getSubCategoriesByCategory(_id);
                response.json(subCategoriesByCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addCategory(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = new category_model_1.CategoryModel(request.body);
                const subCategories = [];
                for (const subCategory of category.subCategories) {
                    subCategories.push(subCategory);
                }
                category.subCategories = subCategories;
                const addedCategory = yield categories_service_1.categoriesService.addCategory({
                    category,
                    image: (_a = request.files) === null || _a === void 0 ? void 0 : _a.image,
                });
                response.status(enums_1.StatusCode.Created).json(addedCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateCategory(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const category = new category_model_1.CategoryModel(request.body);
                const subCategories = yield subCategories_service_1.subCategoriesService.updateSubCategoriesArr(category.subCategories);
                category.subCategories = subCategories;
                const updatedCategory = yield categories_service_1.categoriesService.updateCategory({
                    category,
                    image: (_a = request.files) === null || _a === void 0 ? void 0 : _a.image,
                });
                response.json(updatedCategory);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield categories_service_1.categoriesService.deleteCategory(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const categoriesController = new CategoriesController();
exports.categoriesRouter = categoriesController.router;
