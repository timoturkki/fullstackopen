import { v4 as uuidv4 } from 'uuid';

import { patientData } from '../../data/patients';
import { PatientEntry, PublicPatientEntry, NewPatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getPublicEntries = (): PublicPatientEntry[] => {
  return patients.map(patient => ({ ...patient, ssn: undefined }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuidv4();
  const patientEntry = { ...entry, id };
  
  patients.push(patientEntry);
  return patientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getEntries,
  getPublicEntries,
  addEntry,
  findById
};