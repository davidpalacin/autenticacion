import { ObjectId } from "mongodb";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
}