![](./Components/assets/logos/blue.png)

# Zenni

A real-time location sharing app for disasters  
![](./Components/assets/markers/danger.png)
![](./Components/assets/markers/sos.png)
![](./Components/assets/markers/medical.png)
![](./Components/assets/markers/fire.png)

## Requirements
- NodeJS
- yarn
- this repo `git clone https://github.com/cc5-team-red/zenni`

## iOS Get Started
- **Prepare all requirements**
- Additionally, install XCode
- `yarn`
- `yarn ios:install`
- `yarn ios:start` to run the app in simulator.

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