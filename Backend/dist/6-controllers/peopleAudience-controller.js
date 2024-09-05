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
exports.peopleAudienceRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../3-models/enums");
const peopleAudience_model_1 = require("../3-models/peopleAudience-model");
const peopleAudience_service_1 = require("../5-services/peopleAudience-service");
class PeopleAudienceController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/audience", this.getAllPeopleAudience);
        this.router.get("/audience/:_id([a-f0-9A-F]{24})", this.getOneAudience);
        this.router.post("/audience", this.addAudience);
        this.router.put("/audience/:_id([a-f0-9A-F]{24})", this.updateAudience);
        this.router.delete("/audience/:_id([a-f0-9A-F]{24})", this.deleteAudience);
    }
    getAllPeopleAudience(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const peopleAudience = yield peopleAudience_service_1.peopleAudienceService.getAllPeopleAudience();
                response.json(peopleAudience);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneAudience(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                const audience = yield peopleAudience_service_1.peopleAudienceService.getOneAudience(_id);
                response.json(audience);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addAudience(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const audience = new peopleAudience_model_1.PeopleAudienceModel(request.body);
                const addedAudience = yield peopleAudience_service_1.peopleAudienceService.addAudience(audience);
                response.status(enums_1.StatusCode.Created).json(addedAudience);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateAudience(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                request.body._id = request.params._id;
                const audience = new peopleAudience_model_1.PeopleAudienceModel(request.body);
                const updatedAudience = yield peopleAudience_service_1.peopleAudienceService.updateAudience(audience);
                response.json(updatedAudience);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteAudience(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield peopleAudience_service_1.peopleAudienceService.deleteAudience(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const peopleAudienceController = new PeopleAudienceController();
exports.peopleAudienceRouter = peopleAudienceController.router;
