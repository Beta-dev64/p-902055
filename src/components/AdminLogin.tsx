
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple password check (in production, use proper authentication)
    if (password === "admin123") {
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard"
      });
      onLogin(password);
    } else {
      toast({
        title: "Invalid password",
        description: "Please enter the correct password",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-600">
            Enter your password to access the admin dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
