# FINS React Native App
This is the repo for the [React Native](https://reactnative.dev) implementation of the FINS team app.

## Pre-reqs
You must have the following tools installed for this project:
* [Node.js](https://nodejs.org/en/)
* [Expo](https://expo.dev/tools#cli) - instructions below

## Installation
This project was created using the [expo-cli](https://expo.dev/tools#cli) for development. To install, run the following:

```bash
npm install --global expo-cli
```

Once you have cloned the project, navigate to the `food-app` directory, use the following command to install the necessary project packages.

```bash
# Navigate to project directory
cd food-app

# Install packages
npm install
```

## Getting Started
To run the project using the [expo-cli](https://expo.dev/tools#cli), run the following:

```bash
npx expo start

OR

npm start
```

This will start the project and bring up a list of options on where to run the app: 
```bash
› Press a │ open Android
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press d │ show developer tools
› shift+d │ toggle auto opening developer tools on startup (enabled)

› Press ? │ show all commands
```

For the simplest workflow, it is recommended to install [Android Studio](https://developer.android.com/studio) and to add a virtual device to test on. The instructions to install android studio and set up an AVD (Android Virtual Device) can be found on the [Expo Tutorial Site](https://docs.expo.dev/workflow/android-studio-emulator/). You can also run this project on the web or a [physical device](https://docs.expo.dev/guides/testing-on-devices/).

To test on a physical device, you must make an expo account and download the Expo Go app on your device. Then from the web console (once you have run `npx expo start`) you can navigate to the sidebar and click `Publish or republish project` where you will be able to log in to your expo account and publish the project. The app will then appear on your Expo Go app to be tested on your physical device.

## Main Packages Used
This project makes use of the following packages:
* [React Navigation](https://reactnavigation.org/) - tab navigation
* [Google Firebase](https://firebase.google.com/) - backend interface (uses Firestore Database instead of Realtime Database)

## Firebase Access
To gain access to the firebase project console, please contact Jack (jgordley@nd.edu) and he will provide access.

## Suggested Resources
If you are new to React-Native or this general workflow, we recommend following through one or more of the following tutorials:
* [React Native Official Starter Tutorial (~15 min)](https://reactnative.dev/docs/tutorial)
* [React Native Styling Best Practices (~30 min)](https://thoughtbot.com/blog/structure-for-styling-in-react-native)
* [Full Walkthrough - Todo list app (~1 hour)](https://www.simplilearn.com/react-native-tutorial-article)
* [React Native Official Core Components Documentation](https://reactnative.dev/docs/components-and-apis)
* [Firebase Firestore offical documentation](https://firebase.google.com/docs/firestore/query-data/get-data)
* [React Navigation official documentation (we use the drawer navigator)](https://reactnavigation.org/docs/getting-started)

## Important Next Steps

### Difficulty: Easy
* Develop script in `Node.js` to import json data to Firebase so more advanced recipe and food information can be sent to Firebase. [This tutorial](https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57) shows how to set this up.
* Improve general styling of the app, possibly by implementing from the best practices tutorial above

### Difficult: Medium
* Add a page that can render recipe data when clicked from the home page instead of taking the user to an external recipe link.
* Improve styling of the home page by adding a health score indicator of some kind. Inspiration can be found [here with a doughnut style indicator](https://reactjsexample.com/react-component-to-display-a-score-with-a-steps-chart/)
* Finish the user settings page with specified 

### Difficulty: Hard
* Implement and store a unique uuid using [react-native-uuid](https://www.npmjs.com/package/react-native-uuid) for each user that opens the app. Use this uuid to store user attributes in Firestore by uuid. This workflow aims to avoid having each user log in by remembering passwords, username, etc.
* This section will be populated by things like querying the data received from firestore based on current user attributes in the settings page. More info to come.