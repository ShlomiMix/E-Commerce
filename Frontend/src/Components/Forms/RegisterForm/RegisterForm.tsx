

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../Models/UserModel";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";

interface RegisterFormProps {
  onSubmit: (details: UserModel) => void;
  passwordShown: boolean;
  togglePasswordVisibility: () => void;
}

export function RegisterForm({
  onSubmit,
  passwordShown,
  togglePasswordVisibility,
}: RegisterFormProps): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  return (
    <div className="flex justify-center">
      <section className="grid text-center w-2/4 pb-2 h-full items-center bg-gray-300 rounded-xl m-3">
        <div>
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            Sign In
          </Typography>
          <Typography
            placeholder={""}
            className="mb-16 text-gray-600 font-normal text-[18px]"
          >
            Enter your email and password to sign in
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            className="mx-auto max-w-[24rem] text-left"
          >
            <div className="mb-6">
              <StringInput
                label="First name"
                minLength={2}
                maxLength={50}
                name="firstName"
                register={register}
                registerName="firstName"
                type="string"
              />
            </div>
            <div className="mb-6">
              <StringInput
                label="Last name"
                minLength={2}
                maxLength={50}
                name="lastName"
                register={register}
                registerName="lastName"
                type="string"
              />
            </div>
            <div className="mb-6">
              <StringInput
                label="Email"
                minLength={7}
                maxLength={50}
                name="email"
                register={register}
                registerName="email"
                type="email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  placeholder={""}
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                {...register("password")}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisibility}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
            </div>
            <Button
              placeholder={""}
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
              type="submit"
            >
              sign in
            </Button>
            <div className="!mt-4 flex justify-end">
              <Typography
                placeholder={""}
                as="a"
                href="#"
                color="blue-gray"
                variant="small"
                className="font-bold"
              >
                Forgot password?
              </Typography>
            </div>
            <Typography
              placeholder={""}
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal text-base text-black"
            >
              Already have an account?{" "}
              <a href="/login" className=" font-bold text-base text-gray-900">
                Sign in
              </a>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}
