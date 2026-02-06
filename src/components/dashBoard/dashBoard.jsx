import AddToDo from "../addToDo/addToDo";
import TaskList from "../taskList/taskList";
import UserProfile from "../userProfile/userProfile";

function DashBoard() {
  return (
    <>

    <div className="grid grid-cols-1 p-2 lg:p-10">
         <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Profile left, tasks management right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
            <UserProfile/>
            <AddToDo/>
        </div>

        <div className="grid grid-cols-1">
            <TaskList className = 'w-full'/>
        </div>
    </div>
    
    
    </>
  );
}

export default DashBoard;