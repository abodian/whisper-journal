const admin = require("firebase-admin");

const serviceAccount = require("./whisper-journal-4ef93-firebase-adminsdk-xjbi8-f4a173182a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function deleteUser(uid) {
  admin
    .auth()
    .deleteUser(uid)
    .then(function () {
      console.log("Successfully deleted user", uid);
    })
    .catch(function (error) {
      console.log("Error deleting user:", error);
    });
}

function getAllUsers(nextPageToken) {
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        uid = userRecord.toJSON().uid;
        deleteUser(uid);
      });
      if (listUsersResult.pageToken) {
        getAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
}

function createUser(uid, email, password) {
  admin
    .auth()
    .createUser({
      uid: uid,
      email: email,
      password: password,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
}

module.exports = {
  deleteUser,
  getAllUsers,
  createUser,
};
