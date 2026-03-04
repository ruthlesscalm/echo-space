import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="mt-22">
      <div>
        <h1 className="text-[clamp(2.25rem,2.6vw+1.375rem,4.25rem)] text-white text-center">
          Forgot Password ?
        </h1>
      </div>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-[clamp(1.125rem,0.625vw+0.75rem,1.875rem)] font-bold tracking-tight text-white">
            Reset your password
          </h2>
        </div>

        <div className="mt-[clamp(35px,5.1vw,72px)] mx-auto w-[min(384px,90vw)] ">
          <form className="space-y-6">
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
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 text-[clamp(12px,0.78rem+0.21vw,1rem)] border border-slate-600 focus-within:border-slate-400 focus-within:ring focus-within:ring-slate-400"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-5 py-2 text-[clamp(0.75rem,0.25vw+0.625rem,0.9375rem)] font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Next
              </button>
            </div>
          </form>

          <p className="flex gap-1 justify-center mt-10 text-[clamp(0.75rem,0.25vw+0.625rem,0.9375rem)] text-gray-400">
            <Link
              to="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Return to login page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
