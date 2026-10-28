import { createContext, useState } from "react";

// Default value used when no provider is present
export const SavedContext = createContext({
  ids: [],
  addTrail: (id) => {},
  removeTrail: (id) => {},
});

function SavedContextProvider({ children }) {
  const [savedTrailIds, setSavedTrailIds] = useState([]);

  function addTrail(id) {
    setSavedTrailIds((currentSavedIds) => [...currentSavedIds, id]);
  }

  function removeTrail(id) {
    setSavedTrailIds((currentSavedIds) =>
      currentSavedIds.filter((trailId) => trailId !== id)
    );
  }

  const value = {
    ids: savedTrailIds,
    addTrail: addTrail,
    removeTrail: removeTrail,
  };

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export default SavedContextProvider;
