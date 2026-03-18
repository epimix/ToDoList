import { Stack } from "expo-router";
import { TodoProvider } from "../context/TodoContext";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <TodoProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TodoProvider>
    </Provider> 
  );
}
