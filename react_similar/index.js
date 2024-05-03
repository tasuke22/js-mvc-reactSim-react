class TodoListModel {
    constructor() {
        this.idCounter = 0;
        this.todos = new Map();
    }

    addTodo(task) {
        this.idCounter += 1;
        this.todos.set(this.idCounter, {
            id: this.idCounter,
            task,
            checked: false,
        });
        return this.idCounter;
    }

    removeTodo(id) {
        this.todos.delete(id);
    }

    checkTodo(id, isCheck) {
        const todo = this.todos.get(id);
        const stateChangedTodo = { ...todo, checked: isCheck };
        this.todos.set(id, stateChangedTodo);
        return this.getTodo(id);
    }

    getTodo(id) {
        return this.todos.get(id);
    }

    getTodos() {
        return Array.from(this.todos.values());
    }
}

const todoList = new TodoListModel();

class View {
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

    flash() { // ③flashを使うことでイベントハンドラの登録は楽になったが、ユーザーがいちいち呼ぶ必要あるので、イベントハンドラの登録漏れが発生しうる
        const todos = todoList.getTodos();
        view.render(todos); // ①全更新しているのでパフォーマンスはよくない

        // イベントハンドラの付け直し
        todos.forEach((todo) => {
            const id = todo.id;
            this.handleCheckTask(id);
            this.handleClickDeleteTask(id);
        });
    }

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
            this.flash(); // ②データを変えるたびにUI更新する関数を呼んでいる
        });
    }

    handleCheckTask(id) {
        const checkBoxEl = document.getElementById(`checkbox-${id}`);
        checkBoxEl.addEventListener("change", (e) => {
            const checked = e.target.checked;
            todoList.checkTodo(id, checked);
            this.flash(); // ②データを変えるたびにUI更新する関数を呼んでいる
        });
    }

    handleClickDeleteTask(id) {
        const buttonEl = document.getElementById(`button-${id}`);
        buttonEl.addEventListener("click", () => {
            todoList.removeTodo(id);
            this.flash(); // ②データを変えるたびにUI更新する関数を呼んでいる
        });
    }
}

const formController = new Controller();
formController.setup();

// ①全更新している(この形式だと 1 つの Todo を更新しただけのときも要素を全更新しており、パフォーマンスはよくない)
// ②データを変えるたびに UI を更新する関数を呼ぶ必要がある(ユーザーは flush を呼ぶ必要があるので根本的な問題は解決していません)
// ③イベントハンドラを付け直す必要がある(flush を使うことでイベントハンドラの登録は楽になったが、ユーザーは flush を呼ぶ必要があるので根本的な問題は解決していません)


// Model のデータを元に UI を作る点は React の思想に近い。
