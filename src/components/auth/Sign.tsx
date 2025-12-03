import type React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '/Google_new.svg';
import MsIcon from '/MS.svg';
import type { SignupState } from '../../page/auth/Signup';
import AuthContainer from './AuthContainer';

const Sign: React.FC<{
  heading: string;
  type: 'signin' | 'signup';
  children: ReactNode;
  otherOptions: boolean;
  current?: SignupState;
}> = ({ heading, type = 'signin', otherOptions = true, children }) => {
  return (
    <AuthContainer heading={heading}>
      {/* form */}
      {children}
      {/* option */}
      {otherOptions && (
        <>
          <p className="text-main/60 text-sm font-medium mt-2 p-3">
            Or continue with:
          </p>

          {/* options */}
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <div className="cursor-pointer hover:bg-secondary-bg border-1 border-main/50 w-full p-2 text-sm rounded-sm font-bold text-center flex items-center justify-center gap-2">
              <img src={GoogleIcon} alt="Google icon" className="w-5" />
              <span>Google</span>
            </div>
            <div className="cursor-pointer hover:bg-secondary-bg border-1 border-main/50 w-full p-2 text-sm rounded-sm font-bold text-center flex items-center justify-center gap-2">
              <img src={MsIcon} alt="Ms icon" className="w-5" />
              <span>Microsoft</span>
            </div>
          </div>

          {type === 'signin' && (
            <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
              <p>
                <Link to="/resetpassword">Can't Login?</Link>
              </p>
              <span className="text-main/60">•</span>
              <p>
                <Link to="/signup">Create an account</Link>
              </p>
            </div>
          )}

          {type === 'signup' && (
            <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
              <p>
                <Link to="/signin">
                  Already have an TaskFlow account? Login
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </AuthContainer>
  );
};

export default Sign;
