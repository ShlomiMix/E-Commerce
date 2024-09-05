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
exports.clothingSizesRouter = void 0;
const express_1 = __importDefault(require("express"));
const clothSize_model_1 = require("../3-models/clothSize-model");
const enums_1 = require("../3-models/enums");
const clothingSizes_service_1 = require("../5-services/clothingSizes-service");
class ClothingSizesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/clothing-sizes", this.getAllSizes);
        this.router.get("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.getOneSize);
        this.router.post("/clothing-sizes", this.addCategory);
        this.router.put("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.updateCategory);
        this.router.delete("/clothing-sizes/:_id([a-f0-9A-F]{24})", this.deleteCategory);
    }
    getAllSizes(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizes = yield clothingSizes_service_1.clothesSizesService.getAllSizes();
                response.json(sizes);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneSize(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const size = yield clothingSizes_service_1.clothesSizesService.getOneSize(_id);
                response.json(size);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const size = new clothSize_model_1.ClothSizeModel(request.body);
                const addedSize = yield clothingSizes_service_1.clothesSizesService.addSize(size);
                response.status(enums_1.StatusCode.Created).json(addedSize);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const size = new clothSize_model_1.ClothSizeModel(request.body);
                const updatedSize = yield clothingSizes_service_1.clothesSizesService.updateSize(size);
                response.json(updatedSize);
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
                yield clothingSizes_service_1.clothesSizesService.deleteSize(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const clothingSizesController = new ClothingSizesController();
exports.clothingSizesRouter = clothingSizesController.router;
