import React, { createContext, useContext, useReducer, useEffect } from 'react';

const genId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const NexusContext = createContext();
const NEXUS_STORAGE_KEY = 'nexus_state';
const PERSIST_DELAY = 900;

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
      return { ...state, ai: { ...state.ai, messages: [...state.ai.messages, action.payload].slice(-100) } };
    case 'SET_UI_STATE':
      return { ...state, ui: { ...state.ui, ...action.payload } };
    case 'SET_EDITOR_STATE':
      return { ...state, editor: { ...state.editor, ...action.payload } };
    case 'LOAD_STATE': {
      const loaded = action.payload || {};
      return {
        ...initialState,
        ...loaded,
        project: { ...initialState.project, ...loaded.project },
        editor: { ...initialState.editor, ...loaded.editor },
        ai: { ...initialState.ai, ...loaded.ai, messages: [] },
        ui: { ...initialState.ui, ...loaded.ui },
      };
    }
    default:
      return state;
  }
}

export const NexusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nexusReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NEXUS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean up messages for a fresh start
        if (parsed.ai) parsed.ai.messages = [];
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (e) {
      console.error('Failed to load saved Nexus state', e);
    }
  }, []);

  // Save only durable editor state. AI streaming updates can occur dozens of
  // times per second, so persisting them would serialize the full project on
  // every token and make typing noticeably janky on mobile devices.
  useEffect(() => {
    const persist = () => {
      try {
        localStorage.setItem(NEXUS_STORAGE_KEY, JSON.stringify({
          project: state.project,
          editor: state.editor,
          ui: state.ui,
          ai: {
            model: state.ai.model,
            agentMode: state.ai.agentMode,
            sessionId: state.ai.sessionId,
          },
        }));
      } catch (error) {
        console.warn('Failed to save Nexus state', error);
      }
    };

    let idleId;
    const timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(persist, { timeout: 1200 });
      } else {
        persist();
      }
    }, PERSIST_DELAY);

    return () => {
      window.clearTimeout(timer);
      if (idleId) window.cancelIdleCallback?.(idleId);
    };
  }, [state.project, state.editor, state.ui, state.ai.model, state.ai.agentMode, state.ai.sessionId]);

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
