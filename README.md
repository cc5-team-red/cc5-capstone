<img src="./js/assets/logos/blue.png" alt="Logo" width=200>

# Zenni

A real-time location sharing app for disasters  
![](./js/assets/markers/danger.png)
![](./js/assets/markers/sos.png)
![](./js/assets/markers/medical.png)
![](./js/assets/markers/fire.png)

## Features
- Livetrack your location on a map to see yourself
- See where other users are located on a map
- Create pins and notify other users of where the obstacles are such as blockages (such as a fallen tree, power lines, etc), dangerous zones, people in need, medical tents, refugee gathering areas, or you can customize your type of pins.
- Draw and sketch on the map to add additional information about the area

## Requirements
- NodeJS
- yarn
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
`rm -fr node_modules`  
`rm -fr ios/build`

## Our Mission
<!-- Move this somewhere else? -->
- Enable those who wish to help in a disaster a means to reach those who need it.
- Provide live tracking and sharing of key locations in a disaster.

## Developers:
- Tsubasa Kondo
- Dustin Tran
- Kimiko Motoyama