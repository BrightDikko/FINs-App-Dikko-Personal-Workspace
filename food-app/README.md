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
expo start

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

## Packages Used
This project makes use of the following packages:
* [React Navigation](https://reactnavigation.org/) - tab navigation
* [NativeBase](https://nativebase.io/) - styling
* [Google Firebase](https://firebase.google.com/) - backend interface

## Firebase Access
To gain access to the firebase project console, please contact Jack (jgordley@nd.edu) and he will provide access.