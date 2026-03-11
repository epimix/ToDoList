import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

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

const API_URL = 'https://dummyjson.com/todos';

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
            const response = await fetch(API_URL);
            const data = await response.json();
            const enrichedTodos = data.todos.map((todo: any) => ({
                ...todo,
                priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Priority,
                date: new Date().toLocaleDateString(),
            }));
            setTodos(enrichedTodos);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = (todo: string, date: string, priority: Priority) => {
        const newTodo: Todo = {
            id: Date.now(),
            todo,
            completed: false,
            priority,
            date,
        };
        setTodos([newTodo, ...todos]);
    };

    const toggleTodo = (id: number) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(t => t.id !== id));
        if (selectedTodoId === id) setSelectedTodoId(null);
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
