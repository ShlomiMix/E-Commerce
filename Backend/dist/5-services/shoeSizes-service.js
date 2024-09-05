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
exports.shoesSizesService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const shoeSize_model_1 = require("../3-models/shoeSize-model");
class ShoesSizesService {
    getAllSizes() {
        return __awaiter(this, void 0, void 0, function* () {
            const sizes = yield shoeSize_model_1.ShoeSizeModel.find().exec();
            return sizes;
        });
    }
    getOneSize(_id) {
        return shoeSize_model_1.ShoeSizeModel.findById(_id).exec();
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
            const updatedSize = yield shoeSize_model_1.ShoeSizeModel.findByIdAndUpdate(size._id, size, {
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
            const sizeToDelete = yield shoeSize_model_1.ShoeSizeModel.findById(_id);
            if (!sizeToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield shoeSize_model_1.ShoeSizeModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.shoesSizesService = new ShoesSizesService();
