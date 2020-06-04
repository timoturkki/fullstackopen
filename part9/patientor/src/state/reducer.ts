import { State } from "./state";
import { Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_INDIVIDUAL_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      patientId: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_INDIVIDUAL_PATIENT":
      return {
        ...state,
        individualPatients: {
          ...state.individualPatients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        individualPatients: {
          ...state.individualPatients,
          [action.patientId]: {
            ...state.individualPatients[action.patientId],
            entries: [
              ...state.individualPatients[action.patientId].entries,
              action.payload
            ]
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload };
};

export const addPatient = (payload: Patient): Action => {
  return { type: "ADD_PATIENT", payload };
};

export const addIndividualPatient = (payload: Patient): Action => {
  return { type: "ADD_INDIVIDUAL_PATIENT", payload };
};

export const addEntry = (patientId: string, payload: Entry): Action => {
  return { type: "ADD_ENTRY", payload, patientId };
};