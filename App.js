import MainStack from "./navigate";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StyleSheet } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <MainStack />;
}

const styles = StyleSheet.create({});
