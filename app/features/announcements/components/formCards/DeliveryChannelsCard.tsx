import type { Control } from "react-hook-form";
import { CheckIcon, ErrorIcon } from "~/assets/Icons";
import { FormField, FormLabel } from "~/components/ui/form";
import type { TypeFormSchema } from "../CreateAnnouncement";

const DELIVERY_CHANNEL_OPTIONS = [
  { value: "in-app", label: "In-App Notification" },
  { value: "email", label: "Email" },
];

interface DeliveryChannelsCardProps {
  control: Control<TypeFormSchema>;
}

export function DeliveryChannelsCard({ control }: DeliveryChannelsCardProps) {
  return (
    <FormField
      control={control}
      name="deliveryChannel"
      render={({ field, fieldState }) => {
        const toggle = (value: string) => {
          const current = field.value ?? [];
          field.onChange(
            current.includes(value)
              ? current.filter((v: string) => v !== value)
              : [...current, value],
          );
        };

        return (
          <div className="flex flex-col px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 bg-white rounded-[7px] border border-[#D9D9D9] shadow-sm shadow-[#00000026] gap-5">
            <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)] font-medium">
              Delivery Channels
            </FormLabel>

            <div className="flex flex-col gap-4">
              {DELIVERY_CHANNEL_OPTIONS.map((option) => {
                const isChecked = (field.value ?? []).includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => toggle(option.value)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 border-[#4E4E4E]" />
                    )}
                    <p className="text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]">
                      {option.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[#868686] text-[clamp(12px,1.2vw,14px)] mt-2">
              Select one or both delivery channels.
            </p>

            {fieldState.error && (
              <span className="flex items-center gap-1 text-[#E93F3F] text-xs">
                <ErrorIcon className="w-4 h-4" />
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
