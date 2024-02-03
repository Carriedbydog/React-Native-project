import "react-native-gesture-handler";
import { Pressable, StatusBar, StyleSheet } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogOut } from "lucide-react-native";
import { CreatePostsScreen } from "./screens/CreatePostsScreen";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/selectors";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/slice";
import { auth } from "./config/firebase";

const MainStack = createStackNavigator();

export default function Navigate() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(user, "user");

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    dispatch(setUser(user));
  });
  if (user) {
    return (
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Публікації",
              headerStyle: {
                backgroundColor: "#fff",
                borderBottomWidth: 1,
              },
              headerRight: () => {
                return (
                  <Pressable
                    onPress={() => {
                      console.log("logout");
                    }}
                  >
                    <LogOut
                      style={styles.iconLogout}
                      color={"#BDBDBD"}
                      size={24}
                    />
                  </Pressable>
                );
              },
            }}
          />
          <MainStack.Screen
            name="CreatePostsScreen"
            component={CreatePostsScreen}
            options={{
              title: "Створити публікацію",
              headerStyle: {
                backgroundColor: "#fff",
                borderBottomWidth: 1,
              },
            }}
          />
        </MainStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LoginScreen">
          <MainStack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  iconLogout: {
    marginRight: 15,
  },
});
