import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./interfaces/theme/theme-provider";
import { Toaster } from "./interfaces";
import Detaile from "./pages/Detaile";
import Order from "./pages/restricted/Order";
import Nav from "./components/Nav";
import AddNewProduct from "./pages/restricted/AddNewProduct";
import ProductContextProvider from "./context/ProductContext";
import UserProfile from "./pages/restricted/UserProfile";
import AuthContextProvider from "./context/AuthContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <main className="xl:w-[1250px] lg:w-[1020px] md:w-[720px] mx-auto">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthContextProvider>
          <ProductContextProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/add-new-product" element={<AddNewProduct />} />
              <Route path="/grocery/product/:id" element={<Detaile />} />
              <Route path="/grocery/order" element={<Order />} />
            </Routes>
          </ProductContextProvider>
        </AuthContextProvider>
        <Toaster />
      </ThemeProvider>
    </main>
  );
}

export default App;
