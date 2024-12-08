import Todo from "./Todo";
import { useEffect, useState } from "react";
export default function App() {
  // useEffect is used in side effects(external) such as fetch,dom
  const [todos, setTodos] = useState([]);
  const [content,setContent]=useState("");
  useEffect(function(){
    async function getTodos() {
      const res = await fetch("http://localhost:5000/show")//fetch data from server
      const todos = await res.json()//convert data to json format
      setTodos(todos.alltodos);
    }
    getTodos()
  }, [])//dependency array->[] means it will run one time
  const createNewTodo=async function(e){
    e.preventDefault();
    const res=await fetch("http://localhost:5000/",{
      method:"POST",
      body:JSON.stringify({ title: "New Todo", description: content }),
      headers:{"Content-Type":"application/json",// server know to expect JSON-formatted data.
    },
    });
    const newTodo=await res.json();
    setContent("");
    setTodos([...todos,newTodo]);
  }
  return (
    <main className="container">
      <h1 className="title">AWESOME TODOS</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input type="text"
              onChange={function(e){
                setContent(e.target.value)
              }}
              value={content}//lets say i wrote "t" in the input box now this will trigger event change and content becomes "t" with help of setContent and then this content is shown as the value of the input box
              
              placeholder="ENTER A NEW TODO"
              className="form__input"
           >
        </input>
              <button type="submit">CREATE A TODO</button>
      </form>
      <div className="todos">
        {todos.map(function (todo) {
         return <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
        })
        }
        </div>
    </main>
  )
}
