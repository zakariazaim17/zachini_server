import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(image) {
  const storage = getStorage();

  storage.maxUploadRetryTime = 120000;

  const name = new Date() + image.originalname;

  const storageRef = ref(storage, `images/${name}`);

  var metadata = {
    contentType: "image/jpeg",
  };

  try {
    const task = uploadBytes(storageRef, image.buffer, metadata);

    console.log("task given", await task);
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
