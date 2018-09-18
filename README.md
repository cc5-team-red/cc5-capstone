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
- `watchman`
- this repo `git clone https://github.com/cc5-team-red/zenni`

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

## Troubleshooting

### `yarn ios:start`
Runs your app in development mode for iOS.  
This will take time and patience, especially the first time.  
In the simulator, type `cmd + r` to refresh, and `cmd + d` to open settings.  
Remote JS Debugging (accessible from `cmd+d`) is hugely beneficial.  

### deleting build files
Deleting build files may solve your problems.  
`git clean -xfd`
`watchman shutdown-server`
`brew update`
`brew reinstall watchman`
`npm install metro`
`yarn ios:install`
`npm audit`?
 `rm -fr $TMPDIR/metro*`
 https://github.com/facebook/react-native/issues/9309#issuecomment-238966924
 `rm -rf ~/.rncache`
`react-native run-ios --device "Tsubasa’s iPhone"`

https://sourceforge.net/projects/boost/files/boost/1.63.0/boost_1_63_0.tar.gz/download