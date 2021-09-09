// import logo from './logo.svg';
import './App.css';
import Users from './Components/Users'
// import UserAlert from "./Components/Alert";
function App() {
  return (
    <div className="App container-sm">
      <header className="App-header">
        <h1>Header</h1>
        <Users />
        {/* <UserAlert/> */}
      </header>
    </div>
  );
}

export default App;
