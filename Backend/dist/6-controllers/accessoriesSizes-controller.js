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
exports.accessoriesSizesRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../3-models/enums");
const accessoriesSizes_service_1 = require("../5-services/accessoriesSizes-service");
const accessorySize_model_1 = require("../3-models/accessorySize-model");
class AccessoriesSizesController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/accessories-sizes", this.getAllSizes);
        this.router.get("/accessories-sizes/:_id([a-f0-9A-F]{24})", this.getOneSize);
        this.router.post("/accessories-sizes", this.addCategory);
        this.router.put("/accessories-sizes/:_id([a-f0-9A-F]{24})", this.updateCategory);
        this.router.delete("/accessories-sizes/:_id([a-f0-9A-F]{24})", this.deleteCategory);
    }
    getAllSizes(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizes = yield accessoriesSizes_service_1.accessoriesSizesService.getAllSizes();
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
                const size = yield accessoriesSizes_service_1.accessoriesSizesService.getOneSize(_id);
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
                const size = new accessorySize_model_1.AccessorySizeModel(request.body);
                const addedSize = yield accessoriesSizes_service_1.accessoriesSizesService.addSize(size);
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
                const size = new accessorySize_model_1.AccessorySizeModel(request.body);
                const updatedSize = yield accessoriesSizes_service_1.accessoriesSizesService.updateSize(size);
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
                yield accessoriesSizes_service_1.accessoriesSizesService.deleteSize(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const accessoriesSizesController = new AccessoriesSizesController();
exports.accessoriesSizesRouter = accessoriesSizesController.router;
