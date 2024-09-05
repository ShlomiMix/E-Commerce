"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyber = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_model_1 = require("../3-models/role-model");
const app_config_1 = require("./app-config");
class Cyber {
    getNewToken(user) {
        delete user.password;
        const container = { user };
        const options = { expiresIn: "5h" };
        const token = jsonwebtoken_1.default.sign(container, app_config_1.appConfig.jwtSecretKey, options);
        return token;
    }
    isTokenValid(token) {
        try {
            if (!token)
                return false;
            jsonwebtoken_1.default.verify(token, app_config_1.appConfig.jwtSecretKey);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    isAdmin(token) {
        const container = jsonwebtoken_1.default.decode(token);
        const user = container.user;
        return user.roleId === role_model_1.RoleModel.Admin;
    }
    hashPassword(plainText) {
        const hashedPassword = crypto_1.default
            .createHmac("sha512", app_config_1.appConfig.passwordSalt)
            .update(plainText)
            .digest("hex");
        return hashedPassword;
    }
}
exports.cyber = new Cyber();
