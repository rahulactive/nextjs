"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Optional: Use `react-icons` or any SVG
import useAuthStore from "@/stores/authStore";
// import { OdooAPI } from "../../lib/odoo";
interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, logout, isAuthenticated } = useAuthStore(
    (state: any) => state
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(form.username, form.password);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // console.log(token, username, password, "login");
  // console.log(isAuthenticated, "isAuthenticated");

  return (
    <div className="flex items-center justify-center h-[88vh] bg-gray-100">
      {!isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary/80 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
      {isAuthenticated && (
        <button
          type="button"
          disabled={loading}
          onClick={() => logout("admin", "admin")}
          className="w-100 bg-secondary text-white py-2 rounded-md hover:bg-secondary/80 transition"
        >
          {loading ? "Logging in..." : "Lgout"}
        </button>
      )}
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { LoginFormData } from "../../types";

// export default function LoginPage() {
//   const [formData, setFormData] = useState<LoginFormData>({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {

//       router.push("/dashboard");
//     } catch (err) {
//       setError("Login failed. Please check your credentials.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Odoo Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 mb-2">
//               Username
//             </label>

//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="type"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />

//           </div>
//           {error && (
//             <div className="mb-4 text-red-600 text-center">{error}</div>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// .env.local (example)
