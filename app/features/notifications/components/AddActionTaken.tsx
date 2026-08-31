import { useState } from "react";
import {
  LockIcon,
  OnboardingIcon,
  InfoIcon,
  Calendar2Icon,
  ClockIcon,
  Person3Icon,
} from "~/assets/Icons";
import { Button } from "~/components/ui/button";

interface CurrentUser {
  userName: string;
  role: string;
}

interface ActionTakenProps {
  handleCancel: () => void;
  handleSaveAction: (comment: string) => void;
  notificationId: string;
  notificationTitle: string;
  relatedSchool?: string;
  affectedSystem?: string;
  currentUser: CurrentUser;
}

const MAX_COMMENT_LENGTH = 2000;

const AddActionTaken = ({
  handleCancel,
  handleSaveAction,
  notificationId,
  notificationTitle,
  relatedSchool,
  affectedSystem,
  currentUser,
}: ActionTakenProps) => {
  const [comment, setComment] = useState("");

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const trimmedLength = comment.trim().length;
  const canSave = trimmedLength > 0 && comment.length <= MAX_COMMENT_LENGTH;

  const handleSave = () => {
    if (!canSave) return;
    handleSaveAction(comment.trim());
  };

  return (
    <div className="text-[#4E4E4E] flex flex-col items-center gap-6 md:gap-8 mt-3 md:mt-5">
      {/* Notification summary */}
      <div className="w-full bg-[#EBEBEB] rounded-[10px] px-3 md:px-5 py-5 md:py-7 flex items-center gap-4 md:gap-8">
        <div className="bg-[#0EB26B14] w-12 h-12 md:w-16 md:h-16 rounded-[7px] flex items-center justify-center shrink-0">
          <OnboardingIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          <h3 className="text-[clamp(14px,1.6vw,18px)] font-semibold">
            Notification: {notificationTitle}
          </h3>
          <p className="text-[#868686] text-[clamp(12px,1.4vw,15px)]">
            ID: {notificationId}{" "}
            {(relatedSchool ?? affectedSystem) && (
              <>&nbsp;&nbsp;{relatedSchool ?? affectedSystem}</>
            )}
          </p>
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[clamp(15px,1.7vw,18px)] font-semibold">Comment</h3>
        <p className="text-[#868686] text-[clamp(12px,1.4vw,15px)]">
          Describe the action you have taken. This will help other
          administration understand and avoid duplicated work.
        </p>

        <div className="relative mt-4">
          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))
            }
            placeholder="Enter your comment here..."
            rows={5}
            className="w-full resize-none border border-[#D9D9D9] rounded-[7px] p-4 text-[clamp(13px,1.4vw,15px)] text-[#4E4E4E] placeholder:text-[#868686] focus:outline-none focus:border-[#0EB26B]"
          />
          <span className="absolute bottom-3 right-4 text-[clamp(11px,1.2vw,13px)] text-[#868686]">
            {comment.length}/{MAX_COMMENT_LENGTH}
          </span>
        </div>
      </div>

      {/* Automatically recorded */}
      <div className="bg-[#EBEBEB] rounded-[10px] px-6 md:px-10 py-4 md:py-7 flex flex-col gap-6 md:gap-8">
        <div className="flex items-start gap-2 md:gap-4">
          <InfoIcon className="w-7 h-7" fill="#0EB26B" />
          <div className="flex flex-col gap-1">
            <h3 className="text-[clamp(15px,1.6vw,18px)] font-semibold text-[#0EB26B]">
              Automatically Recorded
            </h3>
            <p className="text-[#868686] text-[clamp(15px,1.6w,18px)]">
              Your name, date and time will be recorded automatically when you
              save this action.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-10 mx-6 md:mx-8">
          <div className="flex items-center gap-2">
            <Person3Icon className="w-6 h-6 md:w-8 md:h-8" />
            <div className="flex flex-col">
              <p className="text-[clamp(13px,1.4vw,15px)] font-semibold">
                {currentUser.userName}
              </p>
              <p className="text-[clamp(11px,1.2vw,13px)] text-[#868686]">
                {currentUser.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar2Icon className="w-6 h-6 md:w-8 md:h-8" fill="#0EB26B" />
            <div className="flex flex-col">
              <p className="text-[clamp(13px,1.4vw,15px)] font-semibold">
                {formattedDate}
              </p>
              <p className="text-[clamp(11px,1.2vw,13px)] text-[#868686]">
                Date
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6 md:w-8 md:h-8" />
            <div className="flex flex-col">
              <p className="text-[clamp(13px,1.4vw,15px)] font-semibold">
                {formattedTime}
              </p>
              <p className="text-[clamp(11px,1.2vw,13px)] text-[#868686]">
                Time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between w-full mt-2">
        <Button
          variant="outline"
          size="sm"
          className="border-[#CACACA] border text-[#4E4E4E] h-12 w-[140px] md:w-[200px] text-[clamp(12px,1.7vw,18px)]"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-12 w-[140px] md:w-[200px] text-[clamp(12px,1.7vw,18px)] bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white"
          onClick={handleSave}
          disabled={!canSave}
        >
          Save Action
        </Button>
      </div>

      <div className="flex items-center gap-1 md:gap-2 mt-6">
        <LockIcon className="w-4 h-4 md:w-5 md:h-5" />
        <p className="text-[#868686] text-[clamp(12px,1.4vw,15px)]">
          Action history is permanent and cannot be edited or deleted
        </p>
      </div>
    </div>
  );
};

export default AddActionTaken;
