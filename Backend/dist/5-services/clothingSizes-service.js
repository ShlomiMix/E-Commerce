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
exports.clothesSizesService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const clothSize_model_1 = require("../3-models/clothSize-model");
class ClothesSizesService {
    getAllSizes() {
        return __awaiter(this, void 0, void 0, function* () {
            const sizes = yield clothSize_model_1.ClothSizeModel.find().exec();
            return sizes;
        });
    }
    getOneSize(_id) {
        return clothSize_model_1.ClothSizeModel.findById(_id).exec();
    }
    addSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = size.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            return size.save();
        });
    }
    updateSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = size.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const updatedSize = clothSize_model_1.ClothSizeModel.findByIdAndUpdate(size._id, size, {
                new: true,
            });
            if (!updatedSize) {
                throw new client_errors_1.ResourceNotFoundError(size._id);
            }
            return updatedSize;
        });
    }
    deleteSize(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sizeToDelete = yield clothSize_model_1.ClothSizeModel.findById(_id);
            if (!sizeToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield clothSize_model_1.ClothSizeModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.clothesSizesService = new ClothesSizesService();
