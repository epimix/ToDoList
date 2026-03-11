import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo, Priority } from '../models/Todo';

interface TodoItemProps {
    item: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onSelect: (id: number) => void;
}

export const TodoItem = ({ item, onToggle, onDelete, onSelect }: TodoItemProps) => {
    const getPriorityColor = (priority?: Priority) => {
        switch (priority) {
            case 'high': return '#FF5252';
            case 'medium': return '#FFC107';
            case 'low': return '#4CAF50';
            default: return '#888';
        }
    };

    return (
        <View style={styles.todoCard}>
            <TouchableOpacity
                style={styles.todoInfo}
                onPress={() => onToggle(item.id)}
            >
                <Ionicons
                    name={item.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.completed ? '#4CAF50' : '#888'}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.todoText, item.completed && styles.completedText]}>
                        {item.todo}
                    </Text>
                    <View style={styles.metaContainer}>
                        <Text style={styles.dateText}>{item.date}</Text>
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                            <Text style={styles.priorityText}>{item.priority}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onSelect(item.id)} style={styles.actionButton}>
                    <Ionicons name="eye-outline" size={20} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
                    <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    todoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    todoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    todoText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#AAA',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginRight: 8,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    priorityText: {
        fontSize: 10,
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 4,
        marginLeft: 8,
    },
});
