import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { CancelIcon, CheckIcon, ErrorIcon } from "~/assets/icons";
import PopUtility from "~/components/PopUtility";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Spinner } from "~/components/ui/spinner";
import { DrawerDialog } from "~/components/DrawerDialog";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Enter your password" })
      .refine(
        (val) =>
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[?!@&*%:.,#$^()\-_+=]).{6,}$/.test(val),
        {
          message: "Password does not meet requirements",
        },
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const navigate = useNavigate();

  const passwordRequirements = [
    {
      label: "Minimum of 6 characters",
      test: (val: string) => val.length >= 6,
    },
    {
      label: "At least one letter (A-Z or a-z)",
      test: (val: string) => /[a-zA-Z]/.test(val),
    },
    {
      label: "At least one number (0-9)",
      test: (val: string) => /\d/.test(val),
    },
    {
      label: "At least one special character (?!@&*%:.,)",
      test: (val: string) => /[?!@&*%:.,#$^()\-_+=]/.test(val),
    },
  ];

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const passwordValue = watch("password");

  const onSubmit = async (data: TResetPasswordSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(data);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleContinueAfterSuccess = () => {
    navigate("/login", {
      state: { message: "Password reset successfully. Please log in." },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-12 px-1 text-[clamp(14px,1.4vw,16px)] font-medium w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center space-y-2">
            <h2 className="font-semibold text-[#292929] text-[clamp(16px,1.8vw,20px)]">
              Forgot Password
            </h2>
            <p className="text-[#949494]">
              Please kindly enter a new password to continue
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-8">
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
                      placeholder="Enter password (at least 6 characters)"
                      type="password"
                    />
                  </div>
                )}
              />
              <div className="text-[clamp(13px,1.3vw,15px)] text-center flex flex-col gap-2 items-center">
                <p className="text-[#636363]">
                  Your password must meet the following security requirements
                </p>
                <div className="space-y-2">
                  {passwordRequirements.map((requirement, index) => {
                    const isPassed = requirement.test(passwordValue);
                    return (
                      <p
                        key={index}
                        className="flex items-center gap-1 text-[#292929]"
                      >
                        {isPassed ? (
                          <CheckIcon className="w-4 h-4" />
                        ) : (
                          <CancelIcon className="w-4 h-4" />
                        )}
                        {requirement.label}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
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
          </div>
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={!isValid || isSubmitting}
            className="w-full bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? <Spinner /> : "Continue"}
          </Button>
        </form>
      </Form>

      <DrawerDialog
        open={submitStatus === "success"}
        close={() => setSubmitStatus("idle")}
        size="sm"
        title="Create New Password"
        titleCSS="sr-only text-xs"
        contentCSS="h-fit py-10 px-10"
        headerClassName="border-none py-0"
        closeIcon={null}
      >
        <PopUtility
          title={"New Password Created Successfully"}
          subTitle={
            "Your new password has been created successfully. You can now log in with your new password."
          }
          handleBtnAtn={handleContinueAfterSuccess}
          btnText="Continue"
        />
      </DrawerDialog>
    </>
  );
};

export default ResetPasswordForm;
