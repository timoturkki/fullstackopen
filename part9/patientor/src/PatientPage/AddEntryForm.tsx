import React from "react";
import axios from "axios";
import { Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, SelectOptions, SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Entry, EntryType, HealthCheckRating, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addEntry } from "../state";

export type PatientFormValues = EntryFormValues;

const typeOptions: SelectOptions[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.OccupationalHealthCare, label: "Occupational" },
  { value: EntryType.Hospital, label: "Hospital" }
];

export const AddEntryForm: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [{ diagnosis }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();

  const submitNewEntry = async (values: PatientFormValues, { resetForm }: { resetForm: () => void }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submitValues: any = {...values};
    try {
      if (submitValues.type === EntryType.Hospital) {
        submitValues.discharge = {
          date: submitValues.dischargeDate,
          criteria: submitValues.dischargeCriteria,
        };
      }

      if (submitValues.type === EntryType.OccupationalHealthCare) {
        submitValues.sickLeave = {
          startDate: submitValues.sickLeaveStartDate,
          endDate: submitValues.sickLeaveEndDate,
        };
      }

      delete submitValues.dischargeDate;
      delete submitValues.dischargeCriteria;
      delete submitValues.sickLeaveStartDate;
      delete submitValues.sickLeaveEndDate;

      if (submitValues.type !== EntryType.OccupationalHealthCare) {
        delete submitValues.employerName;
      }

      if (submitValues.type !== EntryType.HealthCheck) {
        delete submitValues.healthCheckRating;
      }

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        submitValues
      );
      dispatch(addEntry(patientId, newEntry));
      resetForm();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  return (
    <>
      <h2>Add entries!</h2>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

      <Formik
        initialValues={{
          type: EntryType.HealthCheck,
          description: "",
          date: "",
          specialist: "",
          healthCheckRating: HealthCheckRating.Healthy,
          dischargeDate: "",
          dischargeCriteria: "",
          employerName: "",
          sickLeaveStartDate: "",
          sickLeaveEndDate: "",
        }}
        onSubmit={submitNewEntry}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (values.type === EntryType.HealthCheck && (values.healthCheckRating === undefined || values.healthCheckRating === null)) {
            errors.healthCheckRating = requiredError;
          }
          if (values.type === EntryType.Hospital && !values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (values.type === EntryType.Hospital && !values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          if (values.type === EntryType.OccupationalHealthCare && !values.employerName) {
            errors.employerName = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <SelectField
                label="Entry type"
                name="type"
                options={typeOptions}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
               <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              /> 
              <Field
                label="Date Of Entry"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              {values.type === EntryType.HealthCheck && <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />}
              {values.type === EntryType.Hospital && <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
              />}
              {values.type === EntryType.Hospital && <Field
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="dischargeCriteria"
                component={TextField}
              />}
              {values.type === EntryType.OccupationalHealthCare && <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />}
              {values.type === EntryType.OccupationalHealthCare && <Field
                label="Sick leave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveStartDate"
                component={TextField}
              />}
              {values.type === EntryType.OccupationalHealthCare && <Field
                label="Sick leave end date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveEndDate"
                component={TextField}
              />}
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add Entry
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEntryForm;
