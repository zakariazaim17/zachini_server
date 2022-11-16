import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { adminAuth } from "./firebase.js";

const auth = getAuth();

export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return Promise.resolve(user);
      // ...
    })
    .catch((e) => {
      console.log("errrrr", e.code);
      return Promise.reject(e);
    });
};

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return Promise.resolve(user);
      // ...
    })
    .catch((e) => {
      console.log("errrrr", e.code);
      return Promise.reject(e);
    });
};

export const signout = async () => {
  return signOut(auth)
    .then((result) => {
      return console.log("resulttt", result);
    })
    .catch((e) => {
      return console.log("error", e);
    });
};

export const authenticate = async (req, res, next) => {
  console.log("autorrrrrrII  :", req.headers.authorization?.split(" ")[1]);

  if (!req.headers.authorization)
    return res.status(500).json("no token provided");
  await adminAuth
    .auth()
    .verifyIdToken(req.headers.authorization?.split(" ")[1])
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      next();
    })
    .catch((e) => {
      console.log("eroorooroor", e.errorInfo);
      res.status(511).json(e.errorInfo.code);
    });
};
