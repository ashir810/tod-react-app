import { useEffect, useState } from "react";
import ToDo from "./todo"


function App() {
  return (
    <>
      < Todolist />
    </>
  )
}

function Todolist() {
  const [todos, setTodos] = useState([''])
  const [text, setText] = useState('')

  function fetchtodofromserver() {
    return fetch('http://localhost:3000/list')
      .then((res) => res.json())
      .then((result) => {
        setTodos(result.todos);
      });
  }
  useEffect(() => {
    fetchtodofromserver();
  }, []);

  function addTodo() {
    fetch('http://localhost:3000/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: text })


    })
      .then(() => {
        fetchtodofromserver();
      });
    setText("");
  }
  function onInputchanged(e) {
    const newText = e.target.value;
    setText(newText)
  }

  
 
  return (
    <>
     <h1>TO-DO-LIST</h1>
      <div className="div1">
        <input className="input" value={text} onChange={onInputchanged} type="text" placeholder="ENTER YOUR TASK"></input>
        <button className="button" onClick={addTodo}>Add</button>
      </div>
      <ul className="ul">
        {todos.map((item) => (
          <ToDo key={item.id} item={item} fetchtodofromserver={fetchtodofromserver} />
       ) )}
      </ul>
    </>
  )
}
export default App;
