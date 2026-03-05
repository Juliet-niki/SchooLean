interface IProps {
  color?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

const DEFAULT_SIZE = "100%";

export const HamburgerIcon = ({ className, height, width }: IProps) => (
  <svg
    className={className}
    width={width ?? DEFAULT_SIZE}
    height={height ?? DEFAULT_SIZE}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.666 5.83301L3.33268 5.83301"
      stroke="#306BEA"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      opacity="0.5"
      d="M16.666 10L3.33268 10"
      stroke="#306BEA"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.666 14.167L3.33268 14.167"
      stroke="#306BEA"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
