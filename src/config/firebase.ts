import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';
import dotenv from 'dotenv';


dotenv.config();

try {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
        storageBucket: process.env.FIREBASE_BUCKET,
    });
    console.log('Firebase Admin Initialized');
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

export const bucket = admin.apps.length ? admin.storage().bucket() : null;
export default admin;
