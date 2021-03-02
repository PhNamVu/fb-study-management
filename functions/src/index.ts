import * as functions from "firebase-functions";

export const adminSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/admin-setup")).default(req, res)
})

export const managerSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/manager-setup")).default(req, res)
})

export const studentSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/student-setup")).default(req, res)
})

export const coordinatorSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/coordinator-setup")).default(req, res)
})

export const guestSetup = functions.https.onRequest(async (req, res) => {
    await (await import("./fn/services/auth/guest-setup")).default(req, res)
})