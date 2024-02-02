import "react-native-gesture-handler";
import { Provider } from "react-redux";
import MainStack from "./navigate";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
