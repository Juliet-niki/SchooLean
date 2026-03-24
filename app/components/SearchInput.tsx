import { useState, type ChangeEvent } from "react";
import { SearchIcon } from "~/assets/icons";
import debounce from "~/utils/debounce";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";

export default function SearchInput({
  className,
  setSearchText,
  placeholder = "Search",
  leftIcon = <SearchIcon className="h-6 w-6" />,
  rightIcon,
}: {
  className?: string;
  setSearchText: (val: string) => void;
  placeholder?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  const [rawInput, setRawInput] = useState<string>("");

  const handleDebouncedInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value);
    handleDebouncedInput(e);
  };

  return (
    <div className="w-full">
      <Input
        value={rawInput}
        onChange={handleChange}
        className={cn(
          "h-12 w-75 border border-[#c4c4c433] has-focus:ring-0 bg-[#FFF]",
          className,
        )}
        leftIcon={leftIcon}
        placeholder={placeholder}
        rightIcon={rightIcon}
      />
    </div>
  );
}
