export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    priority?: Priority;
    date?: string;
}
