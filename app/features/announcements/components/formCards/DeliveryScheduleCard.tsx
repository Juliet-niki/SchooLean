import type { Control, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { ErrorIcon } from "~/assets/Icons";
import { FormField, FormLabel } from "~/components/ui/form";
import { DatePickerForm } from "~/components/ui/datePickerForm";
import { cn } from "~/lib/utils";
import type { TypeFormSchema } from "../CreateAnnouncement";

interface DeliveryScheduleCardProps {
  control: Control<TypeFormSchema>;
  setValue: UseFormSetValue<TypeFormSchema>;
}

export function DeliveryScheduleCard({
  control,
  setValue,
}: DeliveryScheduleCardProps) {
  const deliverySchedule = useWatch({ control, name: "deliverySchedule" });

  return (
    <div className="flex flex-col px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 bg-white rounded-[7px] border border-[#D9D9D9] shadow-sm shadow-[#00000026] gap-5">
      <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)] font-medium">
        Delivery Schedule
      </FormLabel>

      <FormField
        control={control}
        name="deliverySchedule"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-4">
            {[
              { value: "immediate", label: "Send Immediately" },
              { value: "scheduled", label: "Schedule for Later" },
            ].map((option) => {
              const isSelected = field.value === option.value;
              return (
                <div
                  key={option.value}
                  onClick={() => {
                    field.onChange(option.value);
                    if (option.value === "immediate") {
                      setValue("scheduledDate", undefined);
                      setValue("scheduledTime", undefined);
                    }
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      isSelected ? "border-[#0EB26B]" : "border-[#868686]",
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#0EB26B]" />
                    )}
                  </div>
                  <p className="text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]">
                    {option.label}
                  </p>
                </div>
              );
            })}
            {fieldState.error && (
              <span className="flex items-center gap-1 text-[#E93F3F] text-xs">
                <ErrorIcon className="w-4 h-4" />
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      {deliverySchedule === "scheduled" && (
        <div className="flex flex-col items-start gap-4">
          <FormField
            control={control}
            name="scheduledDate"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1 flex-1">
                <DatePickerForm
                  value={field.value}
                  onChange={field.onChange}
                  hasError={fieldState.invalid}
                  subtext={
                    fieldState.error ? (
                      <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                        <ErrorIcon className="w-4 h-4" />
                        {fieldState.error.message}
                      </span>
                    ) : null
                  }
                />
              </div>
            )}
          />

          <FormField
            control={control}
            name="scheduledTime"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1 flex-1">
                <div
                  className={cn(
                    "flex items-center justify-between h-10 px-3 border rounded-sm bg-white",
                    fieldState.invalid
                      ? "border-[#E93F3F]"
                      : "border-[#CDCDCD]",
                  )}
                >
                  <input
                    type="time"
                    value={
                      field.value ? field.value.toTimeString().slice(0, 5) : ""
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const date = new Date(field.value ?? new Date());
                      date.setHours(Number(hours), Number(minutes));
                      field.onChange(date);
                    }}
                    className="w-full outline-none text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] bg-transparent"
                  />
                </div>
                {fieldState.error && (
                  <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                    <ErrorIcon className="w-4 h-4" />
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
