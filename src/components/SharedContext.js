import { createContext, useContext, useReducer } from 'react';

const SharedStateContext = createContext();

const initialState = {
  updatedState: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, updatedState: action.payload };
    default:
      return state;
  }
};

const SharedStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SharedStateContext.Provider value={{ state, dispatch }}>
      {children}
    </SharedStateContext.Provider>
  );
};

const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};

export { SharedStateProvider, useSharedState };
