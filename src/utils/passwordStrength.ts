export const getPasswordStrength = (password: string) => {
  if (!password) return { level: 'weak', percentage: 10 };

  const pwd = password.trim();

  // ❗ HARD RULE: Must be at least 8 chars
  if (pwd.length < 8) {
    return { level: 'weak', percentage: 15 };
  }

  // Precompiled patterns for speed
  const patterns = {
    lower: /[a-z]/,
    upper: /[A-Z]/,
    number: /[0-9]/,
    special: /[^A-Za-z0-9]/,
    tripleRepeat: /(.)\1{2,}/,
  };

  const weakSequences = [
    '123',
    '234',
    '345',
    '456',
    '567',
    '678',
    '789',
    '012',
    'abc',
    'bcd',
    'cde',
    'def',
    'efg',
    'fgh',
    'ghi',
    'hij',
    'ijk',
    'jkl',
    'klm',
    'lmn',
    'mno',
    'nop',
    'opq',
    'pqr',
    'qrs',
    'rst',
    'stu',
    'tuv',
    'uvw',
    'vwx',
    'wxy',
    'xyz',
    'qwerty',
    'asdf',
    'zxcv',
    'admin',
    'password',
    'letmein',
    'pass',
  ];

  const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1qaz2wsx3edc'];

  const lower = pwd.toLowerCase();
  let score = 0;

  // LENGTH (entropy)
  if (pwd.length >= 8) score += 20;
  if (pwd.length >= 12) score += 15;
  if (pwd.length >= 16) score += 15;

  // CHARACTER TYPES
  const hasLower = patterns.lower.test(pwd);
  const hasUpper = patterns.upper.test(pwd);
  const hasNum = patterns.number.test(pwd);
  const hasSpecial = patterns.special.test(pwd);

  if (hasLower) score += 10;
  if (hasUpper) score += 10;
  if (hasNum) score += 10;
  if (hasSpecial) score += 15;

  // Penalty: missing special character
  if (!hasSpecial) score -= 15;

  // No triple repeats
  if (!patterns.tripleRepeat.test(pwd)) score += 5;

  // Common sequences
  if (weakSequences.some((seq) => lower.includes(seq))) {
    score -= 30;
  }

  // Keyboard adjacency (qwer, asdf)
  if (
    keyboardRows.some(
      (row) =>
        row.includes(lower.slice(0, 4)) || lower.includes(row.slice(0, 4)),
    )
  ) {
    score -= 25;
  }

  // Final score bounding
  score = Math.min(100, Math.max(0, score));

  // STRENGTH LABELS
  const level =
    score < 25
      ? 'weak'
      : score <= 45
        ? 'fair'
        : score <= 65
          ? 'good'
          : score < 85
            ? 'strong'
            : 'very strong';

  return { level, percentage: score };
};
