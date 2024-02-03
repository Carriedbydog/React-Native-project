import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { PlusCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
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
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";

const RegistrationScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleFormSubmit = async (values) => {
    const { name, email, password, image } = values;
    if (email && password && name && image) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const simpleUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      dispatch(setUser(simpleUser));
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
            <Formik
              initialValues={{ name: "", email: "", password: "", image: "" }}
              onSubmit={(values, action) => {
                handleFormSubmit(values);
                action.resetForm();
                console.log(values);
              }}
            >
              {(props) => {
                const handleSelectImage = async (props) => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });

                  console.log(result);

                  if (!result.cancelled) {
                    setSelectedImage(result.assets[0].uri);
                    props.setFieldValue("image", result.assets[0].uri);
                  }
                };
                return (
                  <View>
                    <View style={styles.imageWrapper}>
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 130, height: 120, borderRadius: 18 }}
                        onError={(error) => console.log(error)}
                      />
                      <Pressable onPress={() => handleSelectImage(props)}>
                        <PlusCircle
                          color={"#FF6C00"}
                          style={styles.icon}
                          size={30}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.title}>Реєстрація</Text>
                    <TextInput
                      style={[
                        styles.input,
                        isFocused.name ? styles.focused : null,
                      ]}
                      value={props.values.name}
                      placeholder="Логін"
                      onChangeText={props.handleChange("name")}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                    />
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
                    <Pressable
                      style={styles.button}
                      onPress={props.handleSubmit}
                    >
                      <Text style={styles.textButton}>Зареєструватися</Text>
                    </Pressable>
                    <Text
                      style={styles.login}
                      onPress={() => navigation.navigate("LoginScreen")}
                    >
                      Вже є акаунт? Увійти
                    </Text>
                  </View>
                );
              }}
            </Formik>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

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
    height: "70%",
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
    position: "absolute",
    top: -150,
    left: "30%",
    width: 130,
    height: 120,
    borderRadius: 18,
    backgroundColor: "#f6f6f6",
  },
  icon: {
    position: "absolute",
    top: -35,
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
    bottom: 134,
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
