// Romanian BlackList Firebase Web config.
// Paste values from Firebase Console → Project settings → Your apps.
// Never place Firebase service-account credentials in this file.
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

