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
exports.accessoriesService = exports.shoesService = exports.clothesService = exports.productsService = exports.Service = void 0;
const imagesHandler_1 = require("../2-utils/imagesHandler");
const client_errors_1 = require("../3-models/client-errors");
const product_model_1 = require("../3-models/product-model");
class Service {
    constructor(model, populatedFields) {
        this.model = model;
        this.populatedFields = populatedFields;
    }
    getOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getOne = yield this.model
                .findById(_id)
                .populate(this.populatedFields)
                .exec();
            return getOne;
        });
    }
    addOne({ product, images, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = product.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            imagesHandler_1.imagesHandler.configureFileSaver("1-assets", `${this.model.modelName.toLowerCase()}-images`);
            const imagesNames = yield imagesHandler_1.imagesHandler.AddImageNames(images);
            product.imageNames = imagesNames;
            const addedProduct = yield this.model.create(product);
            const addedProductId = addedProduct._id;
            const productInstance = (yield this.getOne(addedProductId)).toObject();
            return productInstance;
        });
    }
    updateOne({ product, images, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = product.validateSync();
            if (errors) {
                throw new client_errors_1.ValidationError(errors.message);
            }
            console.log("Product", product);
            imagesHandler_1.imagesHandler.configureFileSaver("1-assets", `${this.model.modelName.toLocaleLowerCase()}-images`);
            const newImagesName = yield imagesHandler_1.imagesHandler.updateImageNames(this.model, product._id, images);
            const updateData = Object.assign(Object.assign({}, product.toObject()), { imageNames: newImagesName, _id: product._id.toString() });
            const updatedProduct = yield this.model
                .findByIdAndUpdate(product._id, updateData, { new: true })
                .exec();
            if (!updatedProduct) {
                throw new client_errors_1.ResourceNotFoundError(product._id);
            }
            return (yield this.getOne(product._id)).toObject();
        });
    }
}
exports.Service = Service;
class ProductsService extends Service {
    constructor() {
        super(product_model_1.ProductModel, [
            "category",
            "company",
            "audience",
            "stock",
            "stock.color",
            "stock.size",
            "stock.quantity",
            "subCategory",
        ]);
    }
    getAllProductsByFilterQuery(filterQueryClothes, filterQueryShoes, filterQueryAccessories, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsPerPage = 9;
            const offset = (page - 1) * itemsPerPage;
            const products = {
                clothes: [],
                shoes: [],
                accessories: [],
            };
            const clothes = yield product_model_1.ClothModel.find(filterQueryClothes)
                .skip(offset)
                .limit(itemsPerPage)
                .populate(this.populatedFields)
                .exec();
            const shoes = yield product_model_1.ShoeModel.find(filterQueryShoes)
                .skip(offset)
                .limit(itemsPerPage)
                .populate(this.populatedFields)
                .exec();
            const accessories = yield product_model_1.AccessoryModel.find(filterQueryAccessories)
                .skip(offset)
                .limit(itemsPerPage)
                .populate(this.populatedFields)
                .exec();
            products.clothes = clothes;
            products.shoes = shoes;
            products.accessories = accessories;
            const totalRowsClothes = yield product_model_1.ClothModel.countDocuments(filterQueryClothes);
            const totalRowsShoes = yield product_model_1.ShoeModel.countDocuments(filterQueryShoes);
            const totalRowsAccessories = yield product_model_1.AccessoryModel.countDocuments(filterQueryAccessories);
            const totalRows = totalRowsClothes + totalRowsShoes + totalRowsAccessories;
            return { products, totalRows };
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.findById(_id).exec();
            if (!product) {
                throw new client_errors_1.ResourceNotFoundError(_id);
            }
            yield product_model_1.ProductModel.findByIdAndDelete(_id);
        });
    }
}
exports.productsService = new ProductsService();
exports.clothesService = new Service(product_model_1.ClothModel, [
    "category",
    "company",
    "audience",
    "subCategory",
    "stock",
    "stock.color",
    "stock.size",
    "stock.quantity",
]);
exports.shoesService = new Service(product_model_1.ShoeModel, [
    "category",
    "company",
    "audience",
    "subCategory",
    "stock",
    "stock.color",
    "stock.size",
    "stock.quantity",
]);
exports.accessoriesService = new Service(product_model_1.AccessoryModel, [
    "category",
    "company",
    "audience",
    "subCategory",
    "stock",
    "stock.color",
    "stock.size",
    "stock.quantity",
]);
