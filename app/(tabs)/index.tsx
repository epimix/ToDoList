import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTodos } from '../../context/TodoContext';
import { useRouter } from 'expo-router';
import { TodoList } from '../components/TodoList';

export default function ListScreen() {
    const { todos, loading, toggleTodo, deleteTodo, setSelectedTodoId } = useTodos();
    const router = useRouter();

    const handleSelectTodo = (id: number) => {
        setSelectedTodoId(id);
        router.push('/details');
    };

    return (
        <View style={styles.container}>
            <TodoList
                todos={todos}
                loading={loading}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onSelect={handleSelectTodo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
});
