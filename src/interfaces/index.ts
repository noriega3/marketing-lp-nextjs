// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type ScheduleFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string;
  time: string;
  TFN: string;
  contactbymiddleinitial?: string; //honeypot
  contactbyemail: string; //honeypot
  contactbyfax?: string; //honeypot
}