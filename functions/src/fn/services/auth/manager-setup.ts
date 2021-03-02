import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { v4 as uuid } from 'uuid'

import { createManager } from "../../helpers/auth/manager/create-manager"
import { managerCustomClaims } from "../../helpers/auth/manager/manager-claims"


admin.initializeApp();

export default async (
  req: functions.https.Request,
  res: functions.Response
): Promise<any> => {
  console.log(`/managerSetup start`);
  try {
    const userId = uuid()
    const {
      input: { email, fullName, password },
    } = req.body.input;

    await admin.auth().createUser({
      uid: userId,
      email,
      emailVerified: false,
      password,
      displayName: fullName,
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false
  })
  .then(function() {
      
      console.log("Successfully created new manager:", userId)
      createManager({
        object: {
          id: userId,
          email,
          fullName,
          roles: 'MANAGER'
        },
      });
  
  })
  .catch(function(error) {
      console.log("Error creating new user:", error);
  });
    
    // set custome claims on this user
    const customClaims = managerCustomClaims(userId);
    await admin.auth().setCustomUserClaims(userId, customClaims);

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: userId,
    });
  } catch (error) {
    console.log(`/managerSetup end with error`);
    console.error(error);
    return res
      .status(400)
      .json({ status: "fail", statusCode: 400, message: error });
  }
};
