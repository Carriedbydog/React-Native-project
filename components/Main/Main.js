import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { globalStyles } from "../../styles/style";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { PlusSquare, XCircle } from "lucide-react-native";
import Form from "../Form/Form";

export default function Main({ navigation }) {
  const [news, setNews] = useState([
    {
      name: "Google",
      anons: "Google is the best",
      fullText: "Google is the best search engine in the world",
      key: "1",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    },
    {
      name: "Apple",
      anons: "Apple is the best",
      fullText: "Apple is the best company in the world",
      key: "2",
      img: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202103181147",
    },
    {
      name: "Facebook",
      anons: "Facebook is the best",
      fullText: "Facebook is the best social network in the world",
      key: "3",
      img: "https://www.facebook.com/images/fb_icon_325x325.png",
    },
  ]);

  const [modalWindow, setModalWindow] = useState(false);

  const handleAddArticle = (article) => {
    article.key = Math.random().toString();
    setNews((list) => {
      return [article, ...list];
    });
    setModalWindow(false);
  };

  return (
    <View style={globalStyles.main}>
      <Modal visible={modalWindow}>
        <View style={globalStyles.main}>
          <XCircle
            color={"black"}
            style={styles.closeIcon}
            size={30}
            onPress={() => setModalWindow(false)}
          />
          <Text style={styles.title}>Modal</Text>
          <Form handleAddArticle={handleAddArticle} />
        </View>
      </Modal>
      <View style={styles.iconWrapper}>
        <PlusSquare
          style={styles.addIcon}
          color={"green"}
          size={30}
          onPress={() => setModalWindow(true)}
        />
      </View>
      <Text style={[globalStyles.title, styles.header]}>Home</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("FullInfo", item)}
          >
            <Image
              style={styles.img}
              source={{
                uri: item.img,
              }}
            />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 30,
    marginTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  item: {
    width: "100%",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: "#333",
    // fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  img: {
    marginBottom: 20,
    objectFit: "contain",
    width: "100%",
    height: 200,
  },
});
