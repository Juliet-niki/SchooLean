import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthPageWrapper from "../components/AuthPageWrapper";
import VerificationCodeInput from "../components/VerificationCodeInput";
import type { VerifyPageState } from "~/types";
import { DrawerDialog } from "~/components/DrawerDialog";
import PopUtility from "~/components/PopUtility";
import { toast } from "sonner";
import { useVerifyMutation, identifierExists } from "~/queries/auth/mutations";

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as VerifyPageState | null;
  const verifyMutation = useVerifyMutation();

  useEffect(() => {
    if (!state?.identifier) {
      navigate("/login", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.identifier) return null;

  const handleVerify = async (code: string) => {
    setLoading(true);

    try {
      if (state.context === "forgot-password") {
        if (!identifierExists(state.identifier)) {
          toast.error("Verification failed.", { id: "verification-error" });
          return;
        }

        navigate("/reset-password", {
          state: { identifier: state.identifier },
        });
        return;
      }

      const result = await verifyMutation.mutateAsync({
        identifier: state.identifier,
        code,
      });

      if (!result.success) {
        toast.error(result.error ?? "Verification failed. Please try again.", {
          id: "verification-error",
        });
        return;
      }

      setSubmitStatus("success");
    } catch (error) {
      toast.error("Invalid or expired code. Please try again.", {
        id: "verification-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAfterSuccess = () => {
    navigate("/login", {
      state: { message: "Account created successfully. Please log in." },
    });
  };

  return (
    <>
      <AuthPageWrapper
        content={
          <VerificationCodeInput
            onVerify={handleVerify}
            loading={loading}
            identifier={state.identifier}
            type={state.type}
            context={state.context}
          />
        }
      />

      {/* Success Modal */}
      <DrawerDialog
        open={submitStatus === "success"}
        close={() => setSubmitStatus("idle")}
        size="sm"
        title="Registration Successful"
        titleCSS="sr-only text-xs"
        contentCSS="h-fit py-10 px-10"
        headerClassName="border-none py-0"
        closeIcon={null}
      >
        <PopUtility
          title={"Account Created Successfully"}
          subTitle={
            "Your account has been created successfully. You can now log in."
          }
          handleBtnAtn={handleContinueAfterSuccess}
          btnText="Continue"
        />
      </DrawerDialog>
    </>
  );
};

export default Verification;
