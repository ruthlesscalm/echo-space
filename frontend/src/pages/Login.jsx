import { useState } from "react";

const Login = () => {
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
  return (
    <div className="mt-22">
      <div>
        <h2 className="text-6xl text-white mb-6 text-center">Welcome Back</h2>
      </div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleInput}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleInput}
            id="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
