import { useState, useRef, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface VerificationCodeInputProps {
  onVerify: (code: string) => void;
  loading?: boolean;
  identifier: string;
  type: "email" | "phone";
  context: "register" | "forgot-password";
}

const VerificationCodeInput = ({
  onVerify,
  loading,
  identifier,
  type,
  context,
}: VerificationCodeInputProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
      setIsExpired(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;

    if (isExpired) {
      setErrorMsg(
        "This verification code has expired. Please request a new one.",
      );
      return;
    }

    setErrorMsg("");
    onVerify(fullCode);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setIsExpired(false);
    setErrorMsg("");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    // TODO: call resend API with identifier + type
    console.log("Resending code to:", identifier, "via", type);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const maskedIdentifier =
    type === "email"
      ? identifier.replace(/(.{2}).+(@.+)/, "$1***$2")
      : identifier.replace(/(\d{3})\d+(\d{3})/, "$1****$2");

  const buttonLabel =
    context === "forgot-password" ? "Verify Code" : "Verify Email";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center font-medium flex flex-col gap-4">
        <p className="text-[#474747] text-[clamp(14px,1.4vw,16px)]">
          We have sent a 6-digit verification code to your{" "}
          {type === "email" ? "email address" : "phone number"}
        </p>
        <p className="text-[#0EB26B] font-semibold text-[clamp(13px,1.3vw,15px)]">
          {maskedIdentifier}
        </p>
        <p className="text-[#575757] text-[clamp(12px,1.4vw,15px)]">
          Enter the code below to{" "}
          {context === "forgot-password"
            ? "reset your password"
            : "verify your account"}
        </p>
      </div>

      <div className="flex gap-5 items-center justify-center w-full px-5">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-14 h-12 md:w-18 md:h-16 text-black text-center text-xl md:text-3xl font-semibold rounded-[17px] border-2 transition-all",
              "focus:outline-none focus:ring-1 focus:ring-[#159D62] focus:border-[#159D62]",
              digit ? "border-[#159D62]" : "border-[#818181]",
            )}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 w-full mt-10">
        {errorMsg && (
          <p className="text-xs text-red-500 text-center">{errorMsg}</p>
        )}

        <Button
          variant="default"
          size="lg"
          className="w-[90%] md:w-[75%]"
          onClick={handleVerify}
          disabled={code.join("").length !== 6 || loading}
          loading={loading}
        >
          {buttonLabel}
        </Button>

        <div className="flex items-center gap-2 font-medium mt-8">
          <p className="text-[#818181]">Didn't receive code?</p>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit h-fit p-0 hover:bg-transparent hover:text-[#0EB26B]/80 text-[#0EB26B] disabled:opacity-50"
            onClick={handleResend}
            disabled={!canResend}
          >
            Resend{" "}
            <span className="text-[#818181] ml-1">
              {!canResend && `(${formatTime(timer)})`}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
