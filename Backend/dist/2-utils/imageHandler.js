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
exports.imageHandler = void 0;
const uploaded_file_saver_1 = require("uploaded-file-saver");
const client_errors_1 = require("../3-models/client-errors");
class ImageHandler {
    convertImageToImageName(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageName = yield uploaded_file_saver_1.fileSaver.add(image);
                return imageName;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    getImageName(model, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield model.findById(_id).select("imageName");
                if (!value) {
                    throw new client_errors_1.ResourceNotFoundError(_id);
                }
                const imageName = value.imageName || "";
                console.log("Retrieved image name:", imageName);
                return imageName;
            }
            catch (err) {
                console.log("Error getting image name:", err.message);
                console.log(err.message);
            }
        });
    }
    updateImageName(model, _id, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldImageName = yield this.getImageName(model, _id);
            const newImageName = image
                ? yield uploaded_file_saver_1.fileSaver.update(oldImageName, image)
                : oldImageName;
            console.log("Image updated from", oldImageName, "to", newImageName);
            return newImageName;
        });
    }
    deleteImageName(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield uploaded_file_saver_1.fileSaver.delete(imageName);
        });
    }
}
exports.imageHandler = new ImageHandler();
