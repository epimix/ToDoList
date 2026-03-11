import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos, Priority } from '../../context/TodoContext';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
    const { todos, selectedTodoId, toggleTodo, deleteTodo } = useTodos();
    const router = useRouter();

    const todo = todos.find(t => t.id === selectedTodoId);

    if (!todo) {
        return (
            <View style={styles.center}>
                <Ionicons name="documents-outline" size={64} color="#CCC" />
                <Text style={styles.emptyText}>Виберіть завдання зі списку</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/')}
                >
                    <Text style={styles.backButtonText}>До списку</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const getPriorityColor = (priority?: Priority) => {
        switch (priority) {
            case 'high': return '#FF5252';
            case 'medium': return '#FFC107';
            case 'low': return '#4CAF50';
            default: return '#888';
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View
                        style={[
                            styles.priorityBadge,
                            { backgroundColor: getPriorityColor(todo.priority) },
                        ]}
                    >
                        <Text style={styles.priorityText}>{todo.priority}</Text>
                    </View>
                    <Text style={styles.dateText}>{todo.date}</Text>
                </View>

                <Text style={[styles.title, todo.completed && styles.completedText]}>
                    {todo.todo}
                </Text>

                <View style={styles.statusRow}>
                    <Ionicons
                        name={todo.completed ? 'checkmark-circle' : 'time-outline'}
                        size={24}
                        color={todo.completed ? '#4CAF50' : '#FFC107'}
                    />
                    <Text style={[styles.statusText, { color: todo.completed ? '#4CAF50' : '#FFC107' }]}>
                        {todo.completed ? 'Виконано' : 'В процесі'}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.toggleBtn]}
                        onPress={() => toggleTodo(todo.id)}
                    >
                        <Ionicons
                            name={todo.completed ? 'refresh' : 'checkmark'}
                            size={20}
                            color="#FFF"
                        />
                        <Text style={styles.actionBtnText}>
                            {todo.completed ? 'Поновити' : 'Виконати'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, styles.deleteBtn]}
                        onPress={() => {
                            deleteTodo(todo.id);
                            router.push('/');
                        }}
                    >
                        <Ionicons name="trash-outline" size={20} color="#FFF" />
                        <Text style={styles.actionBtnText}>Видалити</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        marginTop: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    priorityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    priorityText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        lineHeight: 32,
        marginBottom: 20,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#AAA',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F3F5',
        marginBottom: 24,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    toggleBtn: {
        backgroundColor: '#007AFF',
    },
    deleteBtn: {
        backgroundColor: '#FF5252',
    },
    actionBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    backButton: {
        marginTop: 24,
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#007AFF',
        borderRadius: 12,
    },
    backButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
