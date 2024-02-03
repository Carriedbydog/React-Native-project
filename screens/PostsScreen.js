import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";

export const PostsScreen = () => {
  const users = useSelector(selectUser);
  console.log(users, "users");
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
