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

// # JSX
//  コンポーネントを作ることで MVC のときにしていた id をひたすら割り振っていく処理から解放されます。
//  なぜなら HTML と JS をセットにできるからです。
//  そのためコードの行数が膨らむ問題を緩和できます。
//  さらにスタイルやイベントハンドラも JSX に埋め込めます。
//  そのためこれまでオブジェクトに代入して振る舞いや文言を定義していた問題が解決されます。

// # State
//  React では UI = f(state) という考えが中心にあります。これは state を作れば自動で UI が作られるという考え方です。
//  todos の配列が増えると、勝手に UI の todos も増えていく点です。
//  これは MVC では Controller がモデルへの追加と UI への同期を行っていたのに対し、印象的です。
//  Controller で行っていた同期処理をライブラリが行ってくれます。
//  つまり React を使うと state だけに気を払えばあとは勝手にライブラリが View への反映をしてくれます。
//  このデータの管理だけ気を払えば View を生成してくれるというのが React を使う大きな理由です。

// # 仮想DOMにより全更新も解消
