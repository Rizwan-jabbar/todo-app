import { useEffect, useMemo, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // const token = useMemo(() => localStorage.getItem("token"), []);
  const token = localStorage.getItem('token')

  const fetchProfile = async () => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();

      setUser(data?.user);
    } catch (err) {
      setUser(null);
      setError("Session expired. Please login again.");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('user profile : ' , user)


  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-44 bg-gray-100 rounded animate-pulse" />
                <div className="mt-2 h-3 w-64 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[45vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-red-800">
                Couldn’t load profile
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <p className="mt-2 text-xs text-red-600/90">
                If you just logged in, try refreshing or login again.
              </p>
            </div>

            <button
              onClick={fetchProfile}
              className="shrink-0 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-8 flex justify-center">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {/* {initials} */}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate capitalize">
                    {user?.name || "User"}
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">
                    {user?.email || "—"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                      Active
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-200">
                      Profile
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={fetchProfile}
                className="shrink-0 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                title="Refresh profile"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="p-6">
            <dl className="space-y-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <dt className="text-xs font-semibold text-gray-500">Name</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900 break-words capitalize">
                  {user?.name || "—"}
                </dd>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <dt className="text-xs font-semibold text-gray-500">Email</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900 break-words">
                  {user?.email || "—"}
                </dd>
              </div>

              {/* Optional: if your API returns more fields, you can display them like this:
              {user?.role && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <dt className="text-xs font-semibold text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">{user.role}</dd>
                </div>
              )} */}
            </dl>

            <p className="mt-5 text-xs text-gray-400">
              Data is fetched from <span className="font-medium">/api/me</span>{" "}
              using your saved token.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;