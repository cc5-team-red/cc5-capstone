import React from "react";
import { Image } from "react-native";

import sos from "../assets/markers/sos.png";
import danger from "../assets/markers/danger.png";
import no_passage from "../assets/markers/no_passage.png";
import crosshairs from "../assets/markers/crosshairs_blue.png";
import fire from "../assets/markers/fire.png";
import medical from "../assets/markers/medical.png";

export const markers = [
  sos, danger, no_passage, fire, medical, crosshairs,
]

export const markerImages = markers.map(markerSrc => () => (
  <Image
    source={markerSrc}
    resizeMode="contain"
    height="50"
  />
));