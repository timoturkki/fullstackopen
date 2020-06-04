import React from 'react';
import { Card, Icon } from "semantic-ui-react";

import { HealthCheckEntry, HealthCheckRating } from "../types";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const healtRatingColor = (): any => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'red';
      case HealthCheckRating.HighRisk:
        return 'blue';
      default:
        return 'black';
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <h3>{entry.date} <Icon name="doctor" /></h3>
        </Card.Header>

        <p>{entry.description}</p>

        <Icon color={healtRatingColor()} name="heart" />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryDetails;
