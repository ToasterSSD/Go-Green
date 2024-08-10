// UserContext.js
import { createContext } from 'react';

// Create UserContext
const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export default UserContext;
