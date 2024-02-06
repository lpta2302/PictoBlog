import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";

import { useSignInAccount } from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";

import { signInValidate } from "../../lib/validate/yupValidateForm";
import { signInAccount } from "../../lib/appwrite/api";

import { webName } from "../../../public/assets/images";

import {
  Button,
  Label,
  InputField,
  Loader,
} from "..";

export default function SignInForm() {
  const navigate = useNavigate();

  const { toast } = useToastContext();

  const { checkAuthUser } = useUserContext();

  const { isPending: isSigningIn } =
    useSignInAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signInValidate),
  });

  const onSubmit = async (data) => {
    const session = await signInAccount(data);

    if (!session) {
      toast({
        title: "Email or password is incorrect.",
      });
      return;
    }

    const isLogedin = checkAuthUser();

    if (!isLogedin) {
      toast({
        title: "Login Failed.",
      });
    } else {
      navigate("/");
      reset();
    }
  };

  return (
    <div className="flex-1 padding">
      <h1 className="sm:text-3xl text-2xl font-system font-semibold mb-2">
        Sign In
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
          <Label
            forHTML={"email"}
            label={"Email"}
          >
            <InputField
              register={register}
              errors={errors}
              id="email"
              name="email"
              type="email"
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
              type="password"
              placeholder="Password"
              rounded="rounded-xl"
              onKeyDown={handleSubmit(onSubmit)}
            />
          </Label>
        </div>
        <div className="flex flex-col my-4 gap-2">
          <Link to="#">
            <div className="text-subtitle">
              Forgotten password?
            </div>
          </Link>
          <Link to="/sign-up">
            <div className="text-primary font-semibold">
              Create for new account
            </div>
          </Link>
        </div>
        <Button>
          {isSigningIn ? (
            <div className="flex-center w-4 h-4">
              <Loader Color={''} />
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}
