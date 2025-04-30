export const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "Admin@123",
  token: "super-admin-token-2024",
};

export const validateCredentials = (email: string, password: string) => {
  return (
    email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
  );
};

export const validateToken = (token: string) => {
  return token === ADMIN_CREDENTIALS.token;
};
