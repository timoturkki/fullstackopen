import React from 'react';

import { Entry } from "../types";

import HealthCheckEntryDetails from "./HealthCheckEntry";
import HospitalEntryDetails from "./HospitalEntry";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
