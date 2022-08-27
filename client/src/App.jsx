import "./app.scss";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import MyList from "./pages/myList/MyList";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Settings from "./pages/settings/Settings";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home type="" />} />
        <Route path="/movies" element={<Home type={"movie"} />} />
        <Route path="/series" element={<Home type={"series"} />} />
        <Route path="/newPopular" element={<Home type={"newPopular"} />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/mylist" element={user ? <MyList /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
