import type { INotification } from "~/types";
import { CheckMarkIcon } from "~/assets/Icons";
import { formatDateTime } from "~/utils/formatDate";

interface StageMeta {
  title: string;
}

const STAGE_META: Record<string, StageMeta> = {
  GENERATED: { title: "Generated" },
  ASSIGNED: { title: "Assigned" },
  VIEWED: { title: "Viewed" },
  ACTION_TAKEN: { title: "Action Taken" },
};

interface NotificationLifecycleStepperProps {
  notification: INotification;
}

const NotificationLifecycleStepper = ({
  notification,
}: NotificationLifecycleStepperProps) => {
  const lifecycle = notification.notificationLifecycle ?? [];

  if (lifecycle.length === 0) return null;

  const pendingIndex = lifecycle.findIndex(
    (step) => step.TimeStamp === "pending",
  );
  const firstPendingIndex =
    pendingIndex === -1 ? lifecycle.length : pendingIndex;
  const lastCompletedIndex = firstPendingIndex - 1;

  const completedPercentage =
    lifecycle.length > 1 && lastCompletedIndex >= 0
      ? (lastCompletedIndex / (lifecycle.length - 1)) * 100
      : 0;

  const edgeInset = 100 / (lifecycle.length * 2);

  return (
    <div className="w-full rounded-[7px] bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] py-6 md:py-8 px-4 md:px-6">
      <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold mb-6 md:mb-8">
        Notification Lifecycle
      </h2>

      {/* Mobile: vertical stepper */}
      <div className="flex flex-col md:hidden">
        {lifecycle.map((step, index) => {
          const meta = STAGE_META[step.stage] ?? { title: step.stage };
          const isCompleted = index <= lastCompletedIndex;
          const isPending = step.TimeStamp === "pending";
          const isLastStep = index === lifecycle.length - 1;

          return (
            <div key={step.stage} className="flex gap-4">
              <div className="flex flex-col items-center">
                {isCompleted ? (
                  <CheckMarkIcon className="w-6 h-6 shrink-0" fill="#0EB26B" />
                ) : (
                  <div className="w-6 h-6 shrink-0 rounded-full border-2 border-[#868686]" />
                )}
                {!isLastStep && (
                  <div
                    className={`w-[2px] flex-1 min-h-[32px] ${
                      index < lastCompletedIndex
                        ? "bg-[#0EB26B]"
                        : "bg-[#868686]"
                    }`}
                  />
                )}
              </div>

              <div className="pb-6">
                <h3 className="text-[clamp(13px,3.5vw,15px)] font-semibold text-[#4E4E4E]">
                  {meta.title}
                </h3>
                <p className="text-[clamp(11px,3vw,13px)] text-[#868686] mt-1">
                  {isPending ? "Pending" : formatDateTime(step.TimeStamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/tablet: horizontal stepper */}
      <div className="hidden md:block relative">
        <div
          className="absolute top-[20px] h-[2px] bg-[#868686] z-0"
          style={{ left: `${edgeInset}%`, right: `${edgeInset}%` }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#0EB26B] transition-all duration-500 ease-in-out"
            style={{ width: `${Math.min(completedPercentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-start relative z-10">
          {lifecycle.map((step, index) => {
            const meta = STAGE_META[step.stage] ?? { title: step.stage };
            const isCompleted = index <= lastCompletedIndex;
            const isPending = step.TimeStamp === "pending";

            return (
              <div
                key={step.stage}
                className="flex flex-col items-center text-center flex-1 px-1"
              >
                <div className="mb-3">
                  {isCompleted ? (
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
                      <CheckMarkIcon
                        className="w-9 h-9 lg:w-10 lg:h-10"
                        fill="#0EB26B"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white border-2 border-[#868686]" />
                  )}
                </div>

                <h3 className="text-[clamp(12px,1.3vw,16px)] font-semibold text-[#4E4E4E]">
                  {meta.title}
                </h3>

                <p className="text-[clamp(10px,1.1vw,13px)] text-[#868686] mt-1">
                  {isPending ? "Pending" : formatDateTime(step.TimeStamp)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationLifecycleStepper;
