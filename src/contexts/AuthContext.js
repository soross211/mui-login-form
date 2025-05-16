import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // Store all users in state
  const navigate = useNavigate();

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('appUsers');
    const currentUser = localStorage.getItem('currentUser');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with default user
      const initialUsers = [
        { email: 'sorosengchan@gmail.com', password: '1234', name: 'owner User' }
      ];
      setUsers(initialUsers);
      localStorage.setItem('appUsers', JSON.stringify(initialUsers));
    }
    
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('appUsers') || []);
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      navigate('/home');
      return true;
    }
    return false;
  };

  const signUp = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('appUsers') || []);
    const updatedUsers = [...existingUsers, userData];
    
    localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    navigate('/login');
    return true;
  };

  const resetPassword = (email) => {
    console.log(`Password reset link sent to ${email}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users,
      login, 
      signUp, 
      resetPassword, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}