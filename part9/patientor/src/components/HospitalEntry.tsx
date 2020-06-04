import React from 'react';
import { Card, Icon } from "semantic-ui-react";

import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <h3>{entry.date} <Icon name="hospital" /></h3>
        </Card.Header>

        <p>{entry.description}</p>

        <p>Discharge: {entry.discharge.date} (criteria: {entry.discharge.criteria})</p>

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

export default HospitalEntryDetails;