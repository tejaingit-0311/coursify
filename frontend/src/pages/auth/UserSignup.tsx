import { AxiosResponse } from "axios";
import { BookOpen, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../api/userApi";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/AuthContext";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword:""
  });

  const [passwordMatch, setPasswordMatch] = useState(true);


  //confirm password-check:
  //to check passwords -> if(password === confirmPassword)-> passwords matched else passwords do not matched:
  useEffect(()=>{
    if(formData.password !== formData.confirmPassword){
      setPasswordMatch(false);
    }else{
      setPasswordMatch(true);
    }
  },[formData.confirmPassword])


  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let response: AxiosResponse<any, any, {}> = null;
    try {
      //send-request:
      response = await userSignup(formData);
      const { token } = response.data.data;
      login('user', { email: formData.email, token: token });
      toast.success("Welcome to Coursify! Start exploring courses.");
      navigate("/courses");

    } catch (error: any) {
      toast.error(error?.response?.data?.error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 via-background to-secondary/20 px-4 pt-16">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Start Learning Today</CardTitle>
          <CardDescription>
            Create your student account and unlock knowledge
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
                  placeholder="student@example.com"
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
              { !passwordMatch && <p style={{color:"red"}}>Password Do Not Match</p>  }
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Student Account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have a student account?{" "}
              <Link to="/user/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Want to teach instead?{" "}
              <Link to="/admin/signup" className="text-primary hover:underline">
                Become instructor
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSignup;