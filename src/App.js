import Login from "./Pages/Login/Login";
import './App.css';
import UserPage from "./Pages/User/User";
import AdminPage from "./Pages/Admin/Admin";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";



function App() {
  return(   
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={ <Login/> }> </Route> 
      <Route path="/user/*" element = {<PrivateRoute role="user"> <UserPage /> </PrivateRoute>}/>
      <Route path="/admin/*" element = {<PrivateRoute role="admin"> <AdminPage /> </PrivateRoute>}/>
      <Route path="/" element = {<Navigate replace to="/login"/>} />
      </Routes>
    </BrowserRouter>  
  );
}


export default App;
