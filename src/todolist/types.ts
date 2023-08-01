export interface Todo {
  id?: string;
  title: string;
  description: string;
  image: string;
  status: "IN_PROGRESS" | "COMPLETED";
}
