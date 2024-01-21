import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { Formik } from "formik";

export default function Form({ handleAddArticle }) {
  return (
    <View>
      <Formik
        initialValues={{ name: "", email: "", password: "", img: "" }}
        onSubmit={(values, action) => {
          handleAddArticle(values);
          action.resetForm();
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              value={props.values.name}
              multiline
              placeholder="Type the title"
              onChangeText={props.handleChange("name")}
            />
            <TextInput
              style={styles.input}
              value={props.values.anons}
              multiline
              placeholder="Type the anons"
              onChangeText={props.handleChange("anons")}
            />
            <TextInput
              style={styles.input}
              value={props.values.fullText}
              multiline
              placeholder="Type the full text"
              onChangeText={props.handleChange("fullText")}
            />
            <TextInput
              style={styles.input}
              value={props.values.img}
              multiline
              placeholder="Enter the image URL"
              onChangeText={props.handleChange("img")}
            />
            <Button title="Add article" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});
