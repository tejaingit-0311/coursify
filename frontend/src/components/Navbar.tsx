import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(user.role);
    navigate("/");
  };
  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm shadow-card z-50 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-glow transition-colors">
          COURSIFY
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 text-foreground font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <Link to="#about" className="hover:text-primary transition-colors">About</Link>
          <Link to="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'user' && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/purchased">
                    <ShoppingCart className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'admin' ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/courses">Manage Courses</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/courses">Browse Courses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/purchased">My Courses</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/user/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/user/signup">Signup</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;