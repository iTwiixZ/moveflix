import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Loved from "./pages/Loved";
import "../src/styles/index.scss";
import "../node_modules/animate.css/animate.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Home/>}/>
      <Route path="/loved" element={<Loved/>}/>
      
    </Routes>
    
    </BrowserRouter>


  ); 


  
}

export default App;
