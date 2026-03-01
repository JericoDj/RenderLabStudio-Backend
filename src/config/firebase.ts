import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        storageBucket: process.env.FIREBASE_BUCKET,
    });
    console.log('Firebase Admin Initialized');
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

export const bucket = admin.apps.length ? admin.storage().bucket() : null;
export default admin;
