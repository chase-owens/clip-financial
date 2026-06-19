export type Status = "new" | "reviewed" | "quoted" | "closed";

export type InquiryBase = {
  name: string;
  email: string;
  company?: string;
  software?: string;
  message: string;
};

export type Inquiry = {
  inquiryId: string;
  status: Status;
  createdAt: string;
  lastUpdatedAt: string;
} & InquiryBase;
