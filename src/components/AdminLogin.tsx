import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { callAdminFunction, setAdminPassword } from "@/lib/admin-session";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // The password is verified server-side by the admin edge function
      await callAdminFunction("admin-leads", { action: "ping" }, password);
      setAdminPassword(password);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      onLogin();
    } catch (error) {
      console.error("Admin login failed", error);
      toast({
        title: "Invalid password",
        description: "Please enter the correct admin password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mb-2 font-display text-3xl font-bold text-foreground">Admin Login</h2>
          <p className="text-muted-foreground">
            Enter your password to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-motion w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
