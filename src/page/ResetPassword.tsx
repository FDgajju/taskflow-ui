import type React from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from '../components/auth/AuthContainer';
import PublicRoute from '../components/auth/PublicRoute';
import Button from '../components/ui/Button';

const ResetPassword: React.FC = () => {
  return (
    <PublicRoute>
      <AuthContainer heading="Can't login ?">
        {/* form */}
        <form action="#" className="w-full flex flex-col gap-2 mt-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-main text-sm font-medium">
              We'll send a recovery link to{' '}
              <span className="text-status-overdue">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="text-main text-sm p-2 outline-none border-1 border-main/50 focus:border-btn-primary rounded-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" className="" />
            <label htmlFor="remember" className="text-main text-sm font-medium">
              Remember me
            </label>
          </div>

          <Button type="submit" className="rounded-sm">
            <span className="font-medium">Continue</span>
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
          <p>
            <Link to="/signin">Return to login</Link>
          </p>
        </div>
      </AuthContainer>
    </PublicRoute>
  );
};

export default ResetPassword;
