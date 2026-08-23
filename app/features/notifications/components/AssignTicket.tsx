import { useMemo, useState } from "react";
import { InfoIcon } from "~/assets/Icons";
import SearchInput from "~/components/SearchInput";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

interface AssignTicketProps {
  handleCancel: () => void;
  handleAssign: (selectedMemberIds: number[]) => void;
}

const AssignTicket = ({ handleCancel, handleAssign }: AssignTicketProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredMembers = useMemo(() => {
    const search = searchText.toLowerCase().trim();
    if (!search) return TeamMembers;

    return TeamMembers.filter((member) => {
      const matchesName = member.name.toLowerCase().includes(search);
      const matchesRole = member.role.toLowerCase().includes(search);

      return matchesName || matchesRole;
    });
  }, [searchText]);

  const toggleSelectOne = (userId: number) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((x) => x !== userId)
        : [...prev, userId],
    );
  };

  const resetState = () => {
    setSearchText("");
    setSelectedIds([]);
  };

  return (
    <div className="text-[#4E4E4E] flex flex-col gap-5 md:gap-7 lg:gap-9 mt-3 md:mt-5">
      <SearchInput
        setSearchText={(text) => {
          setSearchText(text);
        }}
        className="h-14 w-full border-[#CACACA] px-5"
        placeholder="Search team members..."
      />

      <div className="border border-[#CACACA] bg-[#0EB26B08] rounded-b-[10px]">
        {filteredMembers.map((member) => (
          <div
            key={member.userId}
            className={`flex items-center justify-between py-4 px-6 border-b last:border-b-0 border-[#BCBCBC] ${
              selectedIds.includes(member.userId) ? "bg-[#DCDCDC]" : ""
            }`}
          >
            <div className="flex items-center">
              <div>
                <Checkbox
                  checked={selectedIds.includes(member.userId)}
                  onCheckedChange={() => toggleSelectOne(member.userId)}
                  className="rounded-full size-5"
                />
              </div>
              <div className="ml-[27px] mr-[58px]">
                {member.profilePic ? (
                  <img
                    src={member.profilePic}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#D9D9D9]" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[clamp(14px,1.6vw,18px)]">
                  {member.name}
                </h2>
                <p className="text-[clamp(10px,1.2vw,14px)] font-medium">
                  {member.role}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 ml-auto">
              <p
                className={`size-[clamp(18px,3vw,30px)] flex items-center justify-center rounded-full  text-black text-[clamp(10px,1.2vw,14px)] font-medium ${selectedIds.includes(member.userId) ? "bg-[#F5F5F5]" : "bg-[#D9D9D9]"}`}
              >
                {member.totalOpenTickets}
              </p>
              <h2
                className={`font-medium text-[clamp(14px,1.6vw,17px)] ${selectedIds.includes(member.userId) ? "text-[#4E4E4E]" : "text-[#868686]"}`}
              >
                Open Tickets
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <Button
          variant="outline"
          size="sm"
          className="border-[#CACACA] border text-[#4E4E4E] h-12 w-[200px] text-[clamp(12px,1.7vw,18px)]"
          onClick={() => {
            resetState();
            handleCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className="h-12 w-[200px] text-[clamp(12px,1.7vw,18px)] "
          onClick={() => {
            handleAssign(selectedIds);
            resetState();
          }}
          disabled={selectedIds.length === 0}
        >
          Assign
        </Button>
      </div>

      <div className="flex items-center gap-1 md:gap-2 mt-4">
        <InfoIcon className="w-4 h-4 md:w-6 md:h-6" />
        <p className="text-[#868686] text-[clamp(14px,1.7vw,18px)]">
          The assignee will be notified and the ticket will be added to their
          queue.
        </p>
      </div>
    </div>
  );
};

export default AssignTicket;

const TeamMembers = [
  {
    userId: 1,
    name: "Emily Amadi",
    profilePic: "/images/teamMember1.jpg",
    role: "Head of Support",
    totalOpenTickets: 7,
  },
  {
    userId: 2,
    name: "John Akandu",
    profilePic: "/images/teamMember2.jpg",
    role: "Support Manager",
    totalOpenTickets: 5,
  },
  {
    userId: 3,
    name: "Petter Amadi",
    profilePic: "/images/teamMember3.jpg",
    role: "Senior Support Specialist",
    totalOpenTickets: 6,
  },
  {
    userId: 4,
    name: "Grace Onyedi",
    profilePic: "/images/teamMember1.jpg",
    role: "Junior Support Specialist",
    totalOpenTickets: 4,
  },
  {
    userId: 5,
    name: "James Chen",
    profilePic: "/images/teamMember2.jpg",
    role: "Support Manager",
    totalOpenTickets: 10,
  },
  {
    userId: 6,
    name: "Grace Onyedi",
    profilePic: "/images/teamMember3.jpg",
    role: "Technical Support Specialist",
    totalOpenTickets: 4,
  },
];
