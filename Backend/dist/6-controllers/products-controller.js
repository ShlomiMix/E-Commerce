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
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const imagesHandler_1 = require("../2-utils/imagesHandler");
const enums_1 = require("../3-models/enums");
const product_model_1 = require("../3-models/product-model");
const category_model_1 = require("../3-models/category-model");
const product_model_2 = require("../3-models/product-model");
const generic_service_1 = require("../5-services/generic-service");
class ProductsController {
    constructor() {
        this.router = express_1.default.Router();
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get("/products", this.getAllProductsByFilterQuery);
        this.router.get("/products/:_id([a-f0-9A-F]{24})", this.getOneProduct);
        this.router.post("/products", this.addProduct);
        this.router.put("/products/:_id([a-f0-9A-F]{24})", this.updateProduct);
        this.router.delete("/products/:_id([a-f0-9A-F]{24})", this.deleteProduct);
        this.router.get("/brands/images/:folderPath/:imageName", imagesHandler_1.imagesHandler.getImageFile);
    }
    getAllProductsByFilterQuery(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, audienceId, categoryId, color, companyId, size, subCategoryId, name, price } = request === null || request === void 0 ? void 0 : request.query;
                console.log("Request Query:", request.query);
                const filtersQueryShoes = {};
                const filtersQueryClothes = {};
                const filtersQueryAccessories = {};
                if (name) {
                    const nameRegex = new RegExp(name.toString(), "i");
                    filtersQueryClothes.name = nameRegex;
                    filtersQueryShoes.name = nameRegex;
                    filtersQueryAccessories.name = nameRegex;
                }
                if (audienceId) {
                    filtersQueryShoes.audienceId = audienceId;
                    filtersQueryClothes.audienceId = audienceId;
                    filtersQueryAccessories.audienceId = audienceId;
                }
                if (categoryId) {
                    filtersQueryShoes.categoryId = categoryId;
                    filtersQueryClothes.categoryId = categoryId;
                    filtersQueryAccessories.categoryId = categoryId;
                }
                if (subCategoryId) {
                    filtersQueryShoes.subCategoryId = subCategoryId;
                    filtersQueryClothes.subCategoryId = subCategoryId;
                    filtersQueryAccessories.subCategoryId = subCategoryId;
                }
                if (color) {
                    const colorIds = typeof color === 'string' ? color.split(",") : color;
                    const objectIdColorIds = colorIds.map(c => new mongoose_1.default.Types.ObjectId(c.trim()));
                    filtersQueryShoes["stock.color"] = { $in: objectIdColorIds };
                    filtersQueryClothes["stock.color"] = { $in: objectIdColorIds };
                    filtersQueryAccessories["stock.color"] = { $in: objectIdColorIds };
                }
                if (companyId) {
                    filtersQueryShoes.companyId = companyId;
                    filtersQueryClothes.companyId = companyId;
                    filtersQueryAccessories.companyId = companyId;
                }
                if (size) {
                    const sizeIds = typeof size === "string" ? size.split(",") : size;
                    const objectIdSizeIds = sizeIds.map((s) => new mongoose_1.default.Types.ObjectId(s.trim()));
                    filtersQueryShoes["stock.size"] = { $in: objectIdSizeIds };
                    filtersQueryClothes["stock.size"] = { $in: objectIdSizeIds };
                    filtersQueryAccessories["stock.size"] = { $in: objectIdSizeIds };
                }
                if (price) {
                    const [minPriceStr, maxPriceStr] = price.split(",");
                    let minPrice = parseFloat(minPriceStr);
                    let maxPrice = parseFloat(maxPriceStr);
                    filtersQueryClothes.price = { $gte: minPrice, $lte: maxPrice };
                    filtersQueryShoes.price = { $gte: minPrice, $lte: maxPrice };
                    filtersQueryAccessories.price = { $gte: minPrice, $lte: maxPrice };
                }
                const products = yield generic_service_1.productsService.getAllProductsByFilterQuery(filtersQueryClothes, filtersQueryShoes, filtersQueryAccessories, +page);
                response.json(products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOneProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = request.params;
                const productById = yield product_model_1.ProductModel.findById(_id).exec();
                if (!productById) {
                    throw new Error("Product not found");
                }
                const categoryId = productById === null || productById === void 0 ? void 0 : productById.categoryId;
                const category = yield category_model_1.CategoryModel.findById(categoryId).exec();
                if (!category) {
                    throw new Error("can't find category");
                }
                const categoryName = category === null || category === void 0 ? void 0 : category.name;
                let product;
                switch (categoryName) {
                    case "Clothing":
                        product = yield generic_service_1.clothesService.getOne(_id);
                        console.log("cloth", product);
                        console.log("categoryName", categoryName);
                        break;
                    case "Footwear":
                        product = yield generic_service_1.shoesService.getOne(_id);
                        console.log("shoe", product);
                        console.log("categoryName", categoryName);
                        break;
                    case "Accessories":
                        product = yield generic_service_1.accessoriesService.getOne(_id);
                        console.log("accessory", product);
                        console.log("categoryName", categoryName);
                        break;
                    default:
                        throw new Error("Can't find this category");
                }
                response.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = request.body;
                const category = yield category_model_1.CategoryModel.findById(categoryId).exec();
                console.log("category", category);
                const imagesArr = yield imagesHandler_1.imagesHandler.extractImagesFromRequest(request);
                let categoryName = category === null || category === void 0 ? void 0 : category.name;
                console.log("Request body", request.body);
                const stock = [];
                let index = 0;
                while (request.body[`stock[${index}][color]`] !== undefined) {
                    stock.push({
                        color: request.body[`stock[${index}][color]`],
                        size: request.body[`stock[${index}][size]`],
                        quantity: request.body[`stock[${index}][quantity]`],
                    });
                    index++;
                }
                request.body.stock = stock;
                let addedProduct;
                console.log("categoryName", categoryName);
                switch (categoryName) {
                    case "Clothing":
                        const cloth = new product_model_1.ClothModel(request.body);
                        addedProduct = yield generic_service_1.clothesService.addOne({
                            product: cloth,
                            images: imagesArr,
                        });
                        break;
                    case "Footwear":
                        const shoe = new product_model_1.ShoeModel(request.body);
                        addedProduct = yield generic_service_1.shoesService.addOne({
                            product: shoe,
                            images: imagesArr,
                        });
                        break;
                    case "Accessories":
                        const accessory = new product_model_2.AccessoryModel(request.body);
                        console.log("accessory", accessory);
                        addedProduct = yield generic_service_1.accessoriesService.addOne({
                            product: accessory,
                            images: imagesArr,
                        });
                        break;
                    default:
                        response.status(enums_1.StatusCode.BadRequest).send("Invalid category name");
                        return;
                }
                console.log("addedProduct", addedProduct);
                response.status(enums_1.StatusCode.Created).json(addedProduct);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = request.params;
                console.log("_id", _id);
                const { categoryId } = request.body;
                const category = yield category_model_1.CategoryModel.findById(categoryId).exec();
                console.log("category", category);
                const imagesArr = request.files !== null
                    ? yield imagesHandler_1.imagesHandler.extractImagesFromRequest(request)
                    : [];
                const stock = [];
                let index = 0;
                while (request.body[`stock[${index}][color]`] !== undefined) {
                    stock.push({
                        color: request.body[`stock[${index}][color]`],
                        size: request.body[`stock[${index}][size]`],
                        quantity: request.body[`stock[${index}][quantity]`],
                    });
                    index++;
                }
                request.body.stock = stock;
                request.body._id = _id;
                let categoryName = category === null || category === void 0 ? void 0 : category.name;
                console.log("categoryName", categoryName);
                let updatedProduct;
                switch (categoryName) {
                    case "Clothing":
                        const cloth = new product_model_1.ClothModel(request.body);
                        updatedProduct = yield generic_service_1.clothesService.updateOne({
                            product: cloth,
                            images: imagesArr,
                        });
                        console.log("cloth", cloth);
                        break;
                    case "Footwear":
                        const shoe = new product_model_1.ShoeModel(request.body);
                        updatedProduct = yield generic_service_1.shoesService.updateOne({
                            product: shoe,
                            images: imagesArr,
                        });
                        console.log("shoe", shoe);
                        break;
                    case "Accessories":
                        const accessory = new product_model_2.AccessoryModel(request.body);
                        updatedProduct = yield generic_service_1.accessoriesService.updateOne({
                            product: accessory,
                            images: imagesArr,
                        });
                        console.log("accessory", accessory);
                        break;
                    default:
                        response.status(enums_1.StatusCode.BadRequest).send("Invalid category name");
                        return;
                }
                console.log("updatedProductController", updatedProduct);
                response.json(updatedProduct);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params._id;
                yield generic_service_1.productsService.deleteOne(_id);
                response.sendStatus(enums_1.StatusCode.NoContent);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const productsController = new ProductsController();
exports.productsRouter = productsController.router;
