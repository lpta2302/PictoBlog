import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { signUpValidate } from "../../lib/validate/yupValidateForm";

import { useUserContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import {
  useCreateUser,
  useSignInAccount,
} from "../../lib/react-query/queries";

import { webName } from "../../../public/assets/images";
import { Button, Label, InputField } from "..";
import { Loader } from "../";

export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpValidate),
  });

  const { checkAuthUser } = useUserContext();
  const { toast } = useToastContext();

  const {
    mutateAsync: createUserAccount,
    isPending: isCreatingAccount,
  } = useCreateUser();

  const { mutateAsync: signInAccount } =
    useSignInAccount();

  async function onSubmit(data) {
    const newUser = await createUserAccount(data);

    if (!newUser) {
      return toast({
        title: "Signup failed. Please try again.",
      });
    }

    const session = await signInAccount(data);

    if (!session) {
      return toast({
        title: "Login failed. Please try again.",
      });
    }

    const isLogedin = await checkAuthUser();

    if (isLogedin) {
      reset();
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col flex-1 padding gap-2">
      <h1 className="sm:text-3xl text-2xl font-system font-semibold mb-2">
        Sign Up
      </h1>
      <div className="flex-center">
        <img
          src={webName}
          alt="logo"
          height={40}
          width={200}
        />
      </div>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <Label forHTML={"name"} label={"Name"}>
            <InputField
              register={register}
              errors={errors}
              id="name"
              name="name"
              placeholder="Name"
              rounded="rounded-xl"
            />
          </Label>
        </div>
        <div className="mb-2">
          <Label
            forHTML={"username"}
            label={"Username"}
          >
            <InputField
              register={register}
              errors={errors}
              id="username"
              name="username"
              placeholder="Username"
              rounded="rounded-xl"
            />
          </Label>
        </div>
        <div className="mb-2">
          <Label
            forHTML={"email"}
            label={"Email"}
          >
            <InputField
              register={register}
              errors={errors}
              id="email"
              name="email"
              placeholder="Email"
              rounded="rounded-xl"
            />
          </Label>
        </div>
        <div className="mb-2">
          <Label
            forHTML={"password"}
            label={"Password"}
          >
            <InputField
              register={register}
              errors={errors}
              id="password"
              name="password"
              placeholder="Password"
              rounded="rounded-xl"
              note="More than 8 characters"
              type="password"
            />
          </Label>
        </div>
        <Link to="/sign-in">
          <div className="text-primary font-semibold font-system mb-4">
            Have you gotten an account?
          </div>
        </Link>
        <Button>
          {isCreatingAccount ? (
            <div className="flex-center w-4 h-4">
              <Loader Color={""} />
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );
}
