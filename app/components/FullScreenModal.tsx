import { type ReactNode } from "react";

const FullScreenModal = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) => {
  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#EDEDED",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            color: "#3C3C3C",
            zIndex: 1000,
            overflow: "auto",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
export default FullScreenModal;
