import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");

      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Some APIs return empty body on DELETE; guard JSON parsing
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) throw new Error(data.message || "Failed to delete task");

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      alert(err?.message || "Server error");
    }
  };

  // FIX: tasks ko dependency banane se infinite loop hota tha
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white/70 backdrop-blur border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-green-500 animate-spin" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Loading tasks</p>
              <p className="text-xs text-gray-500">Please wait a moment…</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
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
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-red-700">Couldn’t load tasks</p>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchTasks();
            }}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-6 flex justify-center">
      <div className="w-full">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Your Tasks
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your work — delete completed or unwanted tasks.
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {tasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  No tasks available
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Add a new task to see it appear here.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                          {task.title}
                        </h4>

                        {task.description ? (
                          <p className="mt-1 text-sm text-gray-600 break-words">
                            {task.description}
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-gray-400">
                            No description
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(task._id)}
                        aria-label={`Delete task: ${task.title}`}
                        className="shrink-0 inline-flex items-center justify-center rounded-xl border border-transparent p-2 text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 transition"
                        title="Delete"
                      >
                        <FaTrash className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Tip: If tasks don’t update after login, refresh once (token stored in localStorage).
        </p>
      </div>
    </section>
  );
}

export default TaskList;