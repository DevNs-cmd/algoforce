import React, { useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Trash2, 
  Copy, 
  ChevronRight,
  Zap
} from 'lucide-react';

const NexusTerminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    let term;
    let fitAddon;

    // Dynamically load xterm + inject its CSS to avoid @import CSSStyleSheet issue
    (async () => {
      try {
        // Inject xterm CSS via link tag to avoid module-level @import restriction
        if (!document.getElementById('xterm-css')) {
          const link = document.createElement('link');
          link.id = 'xterm-css';
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.min.css';
          document.head.appendChild(link);
        }

        const { Terminal } = await import('@xterm/xterm');
        const { FitAddon } = await import('@xterm/addon-fit');

        term = new Terminal({
          cursorBlink: true,
          theme: {
            background: '#0f0f1a',
            foreground: '#e2e8f0',
            cursor: '#00f5ff',
            selectionBackground: 'rgba(0, 245, 255, 0.3)',
            black: '#0a0a14',
            red: '#ff4444',
            green: '#00ff88',
            yellow: '#ff8800',
            blue: '#00f5ff',
            magenta: '#7c3aed',
            cyan: '#00f5ff',
            white: '#e2e8f0',
          },
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: 12,
          lineHeight: 1.3,
        });

        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        if (terminalRef.current) {
          term.open(terminalRef.current);
          fitAddon.fit();
        }

        xtermRef.current = term;
        fitAddonRef.current = fitAddon;

        term.writeln('\x1b[1;36m╔═══════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[1;36m║   Nexus AI Terminal  v1.0     ║\x1b[0m');
        term.writeln('\x1b[1;36m╚═══════════════════════════════╝\x1b[0m');
        term.writeln('');
        term.writeln('\x1b[35mType \x1b[1;37mhelp\x1b[0m\x1b[35m for available commands.\x1b[0m');
        term.writeln('');
        term.write('\x1b[1;32mnexus@algoforce\x1b[0m:\x1b[1;34m~/project\x1b[0m$ ');

        let currentLine = '';

        term.onData((data) => {
          const code = data.charCodeAt(0);
          if (code === 13) { // Enter
            term.write('\r\n');
            handleCommand(term, currentLine.trim());
            currentLine = '';
            term.write('\x1b[1;32mnexus@algoforce\x1b[0m:\x1b[1;34m~/project\x1b[0m$ ');
          } else if (code === 127) { // Backspace
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              term.write('\b \b');
            }
          } else {
            currentLine += data;
            term.write(data);
          }
        });

        const handleResize = () => fitAddon?.fit();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.error('Failed to load xterm:', err);
      }
    })();

    return () => {
      xtermRef.current?.dispose();
      xtermRef.current = null;
    };
  }, []);

  const handleCommand = (term, cmd) => {
    if (!cmd) return;
    const [command, ...args] = cmd.split(' ');

    switch (command) {
      case 'help':
        term.writeln('\x1b[1;36mAvailable commands:\x1b[0m');
        term.writeln('  \x1b[33mhelp\x1b[0m             Show this help');
        term.writeln('  \x1b[33mclear\x1b[0m            Clear the terminal');
        term.writeln('  \x1b[33mls\x1b[0m               List project files');
        term.writeln('  \x1b[33mpwd\x1b[0m              Show current directory');
        term.writeln('  \x1b[33mnpm run dev\x1b[0m      Start dev server');
        term.writeln('  \x1b[33mnpm install\x1b[0m      Install dependencies');
        term.writeln('  \x1b[33mnexus help\x1b[0m       Nexus AI commands');
        break;
      case 'clear':
        term.clear();
        break;
      case 'pwd':
        term.writeln('/home/nexus/project');
        break;
      case 'ls':
        term.writeln('\x1b[1;34msrc/\x1b[0m  \x1b[1;34mpublic/\x1b[0m  \x1b[33mpackage.json\x1b[0m  \x1b[33mvite.config.js\x1b[0m  \x1b[33mtailwind.config.js\x1b[0m');
        break;
      case 'npm':
        if (args[0] === 'run' && args[1] === 'dev') {
          term.writeln('\x1b[1;36m> nexus-project@1.0.0 dev\x1b[0m');
          term.writeln('\x1b[1;36m> vite\x1b[0m');
          term.writeln('');
          term.writeln('  \x1b[1;32m➜\x1b[0m  Local:   \x1b[1;36mhttp://localhost:5173/\x1b[0m');
          term.writeln('  \x1b[1;32m➜\x1b[0m  Network: use --host to expose');
          term.writeln('');
          term.writeln('\x1b[1;32m✔ Live Preview updated in Nexus\x1b[0m');
        } else if (args[0] === 'install') {
          term.writeln('\x1b[1;33mInstalling dependencies...\x1b[0m');
          let progress = 0;
          const bar = () => {
            progress += 10;
            const filled = Math.floor(progress / 5);
            term.write(`\r[\x1b[32m${'█'.repeat(filled)}${'░'.repeat(20 - filled)}\x1b[0m] ${progress}%`);
            if (progress < 100) setTimeout(bar, 200);
            else { term.writeln('\r\n\x1b[1;32m✔ Done in 2.4s\x1b[0m'); }
          };
          bar();
        } else {
          term.writeln(`\x1b[31merror\x1b[0m: Unknown npm command: ${args.join(' ')}`);
        }
        break;
      case 'nexus':
        if (args[0] === 'help') {
          term.writeln('\x1b[1;35mNexus AI CLI:\x1b[0m');
          term.writeln('  \x1b[33mnexus build\x1b[0m   Build production bundle');
          term.writeln('  \x1b[33mnexus fix\x1b[0m     Auto-fix errors in project');
          term.writeln('  \x1b[33mnexus deploy\x1b[0m  Deploy to Vercel');
        }
        break;
      default:
        term.writeln(`\x1b[31mbash\x1b[0m: ${command}: command not found`);
    }
  };

  const clearTerminal = () => {
    xtermRef.current?.clear();
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f1a]">
      {/* Toolbar */}
      <div className="h-8 border-b border-[#1a1a2e] bg-[#0a0a14] flex items-center justify-between px-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">zsh — nexus@algoforce</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearTerminal}
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#1a1a2e] text-slate-500 hover:text-white transition-all text-[10px] font-bold"
          >
            <Trash2 className="w-3 h-3" />
            CLEAR
          </button>
          <div className="h-3 w-px bg-slate-800 mx-1" />
          <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold text-cyan-500 bg-cyan-500/10 rounded-full select-none">
            <Zap className="w-2.5 h-2.5" />
            LIVE
          </div>
        </div>
      </div>

      <div className="flex-grow relative overflow-hidden p-1">
        <div ref={terminalRef} className="h-full w-full" />
      </div>

      {/* Status bar */}
      <div className="h-6 bg-[#0a0a14] border-t border-[#1a1a2e] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
          <ChevronRight className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-medium text-slate-600">
          <span>UTF-8</span>
          <span>node v20</span>
        </div>
      </div>
    </div>
  );
};

export default NexusTerminal;
