import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Search, 
  Settings,
  MoreVertical,
  Zap,
  Trash2,
  Edit2
} from 'lucide-react';
import { useNexus } from '../../contexts/NexusContext';
import { buildFileTree, getFileLanguage } from '../../services/virtualFS';

const FileIcon = ({ name, type }) => {
  if (type === 'folder') return <Folder className="w-4 h-4 text-slate-500 fill-slate-500/20" />;
  
  const ext = name.split('.').pop().toLowerCase();
  switch (ext) {
    case 'jsx':
    case 'js':
      return <File className="w-4 h-4 text-cyan-400 fill-cyan-400/10" />;
    case 'css':
      return <File className="w-4 h-4 text-purple-400 fill-purple-400/10" />;
    case 'json':
      return <File className="w-4 h-4 text-yellow-400 fill-yellow-400/10" />;
    case 'md':
      return <File className="w-4 h-4 text-green-400 fill-green-400/10" />;
    default:
      return <File className="w-4 h-4 text-slate-400" />;
  }
};

const FileItem = ({ item, depth, onSelect }) => {
  const { state } = useNexus();
  const [isOpen, setIsOpen] = useState(depth === 0);
  const isActive = state.project.activeFilePath === item.path;

  const handleClick = (e) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onSelect(item.path);
    }
  };

  return (
    <div className="select-none">
      <div 
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 12 + 16}px` }}
        className={`flex items-center group relative h-8 cursor-pointer transition-colors border-l-2 ${isActive ? 'bg-cyan-500/10 border-cyan-500' : 'border-transparent hover:bg-[#1a1a2e]'}`}
      >
        <div className="flex items-center gap-2 w-full pr-2">
          {item.type === 'folder' && (
            <div className="flex-shrink-0">
              {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
            </div>
          )}
          {item.type === 'file' && <div className="w-4 flex-shrink-0" />}
          
          <FileIcon name={item.name} type={item.type} />
          
          <span className={`text-[13px] truncate ${isActive ? 'text-cyan-400 font-medium' : item.type === 'folder' ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-200'}`}>
            {item.name}
          </span>

          {item.aiGenerated && (
            <Zap className="w-3 h-3 text-purple-500 fill-purple-500/20 flex-shrink-0" />
          )}

          {item.unsaved && (
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 ml-auto" />
          )}

          <div className="flex-shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <MoreVertical className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {item.type === 'folder' && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {Object.values(item.children).map((child) => (
              <FileItem key={child.name} item={child} depth={depth + 1} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NexusFileTree = () => {
  const { state, dispatch } = useNexus();
  const fileTree = useMemo(() => buildFileTree(state.project.files), [state.project.files]);

  const handleSelect = (path) => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: path });
  };

  const createNewFile = () => {
    // Basic prompt for now
    const name = window.prompt('Enter filename (e.g. src/components/Header.jsx)');
    if (name) {
      const newFiles = {
        ...state.project.files,
        [name]: {
          content: '',
          language: getFileLanguage(name),
          aiGenerated: false,
          unsaved: true
        }
      };
      dispatch({ type: 'SET_FILES', payload: newFiles });
      dispatch({ type: 'SET_ACTIVE_FILE', payload: name });
    }
  };

  return (
    <div className="h-full bg-[#0a0a14] border-r border-[#1a1a2e] flex flex-col py-2">
      <div className="px-4 mb-4 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Explorer</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={createNewFile}
            className="p-1 rounded hover:bg-[#1a1a2e] text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-[#1a1a2e] text-slate-500 hover:text-cyan-400 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar">
        {Object.values(fileTree).map((item) => (
          <FileItem key={item.name} item={item} depth={0} onSelect={handleSelect} />
        ))}
      </div>

      <div className="mt-auto px-4 py-2 border-t border-[#1a1a2e] flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 hover:text-white cursor-pointer transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-xs font-medium">Settings</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 hover:text-white cursor-pointer transition-colors">
          <Zap className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-medium">Auto-fix</span>
        </div>
      </div>
    </div>
  );
};

export default NexusFileTree;
