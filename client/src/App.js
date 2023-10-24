import { Routes, Route } from "react-router-dom";
import { Home, Todo, SignUp, Login, Auth } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
