
## Add Firebase SDK

- From:  https://console.firebase.google.com/u/1/project/contact-list-react-demo/overview

- If you’re already using npm and a module bundler such as webpack or Rollup, you can run the following command to install the latest SDK:
```javascript
npm install firebase
```

<br>

- Initialize Firebase and begin using the SDKs for the products you’d like to use.

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx-JHliqD8emabRoDg0mh_HrbmTYcL81E",
  authDomain: "contact-list-react-demo.firebaseapp.com",
  projectId: "contact-list-react-demo",
  storageBucket: "contact-list-react-demo.appspot.com",
  messagingSenderId: "180667592290",
  appId: "1:180667592290:web:9a43e56bc32e45f80fab3b",
  measurementId: "G-9PD40D657J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

### Other Resources
- [Getting Started](https://firebase.google.com/docs/web/setup?authuser=1)
- [Web SDK API Reference](https://firebase.google.com/docs/reference/js/?authuser=1)
- [Samples](https://firebase.google.com/docs/samples/?authuser=1)
- [Firebase CLI reference](https://firebase.google.com/docs/cli/?authuser=1) 
- [Get started with Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart?authuser=1)
- [Web APP URL](https://contact-list-react-demo.web.app/)


## Install Firebase CLI

- To host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

Run the following npm command to install the CLI or update to the latest CLI version.

npm install -g firebase-tools
Doesn't work? Take a look at the Firebase CLI reference or change your npm permissions
```javascript
npm install -g firebase-tools
```

## Deploy to Firebase Hosting

You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

<br>

Sign in to Google
```javascript
firebase login
```

<br>
Initiate your project
Run this command from your app’s root directory:

```javascript
firebase init
```
<br>

When you’re ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:
```javascript
firebase deploy
```
