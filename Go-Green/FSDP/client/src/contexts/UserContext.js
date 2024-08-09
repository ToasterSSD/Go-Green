// UserContext.js
import { createContext, useContext } from 'react';

// Create UserContext
const UserContext = createContext({
  user: null,
  setUser: () => {}
});

// Hook to use UserContext
export const useUser = () => useContext(UserContext);

// Export the context for other components to use
export default UserContext;
