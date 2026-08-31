import type { ITeamMember } from "~/types";
import { USER_DATA } from "./userData";

export const TEAM_MEMBERS: ITeamMember[] = [
  {
    userId: USER_DATA.userId,
    name: `${USER_DATA.userFirstName} ${USER_DATA.userLastName}`,
    profilePicture: USER_DATA.profilePicture,
    role: USER_DATA.role,
    totalOpenTickets: USER_DATA.totalOpenTickets,
  },
  {
    userId: "USR002",
    name: "Emily Amadi",
    profilePicture: "/images/teamMember1.jpg",
    role: "Head of Support",
    totalOpenTickets: 7,
  },
  {
    userId: "USR003",
    name: "John Akandu",
    profilePicture: "/images/teamMember2.jpg",
    role: "Support Manager",
    totalOpenTickets: 5,
  },
  {
    userId: "USR004",
    name: "Petter Amadi",
    profilePicture: "/images/teamMember3.jpg",
    role: "Senior Support Specialist",
    totalOpenTickets: 6,
  },
  {
    userId: "USR005",
    name: "Grace Onyedi",
    profilePicture: "/images/teamMember1.jpg",
    role: "Junior Support Specialist",
    totalOpenTickets: 4,
  },
  {
    userId: "USR006",
    name: "James Chen",
    profilePicture: "/images/teamMember2.jpg",
    role: "Support Manager",
    totalOpenTickets: 10,
  },
  {
    userId: "USR007",
    name: "Grace Onyedi",
    profilePicture: "/images/teamMember3.jpg",
    role: "Technical Support Specialist",
    totalOpenTickets: 4,
  },
  {
    userId: "USR008",
    name: "Mercy Ekenna",
    profilePicture: "/images/teamMember3.jpg",
    role: "Support Specialist",
    totalOpenTickets: 3,
  },
  {
    userId: "USR009",
    name: "Sarah Obi",
    profilePicture: "/images/teamMember2.jpg",
    role: "Support Specialist",
    totalOpenTickets: 5,
  },
];

export function getTeamMember(
  userId: string | null | undefined,
): ITeamMember | undefined {
  if (!userId) return undefined;
  return TEAM_MEMBERS.find((m) => m.userId === userId);
}
