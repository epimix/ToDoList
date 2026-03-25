import { Stack } from "expo-router";
import { TodoProvider } from "../context/TodoContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "../services/db";
import { GestureHandlerRootView } from "react-native-gesture-handler";  

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>  
      <SQLiteProvider databaseName="todo.db" onInit={migrateDbIfNeeded}>
        <TodoProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </TodoProvider>
      </SQLiteProvider>
      </GestureHandlerRootView>  
    </Provider> 
  );
}
