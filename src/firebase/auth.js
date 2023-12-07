import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';

// Anmeldung mit Google
export const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Anmeldung mit GitHub
export const signInWithGitHub = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

// Registrieren eines neuen Benutzers
export const signUp = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

// Anmelden eines Benutzers
export const signIn = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// Senden einer E-Mail zur Passwortzurücksetzung
export const resetUserPassword = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

// Senden einer E-Mail zur Verifizierung
export const sendVerification = () => {
  const auth = getAuth();
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser);
  } else {
    throw new Error("No user is signed in.");
  }
};
