console.log("hello world!")

function handleFormSubmit() {
    const input = document.getElementById("task-input");
    const inputValue = input.value;
    if (!inputValue.length > 0) {
        alert("テキストを入力してください。");
        return;
    }
    const todosEl = document.getElementById("todos");
    const todoEl = createTodoElement(inputValue);
    todosEl.appendChild(todoEl);
    input.value = "";
}

function createTodoElement(inputValue) {
    const todoEl = document.createElement("li");
    const checkBoxEl = document.createElement("input");
    todoEl.appendChild(checkBoxEl);
    const labelEl = document.createElement("label");
    labelEl.innerText = inputValue;
    checkBoxEl.type = "checkbox";
    checkBoxEl.onchange = function (e) {
        const checked = e.target.checked;
        if (checked) {
            todoEl.className = `checked`;
        } else {
            todoEl.className = "";
        }
    };
    todoEl.appendChild(labelEl);

    const buttonEl = document.createElement("button");
    buttonEl.innerText = "削除";
    buttonEl.onclick = function () {
        todoEl.remove();
    };
    todoEl.appendChild(buttonEl);

    return todoEl;
}