const admin = require('firebase-admin');

const serviceAccount = require('../doana-a1ea8-firebase-adminsdk-lyiui-653e68d64b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.firebase.google.com/u/1/project/doana-a1ea8/firestore/data/~2F',
});

const db = admin.firestore();

module.exports = { db };