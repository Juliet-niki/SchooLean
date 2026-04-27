import React from "react";
import { DomainIcon, MoreIcon, PageIcon, PersonsIcon } from "~/assets/icons";
import StatusView from "~/components/StatusView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ISchool, IWebsitePages } from "~/types";
import { formatDate } from "~/utils/formatDate";
import { CapitalizeFirstLetter } from "~/utils/formatText";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface WebsiteItems {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

//  ---- Table Header ----
const TableHead = ({ columns }: { columns: string[] }) => (
  <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-nowrap">
    <tr>
      {columns.map((col, index, arr) => (
        <th
          key={col}
          className={`py-3 px-4 text-center font-bold bg-[#E6F7F0]
            ${index === 0 ? "rounded-tl-[7px]" : ""}
            ${index > 0 && index < arr.length - 1 ? "border-x border-[#E4E4E4]" : ""}
            ${index === arr.length - 1 ? "rounded-tr-[7px]" : ""}
          `}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

//  ---- Table Body ----
const TableRow = ({ website }: { website: IWebsitePages }) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-semibold border-b last:border-b-0 border-[#EBEBEB]">
      <td className="py-3 px-4 text-center font-medium text-nowrap">
        <div className="flex items-center gap-1.5">
          <PageIcon
            className="w-4 h-4 ml:w-5 ml:h-5"
            fill={website.status === "DRAFT" ? "#FFC444" : "#0EB26B"}
          />
          <p> {website.name}</p>
        </div>
      </td>
      <td className="py-3 px-4 border-x border-[#E4E4E4] text-nowrap">
        {website.url}
      </td>
      <td className="py-3 px-4 border-r border-[#E4E4E4]">
        <div className="flex items-center justify-center">
          <StatusView
            styleOption={true}
            classStyleName={`text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-20 text-center border border-[#B8B4B4] ${website.status === "DRAFT" ? "text-[#4E4E4E]" : "text-white"}`}
            status={website.status === "ACTIVE" ? "Active" : "Draft"}
            green="Active"
            yellow="Draft"
          />
        </div>
      </td>
      <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
        {formatDate(website.lastUpdated)}
      </td>

      <td className="py-3 px-4 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="cursor-pointer">
              <MoreIcon className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>View Website</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Enable / Disable Website
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Enable</DropdownMenuItem>
                    <DropdownMenuItem className="text-[#E81E1E]">
                      Disable
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>Fix Domain Issues</DropdownMenuItem>
              <DropdownMenuItem>Reset Website Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

const SchoolCustomWebsite = ({ school }: { school: ISchool }) => {
  const website = school.customWebsite;
  const websiteStatus = website.status === "ACTIVE" ? "Active" : "Inactive";
  const WEBSITE_ITEMS: WebsiteItems[] = [
    {
      icon: (
        <img
          src="/avatars/webFolder.svg"
          alt=""
          className="w-5 h-5 ml:w-7 ml:h-7"
        />
      ),
      title: "Website Status",
      value: websiteStatus,
    },
    {
      icon: <DomainIcon className="w-5 h-5 ml:w-7 ml:h-7" />,
      title: "Domain",
      value: website.domain,
    },
    {
      icon: (
        <img
          src="/avatars/pages.svg"
          alt=""
          className="w-5 h-5 ml:w-7 ml:h-7"
        />
      ),
      title: "Pages",
      value: website.numberOfPages.toLocaleString(),
    },
    {
      icon: <PersonsIcon className="w-5 h-5 ml:w-7 ml:h-7" fill="#000" />,
      title: "Visitors",
      value: website.totalVisitors.toLocaleString(),
    },
  ];

  return (
    <div className="flex flex-col gap-2 ml:gap-4 text-[#4E4E4E] px-4 ml:px-6 font-medium">
      <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
        Custom Website{" "}
        <span className="font-medium">
          ({CapitalizeFirstLetter(school.plan)})
        </span>
      </h2>
      <div className="grid grid-cols-1 ml:grid-cols-[1.8fr_1.1fr] lg:grid-cols-[2fr_1fr] gap-4 w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-stretch gap-4 ">
            {WEBSITE_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 ml:gap-3 px-2 ml:px-4 py-2 border border-[#CFCFCF] rounded-[7px] font-semibold"
              >
                <div>{item.icon}</div>
                <div className="flex flex-col gap-2">
                  <p className="text-[clamp(13px,1.5vw,18px)] text-nowrap leading-tight">
                    {item.title}
                  </p>
                  <p
                    className={`
                        ${i === 0 && website.status === "ACTIVE" ? "text-[clamp(15px,1.8vw,20px)] text-[#0EB26B]" : ""} 
                        ${i === 1 ? "text-[clamp(12px,1.3vw,16px)] font-medium" : ""}
                        ${i === 2 || i === 3 ? "text-[clamp(18px,1.8vw,24px)]" : ""}
                        `}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(13px,1.6vw,18px)] font-bold leading-tight">
              Website Pages
            </h2>
            <div className="rounded-[7px] overflow-x-auto hide-scrollbar  border border-[#CFCFCF]">
              <table className="w-full min-w-[700px] border-collapse table-fixed">
                <colgroup>
                  <col style={{ width: "26%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "14%" }} />
                </colgroup>
                <TableHead
                  columns={[
                    "Page Name",
                    "URL",
                    "Status",
                    "Last Updated",
                    "Actions",
                  ]}
                />

                <tbody>
                  {website.websitePages.map((website) => (
                    <TableRow key={website.name} website={website} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml:flex-col gap-4">
          <div className="flex flex-col gap-3 border border-[#CFCFCF] rounded-[7px] px-4 md:px-6 py-4 text-[clamp(13px,1.6vw,18px)] shrink-0">
            <div className="flex items-center gap-1.5">
              <PersonsIcon className="w-5 h-5 ml:w-7 ml:h-7" fill="#000" />
              <h3 className="font-semibold ">Visitors Overview</h3>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                Today :{" "}
                {website.visitorsOverview.todayVisitors.toLocaleString()}
              </p>
              <p>
                This Week :{" "}
                {website.weeklyVisitors
                  .reduce((sum, d) => sum + d.visitors, 0)
                  .toLocaleString()}
              </p>
              <p>
                This Month :{" "}
                {website.visitorsOverview.thisMonthVisitors.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="border border-[#CFCFCF] rounded-[7px] px-4 md:px-6 py-4 w-full">
            <VistorsBarChart data={website.weeklyVisitors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCustomWebsite;

export const VistorsBarChart = ({
  data,
}: {
  data: { day: string; visitors: number }[];
}) => {
  const getBarColor = (day: string) => {
    if (day === "Sun") return "#EAB7B7";
    if (day === "Mon") return "#82E0B7";
    if (day === "Tue") return "#0EB26B";
    if (day === "Wed") return "#E81E1E";
    if (day === "Thu") return "#77C6A4";
    if (day === "Fri") return "#E6A5A5";
    if (day === "Sat") return "#0EB26B";
  };
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="1 1"
            stroke="#CFCFCF"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
          />
          <YAxis hide />
          <Tooltip cursor={false} />
          <Bar dataKey="visitors" radius={[10, 10, 0, 0]}>
            {data.map((entry: any, index: number) => (
              <Cell key={index} fill={getBarColor(entry.day)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
