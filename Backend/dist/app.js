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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app_config_1 = require("./2-utils/app-config");
const dal_1 = require("./2-utils/dal");
const errors_middleware_1 = require("./4-middleware/errors-middleware");
const logger_middleware_1 = require("./4-middleware/logger-middleware");
const auth_controller_1 = require("./6-controllers/auth-controller");
const categories_controller_1 = require("./6-controllers/categories-controller");
const clothingSizes_controller_1 = require("./6-controllers/clothingSizes-controller");
const colors_controller_1 = require("./6-controllers/colors-controller");
const companies_controller_1 = require("./6-controllers/companies-controller");
const peopleAudience_controller_1 = require("./6-controllers/peopleAudience-controller");
const products_controller_1 = require("./6-controllers/products-controller");
const shoesSizes_controller_1 = require("./6-controllers/shoesSizes-controller");
const subCategories_controller_1 = require("./6-controllers/subCategories-controller");
const accessoriesSizes_controller_1 = require("./6-controllers/accessoriesSizes-controller");
const orders_controller_1 = require("./6-controllers/orders-controller");
class App {
    constructor() {
        this.server = (0, express_1.default)();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use((0, cors_1.default)());
            this.server.use(express_1.default.json());
            this.server.use((0, express_fileupload_1.default)());
            this.server.use(logger_middleware_1.loggerMiddleware.logToConsole);
            this.server.use("/api", categories_controller_1.categoriesRouter, accessoriesSizes_controller_1.accessoriesSizesRouter, clothingSizes_controller_1.clothingSizesRouter, colors_controller_1.colorsRouter, companies_controller_1.companiesRouter, peopleAudience_controller_1.peopleAudienceRouter, shoesSizes_controller_1.shoesSizesRouter, auth_controller_1.authRouter, subCategories_controller_1.subCategoriesRouter, products_controller_1.productsRouter, orders_controller_1.orderRouter);
            this.server.use(errors_middleware_1.errorsMiddleware.routeNotFound);
            this.server.use(errors_middleware_1.errorsMiddleware.catchAll);
            yield dal_1.dal.connect();
            this.server.listen(app_config_1.appConfig.port, () => console.log("Listening on http://localhost:" + app_config_1.appConfig.port));
        });
    }
}
const app = new App();
app.start();
