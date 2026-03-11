import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Priority } from '../models/Todo';

interface FormData {
    todo: string;
    date: string;
    priority: Priority;
}

interface TodoFormProps {
    onSubmit: (data: FormData) => void;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            todo: '',
            date: new Date().toLocaleDateString(),
            priority: 'medium',
        },
    });

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case 'high': return '#FF5252';
            case 'medium': return '#FFC107';
            case 'low': return '#4CAF50';
            default: return '#888';
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Назва завдання</Text>
                <Controller
                    control={control}
                    rules={{ required: 'Назва обовʼязкова' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Що потрібно зробити?"
                            multiline
                        />
                    )}
                    name="todo"
                />
                {errors.todo && <Text style={styles.errorText}>{errors.todo.message}</Text>}
            </View>

            <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Дата</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="ДД.ММ.РРРР" />
                        )}
                        name="date"
                    />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Пріоритет</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.prioritySelector}>
                                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                                    <TouchableOpacity
                                        key={p}
                                        onPress={() => onChange(p)}
                                        style={[styles.priorityOption, value === p && { backgroundColor: getPriorityColor(p) }]}
                                    >
                                        <Text style={[styles.priorityOptionText, value === p && { color: '#FFF' }]}>
                                            {p[0].toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        name="priority"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.submitButtonText}>Створити завдання</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 24,
    },
    formGroup: {
        marginBottom: 24,
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 12,
        marginTop: 4,
    },
    prioritySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priorityOption: {
        flex: 1,
        height: 48,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    priorityOptionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
