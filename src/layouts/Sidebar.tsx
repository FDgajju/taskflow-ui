import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import CalendarIcon from '/calendar.png';
import DashboardIcon from '/dashboard.png';
import SettingsIcon from '/settings.png';
import MyTasksIcon from '/Tasklist.png';
import { sidebarContext } from '../context/SidebarContext';

const SideBar = () => {
  const { fullSidebar } = useContext(sidebarContext);

  // classes
  const listItemStyle = ({ isActive }: { isActive: boolean }) =>
    `flex gap-2 ${!fullSidebar ? 'justify-start' : 'justify-start'} items-center p-2 w-full text-sm font-bold hover:bg-sidebar-selected rounded-lg transition-all duration-300 ease-in-out ${isActive ? 'bg-sidebar-selected' : ''}`;

  let sidebarStyle =
    'bg-secondary-bg border-r-2 border-r-sidebar-selected w-64 px-4 py-3 text-main flex flex-col justify-between max-h-full transition-all duration-300 ease-in-out overflow-hidden';

  if (!fullSidebar) sidebarStyle = twMerge(sidebarStyle, 'w-15 px-2');

  const listItemIconStyle = 'h-6 w-6 p-1 shrink-0';

  const textStyle = `whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
    fullSidebar ? 'w-auto opacity-100 ml-2' : 'w-0 opacity-0'
  }`;

  return (
    <aside className={sidebarStyle}>
      <div className="flex flex-col gap-3 items-start justify-center w-full">
        <nav className="w-full">
          <ul className="w-full flex flex-col gap-1 py-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => listItemStyle({ isActive })}
            >
              <img
                src={DashboardIcon}
                alt="DashBoard icon"
                className={listItemIconStyle}
              />
              <p className={textStyle}>Dashboard</p>
            </NavLink>
            <NavLink to="/tasks" className={listItemStyle}>
              <img
                src={MyTasksIcon}
                alt="my task icon"
                className={listItemIconStyle}
              />
              <p className={textStyle}>My Tasks</p>
            </NavLink>
            <NavLink to="/calendar" className={listItemStyle}>
              <img
                src={CalendarIcon}
                alt="calendar icon"
                className={listItemIconStyle}
              />
              <p className={textStyle}>Calendar</p>
            </NavLink>
            <NavLink to="/settings" className={listItemStyle}>
              <img
                src={SettingsIcon}
                alt="settings icon"
                className={listItemIconStyle}
              />
              <p className={textStyle}>Settings</p>
            </NavLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
