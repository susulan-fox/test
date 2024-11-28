import "./App.css";
import { Route,  Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Customer from "./pages/dashboard/Customer"
import Product from "./pages/dashboard/Product";
import Transactions from "./pages/dashboard/Transaction";
import { Toaster } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./store/actions/authActions";
import { useEffect } from "react";

function App() {
  const dataAuth = useSelector((state) => state.auth?.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataAuth?.token) {
      const timeoutId = setTimeout(() => {
        dispatch(refreshToken());
      }, 1000 * 60 * 30); // refresh token setelah 30 menit
      // Membersihkan timeout saat komponen dibongkar atau token berubah
      return () => clearTimeout(timeoutId);
    }
  }, [dataAuth?.token, dispatch]);
  return (
    <>
    <Toaster position="top-center" richColors closeButton />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard-customers" element={<Customer />} />
      <Route path="/dashboard-products" element={<Product />} />
      <Route path="/dashboard-transactions" element={<Transactions />} />
    </Routes>
    </>
  );
}

export default App;
