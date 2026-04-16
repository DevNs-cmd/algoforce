import React, { createContext, useContext, useReducer, useEffect } from 'react';

const genId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const NexusContext = createContext();

const initialState = {
  project: {
    id: genId(),
    name: 'Untitled Project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: {}, // path: { content, language, aiGenerated, unsaved }
    activeFilePath: null,
    openTabs: [],
    templateId: null
  },
  editor: {
    theme: 'nexus-dark',
    fontSize: 14,
    wordWrap: 'on',
    minimap: true,
    pendingDiff: null // { filePath, original, modified }
  },
  ai: {
    model: 'claude-sonnet-4-5',
    agentMode: false,
    isGenerating: false,
    streamBuffer: '',
    messages: [], // { role, content, timestamp, filesModified }
    sessionId: genId()
  },
  ui: {
    leftPanelOpen: true,
    rightPanelOpen: true,
    bottomPanelOpen: true,
    bottomTab: 'chat', // 'chat' | 'terminal'
    previewDevice: 'desktop',
    autoRefresh: true,
    backgroundEnabled: true
  }
};

function nexusReducer(state, action) {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, project: { ...state.project, ...action.payload } };
    case 'SET_FILES':
      return { ...state, project: { ...state.project, files: action.payload, updatedAt: new Date().toISOString() } };
    case 'UPDATE_FILE': {
      const { path, content, unsaved = true } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          files: {
            ...state.project.files,
            [path]: { ...state.project.files[path], content, unsaved }
          },
          updatedAt: new Date().toISOString()
        }
      };
    }
    case 'SAVE_FILE': {
      const path = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          files: {
            ...state.project.files,
            [path]: { ...state.project.files[path], unsaved: false }
          }
        }
      };
    }
    case 'SET_ACTIVE_FILE':
      return {
        ...state,
        project: {
          ...state.project,
          activeFilePath: action.payload,
          openTabs: state.project.openTabs.includes(action.payload)
            ? state.project.openTabs
            : [...state.project.openTabs, action.payload]
        }
      };
    case 'CLOSE_TAB': {
      const path = action.payload;
      const newTabs = state.project.openTabs.filter(t => t !== path);
      let newActive = state.project.activeFilePath;
      if (newActive === path) {
        newActive = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
      }
      return {
        ...state,
        project: { ...state.project, openTabs: newTabs, activeFilePath: newActive }
      };
    }
    case 'SET_AI_STATE':
      return { ...state, ai: { ...state.ai, ...action.payload } };
    case 'ADD_MESSAGE':
      return { ...state, ai: { ...state.ai, messages: [...state.ai.messages, action.payload] } };
    case 'SET_UI_STATE':
      return { ...state, ui: { ...state.ui, ...action.payload } };
    case 'SET_EDITOR_STATE':
      return { ...state, editor: { ...state.editor, ...action.payload } };
    case 'LOAD_STATE':
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}

export const NexusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nexusReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexus_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up messages for a fresh start
        if (parsed.ai) parsed.ai.messages = [];
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('nexus_state', JSON.stringify(state));
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <NexusContext.Provider value={{ state, dispatch }}>
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
