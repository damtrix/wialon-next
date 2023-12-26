import { createContext, useState, useRef } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [resourceId, setResourceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [unitId, setUnitId] = useState('');
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const from = fromRef.current;
  const to = toRef.current;

  return (
    <AppContext.Provider
      value={{
        resourceId,
        setResourceId,
        templateId,
        setTemplateId,
        unitId,
        setUnitId,
        from,
        to,
        fromRef,
        toRef,
      }}>
      {children}
    </AppContext.Provider>
  );
};
