import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { ErrorIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import type { VerifyPageState } from "~/types";

const RegisterFormSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    middleName: z.string().nonempty({ message: "Middle name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    phoneNumber: z.string().refine(
      (value) => {
        const local = /^0\d{10}$/;
        const intl = /^\+[1-9]\d{7,14}$/;
        return local.test(value) || intl.test(value);
      },
      { message: "Enter a valid phone number" },
    ),
    email: z.string().trim().email({ message: "Enter a valid email" }),
    confirmEmail: z.string().trim().email({ message: "Please confirm email" }),
    password: z
      .string()
      .nonempty({ message: "Enter your password" })
      .refine(
        (val) =>
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[?!@&*%:.,#$^()\-_+=]).{6,}$/.test(val),
        {
          message:
            "Min. 6 characters, 1 letter, 1 number and 1 special character",
        },
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm password" }),
    accessCode: z.string().regex(/^\d{6}$/, {
      message: "Code must be exactly 6 digits",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Emails must match",
  });

type TypeRegisterFormSchema = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<TypeRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      accessCode: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (data: TypeRegisterFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(data);

    form.reset();

    navigate("/verification", {
      state: {
        identifier: data.email,
        type: "email",
        context: "register",
      } satisfies VerifyPageState,
    });
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
                name="firstName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>First Name</FormLabel>
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
                      placeholder="Enter your first name"
                      type="text"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Middle Name</FormLabel>
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
                      placeholder="Enter your middle name"
                      type="text"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Last Name</FormLabel>
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
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Phone Number</FormLabel>
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
                      placeholder="Enter your phone number"
                      type="text"
                      maxLength={11}
                    />
                  </div>
                )}
              />
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
                name="confirmEmail"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Confirm Email</FormLabel>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Confirm Password</FormLabel>
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
                      placeholder="Re-enter password"
                      type="password"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="accessCode"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Access Code</FormLabel>
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
                      placeholder="Enter your access code"
                      type="text"
                      maxLength={6}
                      onKeyDown={(e) => {
                        if (
                          !/[\d]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-10 w-full">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] hover:bg-linear-to-t hover:from-[#0EB26B]/90 hover:via-[#12A86A]/90 hover:to-[#2f9e8f]/90"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <p>Register</p>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
              <div className="text-center">
                <span className="text-[#818181]">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-[#159D62] hover:text-[#159D62]/90"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default RegisterForm;
