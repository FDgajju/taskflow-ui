export const PRIORITIES = ['high', 'medium', 'low'] as const;

export const PRIORITY_MAP = {
  high: 'high',
  low: 'low',
  medium: 'medium',
} as const;

export const PRIORITIES_DD = ['Select Priority', 'low', 'high', 'medium'];
export const STATUS_LIST = [
  'Select Status',
  'done',
  'inprogress',
  'overdue',
  'todo',
];

export const SIGN_UP_STEPS = {
  initial: 'Sign up to continue',
  details: 'Provide your details',
  password: 'Setup your password',
  workspace: 'Almost there! Setup workspace',
  //   profile_image: "Update profile image or continue",
} as const;

export const ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  ORGANIZATION_NOT_FOUND: 'ORGANIZATION_NOT_FOUND',
  PROJECT_NOT_FOUND: 'PROJECT_NOT_FOUND',
  TASK_NOT_FOUND: 'TASK_NOT_FOUND',
} as const;
