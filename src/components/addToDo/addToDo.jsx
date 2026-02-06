import { useState } from "react";

function AddToDo() {
  const [form, setForm] = useState({
    task: "",
    description: "",
    tasks: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.task.trim() === "") {
      setError("Please enter a task title.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in. Please login to add tasks.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.task,
          description: form.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add task");

      const newTask = {
        id: data.task._id,
        text: data.task.title,
        description: data.task.description,
        addedTime: new Date(data.task.createdAt).getTime(),
      };

      setForm((prev) => ({
        task: "",
        description: "",
        tasks: [...prev.tasks, newTask],
      }));

      setSuccess("Task added successfully.");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-8 flex justify-center">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Add a new task
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Keep it short and clear. Description is optional.
                </p>
              </div>

              <span className="shrink-0 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                Create
              </span>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="task"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="task"
                  name="task"
                  value={form.task}
                  onChange={handleChange}
                  placeholder="e.g., Finish assignment"
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                />
                <p className="mt-2 text-xs text-gray-400">
                  This will be shown as the main task title.
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Description <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Add a bit more detail…"
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                />
              </div>

              {(error || success) && (
                <div
                  className={[
                    "rounded-xl border p-4 text-sm",
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700",
                  ].join(" ")}
                >
                  <p className="font-semibold">
                    {error ? "Couldn’t add task" : "Success"}
                  </p>
                  <p className="mt-1">{error || success}</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Adding…
                    </span>
                  ) : (
                    "Add task"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setForm((prev) => ({ ...prev, task: "", description: "" }));
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/20"
                >
                  Clear
                </button>
              </div>
            </form>

            <p className="mt-5 text-xs text-gray-400">
              Note: You must be logged in (token in localStorage) to create a
              task.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddToDo;