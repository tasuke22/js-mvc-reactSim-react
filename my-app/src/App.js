import {useState} from "react";

function App() {
    const [idCounter, setIdCounter] = useState(0);
    const [todos, setTodo] = useState([]);

    /**
     * フォーム送信したらtodo配列にtodoを追加
     * @param {Event} e 送信イベント
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = e.target["task"].value;
        const nextid = idCounter + 1;
        setIdCounter(nextid);
        setTodo([...todos, { id: nextid, task: inputText, checked: false }]);
        e.target["task"].value = ""; // 入力フィールドをクリア
    };

    /**
     * 指定idをtodo配列から取り除く
     * @param {number} id
     */
    const handleClickDeleteButton = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    };

    /**
     * TODOのチェックボックスがクリックされたら該当の checked フラグを toggle する
     * @param {number} id
     */
    const handleChangeCheckBox = (id) => {
        const changedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, checked: !todo.checked };
            }
            return todo;
        });
        setTodo(changedTodos);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input name="task" />
                <button>登録</button>
            </form>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className={todo.checked ? "checked" : ""}>
                        <input
                            type="checkbox"
                            onChange={() => handleChangeCheckBox(todo.id)}
                        />
                        {todo.task}
                        <button onClick={() => handleClickDeleteButton(todo.id)}>
                            削除
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;