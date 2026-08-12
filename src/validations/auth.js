export function assertEmail(email) {
  if (!email || typeof email !== "string") return "email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid email";
  return null;
}

export function assertPassword(password) {
  if (!password || typeof password !== "string") return "password is required";
  if (password.length < 6) return "password must be at least 6 characters";
  return null;
}
