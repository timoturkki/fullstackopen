/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewPatient,
  Gender,
  NewBaseEntry,
  NewEntry,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge,
  DiagnoseEntry,
  Entry
} from './types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry ${JSON.stringify(value)}`);
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

export const toNewBaseEntry = (object: any): NewBaseEntry => {
  const entry = {
    type: parseEntryType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if (object.diagnosisCodes) {
    (entry as NewBaseEntry).diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return entry;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = toNewBaseEntry(object) as Entry;
  
  switch (baseEntry.type) {
    case EntryType.Hospital:
      const hospitalEntry = {
        ...baseEntry,
        discharge: parseDischarge(object.discharge)
      };

      return hospitalEntry;
    case EntryType.HealthCheck:
      const healthCheckEntry = {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };

      return healthCheckEntry;
    case EntryType.OccupationalHealthcare:
      const occupationalHealthcareEntry = {
        ...baseEntry,
        employerName: parseEmployerName(object.employerName)        
      };

      if (object.sickLeave) {
        occupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      
      return occupationalHealthcareEntry;
    default:
      return assertNever(baseEntry);
  }
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName: ${employerName}`);
  }

  return employerName;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria}`);
  }

  return criteria;
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
      throw new Error(`Incorrect or missing type: ${type}`);
  }

  return type;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${rating}`);
  }

  return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) throw new Error(`Incorrect or missing discharge: ${discharge}`);

  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseDiagnosesCodes = (diagnosisCodes: any[]): Array<DiagnoseEntry['code']> => {
  if (!Array.isArray(diagnosisCodes) || !diagnosisCodes.every(c => isString(c))) {
    throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}`);
  }

  return diagnosisCodes as Array<DiagnoseEntry['code']>;
};