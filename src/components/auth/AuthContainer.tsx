import type React from 'react';
import BackgroundImagePath from '/bg1.png';
import TaskFlowIcon from '/menu.png';
import H2 from '../ui/H2';

const AuthContainer: React.FC<{
  heading: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
}> = ({ heading, children, description }) => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url("${BackgroundImagePath}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className=" text-main w-[450px] min-w-[300px] flex flex-col items-center justify-center bg-white p-4 shadow-md shadow-main/20 rounded-md">
        <div className="flex items-center justify-center gap-5 w-full mt-4">
          <img src={TaskFlowIcon} alt="icon" className="w-10" />
          <H2 text="TaskFlow" className="text-[2.5rem] tracking-wider" />
        </div>

        <div className=" flex flex-col w-full justify-center p-5">
          <div className="text-main text-center text-md font-semibold p-2">
            {heading}
          </div>

          {!!description && (
            <p className="text-gray-text text-sm font-medium p-2">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
