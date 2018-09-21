![](./js/assets/logos/blue.png)

# Zenni

A real-time location sharing app for disasters  
![](./js/assets/markers/danger.png)
![](./js/assets/markers/sos.png)
![](./js/assets/markers/medical.png)
![](./js/assets/markers/fire.png)

## Requirements
- NodeJS
- yarn
- this repo `git clone https://github.com/cc5-team-red/zenni`

## iOS Get Started (simulator)
- **Prepare all requirements**
- Additionally, install [XCode](https://developer.apple.com/xcode/), and [cocoapods](https://cocoapods.org/)
- `yarn`
- `yarn ios:install`
- `yarn ios:start` to run the app in simulator.

## iOS Get Started (Actual Device)
- **Prepare all requirements**
- Additionally, install [XCode](https://developer.apple.com/xcode/), and [cocoapods](https://cocoapods.org/)
- `yarn`
- `yarn ios:install`
- `yarn global add ios-deploy`
- plug in your iOS device.  
  make sure you 'allow' the computer to access your phone.
- `yarn ios:device`
- a list of candidate device UUIDs will be displayed.  
  choose one, and copy it.
- `yarn ios:device CHOSEN_UUID`

## Android Get Started (unconfirmed)
- **Prepare all requirements**
- Additionally, install Android Studio
- `yarn`
- `yarn android`

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