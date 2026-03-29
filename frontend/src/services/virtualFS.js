// Simplified virtual file system logic

export const getFileLanguage = (path) => {
  const extension = path.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jsx':
    case 'js':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'plaintext';
  }
};

export const INITIAL_FILES = {
  'src/App.jsx': {
    content: `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400">Hello Nexus!</h1>
      <p className="mt-4 text-gray-400">Start building your next masterpiece with AI.</p>
    </div>
  );
}`,
    language: 'javascript',
    aiGenerated: false,
    unsaved: false
  },
  'src/index.css': {
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}`,
    language: 'css',
    aiGenerated: false,
    unsaved: false
  },
  'package.json': {
    content: `{
  "name": "nexus-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}`,
    language: 'json',
    aiGenerated: false,
    unsaved: false
  }
};

export const buildFileTree = (files) => {
  const root = { name: 'root', type: 'folder', children: {} };

  Object.keys(files).forEach((path) => {
    const parts = path.split('/');
    let current = root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current.children[part] = {
          name: part,
          type: 'file',
          path,
          ...files[path]
        };
      } else {
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            type: 'folder',
            children: {}
          };
        }
        current = current.children[part];
      }
    });
  });

  return root.children;
};
