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
exports.shoesSizesRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../3-models/enums");
const shoeSize_model_1 = require("../3-models/shoeSize-model");
const shoeSizes_service_1 = require("../5-services/shoeSizes-service");
class ShoesSizesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/shoes-sizes", this.getAllSizes);
        this.router.get("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.getOneSize);
        this.router.post("/shoes-sizes", this.addSize);
        this.router.put("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.updateSize);
        this.router.delete("/shoes-sizes/:_id([a-f0-9A-F]{24})", this.deleteSize);
    }
    getAllSizes(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizes = yield shoeSizes_service_1.shoesSizesService.getAllSizes();
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
                const size = yield shoeSizes_service_1.shoesSizesService.getOneSize(_id);
                response.json(size);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addSize(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const size = new shoeSize_model_1.ShoeSizeModel(request.body);
                const addedSize = yield shoeSizes_service_1.shoesSizesService.addSize(size);
                response.status(enums_1.StatusCode.Created).json(addedSize);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateSize(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const size = new shoeSize_model_1.ShoeSizeModel(request.body);
                const updatedSize = yield shoeSizes_service_1.shoesSizesService.updateSize(size);
                response.json(updatedSize);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteSize(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield shoeSizes_service_1.shoesSizesService.deleteSize(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const shoesSizesController = new ShoesSizesController();
exports.shoesSizesRouter = shoesSizesController.router;
