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
exports.authService = void 0;
const cyber_1 = require("../2-utils/cyber");
const client_errors_1 = require("../3-models/client-errors");
const role_model_1 = require("../3-models/role-model");
const user_model_1 = require("../3-models/user-model");
class AuthService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = user.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            const isEmailTaken = yield this.isEmailTaken(user.email);
            if (isEmailTaken) {
                throw new client_errors_1.ValidationError("The email is taken choose a different email please");
            }
            user.roleId = role_model_1.RoleModel.User;
            user.password = cyber_1.cyber.hashPassword(user.password);
            yield user.save();
            const token = cyber_1.cyber.getNewToken(user);
            return token;
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = credentials.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            credentials.password = cyber_1.cyber.hashPassword(credentials.password);
            const users = yield user_model_1.UserModel.find({
                email: { $eq: credentials.email },
                password: { $eq: credentials.password },
            });
            const user = users[0];
            if (!user) {
                throw new client_errors_1.ValidationError("Incorrect Email or Password");
            }
            const token = cyber_1.cyber.getNewToken(user);
            return token;
        });
    }
    isEmailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const allEmails = yield user_model_1.UserModel.find({ email: { $eq: email } });
            return allEmails.length > 0;
        });
    }
}
exports.authService = new AuthService();
