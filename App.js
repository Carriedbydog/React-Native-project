import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <RegistrationScreen />
    </>
  );
}

const styles = StyleSheet.create({});
