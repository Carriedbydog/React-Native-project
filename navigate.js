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
import { useEffect } from "react";
import { authSignOutUser, authStateChange } from "./redux/operations";

const MainStack = createStackNavigator();

export default function Navigate() {
  const user = useSelector(selectUser);
  console.log(user, "user");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChange());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  if (user && user.uid) {
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
                  <Pressable onPress={handleSignOut}>
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
