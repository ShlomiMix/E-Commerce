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
exports.ordersService = void 0;
const client_errors_1 = require("../3-models/client-errors");
const order_model_1 = require("../3-models/order-model");
const product_model_1 = require("../3-models/product-model");
class OrdersService {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.OrderModel.find().exec();
            return orders;
        });
    }
    getAllOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.OrderModel.find({ "customer.userId": userId }).exec();
            return orders;
        });
    }
    getOneOrder(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findById(_id).exec();
            return order;
        });
    }
    addOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = order.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            yield this.updateProductStock(order, "decrease");
            return order.save();
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = order.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const updateOrder = yield order_model_1.OrderModel.findByIdAndUpdate(order._id, order, {
                new: true,
            });
            if (!updateOrder) {
                throw new client_errors_1.ResourceNotFoundError(updateOrder._id);
            }
            return updateOrder;
        });
    }
    deleteOrder(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderTOdelete = yield order_model_1.OrderModel.findById(_id).exec();
            if (!orderTOdelete) {
                throw new client_errors_1.ResourceNotFoundError(orderTOdelete._id);
            }
            yield order_model_1.OrderModel.findByIdAndDelete(_id).exec();
        });
    }
    updateStockQuantity(product, item, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const stockItem = product.stock.find((stock) => stock._id.toString() === item.stockId);
            if (!stockItem) {
                throw new client_errors_1.ResourceNotFoundError(`Stock item with _id ${item.stockId} not exist`);
            }
            if (action === "decrease") {
                stockItem.quantity -= item.quantity;
            }
            else {
                stockItem.quantity += item.quantity;
            }
            yield product.save();
        });
    }
    updateProductStock(order, action) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of order.items) {
                const product = yield product_model_1.ProductModel.findById(item.productId).exec();
                if (!product) {
                    throw new client_errors_1.ResourceNotFoundError(item.productId);
                }
                let productModel;
                if (yield product_model_1.ClothModel.exists({ _id: item.productId })) {
                    productModel = product_model_1.ClothModel;
                }
                else if (yield product_model_1.ShoeModel.exists({ _id: item.productId })) {
                    productModel = product_model_1.ShoeModel;
                }
                else if (yield product_model_1.AccessoryModel.exists({ _id: item.productId })) {
                    productModel = product_model_1.AccessoryModel;
                }
                else {
                    throw new client_errors_1.ResourceNotFoundError(item.productId);
                }
                const specificProduct = yield productModel
                    .findById(item.productId)
                    .exec();
                if (!specificProduct) {
                    throw new client_errors_1.ResourceNotFoundError(item.productId);
                }
                yield this.updateStockQuantity(specificProduct, item, action);
            }
        });
    }
}
exports.ordersService = new OrdersService();
