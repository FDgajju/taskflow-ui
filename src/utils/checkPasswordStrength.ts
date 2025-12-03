type LabelType = 'weak' | 'medium' | 'good' | 'strong';

export function checkPasswordStrength(password: string): {
  score: number;
  label: LabelType;
} {
  let score = 0;

  if (!password) return { score: 0, label: 'weak' };

  // Length
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;

  // Lowercase
  if (/[a-z]/.test(password)) score += 10;

  // Uppercase
  if (/[A-Z]/.test(password)) score += 10;

  // Numbers
  if (/[0-9]/.test(password)) score += 10;

  // Special chars
  if (/[^A-Za-z0-9]/.test(password)) score += 10;

  // No triple-repeat like aaa or 111
  if (!/(.)\1{2,}/.test(password)) score += 10;

  // No sequences like 1234 or abcd
  const sequences = ['123', 'abc', 'qwerty', 'password'];
  if (!sequences.some((seq) => password.toLowerCase().includes(seq))) {
    score += 10;
  }

  // Strength label
  let label: LabelType = 'weak';
  if (score > 80) label = 'strong';
  else if (score > 75) label = 'good';
  else if (score > 50) label = 'medium';

  return { score, label };
}
