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
import OrderHistory from "./pages/restricted/OrderHistory";
import SearchedProduct from "./pages/SearchedProduct";
import OrderConfirme from "./pages/restricted/OrderConfirme";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";

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
            <Route
              path="/product/search/:query/:productId"
              element={<SearchedProduct />}
            />

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
            <Route
              path="/order-history"
              element={uid ? <OrderHistory /> : <Navigate to="/" />}
            />
            <Route
              path="/order-confirme/:info"
              element={uid ? <OrderConfirme /> : <Navigate to="/" />}
            />
          </Routes>
          <Footer />
        </ProductContextProvider>
        <Toaster />
      </ThemeProvider>
    </main>
  );
}

export default App;
