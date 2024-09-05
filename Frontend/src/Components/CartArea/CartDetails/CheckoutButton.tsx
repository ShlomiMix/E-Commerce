import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Store";

interface CheckoutButtonProps {
  setOpen: () => void;
  cartItemCount: number; // Changed from Object to number
}

export function CheckoutButton({
  setOpen,
  cartItemCount,
}: CheckoutButtonProps): JSX.Element {
  const userId = useAppSelector((state) => state?.auth?._id);

  if (!userId) {
    return (
      <NavLink to="/login">
        <button
          onClick={setOpen}
          className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Login to Checkout
        </button>
      </NavLink>
    );
  }

  if (cartItemCount === 0) {
    return (
      <button
        disabled
        className="flex items-center w-full justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm"
      >
        Choose a one product minimum to Checkout
      </button>
    );
  }

  return (
    <NavLink to="/payment-checkout">
      <button
        onClick={setOpen}
        className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Checkout
      </button>
    </NavLink>
  );
}
