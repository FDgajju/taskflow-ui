export const getFormattedDate = (dt: string): string => {
  if (!dt) return "";
  const date = new Date(dt);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

export const getFormattedDateDD_MM_YYYY = (dt: string): string => {
  if (!dt) return "";
  const date = new Date(dt);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export const getDateTime = (dt: string) => {
  if (!dt) return { date: "", time: "" };

  const date = new Date(dt);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export const calculateDateTimeFromNow = (dt: string) => {
  if (!dt) return { date: "", time: "" };
};
