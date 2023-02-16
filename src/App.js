import './App.css';
import Header from './containers/header/header';
import TodoApp from './containers/todo-app/todo-app';

function App() {
  return (<>
    <Header />
    <div className="App">
      <h1>Todo App</h1>
      <TodoApp />  
    </div>
  </>);
}

export default App;
