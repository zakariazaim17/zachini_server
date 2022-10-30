//import firebaseApp from "./firebase.js";
//import storage from "./firebase.js";

import { async } from "@firebase/util";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(image) {
  const storage = getStorage();

  const name = new Date() + image.originalname;

  const storageRef = ref(storage, `images/${name}`);

  var metadata = {
    contentType: "image/jpeg",
  };

  try {
    const task = uploadBytes(storageRef, image.buffer, metadata);
    //imageRef.child(name).put(image, image.type);
    return await task
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        console.log("This is the image URL", url);
        return url;
      });
  } catch (e) {
    console.log("error", e);
  }
}
