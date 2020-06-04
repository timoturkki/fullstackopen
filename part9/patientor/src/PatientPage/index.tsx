import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Icon } from "semantic-ui-react";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { useStateValue, addIndividualPatient } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ individualPatients }, dispatch] = useStateValue();

  const patient = individualPatients[id];

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addIndividualPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };
    
    if (id && !patient) {
      fetchPatientList();
    }
  }, [dispatch, id, patient]);

  if (!patient) {
    return <p>User not found...</p>;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Other &&
          <Icon name="genderless" />
        }
        {patient.gender === Gender.Male &&
          <Icon name="mars" />
        }
        {patient.gender === Gender.Female &&
          <Icon name="venus" />
        }
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      {(patient.entries).map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <AddEntryForm patientId={patient.id} />
    </div>
  );
};

export default PatientPage;
