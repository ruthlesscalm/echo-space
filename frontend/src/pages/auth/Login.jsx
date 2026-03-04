import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalState";

const Login = () => {
  const { isLoginned, setIsLoginned } = useContext(GlobalContext);
  const { message, setMessage } = useContext(GlobalContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  function handleInput(e) {
    setLoginForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleLoginForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resObj = await res.json();
    console.log(resObj);
    if (resObj.success === true) {
      setIsLoginned(true);
      setMessage("");
    } else {
      setIsLoginned(false);
      setMessage(resObj.message);
    }
    console.log(message);
  }
  return (
    <div className="mt-22">
      <div>
        <h1 className="text-[clamp(2.25rem,2.6vw+1.375rem,4.25rem)] text-white text-center">
          Welcome Back
        </h1>
      </div>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-[clamp(1.125rem,0.625vw+0.75rem,1.875rem)] font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-[clamp(35px,5.1vw,72px)] mx-auto w-[min(384px,90vw)] ">
          <form className="space-y-6" onSubmit={handleLoginForm}>
            <div>
              <label
                htmlFor="email"
                className="block text-[clamp(0.75rem,0.75rem+0.19vw,1.125rem)] font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={loginForm.email}
                  onChange={handleInput}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 text-[clamp(12px,0.78rem+0.21vw,1rem)] border border-slate-600 focus-within:border-slate-400 focus-within:ring focus-within:ring-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[clamp(0.75rem,0.75rem+0.19vw,1.125rem)] font-medium text-gray-100"
                >
                  Password
                </label>
                <div>
                  <Link
                    to="/forgotpassword"
                    className="font-semibold text-indigo-400 hover:text-indigo-300 text-[clamp(0.75rem,0.25vw+0.625rem,0.9375rem)]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={loginForm.password}
                  onChange={handleInput}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 text-[clamp(12px,0.78rem+0.21vw,1rem)] border border-slate-600 focus-within:border-slate-400 focus-within:ring focus-within:ring-slate-400"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-5 py-2 text-[clamp(0.75rem,0.25vw+0.625rem,0.9375rem)] font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="flex gap-1 justify-center mt-10 text-[clamp(0.75rem,0.25vw+0.625rem,0.9375rem)] text-gray-400">
            New to Echo Space?
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
