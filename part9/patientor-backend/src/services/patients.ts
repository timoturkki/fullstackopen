import patientData from '../../data/patients.json';

import { PatientEntry, PublicPatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getPublicEntries = (): PublicPatientEntry[] => {
  return patients.map(patient => {
    delete patient.ssn;
    return patient;
  });
};

export default {
  getEntries,
  getPublicEntries
};