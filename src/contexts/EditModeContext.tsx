"use client";

import { createContext, useContext } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  sidebarOpen: boolean;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  sidebarOpen: false,
});

export const useEditMode = () => useContext(EditModeContext);

interface EditModeProviderProps {
  children: React.ReactNode;
  isEditMode: boolean;
  sidebarOpen?: boolean;
}

export function EditModeProvider({
  children,
  isEditMode,
  sidebarOpen = false,
}: EditModeProviderProps) {
  return (
    <EditModeContext.Provider value={{ isEditMode, sidebarOpen }}>
      {children}
    </EditModeContext.Provider>
  );
}
