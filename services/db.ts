import { Todo, Priority } from "../context/TodoContext";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

const db = SQLite.openDatabaseSync("todo.db");

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<any>(
    "PRAGMA user_version",
  );
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL, 
        todo TEXT NOT NULL, 
        completed INTEGER NOT NULL, 
        priority TEXT, 
        date TEXT
      );
    `);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function addTask(todo: string, date: string, priority: string): Promise<Todo> {
  const id = Date.now();
  await db.runAsync(
    `INSERT INTO tasks (id, todo, completed, priority, date) VALUES (?, ?, ?, ?, ?);`,
    [id, todo, 0, priority, date]
  );
  return { id, todo, completed: false, priority: priority as Priority, date };
}

export async function deleteTask(id: number) {
  await db.runAsync(`DELETE FROM tasks WHERE id = ?;`, [id]);
}

export async function updateTask(item: Todo) {
  await db.runAsync(
    `UPDATE tasks SET todo = ?, completed = ?, priority = ?, date = ? WHERE id = ?;`, 
    [item.todo, item.completed ? 1 : 0, item.priority ?? 'low', item.date ?? '', item.id]
  );
}

export async function getTasks(): Promise<Todo[]> {
  const tasks = await db.getAllAsync<any>("SELECT * FROM tasks ORDER BY id DESC;");
  return tasks.map(t => ({
    ...t,
    completed: t.completed === 1
  }));
}