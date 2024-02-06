import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";

export const PostsScreen = () => {
  const users = useSelector(selectUser);
  return (
    <View style={styles.container}>
      <Text>PostsScreenad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
