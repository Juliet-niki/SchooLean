const SectionHeader = ({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 ml:py-4 ml:px-8 bg-[#0EB26B17] rounded-[5px] border-b border-[#CACACA]">
    <div
      className={`flex items-center text-[#0EB26B] text-[clamp(15px,1.6vw,18px)] font-semibold ${icon && "gap-4"}`}
    >
      {icon}
      <h3>{title}</h3>
    </div>
    <div className="ml-auto">{children}</div>
  </div>
);

export default SectionHeader;
