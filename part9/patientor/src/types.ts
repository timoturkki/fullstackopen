export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id?: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
