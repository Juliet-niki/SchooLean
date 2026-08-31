import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { ErrorIcon } from "~/assets/Icons";
import PopUtility from "~/components/PopUtility";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Spinner } from "~/components/ui/spinner";
import { DrawerDialog } from "~/components/DrawerDialog";
import type { VerifyPageState } from "~/types";
import { useAuth } from "~/context/AuthContext";

const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .refine(
      (value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isLocalPhone = /^0\d{10}$/.test(value);
        const isIntlPhone = /^\+[1-9]\d{7,14}$/.test(value);
        return isEmail || isLocalPhone || isIntlPhone;
      },
      { message: "Enter a valid email or phone number" },
    ),
});

type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const getIdentifierType = (value: string): "email" | "phone" => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "email" : "phone";
};

const ForgotPasswordForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const identifierType = getIdentifierType(watch("identifier"));

  const onSubmit = async (data: TForgotPasswordSchema) => {
    const result = await requestPasswordReset(data.identifier);

    if (!result.success) {
      form.setError("identifier", {
        message: result.error ?? "Something went wrong",
      });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800)); // keep the existing perceived delay
    setSubmitStatus("success");
  };

  const handleContinueAfterSuccess = () => {
    navigate("/verification", {
      state: {
        identifier: form.getValues("identifier"),
        type: identifierType,
        context: "forgot-password",
      } satisfies VerifyPageState,
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
              Enter your registered phone number or email
            </p>
          </div>

          <FormField
            control={form.control}
            name="identifier"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <FormLabel>Phone number or email</FormLabel>
                <Input
                  hasError={fieldState.invalid}
                  placeholder="Enter your phone number or email"
                  subtext={
                    fieldState.error ? (
                      <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs font-normal">
                        <ErrorIcon className="w-4 h-4" />
                        {fieldState.error.message}
                      </span>
                    ) : null
                  }
                  {...field}
                />
              </div>
            )}
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? <Spinner /> : "Continue"}
          </Button>
        </form>
      </Form>

      <DrawerDialog
        open={submitStatus === "success"}
        close={() => setSubmitStatus("idle")}
        size="sm"
        title="Verification Code Sent"
        titleCSS="sr-only text-xs"
        contentCSS="h-fit py-10 px-10"
        headerClassName="border-none py-0"
        closeIcon={null}
      >
        <PopUtility
          title={identifierType === "email" ? "Email Sent" : "SMS Sent"}
          subTitle={
            identifierType === "email"
              ? "A link has been sent to the email you entered"
              : "A code has been sent to the phone number you entered"
          }
          handleBtnAtn={handleContinueAfterSuccess}
          btnText="Continue"
        />
      </DrawerDialog>
    </>
  );
};

export default ForgotPasswordForm;
