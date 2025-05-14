
var firebaseConfig = {
    apiKey: "AIzaSyDZnZF1D18u-5kOhvrmsSqotdxgMUksnRw",
    authDomain: "quiz-app-71cb7.firebaseapp.com",
    projectId: "quiz-app-71cb7",
    storageBucket: "quiz-app-71cb7.firebasestorage.app",
    messagingSenderId: "222113569084",
    appId: "1:222113569084:web:7ea2257834ca92e7ac2639"
  };


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
