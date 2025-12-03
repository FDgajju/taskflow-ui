import type { FormEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/auth/AuthContainer';
import PublicRoute from '../../components/auth/PublicRoute';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { setAuthData } from '../../features/auth/authSlice';
import { useHttpRequest } from '../../hooks/useHttpRequest';
import type { RootState } from '../../redux/store';

const OtpVerification: React.FC<{ maxDigit?: number }> = ({ maxDigit = 6 }) => {
  const [inputs, setInputs] = useState<string[]>(new Array(maxDigit).fill(''));
  const inpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyRequest = useHttpRequest({
    url: 'user/auth/otp/verify',
    method: 'POST',
    manual: true,
  });

  useEffect(() => {
    inpRefs.current[0]?.focus();
  }, []);

  const handleOnChange = (value: string, index: number) => {
    const tvalue = value.trim();

    if (tvalue.length === maxDigit) {
      setInputs([...tvalue]);
      inpRefs.current[maxDigit - 1]?.focus();
    } else {
      if (!tvalue || Number.isNaN(Number(value))) {
        toast.dismiss();
        toast.error('only numbers allowed');
        return;
      }

      const newInps = [...inputs];
      newInps[index] = value.slice(-1);
      setInputs(newInps);

      if (tvalue) {
        inpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackSpace = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      inpRefs.current[idx - 1]?.focus();

      const newInps = [...inputs];
      newInps[idx] = '';
      setInputs(newInps);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validInputs = inputs.filter((inp) => inp || inp.trim() !== '');

    if (validInputs.length < 6) return toast.error('Please enter valid otp');

    const response = await verifyRequest.execute({
      email: user?.email,
      otp: validInputs.join(''),
    });

    if (response.error) {
      return toast.error(response.error.message || 'OTP verification failed');
    }

    dispatch(
      setAuthData({
        email: response.data?.email,
        authToken: response.data.token,
      }),
    );

    localStorage.setItem('authToken', response.data.token);

    toast.success('Otp verified successfully 🎉');
    navigate('/dashboard');
  };

  return (
    <PublicRoute>
      <AuthContainer
        heading="We've emailed you a code"
        description={`To complete your account setup, enter the code we've sent to: ${user?.email}`}
      >
        <form
          className="w-full mt-5 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-evenly">
            {inputs.map((input, idx) => (
              <input
                // biome-ignore lint/suspicious/noArrayIndexKey: Stable index for OTP inputs
                key={idx}
                type="text"
                className="w-12 h-12 border border-gray-text focus:border-2 rounded focus:border-btn-primary outline-none text-center"
                value={input}
                onChange={(e) => handleOnChange(e.target.value, idx)}
                ref={(inp) => {
                  // biome-ignore lint/style/noNonNullAssertion: explanation
                  inpRefs.current[idx] = inp!;
                }}
                onKeyDown={(e) => handleBackSpace(e, idx)}
              />
            ))}
          </div>

          <div>
            <Button
              className="w-full"
              type="submit"
              disabled={verifyRequest.loading}
            >
              {verifyRequest.loading ? (
                <div className="flex items-center justify-center transition-all animate-pulse ease-in-out">
                  <Loader className="" duration="1" />
                </div>
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </form>

        <div className="cursor-pointer flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
          <p>Didn't received? resend otp</p>
        </div>
      </AuthContainer>
    </PublicRoute>
  );
};

export default OtpVerification;
