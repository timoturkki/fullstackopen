import React from 'react';

import { Entry, EntryType} from "../types";

import HealthCheckEntryDetails from "./HealthCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry: ${JSON.stringify(value)}`);
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
