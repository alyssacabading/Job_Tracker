/*  Defines enums for job application status and job type.
    These enums are used in the JobValidators class to validate incoming job data,
    could also be used in front end dropdown menus for user selection.
*/

export enum ApplicationStatus {
  Rejected = 'Rejected',
  Applied = 'Applied',
  Interviewing = 'Interviewing',
  OfferPending = 'Offer Pending',
  Accepted = 'Accepted',
}

export enum JobType {
  FullTime = 'Full-Time',
  PartTime = 'Part-Time',
  Internship = 'Internship',
  Contracted = 'Contracted',
  Temporary = 'Temporary',
  Freelance = 'Freelance',
}
