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
exports.imagesHandler = void 0;
const uploaded_file_saver_1 = require("uploaded-file-saver");
const path_1 = __importDefault(require("path"));
class ImagesHandler {
    getImageNames(model, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield model.findById(_id).select("imageNames");
                if (!product) {
                    return null;
                }
                const imagesNames = product.imageNames || [];
                return imagesNames;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    extractImagesFromRequest(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imagesArr = [];
                const images = (_a = request.files) === null || _a === void 0 ? void 0 : _a.images;
                Array.isArray(images) ? (imagesArr = images) : imagesArr.push(images);
                return imagesArr;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    getImageFile(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { imageName, folderPath } = request.params;
                const fullImagePath = path_1.default.resolve(__dirname, "..", "1-assets", folderPath, imageName);
                response.sendFile(fullImagePath);
            }
            catch (err) {
                next(err);
            }
        });
    }
    configureFileSaver(folder1, folder2) {
        const basePath = path_1.default.resolve(__dirname, "../");
        console.log({ basePath: basePath });
        const assetPath = path_1.default.join(basePath, `${folder1}`, `${folder2}`);
        console.log({ assetPath: assetPath });
        console.log("FileSaver Configured Path:", assetPath);
        uploaded_file_saver_1.fileSaver.config(assetPath);
    }
    AddImageNames(images) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (images && images.length > 0) {
                    const imagesArr = Array.from(images);
                    const imageNames = yield Promise.all(imagesArr.map((image) => __awaiter(this, void 0, void 0, function* () { return yield uploaded_file_saver_1.fileSaver.add(image); })));
                    return imageNames;
                }
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    updateImageNames(model, _id, images) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldImageNames = yield this.getImageNames(model, _id);
                console.log({ oldImageNames: oldImageNames });
                if (images && images.length > 0) {
                    const imagesArr = Array.from(images);
                    const imageNames = yield Promise.all(imagesArr.map((image, index) => __awaiter(this, void 0, void 0, function* () {
                        const oldImageName = oldImageNames[index];
                        return yield uploaded_file_saver_1.fileSaver.update(oldImageName, image);
                    })));
                    return imageNames;
                }
                else {
                    return oldImageNames;
                }
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    deleteImages(imageNames) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all(imageNames.map((image) => __awaiter(this, void 0, void 0, function* () { return yield uploaded_file_saver_1.fileSaver.delete(image); })));
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
}
exports.imagesHandler = new ImagesHandler();
