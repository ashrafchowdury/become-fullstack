import { Routes, Route } from "react-router-dom";
import {
  Home,
  Todo,
  SignUp,
  Login,
  Auth,
  Grocery,
  Detaile,
  AddCart,
  ProductContextProvider,
} from "./pages";
import { ThemeProvider } from "./interfaces/theme/theme-provider";
import { Toaster } from "./interfaces";

function App() {
  return (
    <main className="xl:w-[1250px] lg:w-[1020px] md:w-[720px] mx-auto">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/todo" element={<Todo />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>

        <ProductContextProvider>
          <Routes>
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/grocery/cart" element={<AddCart />} />
            <Route path="/grocery/product/:id" element={<Detaile />} />
          </Routes>
        </ProductContextProvider>
        <Toaster />
      </ThemeProvider>
    </main>
  );
}

export default App;
