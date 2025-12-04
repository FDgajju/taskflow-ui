import { useContext, type ReactNode } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { GoBell } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import HeaderIcon from '/menu.png';
import SearchIcon from '/search.svg';
import Button from '../components/ui/Button';
import { sidebarContext } from '../context/SidebarContext';

export const ButtonIcon = ({
  children: icon,
  type = 'button',
  className,
  onClick = () => {},
}: {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: () => void;
}) => {
  let buttonStyle = 'hover:bg-sidebar-selected p-1 rounded-md cursor-pointer';
  if (className) {
    buttonStyle = twMerge(buttonStyle, className);
  }
  return (
    <button type={type} className={buttonStyle} onClick={onClick}>
      {icon}
    </button>
  );
};

const Navbar = () => {
  const { toggleSidebar } = useContext(sidebarContext);

  const navigate = useNavigate();
  return (
    <nav className="w-full h-12 bg-secondary-bg border-b-2 border-b-sidebar-selected p-2">
      <div className="h-full w-full flex items-center justify-between">
        <ul className="flex items-center gap-2 list-none">
          <li>
            <ButtonIcon
              type="button"
              className="hover:bg-sidebar-selected p-1 rounded-md"
              onClick={() => toggleSidebar()}
            >
              <TbLayoutSidebarLeftCollapse className="text-lg" />
            </ButtonIcon>
          </li>
          <li>
            <button
              type="button"
              className="flex gap-1 items-center hover:bg-sidebar-selected p-0.5 rounded-md cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <img src={HeaderIcon} alt="Header-icon" className="h-5 w-auto" />
              <span className="font-bold">Taskflow</span>
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-4 w-2/4">
          <form action="#" className="relative w-full">
            <input
              className="w-full active:outline-0 focus:outline-0 border border-sidebar-selected rounded-md py-1.5 pl-3 pr-8 bg-primary-bg text-sm"
              type="text"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img src={SearchIcon} alt="search" className="h-4 opacity-60" />
            </button>
          </form>
          <Button type="button" onClick={() => {}}>
            <Link to="/add-new-task">Create</Link>
          </Button>
        </div>

        <ul className="flex items-center gap-2 list-none">
          <li>
            <ButtonIcon>
              <GoBell className="text-lg" />
            </ButtonIcon>
          </li>
          <li>
            <ButtonIcon>
              <IoSettingsOutline className="text-lg" />
            </ButtonIcon>
          </li>
          <li>
            <ButtonIcon>
              <FiHelpCircle className="text-lg" />
            </ButtonIcon>
          </li>
          <li>
            <img
              src="https://unsplash.com/photos/_PtMzmxN1ac/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NTJ8fHByb2ZpbGV8ZW58MHx8fHwxNzY0NzM1NzY2fDA&force=true&fm=jpg"
              alt="p"
              className="cursor-pointer h-8 w-auto rounded-full p-1 hover:border hover:border-sidebar-selected"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
