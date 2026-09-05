import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Calendar2Icon } from "~/assets/Icons";
import { Button } from "~/components/ui/button";
import type { TypeFormSchema } from "../CreateAnnouncement";

interface FormActionButtonsProps {
  control: Control<TypeFormSchema>;
  onSaveDraft: () => void;
  onSendTest: () => void;
  onSchedule: () => void;
  isSubmitting?: boolean;
}

export function FormActionButtons({
  control,
  onSaveDraft,
  onSendTest,
  onSchedule,
  isSubmitting,
}: FormActionButtonsProps) {
  const deliverySchedule = useWatch({ control, name: "deliverySchedule" });
  const scheduledDate = useWatch({ control, name: "scheduledDate" });
  const scheduledTime = useWatch({ control, name: "scheduledTime" });

  const isScheduledMode = deliverySchedule === "scheduled";
  const canSchedule = isScheduledMode && !!scheduledDate && !!scheduledTime;

  return (
    <div className="flex flex-wrap items-center gap-5 w-full">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={isScheduledMode}
        className="text-[#4E4E4E] bg-white border border-[#D9D9D9] hover:bg-white/80 h-12 px-8 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onSaveDraft}
      >
        Save Draft
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={isScheduledMode}
        className="text-[#0EB26B] bg-white border border-[#D9D9D9] hover:bg-white/80 h-12 px-8 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onSendTest}
      >
        Send Test
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={!canSchedule}
        className="text-[#0EB26B] bg-white border border-[#D9D9D9] hover:bg-white/80 h-12 px-8 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onSchedule}
      >
        <Calendar2Icon className="w-5 h-5 shrink-0" fill="#0EB26B" />
        <span className="whitespace-nowrap">Schedule Announcement</span>
      </Button>

      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={isSubmitting || isScheduledMode}
        className="bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white h-12 px-8 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Send Announcement
      </Button>
    </div>
  );
}
