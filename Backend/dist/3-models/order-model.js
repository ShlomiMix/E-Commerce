"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("./user-model");
exports.OrderSchema = new mongoose_1.Schema({
    customer: {
        userId: {
            type: mongoose_1.default.Types.ObjectId,
            ref: user_model_1.UserModel,
        },
        email: {
            type: String,
            required: [true, "Missing email"],
            minlength: [7, "Email has been a minimum 7 characters"],
        },
        firstName: {
            type: String,
            required: [true, "Missing first name"],
            minlength: [2, "First name has been a minimum 2 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Missing last name"],
            minlength: [2, "Last name has been a minimum 2 characters"],
        },
    },
    shippingDetails: {
        address: {
            type: String,
            required: [true, "Missing address"],
        },
        apartment: {
            type: Number,
            required: [true, "Missing apartment"],
        },
        city: {
            type: String,
            required: [true, "Missing city"],
        },
        country: {
            type: String,
            required: [true, "Missing country"],
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
            required: [true, "Missing postal code"],
        },
        phone: {
            type: String,
            required: [true, "Missing phone"],
            minlength: [8, "Phone number has been a minimum 8 characters"],
        },
    },
    orderDetails: {
        shippingMethod: {
            type: String,
            required: [true, "Missing shipping method"],
        },
        orderStatus: {
            type: String,
            default: "Order placed",
        },
        orderDate: {
            type: String,
            default: Date.now(),
        },
        expectedDeliveryDate: {
            type: String,
        },
    },
    customerCard: {
        paymentMethod: {
            type: String,
            required: [true, "Missing payment method"],
        },
        cardNumber: {
            type: String,
            required: [true, "Missing card number"],
            minlength: [12, "Card number has been minimum a 12 characters"],
            maxlength: [20, "Card number has been maximum a 20 characters"],
        },
        nameOnCard: {
            type: String,
            required: [true, "Missing name on card"],
        },
        expirationDate: {
            type: String,
            required: [true, "Missing expiration date"],
        },
        cvv: {
            type: String,
            required: [true, "Missing cvv"],
            minlength: [3, "CVV has been minimum 3 characters"],
            maxlength: [3, "CVV has been maximum 3 characters"],
        },
    },
    items: [
        {
            productId: {
                type: String,
                required: [true, "Missing product id"],
            },
            name: {
                type: String,
            },
            color: {
                type: String,
            },
            size: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
            stockId: {
                type: String,
            },
        },
    ],
    transactionDetails: {
        subTotal: {
            type: Number,
        },
        taxes: {
            type: Number,
        },
        total: {
            type: Number,
        },
    },
});
exports.OrderModel = (0, mongoose_1.model)("OrderModel", exports.OrderSchema, "orders");
