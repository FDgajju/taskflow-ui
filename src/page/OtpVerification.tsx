import React, { useEffect, useRef, useState, type KeyboardEvent } from "react";
import AuthContainer from "../components/AuthContainer";
import Button from "../components/Button";
import toast from "react-hot-toast";

const OtpVerification: React.FC<{ maxDigit?: number }> = ({ maxDigit = 6 }) => {
  const [inputs, setInputs] = useState<string[]>(new Array(maxDigit).fill(""));

  const inpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inpRefs.current[0]?.focus();
  }, []);

  const handleOnChange = (value: string, index: number) => {
    const tvalue = value.trim();

    if (tvalue.length === maxDigit) {
      setInputs([...tvalue]);
      inpRefs.current[maxDigit - 1]?.focus();
    } else {
      if (!tvalue || isNaN(Number(value))) {
        toast.dismiss();
        toast.error("only numbers allowed");
        return;
      }

      const newInps = [...inputs];
      newInps[index] = value.slice(-1);
      setInputs(newInps);

      if (tvalue) inpRefs.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      inpRefs.current[idx - 1]?.focus();

      const newInps = [...inputs];
      newInps[idx] = "";
      setInputs(newInps);
    }
  };

  console.log(inputs);
  return (
    <AuthContainer
      heading="We've emailed you a code"
      description={`To complete your account setup, enter the code we've sent to: ${"someone@gmail.com"}`}
    >
      <form action="#" className="w-full mt-5 flex flex-col gap-5">
        <div className="flex justify-evenly">
          {inputs.map((input, idx) => (
            <input
              key={idx}
              type="text"
              className="w-12 h-12 border-1 border-gray-text focus:border-2 rounded focus:border-btn-primary outline-none text-center"
              value={input}
              onChange={(e) => handleOnChange(e.target.value, idx)}
              ref={(inp) => {
                inpRefs.current[idx] = inp!;
              }}
              onKeyDown={(e) => handleBackSpace(e, idx)}
            />
          ))}
        </div>

        <div>
          <Button className="w-full" type="submit"></Button>
        </div>
      </form>

      <div className="cursor-pointer flex items-center justify-center gap-2 p-3 text-sm text-btn-primary mt-4">
        <p>Didn't received? resend otp</p>
      </div>
    </AuthContainer>
  );
};

export default OtpVerification;
