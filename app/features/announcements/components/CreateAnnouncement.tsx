import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ErrorIcon } from "~/assets/Icons";
import { DatePickerForm } from "~/components/ui/datePickerForm";
import { FileSelect } from "~/components/ui/fileSelect";
import { Form, FormField, FormLabel } from "~/components/ui/form";
import { FormMultiSelect } from "~/components/ui/formMultiSelect";
import { FormSelect } from "~/components/ui/formSelect";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { DeliveryScheduleCard } from "./formCards/DeliveryScheduleCard";
import { AnnouncementPreviewCard } from "./formCards/AnnouncementPreviewCard";
import { FormActionButtons } from "./formCards/formActionButtons";
import { DeliveryChannelsCard } from "./formCards/DeliveryChannelsCard";

const FormSchema = z
  .object({
    announcementTitle: z
      .string()
      .nonempty({ message: "Announcement title is required" }),
    announcementCategory: z.string().nonempty({ message: "Select a category" }),
    announcementPriority: z.string().nonempty({ message: "Select a priority" }),
    announcementMessage: z.string().nonempty({ message: "Enter a message" }),
    attachFile: z.any().optional(),
    userType: z.string().nonempty({ message: "Select a user type" }),
    schoolsSelection: z
      .array(z.string())
      .nonempty({ message: "Select at least one school" }),
    subscriptionPlan: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    lga: z.string().optional(),
    dateJoined: z.date().optional(),
    deliveryChannel: z
      .array(z.string())
      .nonempty({ message: "Select a channel" }),
    deliverySchedule: z.string().nonempty({ message: "Select a schedule" }),
    scheduledDate: z.date().optional(),
    scheduledTime: z.date().optional(),
  })
  .refine(
    (data) => data.deliverySchedule !== "scheduled" || !!data.scheduledDate,
    {
      path: ["scheduledDate"],
      message: "Select a date for scheduled delivery",
    },
  )
  .refine(
    (data) => data.deliverySchedule !== "scheduled" || !!data.scheduledTime,
    {
      path: ["scheduledTime"],
      message: "Select a time for scheduled delivery",
    },
  );
export type TypeFormSchema = z.infer<typeof FormSchema>;

const CreateAnnouncement = () => {
  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      announcementTitle: "",
      announcementCategory: "",
      announcementPriority: "",
      announcementMessage: "",
      attachFile: "",
      userType: "",
      schoolsSelection: [],
      subscriptionPlan: "",
      country: "",
      state: "",
      lga: "",
      dateJoined: new Date(),
      deliveryChannel: [],
      deliverySchedule: "",
      scheduledDate: undefined,
      scheduledTime: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSaveDraft = async (data: TypeFormSchema) => {};
  const onSendTest = async (data: TypeFormSchema) => {};
  const onSchedule = async (data: TypeFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("schedule Announcement:", data);

    form.reset();
  };
  const onSubmit = async (data: TypeFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Announcement:", data);

    form.reset();
  };

  const handleSaveDraft = form.handleSubmit(onSaveDraft);
  const handleSendTest = form.handleSubmit(onSendTest);
  const handleSchedule = form.handleSubmit(onSchedule);

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6 md:gap-10 px-1 text-[clamp(14px,1.4vw,16px)] font-medium w-full text-[#868686]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Announcement Details */}
          <div className="flex flex-col px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 bg-white rounded-[7px] border border-[#D9D9D9] shadow-sm shadow-[#00000026] gap-6">
            <h2 className="text-[#4E4E4EEE] text-[clamp(16px,1.6vw,18px)] font-semibold ">
              Announcement Details
            </h2>

            <FormField
              control={form.control}
              name="announcementTitle"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Announcement Title
                  </FormLabel>
                  <Input
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    {...field}
                    placeholder="Enter announcement title"
                    type="text"
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="announcementCategory"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Announcement Category
                  </FormLabel>
                  <FormSelect
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={ANNOUNCEMENTS_CATEGORY_OPTION}
                    placeholder="Select Category"
                    contentClassName=""
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="announcementPriority"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Announcement Priority
                  </FormLabel>
                  <FormSelect
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={ANNOUNCEMENTS_PRIORITY_OPTION}
                    placeholder="Select Priority"
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="announcementMessage"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Announcement Message
                  </FormLabel>
                  <Textarea
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    {...field}
                    placeholder="Enter your message here..."
                    hasCharacterCount
                    textareaClassName="min-h-[200px]"
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="attachFile"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Attach File (Optional)
                  </FormLabel>
                  <FileSelect
                    value={field.value ?? null}
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
                    helperText="Drag and drop image, PDF, or text file"
                  />
                </div>
              )}
            />
          </div>

          {/* Audience Selection */}
          <div className="flex flex-col px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 bg-white rounded-[7px] border border-[#D9D9D9] shadow-sm shadow-[#00000026] gap-6 ">
            <h2 className="text-[#4E4E4EEE] text-[clamp(16px,1.6vw,18px)] font-semibold ">
              Audience Selection
            </h2>

            <FormField
              control={form.control}
              name="userType"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    User Type
                  </FormLabel>
                  <div className="flex items-center gap-6 flex-wrap">
                    {[
                      { value: "all-users", label: "All Users" },
                      {
                        value: "school-aministrators",
                        label: "School Administrators",
                      },
                      { value: "teachers", label: "Teachers" },
                      { value: "parents", label: "Parents" },
                      { value: "students", label: "Students" },
                    ].map((item) => {
                      const isSelected = item.value === field.value;
                      return (
                        <div
                          key={item.value}
                          onClick={() => field.onChange(item.value)}
                          role="button"
                          className={cn(
                            "flex items-center px-8 h-7 md:h-10 border border-[#D9D9D9] rounded-[7px] cursor-pointer",
                            isSelected
                              ? "bg-[#0EB26B] text-white"
                              : "bg-transparent text-[#4E4E4E]",
                          )}
                        >
                          <p>{item.label}</p>
                        </div>
                      );
                    })}
                  </div>
                  {fieldState.error && (
                    <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs font-normal">
                      <ErrorIcon className="w-4 h-4" />
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="schoolsSelection"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Schools Selection
                  </FormLabel>
                  <div className="col-span-3 md:col-span-2">
                    <FormMultiSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={SCHOOLS.map((school) => ({
                        id: school.schoolId,
                        label: school.name,
                        value: school.schoolId,
                      }))}
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error && (
                          <span className="text-red-500 flex items-center gap-1 pt-1">
                            <ErrorIcon className="w-4 h-4" />
                            {fieldState.error.message}
                          </span>
                        )
                      }
                      placeholder="Select group members"
                    />
                  </div>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="subscriptionPlan"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Subscription Plan(Optional)
                  </FormLabel>
                  <FormSelect
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={SUPSCRIPTION_PLAN}
                    placeholder="Select a plan"
                  />
                </div>
              )}
            />

            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                Location Filters (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5 md:gap-8 w-full">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                        Country
                      </FormLabel>
                      <FormSelect
                        hasError={fieldState.invalid}
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                              <ErrorIcon className="w-4 h-4" />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                        value={field.value}
                        onChange={field.onChange}
                        options={COUNTRIES}
                        placeholder="Select Country"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                        State
                      </FormLabel>
                      <FormSelect
                        hasError={fieldState.invalid}
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                              <ErrorIcon className="w-4 h-4" />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                        value={field.value}
                        onChange={field.onChange}
                        options={STATES}
                        placeholder="Select State"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lga"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                        LGA
                      </FormLabel>
                      <FormSelect
                        hasError={fieldState.invalid}
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-[#E93F3F] text-xs">
                              <ErrorIcon className="w-4 h-4" />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                        value={field.value}
                        onChange={field.onChange}
                        options={LGAs}
                        placeholder="Select LGA"
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="dateJoined"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[#868686] text-[clamp(15px,1.4vw,16px)]">
                    Date Joined Filter (Optional)
                  </FormLabel>
                  <DatePickerForm
                    value={field.value}
                    onChange={field.onChange}
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-red-500 ">
                          <ErrorIcon className="w-4 h-4" />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                  />
                </div>
              )}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <DeliveryChannelsCard control={form.control} />
            <DeliveryScheduleCard
              control={form.control}
              setValue={form.setValue}
            />
            <AnnouncementPreviewCard control={form.control} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-5">
            <FormActionButtons
              control={form.control}
              onSaveDraft={handleSaveDraft}
              onSendTest={handleSendTest}
              onSchedule={handleSchedule}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateAnnouncement;

const ANNOUNCEMENTS_CATEGORY_OPTION = [
  { label: "System Update", value: "system-update" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Feature Release", value: "feature-release" },
  { label: "Security", value: "security" },
  { label: "General Notice", value: "general-notice" },
  { label: "Billing", value: "billing" },
  { label: "Emergency", value: "emergency" },
];

const ANNOUNCEMENTS_PRIORITY_OPTION = [
  { label: "Normal", value: "normal" },
  { label: "Important", value: "important" },
  { label: "Urgent", value: "urgent" },
];

const SCHOOLS = [
  { schoolId: "SCH1350", name: "Greenwood International Schools" },
  { schoolId: "SCH2461", name: "Royal Crest Academy" },
  {
    schoolId: "SCH6699",
    name: "Excel Scholars Academy",
  },
  { schoolId: "SCH2964", name: "Brightway Academy" },
  { schoolId: "SCH29644", name: "Wright Excel Academy" },
  { schoolId: "SCH13560", name: "Greenwood International Schools" },
  { schoolId: "SCH24613", name: "Royal Crest Academy" },
  {
    schoolId: "SCH669339",
    name: "Excel Scholars Academy",
  },
  { schoolId: "SCH29684", name: "Topline Nursery and Primary School" },
  { schoolId: "SCH296424", name: "Brightway Academy" },
];

const SUPSCRIPTION_PLAN = [
  { label: "All Plans", value: "all-plans" },
  { label: "Free Trial", value: "free-trial" },
  { label: "Standard", value: "standard" },
  { label: "Premium", value: "premium" },
];

const COUNTRIES = [
  { label: "All Countries", value: "all" },
  { label: "Nigeria", value: "nigeria" },
  { label: "Ghana", value: "ghana" },
  { label: "Togo", value: "togo" },
  { label: "Kenya", value: "kenya" },
  { label: "Uganda", value: "uganda" },
  { label: "Rwanda", value: "rwanda" },
  { label: "South Africa", value: "south-africa" },
  { label: "Zimbabwe", value: "zimbabwe" },
  { label: "Botswana", value: "botswana" },
  { label: "Namibia", value: "namibia" },
  { label: "Malawi", value: "malawi" },
];

const STATES = [
  { label: "All States", value: "all" },
  { label: "Abia", value: "abia" },
  { label: "Lagos", value: "lagos" },
  { label: "Rivers", value: "rivers" },
  { label: "Anambra", value: "anambra" },
  { label: "Edo", value: "edo" },
  { label: "Oyo", value: "oyo" },
  { label: "Ogun", value: "ogun" },
  { label: "Osun", value: "osun" },
  { label: "Ondo", value: "ondo" },
  { label: "Imo", value: "imo" },
  { label: "Delta", value: "delta" },
  { label: "Akwa Ibom", value: "akwa-ibom" },
  { label: "Ebonyi", value: "ebonyi" },
  { label: "Enugu", value: "enugu" },
  { label: "Kaduna", value: "kaduna" },
  { label: "Kano", value: "kano" },
  { label: "Katsina", value: "katsina" },
];

const LGAs = [
  { label: "All LGAs", value: "all" },
  { label: "Ikeja", value: "ikeja" },
  { label: "Eti-Osa", value: "eti-osa" },
  { label: "Ibadan North", value: "ibadan-north" },
  { label: "Ibadan South-West", value: "ibadan-south-west" },
  { label: "Uyo", value: "uyo" },
  { label: "Calabar Municipal", value: "calabar-municipal" },
  { label: "Enugu North", value: "enugu-north" },
  { label: "Owerri Municipal", value: "owerri-municipal" },
  { label: "Port Harcourt", value: "port-harcourt" },
  { label: "Obio-Akpor", value: "obio-akpor" },
  {
    label: "Brass",
    value: "brass",
  },
  { label: "Kano Municipal", value: "kano-municipal" },
  { label: "Zaria", value: "zaria" },
  { label: "Jos North", value: "jos-north" },
  { label: "Maiduguri", value: "maiduguri" },
];
