// Mock database
const users = [];

export const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve({ success: true, user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  signUp: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.push(userData);
        resolve({ success: true });
      }, 1000);
    });
  },

  resetPassword: (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Password reset link sent to ${email}`);
        resolve({ success: true });
      }, 1000);
    });
  }
};