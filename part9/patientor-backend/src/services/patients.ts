import { v4 as uuidv4 } from 'uuid';

import { patientData } from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getPublicPatientData = (): PublicPatient[] => {
  return patients.map(patient => ({ ...patient, ssn: undefined, entries: undefined }));
};

const addPatient = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuidv4();
  const Patient = { ...entry, id };
  
  patients.push(Patient);
  return Patient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addEntryForPatient = (patient: Patient, entry: NewEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuidv4();
  const newEntry = { ...entry, id } as Entry;
  const newPatientData = {
    ...patient,
    entries: [
      ...patient.entries,
      newEntry
    ]
  };
  
  const patientIndex = patients.indexOf(patient);
  patients[patientIndex] = newPatientData;
  return newPatientData;
};


export default {
  getEntries,
  getPublicPatientData,
  addPatient,
  findById,
  addEntryForPatient
};