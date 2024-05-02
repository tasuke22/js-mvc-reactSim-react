class TodoListModel {
    constructor() {
        this.idCounter = 0;
        this.todos = new Map();
    }

    /**
     * task を todo として todoList に追加する.
     * @param {string} task
     * @returns 追加された todo の id
     */
    addTodo(task) {
        this.idCounter += 1;
        this.todos.set(this.idCounter, {
            id: this.idCounter,
            task,
            checked: false,
        });
        return this.idCounter;
    }

    /**
     * 指定idのTODOを削除
     * @param {number} id TODOのid
     */
    removeTodo(id) {
        this.todos.delete(id);
    }

    /**
     * TODOの完了状態を変更する
     * @param {number} id TODOのid
     * @param {boolean} isCheck 次のcheck状態
     * @returns 更新済みTODO
     */
    checkTodo(id, isCheck) {
        const todo = this.todos.get(id);
        const stateChangedTodo = { ...todo, checked: isCheck };
        this.todos.set(id, stateChangedTodo);
        return this.getTodo(id);
    }

    /**
     * 指定したidのTODOを取得
     * @param {number} id TODOのid
     * @returns TODO
     */
    getTodo(id) {
        return this.todos.get(id);
    }

    /**
     * todosを全件取得
     * @returns TODOs
     */
    getTodos() {
        return Array.from(this.todos.values());
    }
}

const todoList = new TodoListModel();

class View {
    /**
     * TODOの配列からUIを生成する関数
     * @param {Todo[]} todos
     */
    render(todos) {
        const todosEl = document.getElementById("todos");
        todosEl.innerHTML = "";
        const fragment = document.createDocumentFragment();
        todos.forEach((todo) => {
            const todoEl = this._createTodoElement(todo);
            fragment.appendChild(todoEl);
        });
        todosEl.appendChild(fragment);
    }

    /**
     * TODO要素を作る
     * @param {id: number, task: string} todo
     * @returns todoのHTML要素
     */
    _createTodoElement(todo) {
        const { id, task, checked } = todo;
        const todoEl = document.createElement("li");
        todoEl.id = `todo-${id}`;
        const checkBoxEl = document.createElement("input");
        todoEl.appendChild(checkBoxEl);
        const labelEl = document.createElement("label");
        labelEl.innerText = task;
        checkBoxEl.type = "checkbox";
        checkBoxEl.id = `checkbox-${todo.id}`;
        checkBoxEl.checked = checked;
        todoEl.appendChild(labelEl);

        if (checked) {
            todoEl.className = `checked`;
        } else {
            todoEl.className = "";
        }

        const buttonEl = document.createElement("button");
        buttonEl.id = `button-${id}`;
        buttonEl.innerText = "削除";
        todoEl.appendChild(buttonEl);

        return todoEl;
    }
}

const view = new View();

class Controller {
    setup() {
        this.handleSubmitForm();
    }

    flash() {
        const todos = todoList.getTodos();
        view.render(todos);

        // イベントハンドラの付け直し
        todos.forEach((todo) => {
            const id = todo.id;
            this.handleCheckTask(id);
            this.handleClickDeleteTask(id);
        });
    }

    /**
     * タスク送信時にTODO追加とUI反映をする
     */
    handleSubmitForm() {
        const formEl = document.getElementById("task-send-form");
        formEl.addEventListener("submit", (ev) => {
            ev.preventDefault();

            const input = document.getElementById("task-input");
            const task = input.value;
            if (!task.length > 0) {
                alert("テキストを入力してください。");
                return;
            }
            const addedId = todoList.addTodo(task);
            this.flash();
        });
    }

    /**
     * 指定したcheckboxの状態変化に応じてTODO更新とUI反映をする
     * @param {number} id TODOのid
     */
    handleCheckTask(id) {
        const checkBoxEl = document.getElementById(`checkbox-${id}`);
        checkBoxEl.addEventListener("change", (e) => {
            const checked = e.target.checked;
            todoList.checkTodo(id, checked);
            this.flash();
        });
    }

    /**
     * 指定したTODO削除とUI反映をする
     * @param {*} id TODOのid
     */
    handleClickDeleteTask(id) {
        const buttonEl = document.getElementById(`button-${id}`);
        buttonEl.addEventListener("click", () => {
            todoList.removeTodo(id);
            this.flash();
        });
    }
}

const formController = new Controller();
formController.setup();