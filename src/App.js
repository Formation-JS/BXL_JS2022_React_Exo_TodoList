import './App.css';
import Header from './containers/header/header';
import TodoApp from './containers/todo-app/todo-app';

function App() {
  return (
  <div className='Layout'>
    <Header />
    <div className='Main'>
      <h1>Todo App</h1>
      <TodoApp />  
    </div>
  </div>);
}

export default App;
