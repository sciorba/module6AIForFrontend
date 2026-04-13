export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: "general" | "support" | "billing" | "feedback";
  message: string;
  subscribe: boolean;
}

export interface FieldError {
  field: keyof ContactFormData;
  message: string;
}
