import * as functions from "firebase-functions";

export const adminSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/admin-setup")).default(req, res)
})

export const studentSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/student-setup")).default(req, res)
})
