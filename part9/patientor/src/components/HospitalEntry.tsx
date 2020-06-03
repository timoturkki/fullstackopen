import React from 'react';
import { Card, Icon } from "semantic-ui-react";

import { HospitalEntry } from "../types";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <h3>{entry.date} <Icon name="hospital" /></h3>
        </Card.Header>

        <p>{entry.description}</p>

        <p>Discharge: {entry.discharge.date} (criteria: {entry.discharge.criteria})</p>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryDetails;