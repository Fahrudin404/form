import { state } from "./states";

export interface FormData {
  vanueTitle: string;
  altName: string;
  address: string;
  city: string;
  country: string;
  state: state;
  zip: string;
  parking_fee: boolean;
  parking_info: string;
}