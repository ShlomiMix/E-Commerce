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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../3-models/enums");
const order_model_1 = require("../3-models/order-model");
const orders_service_1 = require("../5-services/orders-service");
class OrdersController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/orders", this.getAllOrders);
        this.router.get("/orders/:userId", this.getAllOrdersByUserId);
        this.router.get("/orders/:_id([a-f0-9A-F]{24})", this.getOneOrder);
        this.router.post("/orders", this.addOrder);
        this.router.put("/orders/:_id([a-f0-9A-F]{24})", this.updateOrder);
        this.router.delete("/orders/:_id([a-f0-9A-F]{24})", this.deleteOrder);
    }
    getAllOrders(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_service_1.ordersService.getAllOrders();
                response.json(orders);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllOrdersByUserId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const orders = yield orders_service_1.ordersService.getAllOrdersByUserId(userId);
                response.json(orders);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneOrder(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = request.params;
                const order = yield orders_service_1.ordersService.getOneOrder(_id);
                response.json(order);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addOrder(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new order_model_1.OrderModel(request.body);
                const addedOrder = yield orders_service_1.ordersService.addOrder(order);
                response.status(enums_1.StatusCode.Created).json(addedOrder);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateOrder(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = request.params;
                request.body._id = _id;
                const order = new order_model_1.OrderModel(request.body);
                const updatedOrder = yield orders_service_1.ordersService.updateOrder(order);
                response.json(updatedOrder);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteOrder(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = request.params;
                yield orders_service_1.ordersService.deleteOrder(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const ordersController = new OrdersController();
exports.orderRouter = ordersController.router;
