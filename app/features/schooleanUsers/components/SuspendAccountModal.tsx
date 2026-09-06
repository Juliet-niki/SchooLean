import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import StatusView from "~/components/StatusView";
import type { ISchooleanUser, ISchoolSummary } from "~/data/schooleanUsersData";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { ErrorIcon } from "~/assets/Icons";
import { Spinner } from "~/components/ui/spinner";

// --------------------------------------------------
// Form Schema
// --------------------------------------------------

const suspendSchema = z
  .object({
    reason: z.string().min(1, {
      message: "Please select a reason",
    }),
    otherReason: z.string().optional(),
  })
  .refine(
    (data) =>
      data.reason !== "other" ||
      (data.otherReason && data.otherReason.trim().length >= 5),
    {
      message: "Please enter at least 5 characters",
      path: ["otherReason"],
    },
  );

type SuspendFormData = z.infer<typeof suspendSchema>;

// --------------------------------------------------
// Reason Options
// --------------------------------------------------

const reasonOptions = [
  {
    value: "security-concern",
    label: "Security concern",
  },
  {
    value: "account-misuse",
    label: "Account misuse",
  },
  {
    value: "customer-request",
    label: "Customer request",
  },
  {
    value: "administrative-action",
    label: "Administrative action",
  },
  {
    value: "other",
    label: "Other",
  },
];

// --------------------------------------------------
// Props
// --------------------------------------------------

interface SuspendAccountDialogProps {
  user: ISchooleanUser;
  school: ISchoolSummary;
  onSuspend: (reason: string) => void;
  onCancel: () => void;
}

// --------------------------------------------------
// Component
// --------------------------------------------------

const SuspendAccountDialog = ({
  user,
  school,
  onSuspend,
  onCancel,
}: SuspendAccountDialogProps) => {
  const form = useForm<SuspendFormData>({
    resolver: zodResolver(suspendSchema),
    defaultValues: {
      reason: "",
      otherReason: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, watch, handleSubmit, reset, formState } = form;

  const selectedReason = watch("reason");

  const onSubmit = async (data: SuspendFormData) => {
    const reason =
      data.reason === "other" ? data.otherReason?.trim() || "" : data.reason;

    onSuspend(reason);

    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:gap-9 text-[#4E4E4E]"
      >
        {/* User Information */}
        <div className="bg-[#EBEBEB] flex items-start gap-6 md:gap-8 p-5 md:p-8 rounded-[10px]">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D9D9D9] shrink-0" />
          )}

          <div className="flex flex-col gap-4">
            {[
              {
                title: "User",
                value: `${user.firstName} ${user.lastName}`,
              },
              {
                title: "Email",
                value: user.email,
              },
              {
                title: "Phone",
                value: user.phoneNumber,
              },
              {
                title: "Current Status",
                value: school.status,
              },
            ].map(({ title, value }) => (
              <div
                key={title}
                className="grid grid-cols-2 text-[clamp(15px,1.5vw,17px)] font-semibold"
              >
                <h3 className="leading-tight text-[#868686]">{title}</h3>

                {title === "Current Status" ? (
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      school.status === "ACTIVE"
                        ? "Active"
                        : school.status === "INACTIVE"
                          ? "Inactive"
                          : school.status === "SUSPENDED"
                            ? "Suspended"
                            : school.status === "PENDING_ACTIVATION"
                              ? "Pending"
                              : "Deactivated"
                    }
                    green="Active"
                    purple="Inactive"
                    blue="School Admin"
                    yellow="Pending"
                    grey="Deactivated"
                    red="Suspended"
                  />
                ) : (
                  <p>{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reason */}
        <FormField
          control={control}
          name="reason"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-4">
              <div className="text-[clamp(15px,1.5vw,17px)] font-semibold">
                <h3>Reason</h3>

                <p className="text-[#868686] font-normal">
                  Select or enter a reason for suspending this account.
                </p>
              </div>

              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="gap-5"
              >
                {reasonOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />

                    <Label
                      htmlFor={option.value}
                      className="text-[14px] cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {fieldState.error && (
                <span className="flex items-center gap-1 text-[#E93F3F] text-xs">
                  <ErrorIcon className="w-4 h-4" />
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Other Reason */}
        {selectedReason === "other" && (
          <FormField
            control={control}
            name="otherReason"
            render={({ field, fieldState }) => (
              <div className="flex flex-col -mt-4 ml-6">
                <Textarea
                  {...field}
                  placeholder="Enter your reason here..."
                  hasCharacterCount
                  maxLength={1000}
                  hasError={fieldState.invalid}
                  disabled={formState.isSubmitting}
                  textareaClassName="min-h-[150px]"
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
        )}

        {/* Actions */}
        <div className="flex items-center ml-auto gap-6 md:gap-8 mt-5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-[#C2C2C2] border text-[#4E4E4E] h-10 px-8 rounded-[5px]"
            onClick={handleCancel}
            disabled={formState.isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="sm"
            variant="destructive"
            className="h-10 px-6 text-[#4E4E4E] border border-[#CACACA] rounded-[5px] text-white"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? (
              <Spinner className="h-5 w-5" />
            ) : (
              "Suspend Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SuspendAccountDialog;
