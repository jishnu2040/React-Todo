import './App.css';
import React,{useState, useEffect} from 'react';
import {AiOutlineDelete, animationDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs';

function App() {

  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle,setNewTitle] =useState(" ");
  const [newDescription, setNewDescription] = useState(" ")
  const [completedTodos, setCompletedTodos] = useState([])

  const handlerAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      desciption: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };


  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1)

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }

  const handleCompletedTodolist = (index)=> {
      let now = new Date();
      let dd =now.getDate();
      let mm =now.getMonth() +1;
      let yyyy =now.getFullYear()
      let h =now.getHours()
      let m = now.getMinutes();
      let s = now.getSeconds();
      let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ":" +"s";

    // object which todo completed
      let filteredItem = {
          ...allTodos[index],
          completedOn:completedOn
      }

      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr);
      handleDeleteTodo(index)
      localStorage.setItem('completedTodo',JSON.stringify(updatedCompletedArr))

       
  }

  const handleDeleteCompleteTodo = (index) =>{

    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index)

    localStorage.setItem('completedTodo', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);

  }

  useEffect(()=> {
      let savedTodo = JSON.parse(localStorage.getItem('todolist'))
      let savedCompleted = JSON.parse(localStorage.getItem('completedTodo'))
      if(savedTodo){
        setTodos(savedTodo); 
      }
      if(savedCompleted){
        setCompletedTodos(savedCompleted);
      }
  },[])


  return (
    <div className="App">
      <h1>ToDo</h1>
      <div className="todo-wrapper">
        <div className="todo-input">

          <div className= "todo-input-item">
            <label>Title </label>
            <input 
            className='todo-inputbox' 
            placeholder="What is the task title?"  
            type="text" value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)}
            
            />
          </div>

          <div className= "todo-input-item">
            <label>Description </label>
            <input
                className='todo-inputbox'
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
            
              />

          </div>

          <div className= "todo-input-item">
            <button type="button" onClick={handlerAddTodo} className="primary-Btn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} 
          onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`}
           onClick={()=>setIsCompleteScreen(true) }>Completed</button>
        </div>

        <div className="todo-list">

          {isCompleteScreen===false && allTodos.map((item, index)=>{
            return (
              <div className='todo-list-item'>
              <div>
                <h3 >{item.title}</h3>
                <p>{item.desciption}</p>
              </div>
  
              <div>
                <AiOutlineDelete onClick={()=> handleDeleteTodo(index)  } className='icon' />
                <BsCheckLg onClick={()=> handleCompletedTodolist(index) } className='check-icon' title='Complete?' />
              </div>
              
            </div>
            )
          })}

          {isCompleteScreen===true && completedTodos.map((item, index)=>{
            return (
              <div className='todo-list-item'>
              <div>
                <h3 >{item.title}</h3>
                <p>{item.desciption}</p>
                <p><small>completed on:{item.completedOn} </small></p>
              </div>
  
              <div>
                <AiOutlineDelete 
                onClick={()=> handleDeleteCompleteTodo(index)  } className='icon' />

              </div>
              
            </div>
            )
          })}

         
        </div>

      </div>
    </div>
  );
}

export default App;
