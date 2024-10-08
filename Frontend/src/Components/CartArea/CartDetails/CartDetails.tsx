import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Store";
import { CheckoutButton } from "./CheckoutButton";

interface CartDetailsProps {
  subtotal: number;
  setOpen: () => void;
  cart: Object;
}

export function CartDetails({
  subtotal,
  setOpen,
  cart,
}: CartDetailsProps): JSX.Element {
  const cartItemCount = Object.entries(cart).length;

  return (
    <>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{subtotal.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6"><CheckoutButton setOpen={setOpen}  cartItemCount={cartItemCount} /></div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or <br />
            <NavLink to={"/products"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={setOpen}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
