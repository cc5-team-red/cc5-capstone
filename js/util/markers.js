import React from "react";
import { Image } from "react-native";

import sos from "../assets/markers/sos.png";
import danger from "../assets/markers/danger.png";
import no_passage from "../assets/markers/no_passage.png";
import crosshairs from "../assets/markers/crosshairs_blue.png";
import fire from "../assets/markers/fire.png";
import medical from "../assets/markers/medical.png";
import blue_user from "../assets/markers/blue_user.png";

export const markers = {
  help: sos,
  danger: danger,
  no_passage: no_passage,
  fire: fire,
  medical: medical,
  user: blue_user,
}

export const markerImages = Object.entries(markers)
  .filter(([key, value]) => {
    return (key !== "blue_user");
  })
  .map(([key, markerSrc]) => () => (
    <Image
      source={markerSrc}
      resizeMode="contain"
      height="50"
    />
  )
);