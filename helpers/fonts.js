// import { Font } from 'expo';
import pragatiNarrowBold from "../Components/assets/fonts/PragatiNarrow-Bold.ttf";
import pragatiNarrowRegular from "../Components/assets/fonts/PragatiNarrow-Regular.ttf";
import latoBlack from "../Components/assets/fonts/Lato-Black.ttf"
import latoBold from "../Components/assets/fonts/Lato-Bold.ttf"
import latoRegular from "../Components/assets/fonts/Lato-Regular.ttf"

export const loadFonts = async () => {
  await Font.loadAsync({
    'pragati-narrow-bold': pragatiNarrowBold,
    'pragati-narrow-regular': pragatiNarrowRegular,
    'lato-black': latoBlack,
    'lato-bold': latoBold,
    'lato-regular': latoRegular,
  })
    .catch(error => {
      console.log(`Error loading fonts:`, error)
    });
}
