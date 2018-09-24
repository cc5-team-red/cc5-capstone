# Design Guideline

This document outlines how this app should be in terms of look and feel, to provide a consistent experience that facilitates and maximizes the disaster response experience.

## Core Design Values

All text and interfaces should be created so that it upholds the following core design values:

#### Functional
  - All interfaces and text should, above all, *express it's function*.
#### Simple
  - Use logos and visual cues instead of text wherever possible.
  - There should be absolutely no flair or attitude that does not provide additional value to the user in the disaster context.
  - Do not have any interfaces that cause confusion.
#### Universal
  - the user should be able to intuitively navigate through the app with little to no education.
#### Safety
  - the user should be informed whenever a user is about to conduct an unsafe operation.
  - eg: begin sharing location
  - eg: go near a hazard / help marker

## Color Scheme
- The base color of the app is white/grey (#ECECE7).  
  This is to provide a sense of simplicity and cleanliness,  
  And aids in identification of all actionable interfaces
- Text Color: signal black #2B2B2C
- With the core design values in consideration,  
we will use the ISO international standards for safety symbols ([ISO 3864](https://en.wikipedia.org/wiki/ISO_3864)) for UI item colors.

Meaning |  Name | RGB Hex[3] | 
-- | -- | -- |
Warning | Signal Yellow | #F9A800 |  
Prohibition/Fire Equipment | Signal Red | #9B2423 |  
Mandatory | Signal Blue | #005387 |  
Safe Condition | Signal Green | #237F52 |  
Backgrounds and Symbol | Signal White  | #ECECE7 |  
Symbol | Signal Black  | #2B2B2C |


## Fonts
- The base font for this app is **Lato** from Google webfonts.
- Navigation headers will be in Lato Black in ALL UPPER CASE.
- Text will be in Lato Regular.
- The map will displayed in explicitly white and greyscale, so that the markers will become visually easier to identify. (https://mapstyle.withgoogle.com/)

## Markers
![](./Components/assets/markers/danger.png)
![](./Components/assets/markers/sos.png)
![](./Components/assets/markers/medical.png)
![](./Components/assets/markers/fire.png)

- Use [ISO 7010](https://en.wikipedia.org/wiki/ISO_7010) markers wherever possible.
- If there are no applicable ISO 7010 signage, create a sign with the same styling 

## Logos

![](./Components/assets/logos/blue.png)
![](./Components/assets/logos/yellow.png)