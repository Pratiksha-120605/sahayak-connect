export type Role = "beneficiary" | "volunteer";
export type Urgency = "low" | "medium" | "high";
export type RequestStatus = "open" | "matched" | "in_progress" | "completed" | "cancelled";
export type RequestType =
  | "mobility"
  | "grocery"
  | "medical"
  | "companionship"
  | "errand"
  | "other";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  avatarColor: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  /** Volunteer-only */
  nssMember?: boolean;
  hoursVolunteered?: number;
  requestsCompleted?: number;
  /** Beneficiary-only */
  address?: string;
  disabilityType?: string;
}

export interface HelpRequest {
  id: string;
  beneficiaryId: string;
  type: RequestType;
  title: string;
  description: string;
  urgency: Urgency;
  status: RequestStatus;
  /** Mock coordinates in 0..100 space for MockMap */
  x: number;
  y: number;
  locationLabel: string;
  distanceKm: number;
  createdAt: string;
  preferredTime: string;
  matchedVolunteerId?: string;
  rating?: number;
  review?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  authorId: string;
  body: string;
  sentAt: string;
  read: boolean;
}

export interface ChatThread {
  id: string;
  beneficiaryId: string;
  volunteerId: string;
  requestId: string;
  lastMessageAt: string;
  messages: ChatMessage[];
}
