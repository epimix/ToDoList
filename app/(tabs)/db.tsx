import { addTask, deleteTask, getTasks } from "@/services/db";
import React, { useEffect, useState } from "react";
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Todo } from "../../context/TodoContext";

const Database = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setItems((await getTasks()) ?? []);
  };

  const addItemHandle = async () => {
    if (!text.trim()) return;

    const createdItem = await addTask(text, new Date().toLocaleDateString(), "medium");
    setItems([createdItem, ...items]);
    setText("");
  };

  const removeItemHandle = async (id: number) => {
    await deleteTask(id);
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks Database Screen</Text>

      <Text>Task: </Text>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Add New Task" onPress={addItemHandle} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.id} - {item.todo}
            </Text>
            <Button
              title="Remove"
              onPress={() => removeItemHandle(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

export default Database;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "black",
    minWidth: 300,
  },
  label: {
    fontSize: 12,
    color: "black",
    marginBottom: 4,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    minWidth: 300,
  },
  itemText: {
    flex: 1,
    color: "black",
  },
});