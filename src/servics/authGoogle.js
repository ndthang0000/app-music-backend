var admin = require("firebase-admin");

var serviceAccount = require("./music-app-react-338f8-firebase-adminsdk-tn1ca-27766ab690.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyToken=async(idToken)=>{
    const data=await admin.auth().verifyIdToken(idToken)
    return data
}

module.exports=verifyToken