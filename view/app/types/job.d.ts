export interface JobData {
  companyName: string;
  applicationStatus: string;
  jobType: string;
  salary?: number;
  contacts?: string[];
  skills?: string[];
}

export interface ApplicationFormData {
  _id: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  jobTitle: string;
  contacts: string;
  skills: string;
}

export interface Application {
  _id: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  jobTitle: string;
  contacts?: Contact[];
  skills?: string[];
}

export interface Contact {
  id?: string; // id is optional
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
}

export interface Skill {
  id?: string;
  name: string;
}
