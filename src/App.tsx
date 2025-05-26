import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./page/Dashboard";
import Tasks from "./page/Tasks";
import Calendar from "./page/Calendar";
import Settings from "./page/Settings";

function App() {
	return (
		<div className="flex flex-row min-h-screen bg-primary-bg">
			<Routes>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/calendar" element={<Calendar />} /> {/* fix spelling */}
					<Route path="/settings" element={<Settings />} />
				</Route>
				{/* optionally a catch-all 404 or redirect to /dashboard */}
				<Route path="*" element={<Navigate to="/dashboard" replace/>} />
			</Routes>
		</div>
	);
}

export default App;
	