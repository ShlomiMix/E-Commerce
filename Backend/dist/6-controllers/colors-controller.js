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
exports.colorsRouter = void 0;
const express_1 = __importDefault(require("express"));
const color_model_1 = require("../3-models/color-model");
const enums_1 = require("../3-models/enums");
const colors_service_1 = require("../5-services/colors-service");
class ColorsController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/colors", this.getAllColors);
        this.router.get("/colors/:_id([a-f0-9A-F]{24})", this.getOneColor);
        this.router.post("/colors", this.addCategory);
        this.router.put("/colors/:_id([a-f0-9A-F]{24})", this.updateColor);
        this.router.delete("/colors/:_id([a-f0-9A-F]{24})", this.deleteColor);
    }
    getAllColors(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colors = yield colors_service_1.colorsService.getAllColors();
                response.json(colors);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneColor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const color = yield colors_service_1.colorsService.getOneColor(_id);
                response.json(color);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const color = new color_model_1.ColorModel(request.body);
                const addedColor = yield colors_service_1.colorsService.addColor(color);
                response.status(enums_1.StatusCode.Created).json(addedColor);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateColor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const color = new color_model_1.ColorModel(request.body);
                const updatedColor = yield colors_service_1.colorsService.updateColor(color);
                response.json(updatedColor);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteColor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield colors_service_1.colorsService.deleteColor(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const colorsController = new ColorsController();
exports.colorsRouter = colorsController.router;
