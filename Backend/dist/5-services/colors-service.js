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
exports.colorsService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const color_model_1 = require("../3-models/color-model");
class ColorsService {
    getAllColors() {
        return __awaiter(this, void 0, void 0, function* () {
            const colors = yield color_model_1.ColorModel.find().exec();
            return colors;
        });
    }
    getOneColor(_id) {
        return color_model_1.ColorModel.findById(_id).exec();
    }
    addColor(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = color.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            return color.save();
        });
    }
    updateColor(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = color.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const updatedColor = color_model_1.ColorModel.findByIdAndUpdate(color._id, color, {
                new: true,
            });
            if (!updatedColor) {
                throw new client_errors_1.ResourceNotFoundError(color._id);
            }
            return updatedColor;
        });
    }
    deleteColor(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const colorToDelete = yield color_model_1.ColorModel.findById(_id);
            if (!colorToDelete) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield color_model_1.ColorModel.findByIdAndDelete(_id).exec();
        });
    }
}
exports.colorsService = new ColorsService();
