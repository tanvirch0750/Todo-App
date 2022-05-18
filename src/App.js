import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import RequireAuth from "./Authentication/RequireAuth";
import Signup from "./Authentication/Signup";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
