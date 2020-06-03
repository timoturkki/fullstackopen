import React from 'react';
import { Card, Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
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
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;