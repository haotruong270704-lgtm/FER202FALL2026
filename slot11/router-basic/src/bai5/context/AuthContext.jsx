import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('app_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Giả lập kiểm tra đăng nhập thành công
    if (username && password) {
      const userData = {
        username,
        name: username === 'admin' ? 'Quản trị viên (Admin)' : 'Sinh viên FPT',
        email: `${username}@fpt.edu.vn`,
        role: username === 'admin' ? 'Admin' : 'Student',
      };
      setUser(userData);
      localStorage.setItem('app_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);