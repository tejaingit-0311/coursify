import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as HotToaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import AdminLogin from "./pages/auth/AdminLogin";
import AdminSignup from "./pages/auth/AdminSignup";
import UserLogin from "./pages/auth/UserLogin";
import UserSignup from "./pages/auth/UserSignup";

// Admin Pages
import AddCourse from "./pages/admin/AddCourse";
import Courses from "./pages/admin/Courses";
import Dashboard from "./pages/admin/Dashboard";
import EditCourse from "./pages/admin/EditCourse";

// User Pages
import AllCourses from "./pages/user/AllCourses";
import PurchasedCourses from "./pages/user/PurchasedCourses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/courses" element={<AllCourses />} />
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute role="admin">
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <PrivateRoute role="admin">
                  <Courses />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/courses/add" 
              element={
                <PrivateRoute role="admin">
                  <AddCourse />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/courses/:id/edit" 
              element={
                <PrivateRoute role="admin">
                  <EditCourse />
                </PrivateRoute>
              } 
            />

            {/* User Routes */}
            <Route 
              path="/courses" 
              element={
                <PrivateRoute role="user">
                  <AllCourses />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/purchased" 
              element={
                <PrivateRoute role="user">
                  <PurchasedCourses />
                </PrivateRoute>
              } 
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
          <HotToaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
