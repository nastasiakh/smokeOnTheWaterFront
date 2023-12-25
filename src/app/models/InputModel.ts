export interface InputModel {
  type: "email" | "password" | "phone" | "text",
  label: string,
  initialValue?: string;
}
