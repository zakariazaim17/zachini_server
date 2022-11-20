//import Users from "../models/user";
import { login, signUp, signout } from "../firebase/userHandler.js";
import Users from "../models/user.js";

// Create new product (push image to Firebase and append the URL link to new product )
export const createUser = async (req, res) => {
  const body = req.body;

  const userEmail = body.email.toLowerCase();
  const userPassword = body.password;

  try {
    const createdUser = await signUp(userEmail, userPassword);

    console.log("new USER", createdUser);

    const newUser = new Users({
      ...body,
    });

    /* const token = jwt.sign(
      { user_id: newUser._id, userEmail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    newUser.token = token;

    */
    await newUser.save();

    res.status(201).json(createdUser.stsTokenManager.accessToken);
  } catch (e) {
    console.log("error", e);
    return res.status(500).json(e.code);
  }
};

export const loginUser = async (req, res) => {
  const userEmail = req.body.email.toLowerCase();
  const userPassword = req.body.password;

  try {
    const logedInUser = await login(userEmail, userPassword);

    console.log("loged IN USER", logedInUser);
    res.status(200).json(logedInUser.stsTokenManager.accessToken);
  } catch (e) {
    console.log("Error121212", e);
    return res.status(500).json(e.code);
  }
};

export const signOut = async (req, res) => {
  try {
    signout();
    res.status(201).send("user is logedOut");
  } catch (e) {
    console.log("ERORR", e);
    return res.status(500).json(e.code);
  }
};
