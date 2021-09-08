import { Todo } from "../../../model/todo";

const LOCAL_STORAGE_KEY = "todo_mvc";

/**
 * Used to store and retrieve todos to local storage
 * Can be easily removed or replaced
 */
export class TodoLocalStorage {
  /**
   * get todos from local storage
   */
  static getTodoList() {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  }

  /**
   * store todos to local storage
   * @param todoList current list of todos
   */
  static storeTodoList(todoList: Todo[]) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }
}
