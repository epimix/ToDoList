import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTodos } from '../../context/TodoContext';
import { useRouter } from 'expo-router';
import { TodoForm } from '../components/TodoForm';

export default function CreateScreen() {
    const { addTodo } = useTodos();
    const router = useRouter();

    const handleFormSubmit = (data: any) => {
        addTodo(data.todo, data.date, data.priority);
        router.push('/');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TodoForm onSubmit={handleFormSubmit} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
});
