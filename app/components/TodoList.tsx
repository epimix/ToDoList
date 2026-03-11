import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { TodoItem } from './TodoItem';
import { Todo } from '../models/Todo';

interface TodoListProps {
    todos: Todo[];
    loading: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onSelect: (id: number) => void;
}

export const TodoList = ({ todos, loading, onToggle, onDelete, onSelect }: TodoListProps) => {
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <FlatList
            data={todos}
            renderItem={({ item }) => (
                <TodoItem
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onSelect={onSelect}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
        />
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
});
