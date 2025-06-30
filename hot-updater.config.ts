import {bare} from '@hot-updater/bare';
import {firebaseDatabase, firebaseStorage} from '@hot-updater/firebase';
import 'dotenv/config';
import * as admin from 'firebase-admin';
import {defineConfig} from 'hot-updater';

const credential = admin.credential.applicationDefault();

export default defineConfig({
  build: bare({enableHermes: true}),
  storage: firebaseStorage({
    projectId: process.env.HOT_UPDATER_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.HOT_UPDATER_FIREBASE_STORAGE_BUCKET!,
    credential,
  }),
  database: firebaseDatabase({
    projectId: process.env.HOT_UPDATER_FIREBASE_PROJECT_ID!,
    credential,
  }),
  updateStrategy: 'appVersion',
});
