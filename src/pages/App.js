import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";


function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />}>

        </Route>
        <Route path="/login" element={<Login />}>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
