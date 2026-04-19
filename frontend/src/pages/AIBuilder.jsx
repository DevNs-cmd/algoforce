import { useState, useRef, useEffect, useCallback, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import MonacoEditor from '@monaco-editor/react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera, useGLTF, Environment, ContactShadows, PresentationControls, Stage } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useAuth } from '../contexts/AuthContext'
import { streamChat, AI_MODELS } from '../services/aiService'
import api from '../services/api'
import AuthModal from '../components/auth/AuthModal'
const genId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))
import {
    FaRobot, FaCode, FaRocket, FaChevronRight,
    FaDownload, FaPlus, FaPlay,
    FaTerminal, FaDesktop, FaPaperclip,
    FaSearch, FaHistory, FaCog, FaMicrochip, FaGlobe, FaMemory, FaPuzzlePiece, FaBolt,
    FaWhatsapp, FaTelegram, FaDiscord, FaSlack, FaSignal, FaGithub, FaSpotify, FaTwitter, FaBars
} from 'react-icons/fa'

// ─── 3D Visuals ─────────────────────────────────────────────────────────────

const CameraRig = ({ scrollProgress }) => {
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const s = scrollProgress.current
        
        // Dynamic camera tracking
        // Entry zoom-in (0.0 -> 0.2)
        // Focus drift (0.2 -> 0.8)
        // Exit recede (0.8 -> 1.0)
        const targetZ = s < 0.2 ? 8 - (s * 15) : 5 + Math.sin(t * 0.2) * 0.2
        const targetY = s > 0.8 ? (s - 0.8) * 10 : Math.cos(t * 0.1) * 0.1
        
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
        state.camera.position.x = Math.sin(t * 0.1) * 0.5
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

const PixelLabsModel = ({ scrollProgress }) => {
    const { scene } = useGLTF('/pixellabs.glb')
    const meshRef = useRef()

    useEffect(() => {
        scene.traverse((node) => {
            if (node.isMesh) {
                node.material.envMapIntensity = 2.5
                node.material.roughness = 0.05
                node.material.metalness = 1
                if (node.name.toLowerCase().includes('glow') || node.name.toLowerCase().includes('light')) {
                    node.material.emissive = new THREE.Color('#9333ea')
                    node.material.emissiveIntensity = 3
                }
            }
        })
    }, [scene])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const { x, y } = state.mouse
        const s = scrollProgress.current
        
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.15 + (s * Math.PI * 4) + (x * 0.3)
            meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.1 + (s * Math.PI * 0.5) - (y * 0.3)
            
            // Interaction depth and breathing
            const baseScale = s < 0.2 ? s * 10 : 2
            meshRef.current.scale.setScalar(baseScale * (1.0 + Math.sin(t * 2) * 0.02))
            meshRef.current.position.y = Math.sin(t * 1.5) * 0.1 + (y * 0.1)
            meshRef.current.position.x = x * 0.2
        }
    })

    return <primitive ref={meshRef} object={scene} />
}

const AbstractSphere = ({ scrollProgress }) => (
    <group>
        <CameraRig scrollProgress={scrollProgress} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Suspense fallback={null}>
                <PixelLabsModel scrollProgress={scrollProgress} />
            </Suspense>

            {/* Cinematic Glass Core */}
            <Sphere args={[1, 128, 128]} scale={1.85} transparent>
                <MeshDistortMaterial
                    color="#ffffff"
                    speed={1.5}
                    distort={0.12}
                    radius={1}
                    metalness={0.1}
                    roughness={0}
                    transmission={1}
                    thickness={4}
                    ior={1.45}
                    reflectivity={1}
                    clearcoat={1}
                    transparent
                    opacity={0.15}
                />
            </Sphere>
        </Float>
        
        <Stars radius={200} depth={60} count={9000} factor={7} saturation={0} fade speed={0.4} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} intensity={2.5} color="#ffffff" castShadow />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#4f46e5" />
        <pointLight position={[15, -15, 15]} intensity={1.5} color="#9333ea" />
        <pointLight position={[0, 10, -15]} intensity={5} color="#ffffff" />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -4.5, 0]} opacity={0.5} scale={20} blur={3} far={5} />
        
        <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} intensity={2} />
            <Noise opacity={0.04} />
            <Vignette eskil={false} offset={0.1} darkness={1.2} />
            <ChromaticAberration offset={[0.0008, 0.0008]} />
        </EffectComposer>
    </group>
)

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SESSION_KEY = 'af_session_id'
const getSessionId = () => {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) { id = genId(); localStorage.setItem(SESSION_KEY, id) }
    return id
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const ModelSelector = ({ value, onChange }) => {
    const [open, setOpen] = useState(false)
    const selected = AI_MODELS.find(m => m.id === value) || AI_MODELS[0]
    const ref = useRef()

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
            >
                <span>{selected.label}</span>
                <span className="opacity-40 text-[8px]">{open ? '▲' : '▼'}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute bottom-full mb-2 right-0 z-[100] w-48 rounded-xl bg-[#0F0F0F] border border-white/10 shadow-2xl p-2 backdrop-blur-3xl"
                    >
                        {AI_MODELS.map(m => (
                            <button
                                key={m.id}
                                onClick={() => { onChange(m.id); setOpen(false) }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-all ${m.id === value ? 'bg-purple-600/10 text-purple-500' : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'}`}
                            >
                                <span className="text-xs">{m.icon}</span>
                                <div className="text-[9px] font-black uppercase">{m.label}</div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const ChatMessage = ({ message }) => {
    const isUser = message.role === 'user'
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 mb-8 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs ${isUser ? 'bg-[#111] text-white border border-white/5' : 'bg-purple-600/10 border border-[#9333ea]/20 text-purple-600'}`}>
                {isUser ? 'U' : <FaRobot />}
            </div>
            <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-[14px] leading-relaxed relative border backdrop-blur-sm ${isUser ? 'bg-[#121212]/80 text-white border-white/5' : 'bg-white/[0.02] border-white/5 text-gray-300'}`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.streaming && (
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 ml-1 bg-purple-600 align-middle" />
                )}
            </div>
        </motion.div>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────────
const AIBuilder = () => {
    const { user, token, logout } = useAuth()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [accountModalOpen, setAccountModalOpen] = useState(false)
    const sessionId = getSessionId()

    // UI state
    const [isLanding, setIsLanding] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [rightPanelOpen, setRightPanelOpen] = useState(true)
    const [activeTab, setActiveTab] = useState('preview')

    // Data state
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)
    const [currentProjectId, setCurrentProjectId] = useState(null)
    const messagesEndRef = useRef()

    const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
    const [projectFiles, setProjectFiles] = useState([])
    const [activeFile, setActiveFile] = useState(null)
    const [projectName, setProjectName] = useState('')
    const [fileContents, setFileContents] = useState({})

    const fetchProjects = useCallback(async () => {
        try {
            const params = user ? {} : { sessionId }
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            const res = await api.get('/projects', { params, headers })
            setConversations(res.data.projects || [])
        } catch { }
    }, [user, sessionId, token])

    useEffect(() => { fetchProjects() }, [fetchProjects])
    useEffect(() => { if (!isLanding) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLanding])

    const startNewChat = useCallback(() => {
        setIsLanding(true); setMessages([]); setProjectFiles([]); setActiveFile(null);
        setProjectName(''); setFileContents({}); setCurrentProjectId(null); setInput('');
        setSidebarOpen(false);
    }, [])

    const loadConversation = useCallback(async (proj) => {
        try {
            setIsLanding(false); setSidebarOpen(false)
            const res = await api.get(`/projects/${proj._id}`)
            const p = res.data.project
            setMessages(p.messages || []); setProjectFiles(p.files || []); setProjectName(p.name || '')
            setCurrentProjectId(p._id)
            if (p.files?.length) {
                setActiveFile(p.files[0])
                const contents = {}; p.files.forEach(f => { contents[f.path] = f.code }); setFileContents(contents)
            }
        } catch { }
    }, [])

    const sendMessage = useCallback(async () => {
        const text = input.trim()
        if (!text || isStreaming) return
        if (isLanding) setIsLanding(false)
        setInput(''); setIsStreaming(true)
        const userMsg = { role: 'user', content: text }
        const aiMsg = { role: 'assistant', content: '', streaming: true }
        setMessages(prev => [...prev, userMsg, aiMsg])
        const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))

        await streamChat({
            messages: history, model: selectedModel, projectId: currentProjectId, sessionId, token,
            onChunk: (chunk) => {
                setMessages(prev => {
                    const copy = [...prev]; const last = copy[copy.length - 1]
                    if (last) copy[copy.length - 1] = { ...last, content: last.content + chunk }
                    return copy
                })
            },
            onDone: (project, projectId) => {
                setMessages(prev => {
                    const copy = [...prev]; const last = copy[copy.length - 1]
                    if (last) copy[copy.length - 1] = { ...last, streaming: false }
                    return copy
                })
                setIsStreaming(false)
                if (project?.files) {
                    setProjectFiles(project.files); setProjectName(project.project_name || 'Project')
                    const contents = {}; project.files.forEach(f => { contents[f.path] = f.code }); setFileContents(contents); setActiveFile(project.files[0])
                }
                if (projectId) { setCurrentProjectId(projectId); fetchProjects() }
            },
            onError: (err) => {
                setMessages(prev => {
                    const copy = [...prev]; const last = copy[copy.length - 1]
                    if (last) copy[copy.length - 1] = { ...last, content: `Error: ${err}`, streaming: false }
                    return copy
                }); setIsStreaming(false)
            }
        })
    }, [input, isStreaming, messages, selectedModel, currentProjectId, sessionId, token, fetchProjects, isLanding])

    const downloadProject = async () => {
        if (!projectFiles.length) return
        const files = projectFiles.map(f => ({ path: f.path, code: fileContents[f.path] ?? f.code }))
        try {
            const res = await api.post('/projects/download', { files, projectName: projectName || 'nexus-project' }, { responseType: 'blob' })
            const url = URL.createObjectURL(res.data); const a = document.createElement('a')
            a.href = url; a.download = `${(projectName || 'nexus-project').replace(/\s+/g, '-').toLowerCase()}.zip`; a.click()
            URL.revokeObjectURL(url)
        } catch (err) { }
    }

    const buildPreviewHtml = () => {
        const htmlFile = projectFiles.find(f => f.path.endsWith('index.html'))
        if (!htmlFile) return '<body style="background:#000;color:#222;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:4px">No Preview</body>'
        return fileContents[htmlFile.path] ?? htmlFile.code
    }

    const scrollProgress = useRef(0)
    const scrollContainerRef = useRef(null)

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        scrollProgress.current = scrollTop / (scrollHeight - clientHeight)
    }

    return (
        <div className="flex h-screen bg-[#000000] text-white overflow-hidden font-outfit selection:bg-purple-600 selection:text-white">
            <Helmet>
                <title>Nexus – Vibe Coding Studio</title>
                <meta name="description" content="Pure AI Speed. Multi-model Vibe Coding." />
            </Helmet>

            {/* ── 3D Visuals ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} shadows>
                    <Suspense fallback={null}>
                        <AbstractSphere scrollProgress={scrollProgress} />
                    </Suspense>
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
            </div>

            {/* ── SIDE RAIL ── */}
            <aside className="hidden md:flex w-[60px] flex-col items-center py-6 gap-8 bg-[#050505]/80 border-r border-white/5 z-50 transition-all backdrop-blur-xl">
                <button onClick={startNewChat} className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9333ea] to-[#FF0000] flex items-center justify-center text-white shadow-[0_0_20px_#9333ea44] transition-all hover:scale-105 active:scale-95 group">
                    <FaBolt size={16} />
                </button>
                <div className="flex flex-col gap-8 text-gray-600">
                    <button onClick={() => setAccountModalOpen(true)} className="hover:text-white transition-all transform hover:scale-110" title="Profile"><FaPlus /></button>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`transition-all transform hover:scale-110 ${sidebarOpen ? 'text-purple-600' : 'hover:text-white'}`} title="History"><FaHistory /></button>
                    <button className="hover:text-white transition-all transform hover:scale-110" title="Settings"><FaCog /></button>
                </div>
                <div className="mt-auto mb-4">
                    <button onClick={() => setAuthModalOpen(true)} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all hover:bg-white/5">
                        <span className="text-[10px] font-black">{user ? user.name?.[0] : '?'}</span>
                    </button>
                </div>
            </aside>

            {/* ── DRAWER (History) ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                        className="fixed left-0 md:left-[60px] top-0 bottom-0 w-full md:w-80 bg-[#080808]/95 border-r border-white/5 z-[60] p-10 flex flex-col backdrop-blur-3xl"
                    >
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 mb-10">Nexus Logs</h3>
                        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                            {conversations.map(conv => (
                                <button key={conv._id} onClick={() => loadConversation(conv)} className={`w-full text-left p-4 rounded-2xl transition-all border ${currentProjectId === conv._id ? 'border-purple-600/30 bg-purple-600/5 text-white' : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-white'}`}>
                                    <div className="text-xs font-bold truncate mb-1">{conv.name}</div>
                                    <div className="text-[9px] opacity-30 uppercase tracking-widest">{new Date(conv.updatedAt).toLocaleDateString()}</div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 flex flex-col relative z-20 overflow-hidden">

                {/* GLOBAL NAV - Optimized for No Hiding */}
                <nav className="h-16 md:h-20 flex items-center justify-between px-6 md:px-12 z-50 bg-black/50 backdrop-blur-md relative border-b border-white/5">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="block md:hidden text-gray-400 mr-2" onClick={(e) => { e.stopPropagation(); setSidebarOpen(true); }}><FaBars size={20} /></div>
                        <h2 className="text-lg md:text-xl font-black tracking-tighter uppercase italic">Nexus</h2>
                        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-purple-600" />
                    </div>
                    <div className="flex items-center gap-6 md:gap-10">
                        {['About', 'Labs'].map(t => (
                            <a key={t} href={`/${t.toLowerCase()}`} className="hidden sm:block text-[10px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-[0.3em]">{t}</a>
                        ))}
                        <button onClick={() => setAuthModalOpen(true)} className="px-6 py-3 md:px-8 md:py-3.5 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl">Studio</button>
                    </div>
                </nav>

                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto custom-scrollbar relative"
                >
                    <AnimatePresence mode="wait">
                        {isLanding ? (
                            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">

                                {/* HERO SECTION (OpenClaw Style) */}
                                <section className="w-full max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-40 flex flex-col items-center text-center">
                                    <motion.div
                                        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                        className="mb-8 md:mb-12"
                                    >
                                        <div className="w-16 h-16 md:w-24 md:h-24 bg-purple-600 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_50px_#9333ea66] relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                            <FaRobot className="relative z-10" size={32} />
                                        </div>
                                    </motion.div>

                                    <h1 className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[7rem] font-black tracking-tighter mb-4 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">Nexus AI</h1>
                                    <h2 className="text-[10px] sm:text-[12px] md:text-[14px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-purple-600 mb-6 md:mb-12 px-4 shadow-sm">THE VIBE CODING TOOL THAT ACTUALLY WORKS.</h2>

                                    <p className="max-w-2xl text-xs sm:text-sm md:text-lg text-gray-400 font-medium leading-relaxed mb-10 md:mb-16 px-6">
                                        Nexus automates the heavy lifting. Build, deploy, and iterate through pure intuition. One prompt to rule them all.
                                    </p>

                                    <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-[#9333ea]/20 bg-purple-600/5 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-purple-500 mb-12 md:mb-24 cursor-pointer hover:bg-purple-600/10 transition-all mx-4">
                                        <span className="bg-purple-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black">NEW</span>
                                        Real-time Vercel Cloud Integration <FaChevronRight size={8} />
                                    </div>

                                    {/* INPUT BOX (Blackbox AI Style - Compact) */}
                                    <div className="w-full max-w-2xl mb-12 md:mb-20 relative group px-4">
                                        <div className="absolute inset-x-4 inset-y-0 bg-purple-600/10 blur-[60px] md:blur-[80px] opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
                                        <div className="relative bg-[#0F0F0F] rounded-[2.5rem] md:rounded-full border border-white/5 p-2.5 flex flex-col md:flex-row items-center shadow-2xl focus-within:border-[#9333ea]/40 transition-all">
                                            <div className="hidden md:flex pl-8 text-gray-600 group-focus-within:text-purple-600 transition-colors"><FaPaperclip size={18} /></div>
                                            <input
                                                value={input} onChange={e => setInput(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                                                placeholder="Build me a modern SaaS dashboard..."
                                                className="w-full md:flex-1 bg-transparent border-none outline-none px-6 md:px-8 py-4 md:py-5 text-sm md:text-base text-white placeholder-gray-800 font-bold"
                                            />
                                            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 p-2 md:pr-3 border-t md:border-t-0 border-white/5 md:mt-0">
                                                <div className="md:hidden flex pl-4 text-gray-700"><FaPaperclip size={16} /></div>
                                                <ModelSelector value={selectedModel} onChange={setSelectedModel} />
                                                <button onClick={sendMessage} className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                                                    <FaPlay size={10} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PILL SUGGESTIONS */}
                                    <div className="flex flex-wrap justify-center gap-4 mb-48 opacity-40">
                                        {['Agent', 'CLI', 'Web Builder', 'Desktop', 'API', 'IDE'].map(t => (
                                            <button key={t} onClick={() => setInput(`Generate ${t} implementation...`)} className="px-6 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest hover:border-white/30 transition-all">{'->'} {t}</button>
                                        ))}
                                    </div>

                                    {/* QUICK START TERMINAL */}
                                    <div className="w-full max-w-4xl mb-32 md:mb-48 text-left px-4">
                                        <div className="inline-flex items-center gap-3 text-xl md:text-2xl font-black mb-6 md:mb-10 tracking-tighter uppercase italic px-2">
                                            <span className="text-purple-600">{'->'}</span> Quick Start
                                        </div>
                                        <div className="bg-[#0A0A0A] rounded-[2rem] md:rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                                            <div className="flex flex-col sm:flex-row sm:items-center p-4 md:p-6 border-b border-white/5 gap-4 md:gap-2">
                                                <div className="flex gap-2 mr-6">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                                </div>
                                                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scroll-hide">
                                                    {['One-liner', 'npm', 'Hackable'].map((t, i) => (
                                                        <button key={t} className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${i === 0 ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-white'}`}>{t}</button>
                                                    ))}
                                                </div>
                                                <div className="sm:ml-auto text-[11px] font-bold text-gray-700 uppercase tracking-widest flex gap-4 md:gap-6 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                                    <span>OS: <span className="text-purple-600 underline cursor-pointer">Auto</span></span>
                                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded">PowerShell</span>
                                                </div>
                                            </div>
                                            <div className="p-8 md:p-12 font-mono text-[11px] md:text-sm leading-relaxed text-gray-500 overflow-x-auto">
                                                <p className="mb-6"># Deploy Nexus Engine globally. 🦞</p>
                                                <div className="flex items-center gap-4 text-white text-sm md:text-base min-w-max">
                                                    <span className="text-purple-600">$</span>
                                                    <span className="flex-1">iwr -useb https://nexus.studio/install.ps1 | iex</span>
                                                    <button className="text-gray-700 hover:text-white" onClick={() => navigator.clipboard.writeText('iwr -useb https://nexus.studio/install.ps1 | iex')}><FaCode size={16} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FEATURES GRID */}
                                    <div className="w-full max-w-5xl mb-48 text-left">
                                        <div className="inline-flex items-center gap-3 text-2xl font-black mb-16 tracking-tighter uppercase italic">
                                            <span className="text-purple-600">{'->'}</span> What It Does
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                            {[
                                                { title: 'Local Speed', icon: <FaDesktop />, desc: 'Works on your machine. Latency-free generation and local execution.' },
                                                { title: 'Vibe Chat', icon: <FaGlobe />, desc: 'Communicate with Nexus on Discord, Telegram, or our native terminal.' },
                                                { title: 'Nexus Memory', icon: <FaMemory />, desc: 'Persistent project awareness across all platforms and accounts.' },
                                                { title: 'Code Search', icon: <FaSearch />, desc: 'Deep indexing of your codebase for precise, contextual answers.' },
                                                { title: 'System Access', icon: <FaTerminal />, desc: 'Full shell and file system integration for end-to-end task automation.' },
                                                { title: 'Engine Skills', icon: <FaPuzzlePiece />, desc: 'Extend Nexus with custom plugins or build specialized AI micro-services.' }
                                            ].map((f, i) => (
                                                <div key={i} className="p-8 md:p-12 rounded-[3rem] bg-[#0A0A0A]/50 border border-white/5 hover:border-purple-600/30 transition-all hover:bg-[#0F0F0F] group text-center sm:text-left">
                                                    <div className="text-purple-600 text-2xl md:text-3xl mb-4 md:mb-8 transform group-hover:scale-110 transition-transform mx-auto sm:mx-0">{f.icon}</div>
                                                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4 tracking-tighter">{f.title}</h4>
                                                    <p className="text-gray-600 text-[11px] md:text-[13px] leading-relaxed font-bold">{f.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* INTEGRATIONS ROLL */}
                                    <div className="w-full max-w-4xl mb-48 flex flex-col items-center">
                                        <div className="text-[12px] font-bold uppercase tracking-[0.5em] text-gray-600 mb-16">Works With Everything</div>
                                        <div className="flex flex-wrap justify-center gap-6 opacity-30">
                                            {[FaWhatsapp, FaTelegram, FaDiscord, FaSlack, FaSignal, FaRobot, FaMicrochip, FaGlobe, FaMemory, FaGithub, FaSpotify, FaTwitter].map((Icon, i) => (
                                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:scale-110 cursor-pointer">
                                                    <Icon size={24} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-12 flex flex-col md:flex-row gap-6 md:gap-10 text-[11px] font-bold text-purple-600 uppercase tracking-widest text-center">
                                            <span className="cursor-pointer hover:underline underline-offset-4">View All Integrations {'->'}</span>
                                            <span className="cursor-pointer hover:underline underline-offset-4">Read Build Reports {'->'}</span>
                                        </div>
                                    </div>

                                    {/* STAY IN THE LOOP */}
                                    <div className="w-full max-w-3xl mb-48 p-12 md:p-20 rounded-[3rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">Stay in the Loop</h3>
                                        <p className="text-gray-500 font-bold mb-12 text-sm leading-relaxed">Get updates on new features, integrations, and engine wisdom. No spam, just speed.</p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <input type="email" placeholder="email@nexus.studio" className="flex-1 bg-black border border-white/10 rounded-full px-10 py-6 outline-none focus:border-[#9333ea]/50 transition-all font-bold" />
                                            <button className="px-12 py-6 bg-purple-600 text-white rounded-full font-black uppercase tracking-widest shadow-xl shadow-[#9333ea]/20 hover:scale-105 transition-all">Subscribe {'->'}</button>
                                        </div>
                                    </div>

                                    <footer className="w-full pt-10 border-t border-white/5 text-[11px] font-bold uppercase tracking-[0.5em] text-gray-700">
                                        By using Nexus you agree to the Studio Terms and Privacy logic.
                                    </footer>
                                </section>
                            </motion.div>
                        ) : (
                            <motion.div key="workspace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col lg:flex-row h-full">
                                {/* CHAT COLUMN */}
                                <div className="flex-1 flex flex-col h-full bg-black relative">
                                    <div className="flex-1 overflow-y-auto px-6 md:px-20 py-10 md:py-24 custom-scrollbar scroll-smooth">
                                        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="p-4 sm:p-6 md:p-14 z-30">
                                        <div className="max-w-2xl mx-auto bg-[#0F0F0F] rounded-full border border-white/10 p-1 md:p-2 flex items-center shadow-2xl transition-all">
                                            <div className="hidden sm:flex pl-6 text-gray-600"><FaPaperclip size={16} /></div>
                                            <input
                                                value={input} onChange={e => setInput(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                                                placeholder={currentProjectId ? "Describe iteration..." : "Ask Nexus to build something..."}
                                                className="flex-1 bg-transparent border-none outline-none px-4 md:px-6 py-2.5 md:py-4 text-xs md:text-sm font-bold text-white placeholder-gray-700"
                                            />
                                            <button onClick={sendMessage} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 text-white flex items-center justify-center mr-1 shadow-lg hover:scale-105 active:scale-95 transition-all">
                                                {isStreaming ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaPlay size={10} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT PANEL (Editor/Preview) */}
                                <AnimatePresence>
                                    {rightPanelOpen && (
                                        <motion.div
                                            initial={{ x: '100%', opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: '100%', opacity: 0 }}
                                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            className="h-full bg-[#050505] border-l border-white/5 flex flex-col z-[100] lg:relative fixed inset-0 lg:w-[55%] w-full backdrop-blur-3xl"
                                        >
                                            <div className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/50">
                                                <div className="flex items-center gap-10">
                                                    {['editor', 'preview'].map(tab => (
                                                        <button
                                                            key={tab} onClick={() => setActiveTab(tab)}
                                                            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2 ${activeTab === tab ? 'text-purple-600' : 'text-gray-600 hover:text-gray-300'}`}
                                                        >
                                                            {tab}
                                                            {activeTab === tab && <div className="absolute -bottom-2 left-0 right-0 h-1 bg-purple-600 rounded-full" />}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <button onClick={downloadProject} className="p-3 text-gray-500 hover:text-white transition-all transform hover:scale-110" title="Download ZIP"><FaDownload size={18} /></button>
                                                    <button onClick={() => setRightPanelOpen(false)} className="p-3 text-gray-700 hover:text-purple-600 transition-all"><FaChevronRight size={14} /></button>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex overflow-hidden">
                                                {/* MINI EXPLORER */}
                                                <div className="w-20 md:w-56 h-full flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col p-6 overflow-y-auto custom-scrollbar">
                                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-800 mb-8 hidden md:block">Artifacts</div>
                                                    <div className="space-y-2">
                                                        {projectFiles.map(f => (
                                                            <button
                                                                key={f.path} onClick={() => { setActiveFile(f); setActiveTab('editor') }}
                                                                className={`w-full text-left p-3 rounded-xl text-[11px] font-bold transition-all truncate border ${activeFile?.path === f.path ? 'bg-purple-600/10 border-[#9333ea]/20 text-purple-600' : 'border-transparent text-gray-600 hover:bg-white/5'}`}
                                                            >
                                                                {f.path.split('/').pop()}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex-1 h-full bg-black relative">
                                                    {activeTab === 'editor' ? (
                                                        <MonacoEditor
                                                            height="100%" theme="vs-dark"
                                                            value={activeFile ? (fileContents[activeFile.path] ?? activeFile.code) : ''}
                                                            onChange={(v) => activeFile && setFileContents(p => ({ ...p, [activeFile.path]: v }))}
                                                            options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'monospace' }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-white scale-[0.98] rounded-2xl overflow-hidden shadow-2xl m-auto transition-transform">
                                                            <iframe srcDoc={buildPreviewHtml()} className="w-full h-full border-none" title="Live Preview" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* ACCOUNT MODAL */}
            <AnimatePresence>
                {accountModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAccountModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-[#0F0F0F] rounded-[2.5rem] border border-white/10 p-12 shadow-2xl">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-black tracking-tighter uppercase italic">Studio Profile</h3>
                                <button onClick={() => setAccountModalOpen(false)} className="text-gray-600 hover:text-white transition-all"><FaPlus className="rotate-45" size={20} /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4 group cursor-pointer hover:border-purple-600/30 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-600 flex items-center justify-center text-xl font-black">{user ? user.name?.[0] : 'N'}</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold">{user ? user.name : 'Vibe Guest'}</div>
                                        <div className="text-[10px] text-gray-600 uppercase tracking-widest">Workspace Active</div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                                </div>
                                <button onClick={logout} className="w-full p-6 rounded-3xl bg-white/5 border border-[#9333ea]/20 text-purple-600 font-black uppercase text-[10px] tracking-widest hover:bg-purple-600 hover:text-white transition-all">Sign Out Engine</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </div>
    )
}

export default AIBuilder
