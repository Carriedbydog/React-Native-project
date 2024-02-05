import { Formik } from "formik";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/operations";

const LoginScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({});

  const dispatch = useDispatch();

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };
  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFormSubmit = (values) => {
    const { email, password } = values;
    if (email && password) {
      dispatch(authSignInUser(values)).unwrap();
      navigation.navigate("Home");
    } else {
      alert("Заповніть всі поля");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../assets/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Увійти</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, action) => {
                handleFormSubmit(values);
                action.resetForm();
              }}
            >
              {(props) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      isFocused.email ? styles.focused : null,
                    ]}
                    value={props.values.email}
                    placeholder="Адреса електронної пошти"
                    onChangeText={props.handleChange("email")}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordWrapper,
                      isFocused.password ? styles.focused : null,
                    ]}
                    value={props.values.password}
                    placeholder="Пароль"
                    onChangeText={props.handleChange("password")}
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />

                  <Text
                    style={styles.passwordShow}
                    onPress={handleShowPassword}
                  >
                    {isPasswordVisible ? "Сховати" : "Показати"}
                  </Text>
                  <Pressable style={styles.button} onPress={props.handleSubmit}>
                    <Text style={styles.textButton}>Увійти</Text>
                  </Pressable>
                  <Text
                    style={styles.login}
                    onPress={() => navigation.navigate("RegistrationScreen")}
                  >
                    Немає акаунту? Зареєструватися
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    width: "100%",
    height: "65%",
    marginTop: "auto",
    marginBottom: 0,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 90,
    position: "relative",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imageWrapper: {
    display: "block",
    position: "absolute",
    top: -70,
    left: "35%",
    width: 130,
    height: 120,
    borderRadius: 18,
    backgroundColor: "#f6f6f6",
  },
  icon: {
    position: "absolute",
    bottom: 10,
    right: -14,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    letterSpacing: 0.3,
    fontWeight: "500",
    marginBottom: 33,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  focused: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    height: 51,
    marginTop: 27,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "normal",
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordShow: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "normal",
    right: 16,
    top: 72,
    color: "#1B4371",
    padding: 10,
  },
  login: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
  },
});
