import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
// HomePage is imported from pages
import ChatPage from "./Pages/ChatPage";
// ChatPage is imported from pages

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={HomePage} exact />
        {/* self closing tag */}
        <Route path="/chats" Component={ChatPage} />
      </Routes>

      {/* example
       Hello Farmers!
      <Button colorScheme="blue">Button</Button> */}
      {/* using chakra ui we are rendering a component */}
    </div>
  );
}

export default App;
