import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./interfaces/theme/theme-provider";
import { Toaster } from "./interfaces";
import Detaile from "./pages/Detaile";
import Order from "./pages/restricted/Order";
import Nav from "./components/Nav";
import AddNewProduct from "./pages/restricted/AddNewProduct";
import ProductContextProvider from "./context/ProductContext";
import UserProfile from "./pages/restricted/UserProfile";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function App() {
  const { uid } = useAuth();

  return (
    <main className="xl:w-[1250px] lg:w-[1020px] md:w-[720px] mx-auto">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ProductContextProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/product/:id" element={<Detaile />} />

            {/** Protected Routes **/}
            <Route
              path="/profile/:id"
              element={uid ? <UserProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/add-new-product"
              element={uid ? <AddNewProduct /> : <Navigate to="/" />}
            />
            <Route
              path="/order"
              element={uid ? <Order /> : <Navigate to="/" />}
            />
          </Routes>
        </ProductContextProvider>
        <Toaster />
      </ThemeProvider>
    </main>
  );
}

export default App;
