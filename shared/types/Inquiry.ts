export type InquiryBase = {
  name: string;
  email: string;
  company?: string;
  software?: string;
  message: string;
};

export type Inquiry = {
  inquiryId: string;
  status: "new" | "reviewed" | "closed";
  createdAt: string;
} & InquiryBase;
