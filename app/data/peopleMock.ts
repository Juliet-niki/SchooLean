import type { ITeamMember, IUserData } from "~/types";
import { mockRequest, pad } from "./config";

/**
 * PEOPLE — the Schoolean staff who use this admin portal.
 *
 * This is the first mock in the dependency chain: announcements,
 * notifications and audit logs all pull their "who did this / who is it
 * assigned to" from here, so a name or id can never exist in one place
 * and not another.
 *
 * Kept hand-written on purpose: it's ~9 real identities, not volume data.
 */

// ─── The logged-in user ─────────────────────────────────────────────────────
// Mock only. The real login response replaces this (and the password goes away).

export const mockCurrentUser: IUserData = {
  userId: "USR001",
  userFirstName: "Samuel",
  userMiddleName: "Ebuka",
  userLastName: "Okafor",
  profilePicture: "/images/currentUser.jpg",
  email: "schoolean@gmail.com",
  phoneNumber: "07012345678",
  country: "Nigeria",
  state: "Lagos",
  city: "Lekki",
  isLoggedIn: false,
  isVerified: true,
  accessCode: "123456",
  password: "Password123.",
  role: "Support Manager",
  totalOpenTickets: 5,
};

// ─── The rest of the team ───────────────────────────────────────────────────
// One row per person. Ids are generated (USR002, USR003, ...) in order, so
// adding someone = adding one line at the end.

const TEAM_SEED: {
  name: string;
  role: string;
  picture: string;
  openTickets: number;
}[] = [
  {
    name: "Emily Amadi",
    role: "Head of Support",
    picture: "/images/teamMember1.jpg",
    openTickets: 7,
  },
  {
    name: "John Akandu",
    role: "Support Manager",
    picture: "/images/teamMember2.jpg",
    openTickets: 5,
  },
  {
    name: "Petter Amadi",
    role: "Senior Support Specialist",
    picture: "/images/teamMember3.jpg",
    openTickets: 6,
  },
  {
    name: "Grace Onyedi",
    role: "Junior Support Specialist",
    picture: "/images/teamMember1.jpg",
    openTickets: 4,
  },
  {
    name: "James Chen",
    role: "Support Manager",
    picture: "/images/teamMember2.jpg",
    openTickets: 10,
  },
  // was a second "Grace Onyedi" — renamed so search and assignee names are unambiguous
  {
    name: "Chioma Onyedi",
    role: "Technical Support Specialist",
    picture: "/images/teamMember3.jpg",
    openTickets: 4,
  },
  {
    name: "Mercy Ekenna",
    role: "Support Specialist",
    picture: "/images/teamMember3.jpg",
    openTickets: 3,
  },
  {
    name: "Sarah Obi",
    role: "Support Specialist",
    picture: "/images/teamMember2.jpg",
    openTickets: 5,
  },
];

export const mockTeamMembers: ITeamMember[] = [
  // the current user is always the first team member
  {
    userId: mockCurrentUser.userId,
    name: `${mockCurrentUser.userFirstName} ${mockCurrentUser.userLastName}`,
    profilePicture: mockCurrentUser.profilePicture,
    role: mockCurrentUser.role,
    totalOpenTickets: mockCurrentUser.totalOpenTickets,
  },
  ...TEAM_SEED.map((p, i) => ({
    userId: `USR${pad(i + 2, 3)}`,
    name: p.name,
    profilePicture: p.picture,
    role: p.role,
    totalOpenTickets: p.openTickets,
  })),
];

// ─── Lookups other mocks use ────────────────────────────────────────────────

export function getTeamMember(
  userId: string | null | undefined,
): ITeamMember | undefined {
  if (!userId) return undefined;
  return mockTeamMembers.find((m) => m.userId === userId);
}

/** Picks a team member by index, wrapping around. For generators. */
export const teamMemberAt = (index: number): ITeamMember =>
  mockTeamMembers[index % mockTeamMembers.length];

/** The `{ id, name }` shape announcements use for `createdBy`. */
export const toUserSummary = (member: ITeamMember) => ({
  id: member.userId,
  name: member.name,
});

// ─── The "fake backend" ─────────────────────────────────────────────────────

export function fetchMockTeamMembers(): Promise<ITeamMember[]> {
  return mockRequest(() => mockTeamMembers, 200);
}
