export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score === 1) return { level: "weak", percentage: 25 };
  if (score === 2) return { level: "medium", percentage: 50 };
  if (score === 3) return { level: "good", percentage: 75 };
  if (score === 4) return { level: "strong", percentage: 100 };

  return { level: "weak", percentage: 0 };
};
