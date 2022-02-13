import { Route , Routes , Navigate } from "react-router-dom";


//COMPONNENTS
import Sign_up from "./components/Sign_up";
import Sign_In from "./components/Sign_In";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/Sign-In" element={ <Sign_In /> } /> 
      <Route path="/Sign-Up" element={ <Sign_up /> } /> 
      <Route path="/*" element={ <Navigate to="/Sign-Up" /> } />
    </Routes>
      {/* <Sign_In/> */}
    </div>
  );
}

export default App;
