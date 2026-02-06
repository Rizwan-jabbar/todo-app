import { useState } from "react";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | ""

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

    const registerUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("User registered successfully.");
        e.target.reset();
      } else {
        setStatus("error");
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Create your account
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Register to start managing your todos.
                </p>
              </div>

              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                Register
              </span>
            </div>
          </div>

          <div className="p-6">
            <form className="space-y-4" onSubmit={handleRegisterForm}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="Create a strong password"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="new-password"
                  minLength={6}
                />
                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              </div>

              {message && (
                <div
                  className={[
                    "rounded-xl border p-4 text-sm",
                    status === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  <p className="font-semibold">
                    {status === "success" ? "Success" : "Registration failed"}
                  </p>
                  <p className="mt-1">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Registering…
                  </span>
                ) : (
                  "Register"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                By registering, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          After registration, go to login and sign in.
        </p>
      </div>
    </main>
  );
}

export default RegisterForm;