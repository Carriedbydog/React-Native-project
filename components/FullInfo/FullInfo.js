import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalStyles } from "../../styles/style";

export default function FullInfo({ navigation, route }) {
  const loadScene = () => {
    navigation.goBack();
  };
  return (
    <View style={globalStyles.main}>
      <Image
        style={styles.img}
        source={{
          uri: route.params.img,
        }}
      />
      <Text style={[globalStyles.title, styles.title]}>
        {route.params.name}
      </Text>
      <Text style={styles.full}>{route.params.fullText}</Text>
      <Button title="Go back" onPress={loadScene} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    marginBottom: 30,
    objectFit: "contain",
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    color: "#333",
    // fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  full: {
    fontSize: 16,
    color: "#333",
    // fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});
