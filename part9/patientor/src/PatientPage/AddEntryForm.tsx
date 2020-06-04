import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, SelectOptions, SelectField } from "../AddPatientModal/FormField";
import { Entry, EntryType } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addEntry } from "../state";

export type PatientFormValues = Omit<Entry, "id">;

const typeOptions: SelectOptions[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.OccupationalHealthCare, label: "Occupational" },
  { value: EntryType.Hospital, label: "Hospital" }
];

export const AddEntryForm: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();

  const submitNewEntry = async (values: PatientFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, newEntry));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <>
    {error}
      <Formik
        initialValues={{
          type: EntryType.HealthCheck,
          description: "",
          date: "",
          specialist: ""
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
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
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
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
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
