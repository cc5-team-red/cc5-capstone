# Zenni

A real-time location sharing app for disasters  
![](./Components/assets/markers/danger.png)
![](./Components/assets/markers/sos.png)
![](./Components/assets/markers/medical.png)
![](./Components/assets/markers/fire.png)

## Requirements
- An Android OS or iOS device
- the expo app

## Get Started
- Install the [expo client app](https://expo.io/tools#client) on your mobile device.
- Access [our app's expo page](https://exp.host/@tsubasa.k111/capstone-frontend) in your mobile browser

## Get Started (development mode)
- **Prepare all requirements**
- additionally, install NodeJS and yarn
- `git clone https://github.com/cc5-team-red/zenni`
- `cd zenni`
- `yarn`
- `yarn start` to run the app in development mode.

### React Native 
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
A guide for create react native app is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

### `npm start`
Runs your app in development mode.
Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, type capital `R` 

### Publishing to Expo's React Native Community

Expo provides free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
