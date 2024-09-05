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
exports.categoriesService = void 0;
const imageHandler_1 = require("../2-utils/imageHandler");
const imagesHandler_1 = require("../2-utils/imagesHandler");
const category_model_1 = require("../3-models/category-model");
const client_errors_1 = require("../3-models/client-errors");
class CategoriesService {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_model_1.CategoryModel.find()
                .populate("subCategories")
                .exec();
            return categories;
        });
    }
    getOneCategory(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.CategoryModel.findById(_id).populate("subCategories").exec();
        });
    }
    getSubCategoriesByCategory(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoriesByCategory = yield category_model_1.CategoryModel.findById(_id)
                .populate("subCategories")
                .exec();
            return subCategoriesByCategory.subCategories;
        });
    }
    addCategory({ category, image, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = category.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            if (image) {
                imagesHandler_1.imagesHandler.configureFileSaver("1-assets", "category-images");
                const imageName = yield imageHandler_1.imageHandler.convertImageToImageName(image);
                category.imageName = imageName;
            }
            const newCategory = yield category.save();
            return this.getOneCategory(newCategory._id);
        });
    }
    updateCategory({ category, image, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = category.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            if (image) {
                imagesHandler_1.imagesHandler.configureFileSaver("1-assets", "category-images");
                const newImageName = yield imageHandler_1.imageHandler.updateImageName(category_model_1.CategoryModel, category._id, image);
                category.imageName = newImageName;
            }
            const updatedCategory = yield category_model_1.CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
            if (!updatedCategory) {
                throw new client_errors_1.ResourceNotFoundError(category._id);
            }
            return this.getOneCategory(updatedCategory._id);
        });
    }
    deleteCategory(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryToDelete = yield category_model_1.CategoryModel.findById(_id);
            if (!categoryToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield category_model_1.CategoryModel.findByIdAndDelete(_id).exec();
            yield imageHandler_1.imageHandler.deleteImageName(categoryToDelete.imageName);
        });
    }
}
exports.categoriesService = new CategoriesService();
