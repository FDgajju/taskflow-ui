import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./page/Dashboard";
import Tasks from "./page/Tasks";
import Calendar from "./page/Calendar";
import Settings from "./page/Settings";
import AddTaskForm from "./page/AddTaskForm";
import EditTaskForm from "./page/EditTaskForm";
import { Toaster } from "react-hot-toast";
import TaskDetails from "./page/TaskDetails";
import FilteredTasks from "./page/FilteredTasks";
import Login from "./page/Signin";
import Signup from "./page/Signup";
import ResetPassword from "./page/ResetPassword";
import OtpVerification from "./page/OtpVerification";
import FinishSettingAccount from "./page/FinishSettingAccount";

function App() {
  return (
    <div className="flex flex-row min-h-screen bg-primary-bg">
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/finishsetupaccount" element={<FinishSettingAccount />} />
        <Route
          path="/otpverification"
          element={<OtpVerification maxDigit={6} />}
        />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/filter/list" element={<FilteredTasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/calendar" element={<Calendar />} /> {/* fix spelling */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-new-task" element={<AddTaskForm />} />
          <Route path="/edit-task/:id" element={<EditTaskForm />} />
        </Route>
        {/* optionally a catch-all 404 or redirect to /dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
