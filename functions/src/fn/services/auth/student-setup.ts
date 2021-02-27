import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { v4 as uuid } from 'uuid'

import { createStudent } from "../../helpers/auth/student/create-student"
import { studentCustomClaims } from "../../helpers/auth/student/student-claims"


admin.initializeApp();

export default async (
  req: functions.https.Request,
  res: functions.Response
): Promise<any> => {
  console.log(`/studentSetup start`);
  try {
    const userId = uuid()
    const {
      input: { email, facultyId, fullName, password, roles  },
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
      
      console.log("Successfully created new student:", userId)
      createStudent({
        object: {
          id: userId,
          email,
          fullName,
          facultyId,
          roles,
        },
      });
  
  })
  .catch(function(error) {
      console.log("Error creating new user:", error);
  });
    
    // set custome claims on this user
    const customClaims = studentCustomClaims(userId, facultyId);
    await admin.auth().setCustomUserClaims(userId, customClaims);

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Ok",
    });
  } catch (error) {
    console.log(`/studentSetup end with error`);
    console.error(error);
    return res
      .status(400)
      .json({ status: "fail", statusCode: 400, message: error });
  }
};
