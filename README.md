![](./js/assets/logos/blue.png)

# Zenni

A real-time location sharing app for disasters  
![](./js/assets/markers/danger.png)
![](./js/assets/markers/sos.png)
![](./js/assets/markers/medical.png)
![](./js/assets/markers/fire.png)

## Requirements
Please install the following tools to manually run this source code:
- NodeJS
- `npm install -g yarn`
- `git clone https://github.com/cc5-team-red/zenni`
- `brew install watchman`

## iOS Get Started
- **Prepare all requirements**
- Additionally, install [XCode](https://developer.apple.com/xcode/), and [cocoapods](https://cocoapods.org/)
- `yarn`
- `yarn ios:install`
- `yarn ios:start` to run the app in simulator.

## Android Get Started (unconfirmed)
- **Prepare all requirements**
- Additionally, install Android Studio
- `yarn`
- `yarn android`

## iOS Hardware Device Get Started
- in xcode, log into an Apple Developer account.
- follow these instructions *meticulously*:  
  https://facebook.github.io/react-native/docs/running-on-device

## Troubleshooting

### `yarn ios:start`
Runs your app in development mode for iOS.  
This will take time and patience, especially the first time.  
In the simulator, type `cmd + r` to refresh, and `cmd + d` to open settings.  
Remote JS Debugging (accessible from `cmd+d`) is hugely beneficial.  

### deleting build files
Deleting build files may solve your problems.  
`rm -fr node_modules`  
`rm -fr ios/build`