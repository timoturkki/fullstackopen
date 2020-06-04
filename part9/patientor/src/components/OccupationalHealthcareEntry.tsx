import React from 'react';
import { Card, Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <h3>
            {entry.date}
            <Icon name="stethoscope" />
            {entry.employerName}
          </h3>
        </Card.Header>

        <p>{entry.description}</p>

        <ul>
          {(entry.diagnosisCodes || []).map(c => (
            <div key={c}>
              {diagnosis[c] && <li>
                {diagnosis[c].name}
              </li>}
            </div>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;