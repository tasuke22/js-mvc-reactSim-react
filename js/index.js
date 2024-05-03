console.log("hello world!")

function handleFormSubmit() {
    const input = document.getElementById("task-input");
    const inputValue = input.value;
    if (!inputValue.length > 0) {
        alert("テキストを入力してください。");
        return;
    }
    const todosEl = document.getElementById("todos");
    const todoEl = createTodoElement(inputValue); // ①Viewを作成 ③データ（inputValue）を直接UI（todoEl）に結びつけている
    todosEl.appendChild(todoEl);
    input.value = "";
}

function createTodoElement(inputValue) {
    const todoEl = document.createElement("li");
    const checkBoxEl = document.createElement("input");
    todoEl.appendChild(checkBoxEl);
    const labelEl = document.createElement("label");
    labelEl.innerText = inputValue; // ③データ（inputValue）を直接UI（labelEl）に結びつけている
    checkBoxEl.type = "checkbox";
    checkBoxEl.onchange = function (e) {  // ①チェックボックスのイベントハンドラを登録 ②チェックボックスのイベントハンドラを直接セット
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
    buttonEl.onclick = function () { // ①削除ボタンのイベントハンドラを登録 ②削除ボタンのイベントハンドラを直接セット
        todoEl.remove();
    };
    todoEl.appendChild(buttonEl);

    return todoEl;
}

// ① 関数が長く複雑で見通しが悪い(責務が分割されてない)
// ② オブジェクトへの代入で UI や挙動を作るため処理が追い辛く、破壊も容易
// ③ データと UI の密結合(データ（タスクの状態）とその表示（DOM要素）が密結合しているため、一方を変更すると他方も直接影響)
