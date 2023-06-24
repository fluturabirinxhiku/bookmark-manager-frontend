import {createContext, useEffect, useState} from "react";
import {getAllFolders} from "../services/folderService";

// Create a new context
export const FolderContext = createContext();

// Create a context provider component
export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await getAllFolders();
      setFolders(response.data);
    } catch (error) {
      console.log("Error fetching folders:", error);
    }
  };

  // Value to be provided to consuming components
  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      {children}
    </FolderContext.Provider>
  );
};
