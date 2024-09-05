import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementAmount,
  deleteFromCart,
  incrementAmount,
  initAllProducts,
} from "../../../Redux/CartSlice";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";

export const useCart = () => {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>(
    {}
  );

  const cart = useAppSelector((state) => state?.cart?.products);

  const dispatch: AppDispatch = useDispatch();

  const handleRemove = (productId: string) => {
    dispatch(deleteFromCart(productId));
    localStorage.removeItem(productId);
  };

  const handleDecrementAmount = (productId: string) => {
    dispatch(decrementAmount(productId));
  };

  const handleIncrementAmount = (productId: string) => {
    dispatch(incrementAmount(productId));
  };

  const subtotal = Object.values(cart).reduce((acc, product) => {
    const totalPriceForProduct = product.product.price * product.amount;
    return acc + totalPriceForProduct;
  }, 0);

  const handleNextImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const saveToLocalStorage = useCallback(() => {
    console.log("Attempting to save to localStorage:", cart);
    try {
      const filteredProducts = Object.entries(cart).reduce(
        (acc, [key, value]) => {
          if (value.amount > 0) {
            acc[key] = value;
          } else {
            handleRemove(key);
          }
          return acc;
        },
        {} as typeof cart
      );

      localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
      console.log("Successfully saved to localStorage:", filteredProducts);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [cart, handleRemove]);

  useEffect(() => {
    console.log("Component mounted, loading from localStorage");
    try {
      const storedCartProducts = localStorage.getItem("cartProducts");
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
    console.log("Cart products changed:", cart);
    saveToLocalStorage();
  }, [cart, saveToLocalStorage]);

  // Debug: Log current localStorage content
  useEffect(() => {
    const currentStorage = localStorage.getItem("cartProducts");
    console.log("Current localStorage content:", currentStorage);
  }, []);

  return {
    activeIndices,
    cart,
    handleIncrementAmount,
    handleDecrementAmount,
    handleRemove,
    subtotal,
    handleNextImage,
    handlePrevImage,
  };
};
