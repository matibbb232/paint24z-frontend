// Always use inside "useEffect"!!!
export const isAuthenticated = () => localStorage.getItem('access_token') != null ? localStorage.getItem('username') : null;