import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { ErrorIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";

const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Enter your password" })
    .refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
      message: "Min. 6 characters, 1 uppercase, 1 number",
    }),
});

type TypeLoginFormSchema = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<TypeLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (data: TypeLoginFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(data);

    form.reset();
    navigate("/");
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 px-1 text-[clamp(14px,1.4vw,16px)] font-medium w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Email</FormLabel>
                    <Input
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error ? (
                          <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs font-normal">
                            <ErrorIcon className="w-4 h-4" />
                            {fieldState.error.message}
                          </span>
                        ) : null
                      }
                      {...field}
                      placeholder="schoolean@info.com"
                      type="email"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Password</FormLabel>
                    <Input
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error ? (
                          <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs font-normal">
                            <ErrorIcon className="w-4 h-4" />
                            {fieldState.error.message}
                          </span>
                        ) : null
                      }
                      {...field}
                      placeholder="Enter A password"
                      type="password"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-10 w-full">
              <Link
                to="/forgot-password"
                className="text-[#159D62] hover:text-[#159D62]/90 ml-auto"
              >
                Forgot Password?
              </Link>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <p>Login</p>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="text-center">
                <span className="text-[#818181]">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-[#159D62] hover:text-[#159D62]/90"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default LoginForm;
