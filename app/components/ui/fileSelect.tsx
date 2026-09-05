import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { formatFileSize } from "~/utils/formatFile";
import { CloseIcon, File2Icon, FileIcon, ImageIcon } from "~/assets/Icons";

interface FileSelectProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSizeBytes?: number;
  hasError?: boolean;
  subtext?: React.ReactNode;
  helperText?: string;
  className?: string;
}

const DEFAULT_ACCEPT = "image/*,.pdf,.txt";
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

function getFileKind(file: File): "image" | "pdf" | "txt" | "other" {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || file.name.endsWith(".pdf"))
    return "pdf";
  if (file.type === "text/plain" || file.name.endsWith(".txt")) return "txt";
  return "other";
}

export function FileSelect({
  value,
  onChange,
  accept = DEFAULT_ACCEPT,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  hasError,
  subtext,
  helperText = "Drag and drop a file, or",
  className,
}: FileSelectProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build/revoke an object URL only for image previews, and only for the
  // current `value` — this is what the original code never cleaned up.
  useEffect(() => {
    if (value && getFileKind(value) === "image") {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [value]);

  const applyFile = (file: File | null) => {
    if (!file) {
      onChange?.(null);
      return;
    }
    if (file.size > maxSizeBytes) {
      // Let the parent's zod/fieldState surface this via hasError/subtext —
      // this component doesn't own validation messaging.
      onChange?.(null);
      return;
    }
    onChange?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
    e.target.value = ""; // allow re-selecting the same file later
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    applyFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleRemove = () => {
    applyFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const kind = value ? getFileKind(value) : null;

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "w-full border-[1.5px] rounded-[7px] overflow-hidden transition-colors",
          hasError
            ? "border-[#E93F3F]"
            : value
              ? "border-[#0EB26B33]"
              : "border-[#CDCDCD]",
        )}
      >
        {value ? (
          <div className="flex items-center gap-3 py-4 px-5 bg-[#0EB26B08]">
            <div className="">
              {kind === "image" && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={value.name}
                  className="w-full h-full object-cover"
                />
              ) : kind === "pdf" ? (
                <File2Icon className="w-6 h-6" />
              ) : (
                <FileIcon className="w-6 h-6" />
              )}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-[clamp(13px,1.4vw,15px)] font-semibold text-[#4E4E4E] truncate">
                {value.name}
              </p>
              <p className="text-[clamp(11px,1.2vw,13px)] text-[#868686]">
                {formatFileSize(value.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${value.name}`}
              className=""
            >
              <CloseIcon className="w-4 h-4" fill="#0EB26B" />
            </button>
          </div>
        ) : (
          <div className="py-4 px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 ">
              <File2Icon className="w-4 h-4 md:w-6 md:h-6" />
              <h3 className="text-[clamp(12px,1.2vw,14px)] text-[#6E6E6E]">
                {helperText}
              </h3>
            </div>
            <label className="inline-block text-center w-fit border border-[#D9D9D9] text-[14px] text-[#0EB26B] p-2 rounded-[6px] cursor-pointer ">
              Upload File
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}
      </div>

      {(hasError || subtext) && (
        <small
          className={
            hasError ? "text-xs text-[#E93F3F]" : "text-sm text-[#868686]"
          }
        >
          {subtext ?? (hasError ? "An error occurred" : "")}
        </small>
      )}
    </div>
  );
}
