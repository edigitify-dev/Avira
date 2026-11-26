export const enquiryStatuses = ["new", "read", "replied", "archived"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];
export const statusLabels: Record<EnquiryStatus, string> = {
  new: "New", read: "Read", replied: "Replied", archived: "Archived",
};

export type ContactInput = {
  name: string;
  email: string;
  organisation: string;
  phone: string;
  message: string;
  requestId: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  phone: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type InboxData = {
  items: Enquiry[];
  total: number;
  page: number;
  pageSize: number;
  counts: { total: number; new: number; replied: number };
};
