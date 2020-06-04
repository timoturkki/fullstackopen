import express from 'express';

import patientService from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPublicPatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message); 
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (!patient) {
    res.sendStatus(404);
  }

  try {
    const newEntry = toNewEntry(req.body);

    const addedPatient = patientService.addEntryForPatient(patient as Patient, newEntry);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message); 
  }
});


export default router;