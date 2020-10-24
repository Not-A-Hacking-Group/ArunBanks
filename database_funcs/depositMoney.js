const fbadmin = require("firebase-admin");

module.exports = function(userID, amount, callback) {

    var coll = fbadmin.firestore().collection("users");

    var userInfo = {};

    coll.where("userID", "==", userID)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                userInfo = doc.data();
                userInfo.balance += parseFloat(amount);
                doc.ref.set(userInfo);
            });
            callback();
        })
        .catch(err => console.log(`Error getting documents: ${err}`));

}