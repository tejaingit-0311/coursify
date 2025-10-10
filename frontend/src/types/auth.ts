export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (role: 'admin' | 'user', userData?: any) => void;
  logout: (role: 'admin' | 'user') => void;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email:string;
  password:string;
  confirmPassword:string;
}