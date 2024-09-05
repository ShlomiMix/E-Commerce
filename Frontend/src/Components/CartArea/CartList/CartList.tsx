import { useCallback, useEffect } from "react";
import { StockModel } from "../../../Models/StockModel";
import { appStore, useAppSelector } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import { initAllProducts } from "../../../Redux/CartSlice";

interface CartListProps {
  cart: Object;
  activeIndices: { [key: string]: number };
  handlePrevImage: (productId: string, imagesUrlLength: number) => void;
  handleNextImage: (productId: string, imagesUrlLength: number) => void;
  handleDecrementAmount: (productId: string) => void;
  handleIncrementAmount: (productId: string) => void;
  handleRemove: (productId: string) => void;
}

export function CartList({
  cart,
  activeIndices,
  handlePrevImage,
  handleNextImage,
  handleDecrementAmount,
  handleIncrementAmount,
  handleRemove,
}: CartListProps): JSX.Element {
    const dispatch = useDispatch();
    const cartProducts = useAppSelector((state) => state?.cart?.products);
  
    const saveToLocalStorage = useCallback(() => {
      console.log("Attempting to save to localStorage:", cartProducts);
      try {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        console.log("Successfully saved to localStorage");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }, [cartProducts]);

    useEffect(() => {
      console.log("Component mounted, loading from localStorage");
      try {
        const storedCartProducts = localStorage.getItem('cartProducts');
        console.log("Loaded from localStorage:", storedCartProducts);
        if (storedCartProducts) {
          const parsedProducts = JSON.parse(storedCartProducts);
          console.log("Parsed products:", parsedProducts);
          dispatch(initAllProducts({ products: parsedProducts }));
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }, [dispatch]);
  
    useEffect(() => {
      console.log("Cart products changed:", cartProducts);
      if (Object.keys(cartProducts).length > 0) {
        saveToLocalStorage();
      }
    }, [cartProducts, saveToLocalStorage]);
  
    // Debug: Log current localStorage content
    useEffect(() => {
      const currentStorage = localStorage.getItem('cartProducts');
      console.log("Current localStorage content:", currentStorage);
    }, []);
  


  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y h-auto divide-gray-200">
          {Object.entries(cart).map(([productId, product]) => (
            <li key={productId} className="flex flex-col py-6">
              <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-96">
                {product?.product.imagesUrl?.map(
                  (imageUrl: string, index: number) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === (activeIndices[productId] || 0)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      data-carousel-item={
                        index === (activeIndices[productId] || 0)
                          ? "active"
                          : ""
                      }
                    >
                      <img
                        src={imageUrl}
                        className="block  h-60 w-full  object-contain"
                        alt={`Product image ${index + 1}`}
                      />
                    </div>
                  )
                )}
                <button
                  className="absolute top-1/3 left-0 z-30 h-10 w-10 flex items-center justify-center transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
                  onClick={() =>
                    handlePrevImage(productId, product.product.imagesUrl.length)
                  }
                >
                  &lt;
                </button>
                <button
                  className="absolute top-1/3 right-0 z-30 h-10 w-10 flex items-center justify-center transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
                  onClick={() =>
                    handleNextImage(productId, product.product.imagesUrl.length)
                  }
                >
                  &gt;
                </button>
              </div>

              <div className="ml-5 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#" className="text-slate-950 font-mono text-sm">
                        Name: {product.product.name}
                      </a>
                    </h3>
                    <p className="text-sm">
                      left{" "}
                      {
                        product?.product?.stock?.find(
                          (stock: StockModel) => stock._id === product.stockId
                        )?.quantity
                      }
                    </p>
                    <p className="ml-4">
                      ${product.product.price * product.amount}
                    </p>
                  </div>
                  <p className="mt-1 text-slate-950 font-mono text-sm">
                    Color:{" "}
                    {product.product.stock
                      .map((stock: StockModel) => stock.color.name)
                      .join(", ")}{" "}
                    &nbsp; <br /> Size:{" "}
                    {product.product.stock
                      .map((stock: StockModel) => stock.size.name)
                      .join(", ")}
                  </p>
                  <p className="">Price: {product.product.price}$</p>
                </div>
                <div className="flex flex-1 h-10 items-end justify-between text-sm">
                  <p className="text-gray-500 p-2 w-full flex justify-evenly">
                    <button
                      type="button"
                      className="border-2 border-slate-950 w-6 rounded-md"
                      onClick={() => handleDecrementAmount(productId)}
                    >
                      -
                    </button>
                    <span className="bg-white">{product.amount}</span>
                    <button
                      type="button"
                      className="border-2 border-slate-950 w-6 rounded-md"
                      onClick={() => handleIncrementAmount(productId)}
                    >
                      +
                    </button>
                  </p>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium mr-2 text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleRemove(productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
