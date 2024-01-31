import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Camera, MapPin, Trash2 } from "lucide-react-native";
import MapView, { Marker } from "react-native-maps";

export const CreatePostsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setRegion({
        ...coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      const addresses = await Location.reverseGeocodeAsync(coords);
      const address = addresses[0];
      const locationString = `${address.city}, ${address.region}, ${address.country}`;
      setLocation(locationString);
    })();
  }, []);

  const handleMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    setRegion({
      ...coords,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const addresses = await Location.reverseGeocodeAsync(coords);
    const address = addresses[0];
    const locationString = `${address.city}, ${address.region}, ${address.country}`;
    setLocation(locationString);
    setIsMapVisible(false);
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    Alert.alert("Select a photo", "Choose the source", [
      {
        text: "Camera",
        onPress: async () => {
          const cameraPermission =
            await ImagePicker.requestCameraPermissionsAsync();
          if (cameraPermission.status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
          }
        },
      },
      {
        text: "Library",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={selectedImage ? { uri: selectedImage } : null}
          style={selectedImage ? styles.imagePicker : {}}
          onError={(error) => console.log(error)}
        />
        <View style={styles.imageCircle}>
          <Pressable onPress={handleSelectImage}>
            <Camera size={24} color={"#BDBDBD"} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.text}>Завантажте фото</Text>
      <TextInput style={styles.input} placeholder="Назва..." />
      <View style={styles.locationWrapper}>
        <Pressable
          style={styles.iconLocation}
          onPress={() => setIsMapVisible(true)}
        >
          <MapPin size={24} color={"#E8E8E8"} />
        </Pressable>
        <TextInput
          style={[styles.input, styles.location]}
          placeholder="Місцевість..."
          value={location}
        />
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Опублікувати</Text>
      </Pressable>
      <View style={styles.bottomContainer}>
        <Pressable>
          <View style={styles.trashButton}>
            <Trash2 style={styles.trashIcon} color={"#BDBDBD"} />
          </View>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isMapVisible}
        onRequestClose={() => {
          setIsMapVisible(false);
        }}
      >
        <MapView
          style={styles.mapStyle}
          region={region}
          showsUserLocation={true}
          onPress={handleMapPress}
        >
          {location && (
            <Marker title="I am here" coordinate={region} description="Hello" />
          )}
        </MapView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  mapWrapper: {},
  imageWrapper: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    position: "relative",
  },
  imageCircle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 100,
    position: "absolute",
    top: 80,
    left: "40%",
    zIndex: 5,
  },
  text: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 24,
    color: "#BDBDBD",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  locationWrapper: {
    position: "relative",
  },
  location: {
    paddingLeft: 40,
  },
  iconLocation: {
    position: "absolute",
    bottom: 34,
    left: 12,
    zIndex: 5,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  trashButton: {
    marginTop: 120,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 23,
    backgroundColor: "#F6F6F6",
  },
  imagePicker: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
