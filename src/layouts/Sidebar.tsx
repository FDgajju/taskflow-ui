import { NavLink } from 'react-router-dom';
import CalendarIcon from '/calendar.png';
import DashboardIcon from '/dashboard.png';
// import HeaderIcon from '/menu.png';
import SettingsIcon from '/settings.png';
import MyTasksIcon from '/Tasklist.png';

const listItemStyle = ({ isActive }: { isActive: boolean }) =>
  `flex gap-2 justify-start items-center p-2 w-4/4 text-sm font-bold hover:bg-sidebar-selected rounded-lg ${isActive ? 'bg-sidebar-selected' : ''}`;

const listItemIconStyle = 'h-4 w-auto padding-1';

const SideBar = () => {
  return (
    <aside className="bg-secondary-bg border-r-2 border-r-sidebar-selected w-80 px-4 py-3 text-main flex flex-col justify-between">
      <div className="flex flex-col gap-3 items-start justify-center">
        {/* <div className="flex gap-4 justify-start items-center p-2">
          <img src={HeaderIcon} alt="Header icon" className="h-6 w-auto" />
          <h1 className="text-lg font-bold">TaskFlow</h1>
        </div>

        <div className="my-2 border w-4/4 border-sidebar-selected"> </div> */}

        <nav className="w-4/4">
          <ul className="w-4/4 flex flex-col gap-1 py-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex gap-2 justify-start items-center p-2 w-4/4 text-sm font-bold hover:bg-sidebar-selected rounded-lg ${isActive ? 'bg-sidebar-selected' : ''}`
              }
            >
              <img
                src={DashboardIcon}
                alt="DashBoard icon"
                className={listItemIconStyle}
              />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to="/tasks" className={listItemStyle}>
              <img
                src={MyTasksIcon}
                alt="my task icon"
                className={listItemIconStyle}
              />
              <p>My Tasks</p>
            </NavLink>
            <NavLink to="/calendar" className={listItemStyle}>
              <img
                src={CalendarIcon}
                alt="calendar icon"
                className={listItemIconStyle}
              />
              <p>Calendar</p>
            </NavLink>
            <NavLink to="/settings" className={listItemStyle}>
              <img
                src={SettingsIcon}
                alt="settings icon"
                className={listItemIconStyle}
              />
              <p>Settings</p>
            </NavLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
