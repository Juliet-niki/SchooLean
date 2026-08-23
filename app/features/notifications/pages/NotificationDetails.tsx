import { useNavigate, useParams } from "react-router";
import {
  CheckMarkIcon,
  LeftIcon,
  Person2Icon,
  PlusIcon,
  RecievedTimeIcon,
  School2Icon,
  ServiceIcon,
  ShapesIcon,
  Status2Icon,
  TypeIcon,
} from "~/assets/Icons";
import { Button } from "~/components/ui/button";
import { useNotifications } from "~/context/NotificationsContext";
import { cn } from "~/lib/utils";
import { formatDateTime } from "~/utils/formatDate";
import { CapitalizeFirstLetter } from "~/utils/formatText";
import NotificationLifecycleStepper from "../components/NotificationLifecycleStepper";
import { useMediaQuery } from "react-responsive";
import StatusView from "~/components/StatusView";

const NotificationDetails = () => {
  const { notifications, setNotifications } = useNotifications();
  const { id } = useParams();
  const navigate = useNavigate();

  const notification =
    notifications.find((n) => n.notificationId === id) ?? null;

  const goBack = () => navigate(-1);

  const handleMarkAsRead = () => {
    if (!notification) return;
    setNotifications((prev) =>
      prev.map((n) =>
        n.notificationId === notification.notificationId
          ? { ...n, isRead: true }
          : n,
      ),
    );
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <p className="text-[#4E4E4E] text-[clamp(14px,1.4vw,16px)]">
          This notification doesn't exist or may have been removed.
        </p>
        <Button onClick={goBack} size="lg">
          Back to Notifications
        </Button>
      </div>
    );
  }

  return (
    <div className="my-8 mx-6 md:my-10 md:mx-10 text-[#4E4E4EEE] flex flex-col ">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={goBack}
        >
          <LeftIcon className="w-6 h-6 md:w-7 md:h-7" />
        </Button>
        <div className="flex items-center gap-4">
          <h2 className="text-[clamp(16px,1.8vw,24px)] font-semibold leading-tight text-[#4E4E4E]">
            {notification.subject}
          </h2>
          <StatusView
            variant="soft"
            styleOption={true}
            status={
              notification.priority === "LOW"
                ? "Low"
                : notification.priority === "MEDIUM"
                  ? "Medium"
                  : "High"
            }
            green="Low"
            red="High"
            yellow="Medium"
          />
        </div>
      </div>

      {/* Mark as read Button */}
      <div className="ml-auto mt-4 md:mt-5">
        <Button
          variant="secondary"
          size="sm"
          disabled={notification.isRead}
          className={cn(
            "md:rounded-[5px] md:h-[43px] md:px-6",
            notification.isRead
              ? "bg-[#D9D9D9] text-[#868686] cursor-not-allowed hover:bg-[#D9D9D9]"
              : "bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white",
          )}
          onClick={handleMarkAsRead}
        >
          {notification.isRead ? "Read" : "Mark as Read"}
        </Button>
      </div>

      {/* Notification Infomation*/}
      <div className="my-6 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-10 flex flex-col gap-3 md:gap-6">
        <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
          Notification Information
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch justify-between flex-wrap gap-4 md:gap-6">
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4">
              <RecievedTimeIcon className="w-6 h-6" />
              <div className="flex flex-col gap-1 text-[#868686EE]">
                <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight">
                  {notification.type === "security" ? "Detected" : "Received"}
                </h3>

                {notification.type === "security" ? (
                  <p className="text-[clamp(12px,1.2vw,14px)] font-medium ">
                    {formatDateTime(notification.detectedAt)}
                  </p>
                ) : (
                  <p className="text-[clamp(12px,1.2vw,14px)] font-medium ">
                    {formatDateTime(notification.receivedAt)}
                  </p>
                )}
              </div>
            </div>
            {(notification.type === "system" ||
              notification.type === "finance") && (
              <div className="flex items-center gap-2 md:gap-4">
                <TypeIcon className="w-7 h-7" />

                <div className="flex flex-col gap-1 text-[#868686EE]">
                  <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight">
                    Type
                  </h3>

                  <p className="text-[clamp(12px,1.2vw,14px)] font-medium">
                    {notification.type === "system"
                      ? CapitalizeFirstLetter(notification.systemType)
                      : CapitalizeFirstLetter(notification.financeType)}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 md:gap-8 sm:border-l-2 border-[#DBDBDB] sm:pl-3 md:pl-6">
            {notification.type === "finance" && (
              <div className="flex items-center gap-2 md:gap-4">
                <Person2Icon className="w-6 h-6" />
                <div className="flex flex-col gap-1 text-[#868686EE]">
                  <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight">
                    Assigned To
                  </h3>

                  <p className="text-[clamp(12px,1.2vw,14px)] font-semibold">
                    {notification.assignedMember?.userName}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 md:gap-4 ">
              <ShapesIcon className="w-6 h-6" />
              <div className="flex flex-col gap-1 text-[#868686EE]">
                <h3 className="text-[clamp(14px,1.5vw,16px)] font-semibold leading-tight">
                  Category
                </h3>
                <p className="text-[clamp(12px,1.2vw,14px)] font-semibold">
                  {notification.category}
                </p>
              </div>
            </div>
            {notification.type === "system" && (
              <div className="flex items-center gap-2 md:gap-4">
                <ServiceIcon className="w-7 h-7" />
                <div className="flex flex-col gap-1 text-[#868686EE]">
                  <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight">
                    Service
                  </h3>

                  <p className="text-[clamp(12px,1.2vw,14px)] font-semibold">
                    {notification.SystemService}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="sm:border-l-2 border-[#DBDBDB] sm:pl-3 md:pl-6">
            <div className="flex items-center gap-2 md:gap-4">
              <Status2Icon className="w-6 h-6" />
              <div className="flex items-center gap-3">
                <h3 className="text-[clamp(14px,1.5vw,16px)] font-semibold leading-tight text-[#868686EE]">
                  Status
                </h3>
                <StatusView
                  variant="soft"
                  styleOption={true}
                  status={
                    notification.notificationStatus === "NEW"
                      ? "New"
                      : notification.notificationStatus === "IN_PROGRESS"
                        ? "In Progress"
                        : "Assigned"
                  }
                  green="New"
                  yellow="In Progress"
                  blue="Assigned"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 md:gap-4 px-2 md:px-4">
        <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
          Description
        </h2>

        <p className="text-[clamp(14px,1.7vw,18px)] font-medium text-[#868686]">
          {notification.description}
        </p>
      </div>

      {/* User Details */}
      {notification.userDetails && (
        <div className="my-4 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-8 flex flex-col gap-6">
          <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
            User Details
          </h2>
          <div className="flex items-center gap-4 md:gap-7">
            <div className="rounded-[7px] flex items-center justify-center px-3 py-2 shrink-0 bg-[#0EB26B14]">
              <Person2Icon className="w-6 h-6 md:w-8 md:h-8" fill="#098D54" />
            </div>
            <p className="text-[clamp(15px,1.4vw,16px)] font-semibold">
              {notification.userDetails.userEmail}
            </p>
          </div>
          <div className="columns-1 md:columns-2 gap-x-10 md:gap-x-14 [column-rule:2px_solid_#E5E5E5]">
            {[
              {
                title: "User Name",
                value: notification.userDetails.userName,
              },
              {
                title: "Full Name",
                value: notification.userDetails.fullName,
              },
              {
                title: "Role",
                value: notification.userDetails.role,
              },
              {
                title: "Last Successful Login",
                value: notification.userDetails.lastSuccessfulLogin,
              },
              {
                title: "Account Status",
                value: notification.userDetails.userAccountStatus,
              },
            ].map(({ title, value }) => (
              <div
                key={title}
                className="grid grid-cols-[2fr_3fr] items-center gap-6 py-2 [break-inside:avoid]"
              >
                <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight text-[#868686EE]">
                  {title}
                </h3>
                {title === "Account Status" && value ? (
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      notification.userDetails?.userAccountStatus === "ACTIVE"
                        ? "Active"
                        : "Inactive"
                    }
                    green="Active"
                    red="Inactive"
                  />
                ) : (
                  <p
                    className="text-[clamp(15px,1.5vw,17px)] font-semibold truncate"
                    title={value}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* School Details */}
      {notification.relatedSchool && (
        <div className="my-4 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-8 flex flex-col gap-6">
          <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
            School Details
          </h2>
          <div className="flex items-center gap-4 md:gap-7">
            <div className="rounded-[7px] flex items-center justify-center px-3 py-2 shrink-0 bg-[#0EB26B14]">
              <School2Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <p className="text-[clamp(15px,1.4vw,16px)] font-semibold">
              {notification.relatedSchool.schoolName}
            </p>
            {notification.type === "customerSuccess" && (
              <StatusView
                variant="soft"
                styleOption={true}
                status={
                  notification.relatedSchool.schoolStatus === "ACTIVE"
                    ? "Active"
                    : notification.relatedSchool.schoolStatus === "INACTIVE"
                      ? "Inactive"
                      : "At Risk"
                }
                green="Active"
                yellow="Inactive"
                blue="At Risk"
              />
            )}
          </div>
          <div className="columns-1 md:columns-2 gap-x-10 md:gap-x-14 [column-rule:2px_solid_#E5E5E5]">
            {[
              {
                title: "School Code",
                value: notification.relatedSchool.schoolCode,
              },
              {
                title: "Contact Person",
                value: notification.relatedSchool.contactPerson,
              },
              {
                title: "Phone Number",
                value: notification.relatedSchool.phoneNumber,
              },
              {
                title: "Email Address",
                value: notification.relatedSchool.emailAddress,
              },
              ...(notification.type === "customerSuccess"
                ? [
                    {
                      title: "Location",
                      value: `${notification.relatedSchool.state}, ${notification.relatedSchool.country}`,
                    },
                    {
                      title: "Date Started",
                      value: notification.relatedSchool.dateStarted,
                    },
                  ]
                : []),
              ...(notification.type === "finance" ||
              notification.type === "customerSupport" ||
              notification.type === "security"
                ? [
                    {
                      title: "Current Plan",
                      value: notification.relatedSchool.subscriptionplan,
                    },
                    {
                      title: "Subscription Status",
                      value: notification.relatedSchool.subscriptionStatus,
                    },
                  ]
                : []),
              ...(notification.type === "finance" ||
              notification.type === "customerSupport"
                ? [
                    {
                      title: "Next Billing Date",
                      value: notification.relatedSchool.nextBillingDate,
                    },
                  ]
                : []),
            ].map(({ title, value }) => (
              <div
                key={title}
                className="grid grid-cols-[2fr_3fr] items-center gap-6 py-2 [break-inside:avoid]"
              >
                <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight text-[#868686EE]">
                  {title}
                </h3>
                {title === "Subscription Status" && value ? (
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      notification.relatedSchool?.subscriptionStatus ===
                      "ACTIVE"
                        ? "Active"
                        : "Payment Failed"
                    }
                    green="Active"
                    red="Payment Failed"
                  />
                ) : title === "Current Plan" && value ? (
                  <span className="text-[clamp(15px,1.5vw,17px)] font-semibold">
                    {CapitalizeFirstLetter(value)} Annual
                  </span>
                ) : (
                  <p
                    className="text-[clamp(15px,1.5vw,17px)] font-semibold truncate"
                    title={value}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onboarding Progress */}
      {notification.type === "customerSuccess" &&
        notification.onboardingProgress && (
          <div className="my-4 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-8 flex flex-col gap-3 md:gap-6">
            <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
              Onboarding Progress
            </h2>
            <div className="columns-1 md:columns-2 gap-x-10 md:gap-x-14 [column-rule:2px_solid_#E5E5E5]">
              {[
                {
                  title: "School Information",
                  progressStatus:
                    notification.onboardingProgress.schoolInformation,
                },
                {
                  title: "Admin Account Setup",
                  progressStatus:
                    notification.onboardingProgress.adminAccountSetup,
                },
                {
                  title: "school Profile Setup",
                  progressStatus:
                    notification.onboardingProgress.schoolProfileSetup,
                },
                {
                  title: "Subscription Plan",
                  progressStatus:
                    notification.onboardingProgress.subscriptionPlan,
                },
                {
                  title: "Payment Method",
                  progressStatus: notification.onboardingProgress.paymentMethod,
                },
                {
                  title: "Invite Staff",
                  progressStatus: notification.onboardingProgress.inviteStaff,
                },
              ].map(({ title, progressStatus }) => (
                <div
                  key={title}
                  className="grid grid-cols-[auto_2fr_2fr] md:grid-cols-[auto_2fr_3fr] items-center gap-6 py-3 [break-inside:avoid]"
                >
                  <CheckMarkIcon
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill={`${progressStatus === "COMPLETED" ? "#0EB26B" : "#868686"}`}
                  />
                  <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight text-[#868686EE]">
                    {title}
                  </h3>
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      progressStatus === "COMPLETED" ? "Completed" : "Pending"
                    }
                    green="Completed"
                    red="Pending"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Affected System */}
      {notification.affectedSystem && (
        <div className="my-4 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-8 flex flex-col gap-6">
          <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
            Affected System
          </h2>
          <div className="flex items-center gap-4 md:gap-7">
            <div className="rounded-[7px] flex items-center justify-center px-3 py-2 shrink-0 bg-[#0EB26B14]">
              <School2Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <p className="text-[clamp(15px,1.4vw,16px)] font-semibold">
              {notification.affectedSystem.systemName}
            </p>

            <StatusView
              variant="soft"
              styleOption={true}
              status={
                notification.affectedSystem.systemStatus === "ACTIVE"
                  ? "Active"
                  : "Inactive"
              }
              green="Active"
              yellow="Inactive"
            />
          </div>
          <div className="columns-1 md:columns-2 gap-x-10 md:gap-x-14 [column-rule:2px_solid_#E5E5E5]">
            {[
              {
                title: "Environment",
                value: notification.affectedSystem.environment,
              },
              {
                title: "Last Successful Delivery",
                value: notification.affectedSystem.lastSuccessfulDelivery,
              },
              {
                title: "Endpoint URL",
                value: notification.affectedSystem.endpointUrl,
              },
              {
                title: "Failure Count",
                value: notification.affectedSystem.failureCount,
              },
              {
                title: "Next Retry",
                value: formatDateTime(notification.affectedSystem.nextRetry),
              },
              {
                title: "Region",
                value: notification.affectedSystem.region,
              },
            ].map(({ title, value }) => (
              <div
                key={title}
                className="grid grid-cols-[2fr_3fr] items-center gap-6 py-2 [break-inside:avoid]"
              >
                <h3 className="text-[clamp(15px,1.5vw,17px)] font-semibold leading-tight text-[#868686EE]">
                  {title}
                </h3>

                <p
                  className="text-[clamp(15px,1.5vw,17px)] font-semibold truncate"
                  title={value}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action History */}
      <div className="my-4 md:my-8 bg-white border border-[#D9D9D9] shadow-md shadow-[#00000026] rounded-[7px] py-4 md:py-6 px-6 md:px-8 flex flex-col gap-5 md:gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[clamp(15px,1.7vw,18px)] font-semibold">
            Action History ({notification.actionHistory.length})
          </h2>

          <Button
            variant="outline"
            size={isMobile ? "icon" : "sm"}
            className="flex items-center gap-2 text-[#0FA966] sm:h-[35px] md:h-[45px] border-[#CACACA] border-1 hover:text-[#0FA966]/90 hover:bg-[#0EB26B21]/50"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:block">Add Action Taken</span>
          </Button>
        </div>
        <div className="flex flex-col gap-10 md:gap-12 lg:gap-14 ">
          {notification.actionHistory.map((user, index) => (
            <div key={index} className="flex items-start gap-3 ">
              <div className="flex items-center">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="/avatars/noProfilePic.svg"
                    alt="No Profile Pic"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-5">
                  <h3 className="text-[clamp(15px,1.6vw,18px)] font-semibold leading-tight">
                    {user.userName}
                  </h3>
                  {user.isCurrentUser && (
                    <span className="px-3 py-1 rounded-[6px] text-[clamp(12px,1.1vw,13px)] font-semibold w-fit bg-[#0EB26B21] text-[#0EB26B]">
                      You
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-[#868686EE] text-[clamp(12px,1.4vw,15px)] font-medium">
                    {user.actionTaken}
                  </p>
                  <p className="text-[#868686EE] text-[clamp(12px,1.4vw,15px)] font-semibold">
                    {formatDateTime(user.TimeStamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Lifecycle */}
      <NotificationLifecycleStepper notification={notification} />
    </div>
  );
};

export default NotificationDetails;
