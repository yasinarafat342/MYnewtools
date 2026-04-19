import React, { createContext, useState, useContext } from 'react';

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [timelineData, setTimelineData] = useState([]);

  const addInteraction = (interaction) => {
    setTimelineData(prev => [interaction, ...prev]);
  };

  return (
    <InteractionContext.Provider value={{ timelineData, addInteraction }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => useContext(InteractionContext);