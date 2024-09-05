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
exports.subCategoriesService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const subCategory_model_1 = require("../3-models/subCategory-model");
class SubCategoriesService {
    getAllSubCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield subCategory_model_1.SubCategoryModel.find().exec();
            return categories;
        });
    }
    getOneSubCategory(_id) {
        return subCategory_model_1.SubCategoryModel.findById(_id).exec();
    }
    addSubCategoriesArr(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSubCategories = yield subCategory_model_1.SubCategoryModel.insertMany(subCategories);
            return createdSubCategories;
        });
    }
    updateSubCategoriesArr(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSubCategories = yield Promise.all(subCategories.map((subCategory) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (subCategory._id) {
                        const existingSubCategory = yield subCategory_model_1.SubCategoryModel.findByIdAndUpdate(subCategory._id, subCategory, { new: true });
                        if (!existingSubCategory) {
                            throw new client_errors_1.ResourceNotFoundError(subCategory._id);
                        }
                        return existingSubCategory;
                    }
                    else {
                        const newSubCategory = new subCategory_model_1.SubCategoryModel(subCategory);
                        const savedSubCategory = yield newSubCategory.save();
                        return savedSubCategory;
                    }
                }
                catch (err) {
                    throw new Error(`Failed to update subcategory ${subCategory._id}: ${err.message}`);
                }
            })));
            return updatedSubCategories;
        });
    }
    addSubCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = category.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            return category.save();
        });
    }
    updateSubCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = category.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const updatedCategory = subCategory_model_1.SubCategoryModel.findByIdAndUpdate(category._id, category, { new: true });
            if (!updatedCategory) {
                throw new client_errors_1.ResourceNotFoundError(category._id);
            }
            return updatedCategory;
        });
    }
    deleteSubCategory(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoryToDelete = yield subCategory_model_1.SubCategoryModel.findById(_id);
            if (!subCategoryToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield subCategory_model_1.SubCategoryModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.subCategoriesService = new SubCategoriesService();
