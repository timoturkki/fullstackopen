import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addIndividualPatient } from "../state";

interface MatchParams {
  id: string;
}

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
          <i aria-hidden="true" className="genderless icon"></i>
        }
        {patient.gender === Gender.Male &&
          <i aria-hidden="true" className="mars icon"></i>
        }
        {patient.gender === Gender.Female &&
          <i aria-hidden="true" className="venus icon"></i>
        }
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
