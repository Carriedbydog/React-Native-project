import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LogOut } from "lucide-react-native";
import { CreatePostsScreen } from "./CreatePostsScreen";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <View>
    //     <FlatList />
    //   </View>
    // </View>

    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={
        (({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "ProfileScreen") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "PostsScreen") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }),
        {
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        })
      }
    >
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <Pressable
              style={styles.button}
              {...props}
              onPress={() => navigation.navigate("CreatePostsScreen")}
            >
              <Text>+</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textAddButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
