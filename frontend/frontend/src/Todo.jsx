export default function Todo(props){
    const { todo,setTodos } = props;

    const deletetodo=async function(){
      const res=await fetch("http://localhost:5000/delete",{
        method:"DELETE",
        body:JSON.stringify({
          id:todo._id
        }),
        headers:{"Content-Type":"application/json",
      }
      })
      const newtodo=await fetch("http://localhost:5000/show");
      const newdata=await newtodo.json();
      setTodos(newdata.alltodos);
    }
   const toggleStatus=async function(){
    const res=await fetch("http://localhost:5000/update",{
      method:"PUT",
      body:JSON.stringify({
        id:todo._id,
        status:!todo.completed,
      }),
      headers:{"Content-Type":"application/json",
    },
    });
      //after updation ;fetch updated todos
      const updatedTodos=await fetch("http://localhost:5000/show");
      const todosData=await updatedTodos.json();
      setTodos(todosData.alltodos);
   };
 
 return (<div key={todo._id} className="todo">
    <p>{todo.description}</p>
    <div>
      <button className="todo__status"
      onClick={toggleStatus}>
        {(todo.completed) ? "✅" : "🔲"}
      </button>
      <button className="todo__delete" onClick={deletetodo}>🗑️</button>
    </div>
  </div>
  )
}//| 