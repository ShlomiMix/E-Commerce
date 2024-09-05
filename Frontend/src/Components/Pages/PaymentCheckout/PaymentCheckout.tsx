import { FormProvider } from "react-hook-form";
import { usePaymentCheckout } from "../../hooks/PaymentCheckoutHooks/usePaymentCheckout";
import { CustomerInformation } from "../../PaymentCheckoutArea/CustomerInformation/CustomerInformation";
import { DeliveryInformation } from "../../PaymentCheckoutArea/DeliveryInformation/DeliveryInformation";
import { PaymentInformation } from "../../PaymentCheckoutArea/PaymentInformation/PaymentInformation";
import { ProductsInformation } from "../../PaymentCheckoutArea/ProductsInformation/ProductsInformation";
import { ShippingInformation } from "../../PaymentCheckoutArea/ShippingInformation/ShippingInformation";



export function PaymentCheckout(): JSX.Element {
  const { addOrder, handleSubmit, methods } = usePaymentCheckout();
  return (
    <div className="flex justify-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(addOrder)}
          className="flex flex-wrap justify-center xxs:w-2/5 xs:w-3/5 gap-x-8 m-0 mt-5"
        >
          <div className="w-full xxs:w-auto">
            <CustomerInformation />
            <ShippingInformation />
            <DeliveryInformation />
            <PaymentInformation />
          </div>
          <div>
            <ProductsInformation />
          </div>
          {/* <div className="w-full flex justify-center mt-5">
            <button
              type="submit"
              className="bg-amber-400 text-slate-50 p-2 rounded-lg transform hover:scale-90"
            >
              Confirm order
            </button>
          </div> */}
        </form>
      </FormProvider>
    </div>
  );
}
