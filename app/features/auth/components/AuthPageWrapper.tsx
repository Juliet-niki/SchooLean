import { cn } from "~/lib/utils";

interface AuthPageWrapperProps {
  content: React.ReactNode;
  className?: string;
}
const AuthPageWrapper = ({ content, className }: AuthPageWrapperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center my-20 gap-12 w-full",
        className,
      )}
    >
      <img src="/images/schooleanLogo.png" alt="Logo" className="w-62.5" />
      <div className="w-1/2">{content}</div>
    </div>
  );
};

export default AuthPageWrapper;
