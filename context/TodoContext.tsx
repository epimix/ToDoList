import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { addTask, deleteTask, updateTask, getTasks } from '../services/db';

export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    priority?: Priority;
    date?: string;
}

interface TodoContextType {
    todos: Todo[];
    loading: boolean;
    selectedTodoId: number | null;
    setSelectedTodoId: (id: number | null) => void;
    addTodo: (todo: string, date: string, priority: Priority) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    fetchTodos: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTodos(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch todos from database');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo: string, date: string, priority: Priority) => {
        try {
            const newTodo = await addTask(todo, date, priority);
            setTodos([newTodo, ...todos]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTodo = async (id: number) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            const updatedTodo = { ...todo, completed: !todo.completed };
            try {
                await updateTask(updatedTodo);
                setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await deleteTask(id);
            setTodos(prev => prev.filter(t => t.id !== id));
            if (selectedTodoId === id) setSelectedTodoId(null);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <TodoContext.Provider value={{
            todos,
            loading,
            selectedTodoId,
            setSelectedTodoId,
            addTodo,
            toggleTodo,
            deleteTodo,
            fetchTodos
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}
