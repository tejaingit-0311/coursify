import { AxiosResponse } from "axios";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { adminSignup } from "../../api/adminApi";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/AuthContext";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword:""
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let response: AxiosResponse<any, any, {}> = null;
    try {
      //send request:
      response = await adminSignup(formData);
      login('admin', { email: formData.email });
      toast.success("Welcome to Coursify! Your instructor account is ready.");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // confirm-password check: 
  // side-effect -> { password !== confirmPassword => setPasswordMatch(false) else => setPasswordMatch(true), [confirmPassword] }
  useEffect(()=>{
    if(formData.password !== formData.confirmPassword)
      setPasswordMatch(false);
    else
      setPasswordMatch(true);
  },[formData.confirmPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 via-background to-secondary/20 px-4 pt-16">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Become an Instructor</CardTitle>
          <CardDescription>
            Create your instructor account and start teaching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">    
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="instructor@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              { !passwordMatch && <p style={{color:"red"}}>Password don't match</p> }
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Instructor Account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an instructor account?{" "}
              <Link to="/admin/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Want to learn instead?{" "}
              <Link to="/user/signup" className="text-primary hover:underline">
                Student signup
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignup;