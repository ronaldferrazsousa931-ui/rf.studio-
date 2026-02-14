import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import {
   Camera, Coffee, Shirt, PenTool, Book, Download, Sparkles, Image as ImageIcon,
   Loader2, Settings2, Upload, X, Layers, Zap, Palette, Target, Paintbrush,
   Link as LinkIcon, Plus, FileText, User, Car, PawPrint, Briefcase, Wand2,
   History, LayoutDashboard, Search, Trash2, RefreshCcw, Focus, Globe, Box,
   ExternalLink, Code, Star, BoxSelect, Sun, Diamond, Droplets, Mountain, Sliders,
   ChevronRight, ArrowLeft, Wind, Gauge, Shield, CheckCircle, LogOut, Instagram,
   MessageCircle, BarChart3, Users2, UserCircle, Flame, CloudLightning, MousePointer2,
   Maximize2, Move, Eraser, Type as TypeIcon, Copy, Terminal, Check, MessageSquare, Cpu, GitBranch,
   AlertCircle, Monitor, Smartphone, Layout, Edit, Key, Trophy, Printer, Lightbulb,
   AlertTriangle, BadgeCheck, Siren, ClipboardList, Rocket, Map, MapPin, ShoppingBag,
   Hammer, Ruler, Scan, Save, Menu, Cuboid, CircleDot, Triangle, Moon, Film, SunMedium, Hexagon
} from 'lucide-react';

/**
 * --- DESIGN SYSTEM MANIFESTO (LOCKED) ---
 * VERSION: v12.1-PLATINUM-LOCKED
 * THEME: Ultra Dark, Neon Accents (Purple/Emerald/Orange), Glassmorphism.
 * STATUS: STABLE. DO NOT REMOVE MODULES.
 */

declare const __app_id: any;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'rf-studio';
const SYSTEM_VERSION = "v12.1 LOCKED";

const App = () => {
   // --- NAVEGAÇÃO E ESTADOS GLOBAIS ---
   const [activeModule, setActiveModule] = useState('dashboard');
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [llmLoading, setLlmLoading] = useState(false);
   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
   const [selectedDetail, setSelectedDetail] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);
   const [history, setHistory] = useState<any[]>([]);
   const [showApiKeyModal, setShowApiKeyModal] = useState(false);
   const [manualApiKey, setManualApiKey] = useState(localStorage.getItem('rf-studio-api-key') || '');
   const [tempKey, setTempKey] = useState('');

   const handleSaveKey = () => {
      if (!tempKey.trim()) return;
      localStorage.setItem('rf-studio-api-key', tempKey);
      setManualApiKey(tempKey);
      setShowApiKeyModal(false);
   };

   // Novo Estado Global de Aspect Ratio
   const [aspectRatio, setAspectRatio] = useState('1:1');

   // Estados Específicos do Consultor Visual
   const [consultStep, setConsultStep] = useState(1);
   const [consultData, setConsultData] = useState<any>(null); // Real AI Data
   const [pfpLoading, setPfpLoading] = useState(false); // Carregamento especifico da foto de perfil

   // --- ESTADO DO PERFIL ---
   const [profile, setProfile] = useState({
      displayName: 'RonaldF',
      monthlyRevenue: 'R$ 10.000,00',
      instagram: '@ronaldf.design',
      clients: '10',
      team: '3',
      gender: 'Ele / Homem',
      mainGoal: 'Escalar operações',
      whatsapp: '11932597969',
      shortBio: 'Design e IA de alta performance.',
      mainService: 'Consultoria Estratégica',
      aboutYou: '',
      aboutBusiness: '',
      tags: ['Designer', 'Social Media', 'Empreendedor', 'Copywriter', 'Gestor de Tráfego'] as string[]
   });

   // Load Profile Persistence
   useEffect(() => {
      const saved = localStorage.getItem(`${appId}-profile`);
      if (saved) {
         try {
            setProfile(JSON.parse(saved));
         } catch (e) {
            console.error("Erro ao carregar perfil", e);
         }
      }
   }, []);

   const saveSettings = () => {
      localStorage.setItem(`${appId}-profile`, JSON.stringify(profile));
      // Visual feedback handled by button animation or toast in future
   };

   // --- ESTADOS DE MEDIA (UPLOADS) ---
   const [refFile, setRefFile] = useState<string | null>(null);
   const [studioBase, setStudioBase] = useState<string | null>(null);
   const [studioModel, setStudioModel] = useState<string | null>(null);
   const [remixMap, setRemixMap] = useState<string | null>(null);
   const [remixSoul, setRemixSoul] = useState<string | null>(null);
   const [mockupProduct, setMockupProduct] = useState<string | null>(null);
   const [consultProfile, setConsultProfile] = useState<string | null>(null);
   const [consultFeed, setConsultFeed] = useState<string | null>(null);

   // UGC Creator States
   const [ugcProduct, setUgcProduct] = useState<string | null>(null);
   const [ugcModel, setUgcModel] = useState<string | null>(null);
   const [ugcContext, setUgcContext] = useState('Academia / Treino');

   // Assets 3D States
   const [asset3dName, setAsset3dName] = useState('');
   const [asset3dDetails, setAsset3dDetails] = useState('');
   const [asset3dRef, setAsset3dRef] = useState<string | null>(null);
   const [asset3dMaterial, setAsset3dMaterial] = useState('Plástico Fosco');
   const [asset3dLighting, setAsset3dLighting] = useState('Estúdio Soft');

   // --- PARÂMETROS TÉCNICOS POR MÓDULO ---

   // Vortex (Nano Banana Pro)
   const [vortexNodes, setVortexNodes] = useState({ reference: null, media: null, prompt: '', format: '1:1', quality: 'Pro' });
   const [vortexSize, setVortexSize] = useState('1K'); // 1K, 2K, 4K
   const [vortexResults, setVortexResults] = useState<string[]>([]);

   // Magic Editor
   const [editorPrompt, setEditorPrompt] = useState('');
   const [editorBaseImage, setEditorBaseImage] = useState<string | null>(null);

   // Lab Criativo
   const [subStyle, setSubStyle] = useState('Mágico');
   const [labLight, setLabLight] = useState('Luz cinematográfica');
   const [labScenario, setLabScenario] = useState('Natureza');
   const [aiIntensity, setAiIntensity] = useState('ALTO');
   const [extraDetails, setExtraDetails] = useState('');

   // Car Design
   const [carModel, setCarModel] = useState('Jaguar E-Type cinza');
   const [carAngle, setCarAngle] = useState('Frontal baixo');
   const [carAction, setCarAction] = useState('Saltando');
   const [carScenario, setCarScenario] = useState('Montanha');

   // Hero Style
   const [selectedPowers, setSelectedPowers] = useState('Energia');
   const [heroSuit, setHeroSuit] = useState('');
   const [heroAesthetic, setHeroAesthetic] = useState('');
   const [heroLight, setHeroLight] = useState('Luz cinematográfica');
   const [heroDetails, setHeroDetails] = useState('');

   // Business Style
   const [bizLight, setBizLight] = useState('Rembrandt');
   const [bizExp, setBizExp] = useState('Sério');
   const [bizPose, setBizPose] = useState('Braços Cruzados');
   const [bizOutfit, setBizOutfit] = useState('Terno Slim');

   // Estúdio de Foto
   const [studioStep, setStudioStep] = useState(1);
   const [facialSim, setFacialSim] = useState(90);
   const [sessionPhotos, setSessionPhotos] = useState<string[]>([]);
   const [studioOutfit, setStudioOutfit] = useState('');

   // Mockup Produto
   const [mockupEnv, setMockupEnv] = useState('Natureza');
   const [mockupComp, setMockupComp] = useState('Frontal');
   const [mockupColor, setMockupColor] = useState('#FFFFFF');

   // Restaurador Pro
   const [restoreMode, setRestoreMode] = useState('Restaurar & Colorir');
   const [damageLevel, setDamageLevel] = useState('Médio');

   // Consultor Visual
   const [consultNiche, setConsultNiche] = useState('');
   const [consultOutput, setConsultOutput] = useState('');

   // --- LISTAS DE DADOS ---
   const subStyles = ['Mágico', 'Realismo Cinematográfico', 'Fantasia', 'Épico', 'Sombrio', 'Poético'];
   const lights = ['Noite', 'Dia', 'Luz cinematográfica', 'Dramática', 'Estúdio', 'Mansão'];
   const scenarios = ['Natureza', 'Cidade Cyberpunk', 'Cachoeira', 'Vulcão', 'Lua', 'Fundo do Mar'];

   const heroPowers = ['Energia', 'Eletricidade', 'Fogo', 'Água', 'Vento', 'Terra', 'Telecinese', 'Magnetismo', 'Mutação', 'Voar', 'Psíquico'];
   const heroLights = ['Luz cinematográfica', 'Luz Natural', 'Neon Cyberpunk', 'Studio Soft', 'Dramática', 'Golden Hour', 'Lua Cheia'];

   const bizLights = ['Rembrandt', 'Estúdio', 'Prédio corporativo', 'Mansão', 'Carro de luxo', 'Fundo clean'];

   const restoreModes = [
      { id: 'Restaurar & Colorir', title: 'Restaurar & Colorir', desc: 'Remove rasgos e adiciona cor.', icon: <Palette size={18} /> },
      { id: 'Modernizar (Digital)', title: 'Modernizar (Digital)', desc: 'Melhora pele e texturas.', icon: <Sparkles size={18} /> },
      { id: 'Nitidez Pro', title: 'Nitidez Pro (Upscale)', desc: 'Aumenta resolução e detalhes.', icon: <Search size={18} /> }
   ];

   const assetMaterials = [
      { id: 'Plástico Fosco', icon: <Box size={20} /> },
      { id: 'Plástico Glossy', icon: <CircleDot size={20} /> },
      { id: 'Vidro / Cristal', icon: <Droplets size={20} /> },
      { id: 'Metal Cromado', icon: <Target size={20} /> },
      { id: 'Ouro Premium', icon: <Hexagon size={20} /> },
      { id: 'Neon / Cyber', icon: <Zap size={20} /> },
      { id: 'Argila (Clay)', icon: <Triangle size={20} /> },
      { id: 'Orgânico', icon: <Layers size={20} /> },
   ];

   const assetLightings = [
      { id: 'Estúdio Soft', icon: <Sun size={20} /> },
      { id: 'Recorte (Rim)', icon: <Moon size={20} /> },
      { id: 'Cinemático', icon: <Film size={20} /> },
      { id: 'Luz Natural', icon: <SunMedium size={20} /> },
   ];

   // Refs
   const fileInputRef = useRef<HTMLInputElement>(null);
   const vortexRefInput = useRef<HTMLInputElement>(null);
   const vortexMediaInput = useRef<HTMLInputElement>(null);
   const editorRefInput = useRef<HTMLInputElement>(null);
   const studioBaseRef = useRef<HTMLInputElement>(null);
   const studioModelRef = useRef<HTMLInputElement>(null);
   const remixMapRef = useRef<HTMLInputElement>(null);
   const remixSoulRef = useRef<HTMLInputElement>(null);
   const mockupInputRef = useRef<HTMLInputElement>(null);
   const consultProfileRef = useRef<HTMLInputElement>(null);
   const consultFeedRef = useRef<HTMLInputElement>(null);
   const asset3dRefInput = useRef<HTMLInputElement>(null);

   // UGC Refs
   const ugcProductRef = useRef<HTMLInputElement>(null);
   const ugcModelRef = useRef<HTMLInputElement>(null);

   // --- HELPER FUNCTION: RESIZE IMAGE ---
   const resizeImage = (base64Str: string, maxWidth = 384): Promise<string> => {
      return new Promise((resolve) => {
         const img = new Image();
         img.src = base64Str;
         img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
               height *= maxWidth / width;
               width = maxWidth;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
               ctx.drawImage(img, 0, 0, width, height);
               resolve(canvas.toDataURL('image/jpeg', 0.5));
            } else {
               resolve(base64Str);
            }
         };
         img.onerror = () => {
            resolve(base64Str);
         };
      });
   };

   const handleFile = (e: React.ChangeEvent<HTMLInputElement>, callback: (val: string | null) => void, maxDimension = 384) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
               try {
                  const resized = await resizeImage(reader.result, maxDimension);
                  callback(resized);
               } catch (err) {
                  callback(reader.result);
               }
            }
         };
         reader.readAsDataURL(file);
      }
   };

   const downloadImage = (url: string, filename: string) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
   };

   useEffect(() => {
      try {
         const saved = localStorage.getItem(`${appId}-history`);
         if (saved) setHistory(JSON.parse(saved));
      } catch (e) { console.error("History load error", e); }
   }, []);

   const saveToHistory = (url: string, type: string, prompt: string) => {
      const newEntry = {
         id: Date.now(),
         url,
         type,
         prompt,
         date: new Date().toLocaleDateString('pt-BR'),
         tags: [type.toUpperCase(), '8K', 'PLATINUM']
      };
      const updated = [newEntry, ...history].slice(0, 20);
      setHistory(updated);
      try { localStorage.setItem(`${appId}-history`, JSON.stringify(updated)); } catch (e) { }
   };

   const handleKeySelection = async () => {
      try {
         const win = window as any;
         if (win.aistudio && win.aistudio.openSelectKey) {
            await win.aistudio.openSelectKey();
            setShowApiKeyModal(false);
         } else {
            alert("API Key Selection is not available in this environment.");
         }
      } catch (e) {
         console.error("Failed to select key", e);
      }
   };

   const generateWithRetry = async (model: string, payload: any, retries = 3, initialDelay = 2000, config: any = {}) => {
      const key = import.meta.env.VITE_GEMINI_API_KEY || manualApiKey;
      if (!key) throw new Error("API_KEY_MISSING");

      const ai = new GoogleGenAI({ apiKey: key });
      let currentDelay = initialDelay;
      for (let i = 0; i < retries; i++) {
         try {
            return await ai.models.generateContent({
               model: model,
               contents: payload,
               config: config
            });
         } catch (err: any) {
            if (i < retries - 1 && err.status >= 500) {
               await new Promise(resolve => setTimeout(resolve, currentDelay));
               currentDelay *= 2;
            } else {
               throw err;
            }
         }
      }
   };

   const callAI = async (prompt: string, files: { data: string | null }[] = [], model: string = 'gemini-2.5-flash-image', config: any = {}) => {
      // Check for API Key immediately
      if (!import.meta.env.VITE_GEMINI_API_KEY && !manualApiKey) {
         setError("CHAVE API NÃO DETECTADA. Verifique se o arquivo .env.local está configurado corretamente ou insira manualmente.");
         setShowApiKeyModal(true);
         return;
      }
      setLoading(true);
      setError(null);
      try {
         const parts: any[] = [{ text: prompt }];
         files.forEach(f => {
            if (f.data) parts.push({ inlineData: { mimeType: "image/jpeg", data: f.data.split(',')[1] } });
         });

         const response = await generateWithRetry(model, { parts }, 3, 2000, config);
         let imageUrl = null;
         if (response?.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
               if (part.inlineData) {
                  imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                  break;
               }
            }
         }

         if (imageUrl) {
            setGeneratedImage(imageUrl);
            saveToHistory(imageUrl, activeModule, prompt);
            if (activeModule === 'studio') { setSessionPhotos(prev => [imageUrl!, ...prev]); setStudioStep(2); }
            if (activeModule === 'vortex') setVortexResults(prev => [imageUrl!, ...prev]);
         } else {
            throw new Error("No image generated");
         }
      } catch (err: any) {
         console.error("API Error:", err);
         if (err.message === "API_KEY_MISSING") {
            setError("A chave API não foi encontrada. Verifique o arquivo .env.local.");
            setShowApiKeyModal(true);
         } else if (err.status === 403 || err.status === 429 || err.status === 400 || (err.message && err.message.includes('API key'))) {
            setShowApiKeyModal(true);
         } else {
            setError(`Erro: ${err.message || "Falha na síntese"}. Verifique o console para detalhes.`);
         }
      } finally {
         setLoading(false);
      }
   };

   // --- STRUCTURED CONSULTANCY ANALYSIS ---
   const callConsultancyAI = async (prompt: string, files: { data: string | null }[]) => {
      if (!import.meta.env.VITE_GEMINI_API_KEY && !manualApiKey) {
         setError("CHAVE API NÃO DETECTADA. Verifique o arquivo .env.local ou insira manualmente.");
         setShowApiKeyModal(true);
         return;
      }
      setLoading(true);
      setError(null);
      setConsultData(null); // Clear previous data
      try {
         const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || manualApiKey });
         const parts: any[] = [{ text: prompt }];
         files.forEach(f => {
            if (f.data) parts.push({ inlineData: { mimeType: "image/jpeg", data: f.data.split(',')[1] } });
         });

         const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts },
            config: {
               responseMimeType: 'application/json',
               responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                     score: { type: Type.NUMBER, description: "Brand score from 0.0 to 10.0" },
                     level: { type: Type.STRING, description: "Level name like Ouro, Prata, Bronze" },
                     metrics: {
                        type: Type.OBJECT,
                        properties: {
                           clarity: { type: Type.NUMBER, description: "Score out of 4" },
                           authority: { type: Type.NUMBER, description: "Score out of 3" },
                           coherence: { type: Type.NUMBER, description: "Score out of 3" },
                        }
                     },
                     strategicInsights: {
                        type: Type.OBJECT,
                        properties: {
                           nichePanorama: { type: Type.STRING, description: "Análise de mercado curta" },
                           competitiveAdvantage: { type: Type.STRING, description: "Diferencial único" },
                           leakPoints: { type: Type.STRING, description: "Onde está perdendo conversão" }
                        }
                     },
                     chromaticDNA: {
                        type: Type.OBJECT,
                        properties: {
                           primaryHex: { type: Type.STRING },
                           primaryName: { type: Type.STRING },
                           secondaryHex: { type: Type.STRING },
                           secondaryName: { type: Type.STRING },
                           accentHex: { type: Type.STRING },
                           accentName: { type: Type.STRING }
                        }
                     },
                     mainAction: { type: Type.STRING, description: "Short priority action summary" },
                     audit: {
                        type: Type.ARRAY,
                        items: {
                           type: Type.OBJECT,
                           properties: {
                              item: { type: Type.STRING },
                              status: { type: Type.STRING, enum: ["warning", "check"] },
                              justification: { type: Type.STRING },
                              tag: { type: Type.STRING }
                           }
                        }
                     },
                     actionPlan: {
                        type: Type.ARRAY,
                        items: {
                           type: Type.OBJECT,
                           properties: {
                              step: { type: Type.INTEGER },
                              title: { type: Type.STRING },
                              timeframe: { type: Type.STRING },
                              impactLevel: { type: Type.STRING },
                              description: { type: Type.STRING }
                           }
                        }
                     },
                     strategy: {
                        type: Type.OBJECT,
                        properties: {
                           viralHook: { type: Type.STRING },
                           growthPlan: { type: Type.STRING },
                           campaignIdea: { type: Type.STRING },
                           suggestedBio: {
                              type: Type.OBJECT,
                              properties: {
                                 authority: { type: Type.STRING, description: "Linha 1: Quem é (Autoridade)" },
                                 transformation: { type: Type.STRING, description: "Linha 2: O que resolve (Transformação)" },
                                 cta: { type: Type.STRING, description: "Linha 3: Chamada para ação" }
                              },
                              required: ["authority", "transformation", "cta"]
                           }
                        }
                     }
                  }
               }
            }
         });

         if (response.text) {
            setConsultData(JSON.parse(response.text));
            setConsultStep(2);
         } else {
            throw new Error("Empty response from AI");
         }

      } catch (err: any) {
         console.error("Analysis Error:", err);
         setError("Erro na análise. Por favor, tente novamente com outras imagens.");
      } finally {
         setLoading(false);
      }
   };

   const generateProfilePhoto = async () => {
      if (!consultProfile) {
         setError("Nenhuma foto de perfil encontrada para gerar.");
         return;
      }
      setPfpLoading(true);
      setError(null);

      const prompt = `Professional LinkedIn Headshot / Business Profile Picture. 
      High-end studio lighting, confident expression, sharp focus on face. 
      Background: Solid modern dark gradient based on the brand colors analyzed. 
      Style: Executive, Authority, Clean. 8k resolution.`;

      try {
         const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
         const parts: any[] = [{ text: prompt }];
         // Use the uploaded profile pic as reference
         parts.push({ inlineData: { mimeType: "image/jpeg", data: consultProfile.split(',')[1] } });

         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image', // Fast efficient model for this
            contents: { parts }
         });

         let imageUrl = null;
         if (response?.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
               if (part.inlineData) {
                  imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                  break;
               }
            }
         }

         if (imageUrl) {
            setGeneratedImage(imageUrl);
            // Auto-download or show in modal could be added here, 
            // for now we set it to generatedImage which might show elsewhere, 
            // but ideally we want it inside the specific PFP box.
            // To update specific UI state without breaking main flow:
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'new_profile_pic_ai.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }
      } catch (err) {
         console.error(err);
         setError("Falha ao gerar foto de perfil.");
      } finally {
         setPfpLoading(false);
      }
   }

   const onExecuteProduction = () => {
      let p = "", f: { data: string | null }[] = [];
      let model = 'gemini-2.5-flash-image';
      let config: any = { imageConfig: { aspectRatio: aspectRatio } };

      if (activeModule === 'consultant') {
         if (!consultProfile && !consultFeed) {
            setError("Por favor, faça upload de prints do Perfil e Feed para análise completa.");
            return;
         }
         f = [{ data: consultProfile }, { data: consultFeed }];
         p = `Atue como um Consultor de Marca de Elite. Analise estas imagens (Perfil e Feed) para o nicho: ${consultNiche || 'Geral'}. 
        Gere um relatório JSON detalhado com Score (0-10), Nível, Métricas, Auditoria e Plano.
        
        INCLUA 'strategicInsights' com Panorama do Nicho, Vantagem Competitiva e Pontos de Fuga (erros de conversão).
        INCLUA 'chromaticDNA' sugerindo 3 cores (Primary, Secondary, Accent) modernas e de autoridade para esse perfil.
        INCLUA 'strategy' com ganchos virais e plano de growth.
        
        PARA A BIO (suggestedBio), SIGA ESTRITAMENTE A FÓRMULA DE 3 LINHAS:
        1. Autoridade: Quem é/O que faz.
        2. Transformação: O que resolve (A promessa clara).
        3. CTA: O que a pessoa deve fazer.
        
        Seja rigoroso, direto e profissional.`;
         callConsultancyAI(p, f);
         return;
      }

      switch (activeModule) {
         case 'vortex':
            model = 'gemini-2.5-flash-image';
            config = { imageConfig: { aspectRatio: vortexNodes.format } };
            p = `Generate a high-fidelity, photorealistic image based on the attached references. Prompt: ${vortexNodes.prompt}.`;
            f = [{ data: vortexNodes.reference }, { data: vortexNodes.media }];
            break;
         case 'assets3d':
            model = 'gemini-2.5-flash-image';
            p = `High-End 3D Asset Render of a ${asset3dName}. 
        Visual details: ${asset3dDetails}.
        Material Style: ${asset3dMaterial}. 
        Lighting: ${asset3dLighting}. 
        Style: Octane Render, Unreal Engine 5, 8k resolution, photorealistic, isolated on black background, soft shadows, masterpiece.`;
            f = [{ data: asset3dRef }];
            break;
         case 'editor':
            model = 'gemini-2.5-flash-image';
            p = `Edit this image to: ${editorPrompt}. Maintain original composition.`;
            f = [{ data: editorBaseImage }];
            break;
         case 'creative':
            p = `Creative Masterpiece: Style ${subStyle}, Scenario ${labScenario}, Light ${labLight}. AI Int: ${aiIntensity}. Details: ${extraDetails}.`;
            f = [{ data: refFile }]; break;
         case 'car':
            p = `Automotive Design CGI: Model ${carModel}, Angle ${carAngle}, Action ${carAction}, Scenario ${carScenario}. 8k high contrast.`;
            f = [{ data: refFile }]; break;
         case 'hero':
            model = 'gemini-2.5-flash-image';
            p = `Hero Style Masterpiece. Power: ${selectedPowers}. Outfit: ${heroSuit}. Aesthetic: ${heroAesthetic}. Lighting: ${heroLight}. Extra Details: ${heroDetails}. Cinematic 8k resolution, photorealistic, epic composition, detailed particles.`;
            f = [{ data: refFile }]; break;
         case 'business':
            p = `Business Portrait: Lighting ${bizLight}, Expression ${bizExp}, Outfit ${bizOutfit}, Pose ${bizPose}. Corporate high-end, LinkedIn professional style, sharp focus.`;
            f = [{ data: refFile }]; break;
         case 'studio':
            p = `Studio Photo synthesis: Similarity ${facialSim}%. Pose: ${studioBase}. Outfit: ${studioOutfit}. High fidelity facial reconstruction.`;
            f = [{ data: studioBase }, { data: studioModel }]; break;
         case 'remix':
            p = `Remix Layout Protocol: Keep the structure/layout of the first image (Map) but apply the style/content/texture of the second image (Soul). Creative fusion.`;
            f = [{ data: remixMap }, { data: remixSoul }]; break;
         case 'mockup':
            p = `Product Mockup: Product Reference provided. Environment: ${mockupEnv}. Composition: ${mockupComp}. Main Color: ${mockupColor}. High quality commercial photography, photorealistic, 8k, sharp product details.`;
            f = [{ data: mockupProduct }]; break;
         case 'restore':
            p = `Protocol Restore V2.0: Mode ${restoreMode}. Damage Level: ${damageLevel}. Fix tears, scratches, blur. Improve facial details. Output high resolution.`;
            f = [{ data: refFile }]; break;
         case 'ugc':
            p = `UGC Realistic Photo: Generate an organic user-generated content style photo. A person (based on the model image) holding the product (based on product image) naturally in their hand. Context: ${ugcContext}. The product label must be clearly visible and legible. Lighting should be natural, social-media style (Instagram story vibe). High authenticity, amateur photography aesthetic but high quality. Merge the person and product seamlessly.`;
            f = [{ data: ugcProduct }, { data: ugcModel }];
            break;
      }
      callAI(p, f, model, config);
   };

   const renderSidebarItem = (id: string, label: string, icon: React.ReactNode) => (
      <button
         onClick={() => { setActiveModule(id); setGeneratedImage(null); setSelectedDetail(null); setConsultOutput(''); setError(null); setAspectRatio('1:1'); if (id === 'studio') setStudioStep(1); if (id === 'consultant') setConsultStep(1); setIsMobileMenuOpen(false); }}
         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all duration-300 ${activeModule === id ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-purple-400'
            }`}
         title={label}
      >
         {icon} <span className="uppercase tracking-widest">{label}</span>
      </button>
   );

   return (
      <div className="min-h-screen bg-black text-white font-sans flex flex-col lg:flex-row overflow-hidden relative">
         {/* API KEY MODAL */}
         {showApiKeyModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 p-4">
               <div className="bg-zinc-950 border-2 border-orange-600 p-10 rounded-[3rem] shadow-[0_0_100px_rgba(234,88,12,0.4)] max-w-lg w-full text-center space-y-8 relative">
                  <div className="bg-orange-600/20 p-6 rounded-full w-fit mx-auto mb-4">
                     <Key size={48} className="text-orange-500 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">Acesso Restrito</h3>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                     Para usar os modelos <strong>PRO</strong> (Alta Resolução) e evitar erros de cota, você precisa conectar sua chave de API pessoal.
                  </p>
                  <div className="space-y-4">
                     <div className="flex flex-col gap-2 text-left">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Chave API Manual</label>
                        <input
                           type="text"
                           value={tempKey}
                           onChange={(e) => setTempKey(e.target.value)}
                           placeholder="Cole sua API Key aqui..."
                           className="w-full bg-black/50 border border-zinc-800 focus:border-orange-500 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none transition-all shadow-inner"
                        />
                     </div>
                     <button onClick={handleSaveKey} className="w-full bg-orange-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 text-xs" title="Salvar e Continuar">
                        Salvar e Continuar
                     </button>
                     <div className="relative flex items-center gap-4 py-2 opacity-50">
                        <div className="h-px bg-zinc-800 flex-1"></div>
                        <span className="text-[8px] font-black text-zinc-600 uppercase">OU USAR SISTEMA</span>
                        <div className="h-px bg-zinc-800 flex-1"></div>
                     </div>
                     <button onClick={handleKeySelection} className="w-full bg-zinc-900 border border-zinc-800 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white" title="Selecionar via Sistema">
                        Selecionar via Sistema
                     </button>
                     <button onClick={() => setShowApiKeyModal(false)} className="text-[10px] font-bold text-zinc-600 uppercase hover:text-white transition-colors pt-2" title="Cancelar e Voltar">
                        Cancelar e Voltar
                     </button>
                  </div>
                  <div className="absolute top-0 right-0 p-8 hidden md:block">
                     <AlertCircle className="text-orange-900/50" size={100} />
                  </div>
               </div>
            </div>
         )}

         {/* MOBILE HEADER */}
         <header className="lg:hidden flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950 z-40 relative sticky top-0">
            <div className="flex items-center gap-2">
               <div className="bg-purple-600 p-2 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.4)]"><Globe size={20} /></div>
               <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">RF<span className="text-purple-500">.STUDIO</span></h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-400 hover:text-white rounded-lg active:bg-zinc-800 transition-colors" aria-label="Menu Mobile" title="Menu Mobile">
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
         </header>

         {/* MOBILE OVERLAY */}
         {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
         )}

         {/* SIDEBAR */}
         <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col gap-10 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:h-screen lg:shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
            <div>
               <div className="flex items-center gap-2 mb-1 text-white">
                  <div className="bg-purple-600 p-2 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.4)]"><Globe size={20} /></div>
                  <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">RF<span className="text-purple-500">.STUDIO</span></h1>
               </div>
               <p className="text-[8px] font-black text-purple-600/60 uppercase tracking-[0.4em] ml-1 tracking-widest">Master Suite v12.0</p>
            </div>

            <nav className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
               {renderSidebarItem('dashboard', 'Dashboard', <LayoutDashboard size={16} />)}
               <div className="my-2 border-t border-zinc-900/50"></div>

               <p className="text-[9px] font-black text-zinc-700 uppercase px-4 mb-1">IA Engine</p>
               <button onClick={() => { setActiveModule('vortex'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all duration-300 ${activeModule === 'vortex' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-purple-400'}`}>
                  <div className="flex items-center gap-3"><Cpu size={16} /> <span className="uppercase tracking-widest">VORTEX PRO</span></div>
               </button>

               <div className="my-2 border-t border-zinc-900/50"></div>
               <p className="text-[9px] font-black text-zinc-700 uppercase px-4 mb-1 tracking-widest">IA Studio</p>
               {renderSidebarItem('editor', 'Magic Editor', <Wand2 size={16} />)}
               {renderSidebarItem('assets3d', 'Assets 3D', <Cuboid size={16} />)}
               {renderSidebarItem('creative', 'Imagem Criativa', <Sparkles size={16} />)}
               {renderSidebarItem('car', 'Car Design', <Car size={16} />)}
               {renderSidebarItem('hero', 'Hero Style', <Zap size={16} />)}
               {renderSidebarItem('business', 'Business Style', <Briefcase size={16} />)}
               {renderSidebarItem('remix', 'Remix Layout', <Maximize2 size={16} />)}

               <div className="my-2 border-t border-zinc-900/50"></div>
               <p className="text-[9px] font-black text-zinc-700 uppercase px-4 mb-1 tracking-widest">Produção</p>
               {renderSidebarItem('studio', 'Estúdio Foto', <Camera size={16} />)}
               {renderSidebarItem('mockup', 'Mockup Produto', <Box size={16} />)}
               {renderSidebarItem('ugc', 'UGC Creator', <Smartphone size={16} />)}
               {renderSidebarItem('restore', 'Restaurador Pro', <RefreshCcw size={16} />)}

               <div className="my-2 border-t border-zinc-900/50"></div>
               {renderSidebarItem('consultant', 'Consultor Visual', <Search size={16} />)}
               {renderSidebarItem('history', 'Galeria', <History size={16} />)}
               <div className="my-2 border-t border-zinc-900/50"></div>
               {renderSidebarItem('settings', 'Configurar', <Settings2 size={16} />)}
            </nav>

            <div className="mt-auto px-2 pb-6 lg:pb-0">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">{SYSTEM_VERSION}</span>
               </div>
            </div>
         </aside>

         {/* VIEWPORT PRINCIPAL */}
         <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-80px)] lg:h-screen bg-[radial-gradient(circle_at_30%_10%,_rgba(147,51,234,0.1),_transparent)] relative pb-32 md:pb-40">

            {/* VISUAL ERROR BANNER */}
            {error && (
               <div className="max-w-7xl mx-auto mb-8 bg-red-900/50 border border-red-700 p-4 rounded-2xl flex items-center gap-4 text-white shadow-xl animate-in slide-in-from-top-4 fade-in">
                  <AlertCircle className="text-red-500 shrink-0" />
                  <p className="text-sm font-bold uppercase tracking-wide">{error}</p>
                  <button onClick={() => setError(null)} className="ml-auto p-2 hover:bg-red-800 rounded-lg" aria-label="Fechar mensagem de erro" title="Fechar mensagem de erro"><X size={16} /></button>
               </div>
            )}

            {/* DASHBOARD (Galeria de Entrada) */}
            {activeModule === 'dashboard' && !selectedDetail && (
               <div key="dashboard" className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out pb-20">
                  <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                     <div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Bem-vindo, <span className="text-purple-600">{profile.displayName}</span></h2>
                        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-5 italic">SISTEMA NEURAL DE ALTA FIDELIDADE ACTIVADO ✨</p>
                     </div>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[
                        { id: 'vortex', title: 'Vortex Pro', icon: <Cpu />, color: 'from-purple-500/20' },
                        { id: 'assets3d', title: 'Assets 3D', icon: <Cuboid />, color: 'from-red-500/20' },
                        { id: 'ugc', title: 'UGC Creator', icon: <Smartphone />, color: 'from-emerald-500/20' },
                        { id: 'editor', title: 'Magic Editor', icon: <Wand2 />, color: 'from-pink-500/20' },
                        { id: 'remix', title: 'Remix Layout', icon: <Maximize2 />, color: 'from-purple-500/20' },
                        { id: 'car', title: 'Car Design', icon: <Car />, color: 'from-blue-500/20' },
                     ].map(card => (
                        <div key={card.id} onClick={() => setActiveModule(card.id)} className="group relative bg-zinc-950 border border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 h-[320px] md:h-[420px] flex flex-col justify-end overflow-hidden cursor-pointer transition-all hover:border-purple-600 shadow-2xl" title={card.title}>
                           <div className={`absolute inset-0 bg-gradient-to-t ${card.color} to-transparent opacity-40 group-hover:opacity-70 transition-opacity`}></div>
                           <div className="absolute top-8 left-8 md:top-12 md:left-12 bg-purple-600 p-4 md:p-5 rounded-2xl shadow-xl text-white group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
                           <div className="relative z-10 space-y-4">
                              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">{card.title}</h3>
                              <div className="flex items-center gap-3 text-purple-400 font-black text-[10px] uppercase tracking-widest pt-4 group-hover:gap-6 transition-all">Iniciar Protocolo <ChevronRight size={16} /></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* SETTINGS (CONFIGURAÇÃO PERFIL) - RESTORED & VISIBLE */}
            {activeModule === 'settings' && (
               <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <header className="mb-8 md:mb-12 border-b border-zinc-900 pb-6 md:pb-8">
                     <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-500"><Settings2 className="w-6 h-6 md:w-8 md:h-8" /></div>
                        <h1 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">Personalização do Perfil</h1>
                     </div>
                     <p className="text-zinc-500 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] ml-1">DADOS MESTRES PARA GERAÇÃO DE CONTEÚDO</p>
                  </header>

                  <div className="space-y-8 md:space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                           <label htmlFor="profile-displayName" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><User size={12} className="text-purple-500" /> Nome de Exibição</label>
                           <input id="profile-displayName" placeholder="Seu Nome" className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="text" value={profile.displayName} onChange={e => setProfile({ ...profile, displayName: e.target.value })} aria-label="Nome de Exibição" title="Nome de Exibição" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="profile-revenue" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><BarChart3 size={12} className="text-emerald-500" /> Faturamento Mensal</label>
                           <input id="profile-revenue" placeholder="R$ 0,00" className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="text" value={profile.monthlyRevenue} onChange={e => setProfile({ ...profile, monthlyRevenue: e.target.value })} aria-label="Faturamento Mensal" title="Faturamento Mensal" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="space-y-2">
                           <label htmlFor="profile-instagram" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Instagram size={12} className="text-pink-500" /> @Instagram</label>
                           <input id="profile-instagram" placeholder="@seuusuario" className="w-full bg-zinc-950 border border-zinc-800 focus:border-pink-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="text" value={profile.instagram} onChange={e => setProfile({ ...profile, instagram: e.target.value })} aria-label="Instagram" title="Instagram" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="profile-clients" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Users2 size={12} className="text-blue-500" /> Clientes</label>
                           <input id="profile-clients" placeholder="0" className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="number" value={profile.clients} onChange={e => setProfile({ ...profile, clients: e.target.value })} aria-label="Clientes" title="Clientes" />
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="profile-team" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Briefcase size={12} className="text-orange-500" /> Time/Equipe</label>
                           <input id="profile-team" placeholder="0" className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="number" value={profile.team} onChange={e => setProfile({ ...profile, team: e.target.value })} aria-label="Time/Equipe" title="Time/Equipe" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                           <label htmlFor="profile-gender" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Globe size={12} /> Gênero</label>
                           <select id="profile-gender" value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none appearance-none" aria-label="Gênero" title="Gênero">
                              <option>Ele / Homem</option>
                              <option>Ela / Mulher</option>
                              <option>Outro</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="profile-mainGoal" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Target size={12} className="text-red-500" /> Principal Objetivo</label>
                           <input id="profile-mainGoal" className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" placeholder="Ex: Escalar operações" type="text" value={profile.mainGoal} onChange={e => setProfile({ ...profile, mainGoal: e.target.value })} aria-label="Principal Objetivo" title="Principal Objetivo" />
                        </div>
                     </div>

                     <div className="space-y-2 max-w-sm">
                        <label htmlFor="profile-whatsapp" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest"><Smartphone size={12} className="text-green-500" /> WhatsApp</label>
                        <input id="profile-whatsapp" placeholder="11999999999" className="w-full bg-zinc-950 border border-zinc-800 focus:border-green-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" type="text" value={profile.whatsapp} onChange={e => setProfile({ ...profile, whatsapp: e.target.value })} aria-label="Whatsapp" title="Whatsapp" />
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Áreas de Atuação</label>
                        <div className="flex flex-wrap gap-3">
                           {profile.tags.map((tag, i) => (
                              <span key={i} className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-widest hover:border-purple-600 hover:text-white transition-all cursor-default shadow-lg">{tag}</span>
                           ))}
                           <button className="px-6 py-3 rounded-full border border-dashed border-zinc-800 text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-purple-500 hover:border-purple-500 transition-all flex items-center gap-2" title="Adicionar Tag"><Plus size={12} /> Adicionar</button>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="profile-shortBio" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bio Curta (Pitch)</label>
                        <textarea id="profile-shortBio" className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-medium text-zinc-300 transition-all outline-none resize-none shadow-inner h-32" value={profile.shortBio} onChange={e => setProfile({ ...profile, shortBio: e.target.value })} aria-label="Bio Curta" title="Bio Curta"></textarea>
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="profile-mainService" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Seu Principal Serviço</label>
                        <input id="profile-mainService" className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all outline-none shadow-inner" placeholder="Ex: Consultoria de Tráfego Pago" type="text" value={profile.mainService} onChange={e => setProfile({ ...profile, mainService: e.target.value })} aria-label="Principal Serviço" title="Principal Serviço" />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                           <label htmlFor="profile-aboutYou" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sobre Você</label>
                           <textarea id="profile-aboutYou" className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-medium text-zinc-300 transition-all outline-none resize-none shadow-inner h-32" placeholder="Conte um pouco da sua trajetória..." value={profile.aboutYou} onChange={e => setProfile({ ...profile, aboutYou: e.target.value })} aria-label="Sobre Você" title="Sobre Você"></textarea>
                        </div>
                        <div className="space-y-2">
                           <label htmlFor="profile-aboutBusiness" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sobre seu Negócio</label>
                           <textarea id="profile-aboutBusiness" className="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-600 rounded-2xl px-5 py-4 text-sm font-medium text-zinc-300 transition-all outline-none resize-none shadow-inner h-32" placeholder="Fale sobre sua estrutura, missão e equipe..." value={profile.aboutBusiness} onChange={e => setProfile({ ...profile, aboutBusiness: e.target.value })} aria-label="Sobre seu Negócio" title="Sobre seu Negócio"></textarea>
                        </div>
                     </div>

                     <div className="pt-8 flex justify-end">
                        <button onClick={saveSettings} className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 active:scale-95" type="button" title="Salvar Alterações">
                           <Save size={16} /> Salvar Alterações
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* VORTEX CANVAS (NANO BANANA PRO) */}
            {activeModule === 'vortex' && (
               <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6 md:gap-10 animate-in fade-in duration-500">
                  <header className="flex items-center justify-between">
                     <div className="flex items-center gap-3 md:gap-5">
                        <div className="bg-purple-600 p-3 md:p-4 rounded-3xl shadow-xl"><Cpu size={24} className="md:w-7 md:h-7" /></div>
                        <div><h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-white">Vortex Canvas</h2><p className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">SISTEMA DE NODES • GEMINI 3 PRO</p></div>
                     </div>
                  </header>
                  <div className="flex-1 relative min-h-auto md:min-h-[750px] bg-zinc-950/60 rounded-[3rem] md:rounded-[4.5rem] border-2 border-zinc-900 overflow-hidden p-6 md:p-16 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
                     <div className="space-y-8 w-full lg:w-80 relative z-10 order-2 lg:order-1">
                        <div className="bg-zinc-900/80 border-2 border-purple-600/30 rounded-3xl p-6 shadow-2xl space-y-5">
                           <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14} /> Referência</label>
                           <div onClick={() => vortexRefInput.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-black/40 hover:border-purple-600 transition-all cursor-pointer overflow-hidden" title="Upload Referência" aria-label="Upload Referência">{vortexNodes.reference ? <img src={vortexNodes.reference} className="w-full h-full object-cover" alt="Referência" title="Referência" /> : <Plus className="text-zinc-800" size={32} aria-hidden="true" />}</div>
                           <input type="file" hidden ref={vortexRefInput} onChange={e => handleFile(e, (val: any) => setVortexNodes(prev => ({ ...prev, reference: val })))} aria-label="Upload Imagem Referência" title="Upload Imagem Referência" />
                        </div>
                        <div className="bg-zinc-900/80 border-2 border-purple-600/30 rounded-3xl p-6 shadow-2xl space-y-5">
                           <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Mídia / Logo</label>
                           <div onClick={() => vortexMediaInput.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-black/40 hover:border-purple-600 transition-all cursor-pointer overflow-hidden" title="Upload Mídia" aria-label="Upload Mídia">{vortexNodes.media ? <img src={vortexNodes.media} className="w-full h-full object-cover" alt="Midia" title="Midia" /> : <Plus className="text-zinc-800" size={32} aria-hidden="true" />}</div>
                           <input type="file" hidden ref={vortexMediaInput} onChange={e => handleFile(e, (val: any) => setVortexNodes(prev => ({ ...prev, media: val })))} aria-label="Upload Mídia ou Logo" title="Upload Mídia ou Logo" />
                        </div>
                     </div>
                     <div className="w-full lg:w-96 bg-zinc-900 border-[4px] border-purple-600 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-[0_0_100px_rgba(147,51,234,0.2)] space-y-8 md:space-y-12 relative z-20 order-1 lg:order-2">
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-center">Vortex</h3>
                        <div className="space-y-6">
                           <textarea value={vortexNodes.prompt} onChange={e => setVortexNodes(p => ({ ...p, prompt: e.target.value }))} placeholder="Prompt de criação..." className="w-full h-32 bg-black/40 border border-zinc-800 p-5 rounded-2xl text-[11px] font-bold text-zinc-400 outline-none focus:border-purple-600 resize-none shadow-inner" aria-label="Prompt Vortex" title="Prompt Vortex" />
                           <div className="grid grid-cols-3 gap-2">{['1:1', '3:4', '16:9'].map((f, i) => (<button key={f} onClick={() => setVortexNodes(p => ({ ...p, format: f }))} className={`py-3 rounded-xl text-[10px] font-black transition-all ${vortexNodes.format === f ? 'bg-purple-600 text-white shadow-xl' : 'bg-zinc-800 text-zinc-600'}`} title={f}>{f}</button>))}</div>
                        </div>
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-gradient-to-r from-purple-700 to-purple-500 py-6 md:py-8 rounded-[2.5rem] font-black uppercase italic shadow-2xl transition-all hover:scale-[1.02] text-sm" title="Gerar Imagem">{loading ? <Loader2 className="animate-spin mx-auto" /> : "GERAR IMAGEM"}</button>
                     </div>
                     <div className="w-full flex-1 h-auto min-h-[400px] lg:h-full bg-zinc-900/80 backdrop-blur-xl border-2 border-zinc-800 rounded-[3rem] md:rounded-[4rem] p-8 md:p-10 relative z-10 overflow-y-auto custom-scrollbar order-3">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 text-white">Galeria Vortex</h3>
                        <div className="grid grid-cols-1 gap-6">{vortexResults.map((url, i) => (<div key={i} className="rounded-3xl border-2 border-zinc-800 overflow-hidden shadow-2xl"><img src={url} className="w-full h-full" alt={`Resultado ${i + 1}`} title={`Resultado ${i + 1}`} /></div>))}</div>
                     </div>
                  </div>
               </div>
            )}

            {/* EDITOR */}
            {activeModule === 'editor' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <h3 className="text-2xl font-black uppercase italic text-white">Magic Editor</h3>
                        <div onClick={() => editorRefInput.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden" title="Upload Imagem Base" aria-label="Upload Imagem Base">{editorBaseImage ? <img src={editorBaseImage} className="w-full h-full object-cover" alt="Imagem Base" title="Imagem Base" /> : <Plus className="text-pink-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={editorRefInput} onChange={e => handleFile(e, setEditorBaseImage)} aria-label="Upload Imagem para Edição" title="Upload Imagem para Edição" />
                        <textarea value={editorPrompt} onChange={e => setEditorPrompt(e.target.value)} placeholder="Descreva a edição..." className="w-full h-32 bg-black border border-zinc-800 p-4 rounded-2xl text-xs text-white resize-none" aria-label="Prompt de Edição" title="Prompt de Edição" />
                        <button onClick={onExecuteProduction} disabled={loading || !editorBaseImage} className="w-full bg-pink-600 py-4 rounded-xl font-black uppercase text-xs" title="Editar Imagem">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Editar Imagem"}</button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden">
                     {generatedImage ? <img src={generatedImage} className="max-h-[500px] rounded-3xl" alt="Imagem Gerada" title="Imagem Gerada" /> : <Wand2 size={64} className="text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* ASSETS 3D MODULE */}
            {activeModule === 'assets3d' && (
               <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-8 animate-in fade-in duration-500">
                  <header className="flex items-center gap-4">
                     <div className="bg-red-600 p-4 rounded-3xl shadow-xl"><Cuboid size={28} className="text-white" /></div>
                     <div>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-white">Novos Assets 3D</h2>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1 flex items-center gap-2"><span className="text-red-500">1. Estúdio</span> <ChevronRight size={10} /> 2. Galeria de Assets</p>
                     </div>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                     {/* Left Column: Inputs */}
                     <div className="lg:col-span-4 space-y-6">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl">
                           <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-6"><Box size={14} className="text-red-500" /> O que é?</h3>

                           <div className="space-y-4">
                              <div className="space-y-1">
                                 <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Nome do Objeto</label>
                                 <input value={asset3dName} onChange={e => setAsset3dName(e.target.value)} placeholder="Ex: Tênis Esportivo, Pena, Diamante..." className="w-full bg-black border border-zinc-800 focus:border-red-500 rounded-xl p-4 text-xs font-bold text-white outline-none transition-all placeholder:text-zinc-700" aria-label="Nome do Asset" title="Nome do Asset" />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Detalhes Visuais</label>
                                 <textarea value={asset3dDetails} onChange={e => setAsset3dDetails(e.target.value)} placeholder="Ex: Futurista, flutuando, cores vibrantes, bordas suaves..." className="w-full h-32 bg-black border border-zinc-800 focus:border-red-500 rounded-xl p-4 text-xs font-medium text-white outline-none resize-none transition-all placeholder:text-zinc-700" aria-label="Detalhes Asset" title="Detalhes Asset" />
                              </div>
                           </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl">
                           <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-4">Referências (Opcional)</h3>
                           <div onClick={() => asset3dRefInput.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 hover:border-red-500 rounded-2xl flex flex-col items-center justify-center bg-black/40 cursor-pointer transition-all group overflow-hidden" title="Upload Referência Asset" aria-label="Upload Referência Asset">
                              {asset3dRef ? <img src={asset3dRef} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Referencia Asset" title="Referencia Asset" /> : <div className="text-center text-zinc-600 group-hover:text-red-500 transition-colors"><ImageIcon size={24} className="mx-auto mb-2" aria-hidden="true" /><span className="text-[9px] font-black uppercase">Upload de Identidade</span></div>}
                           </div>
                           <input type="file" hidden ref={asset3dRefInput} onChange={e => handleFile(e, setAsset3dRef)} aria-label="Upload Referência Asset 3D" title="Upload Referência Asset 3D" />
                        </div>
                     </div>

                     {/* Right Column: Controls & Generation */}
                     <div className="lg:col-span-8 space-y-6 relative">
                        {loading || generatedImage ? (
                           <div className="bg-zinc-950 border-2 border-zinc-900 rounded-[3rem] h-full min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl animate-in zoom-in duration-500">
                              {loading ? (
                                 <div className="text-center z-10">
                                    <div className="w-24 h-24 border-[8px] border-red-600 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
                                    <h3 className="text-2xl font-black uppercase italic text-white tracking-widest">Renderizando 3D...</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-2">Octane Render Engine</p>
                                 </div>
                              ) : (
                                 <div className="relative w-full h-full group">
                                    <img src={generatedImage!} className="w-full h-full object-cover" alt="Asset Gerado" title="Asset Gerado" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between">
                                       <div>
                                          <h3 className="text-2xl font-black text-white uppercase italic">{asset3dName || 'Asset 3D'}</h3>
                                          <p className="text-[10px] text-zinc-400 font-mono uppercase mt-1">{asset3dMaterial} • {asset3dLighting}</p>
                                       </div>
                                       <div className="flex gap-4">
                                          <button onClick={() => { setGeneratedImage(null); }} className="bg-zinc-800 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-700 transition-colors border border-white/10" title="Novo Render">Novo Render</button>
                                          <button onClick={() => downloadImage(generatedImage!, 'asset_3d.png')} className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-colors shadow-lg flex items-center gap-2" title="Baixar Pack"><Download size={14} /> Baixar Pack</button>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        ) : (
                           <>
                              <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl">
                                 <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-6"><Layers size={14} className="text-red-500" /> Material & Acabamento</h3>
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {assetMaterials.map(m => (
                                       <button key={m.id} onClick={() => setAsset3dMaterial(m.id)} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${asset3dMaterial === m.id ? 'border-red-600 bg-red-600/10 text-white' : 'border-zinc-800 bg-black hover:border-zinc-700 text-zinc-500'}`} title={m.id}>
                                          {m.icon}
                                          <span className="text-[9px] font-black uppercase text-center">{m.id}</span>
                                       </button>
                                    ))}
                                 </div>
                              </div>

                              <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl">
                                 <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-6"><Sun size={14} className="text-red-500" /> Iluminação de Estúdio</h3>
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {assetLightings.map(l => (
                                       <button key={l.id} onClick={() => setAsset3dLighting(l.id)} className={`px-4 py-6 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${asset3dLighting === l.id ? 'border-white bg-white text-black' : 'border-zinc-800 bg-black text-zinc-500 hover:border-zinc-700'}`} title={l.id}>
                                          {l.icon}
                                          <span className="text-[9px] font-black uppercase text-center">{l.id}</span>
                                       </button>
                                    ))}
                                 </div>
                              </div>

                              <button onClick={onExecuteProduction} disabled={loading || !asset3dName} className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-8 rounded-[2rem] font-black text-sm uppercase italic tracking-widest shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed" title="Gerar Pack de Assets">
                                 <Cuboid size={20} /> Gerar Pack de Assets
                              </button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {/* CREATIVE IMAGE */}
            {activeModule === 'creative' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">REFERÊNCIA</label>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden" title="Upload Referência" aria-label="Upload Referência">{refFile ? <img src={refFile} className="w-full h-full object-cover" alt="Referência" title="Referência" /> : <Plus className="text-purple-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={fileInputRef} onChange={e => handleFile(e, setRefFile)} aria-label="Upload Referência Criativa" title="Upload Referência Criativa" />
                        <div className="space-y-6 pt-4 border-t border-zinc-900">
                           <div className="space-y-1"><label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2" htmlFor="subStyle">Subestilo</label><select id="subStyle" value={subStyle} onChange={e => setSubStyle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Subestilo" title="Subestilo">{subStyles.map(s => <option key={s}>{s}</option>)}</select></div>
                           <div className="space-y-1"><label htmlFor="creative-scenario" className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2">Cenário</label><select id="creative-scenario" value={labScenario} onChange={e => setLabScenario(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Cenario" title="Cenario">{scenarios.map(s => <option key={s}>{s}</option>)}</select></div>
                           <div className="space-y-3"><label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2">Intensidade IA</label><div className="flex bg-zinc-900 p-1 rounded-xl">{['BAIXO', 'MÉDIO', 'ALTO'].map(lvl => (<button key={lvl} onClick={() => setAiIntensity(lvl)} className={`flex-1 py-2 text-[9px] font-black rounded-lg transition-all ${aiIntensity === lvl ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-600'}`} title={lvl}>{lvl}</button>))}</div></div>
                           <textarea id="creative-details" value={extraDetails} onChange={e => setExtraDetails(e.target.value)} placeholder="Detalhes neurais..." className="w-full p-5 bg-zinc-950 border border-zinc-800 rounded-[2rem] text-xs h-32 resize-none text-white outline-none" aria-label="Detalhes Extras" title="Detalhes Extras" />
                           <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-purple-600 py-6 rounded-3xl font-black text-sm uppercase italic shadow-2xl flex items-center justify-center gap-3" title="Revelar Obra">{loading ? <Loader2 className="animate-spin" /> : <Sparkles />} REVELAR OBRA</button>
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[850px] overflow-hidden relative shadow-2xl">
                     {loading ? <div className="text-center relative"><div className="w-32 h-32 border-[12px] border-purple-600 border-t-transparent rounded-full animate-spin mb-8 mx-auto"></div><h3 className="text-3xl font-black uppercase italic text-white tracking-widest">Sintetizando...</h3></div> : generatedImage ? <img src={generatedImage} className="max-h-[700px] rounded-[3.5rem] border-[16px] border-zinc-900 shadow-2xl" alt="Imagem Gerada" title="Imagem Gerada" /> : <Wand2 size={100} className="opacity-10 text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* CAR DESIGN */}
            {activeModule === 'car' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-700">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-8 rounded-[3rem] border border-zinc-900 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 px-1"><label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">FOTOS DO CARRO</label><span className="text-[8px] font-black text-orange-500 tracking-widest uppercase">1 OK</span></div>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center bg-zinc-900/30 overflow-hidden cursor-pointer hover:border-blue-500" title="Upload Foto Carro" aria-label="Upload Foto Carro">{refFile ? <img src={refFile} className="w-full h-full object-cover" alt="Referencia Foto Carro" title="Referencia Foto Carro" /> : <Plus className="text-blue-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={fileInputRef} onChange={e => handleFile(e, setRefFile)} aria-label="Upload Foto Carro" title="Upload Foto Carro" />
                        <div className="space-y-6 mt-8 pt-4 border-t border-zinc-900">
                           <div className="space-y-1"><label htmlFor="car-model" className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2">Modelo (Texto)</label><input id="car-model" type="text" value={carModel} onChange={e => setCarModel(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white shadow-inner outline-none focus:border-blue-600" aria-label="Modelo Carro" title="Modelo Carro" /></div>
                           <div className="space-y-1"><label htmlFor="car-angle" className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2">Ângulo da Foto</label><select id="car-angle" value={carAngle} onChange={e => setCarAngle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Angulo Carro" title="Angulo Carro">{(['Frontal baixo', 'Perfil', 'Traseira 3/4', 'Drone']).map(a => <option key={a}>{a}</option>)}</select></div>
                           <div className="space-y-1"><label htmlFor="car-action" className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2">Ação / Movimento</label><select id="car-action" value={carAction} onChange={e => setCarAction(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Acao Carro" title="Acao Carro"><option>Estacionado</option><option>Alta velocidade</option><option>Saltando</option></select></div>
                           <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-gradient-to-r from-blue-700 to-orange-600 py-6 rounded-3xl font-black text-sm uppercase italic shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative" title="Executar Render"><div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>{loading ? <RefreshCcw className="animate-spin" /> : <Car size={20} />} EXECUTAR RENDER</button>
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[850px] relative overflow-hidden shadow-2xl group"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>{loading ? <div className="text-center relative z-10"><RefreshCcw className="animate-spin text-orange-500 mb-4 mx-auto" size={48} /><h3 className="text-2xl font-black uppercase italic text-white tracking-widest">Sintetizando Pixels...</h3></div> : generatedImage ? <img src={generatedImage} className="max-h-[700px] rounded-[3.5rem] border-[16px] border-zinc-900 shadow-2xl" alt="Render Carro" title="Render Carro" /> : <Car size={100} className="opacity-10 text-zinc-800" />}</div>
               </div>
            )}

            {/* HERO STYLE (UPDATED UI) */}
            {activeModule === 'hero' && (
               <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-8 animate-in fade-in duration-500">
                  <header className="flex items-center gap-4">
                     <div className="bg-pink-600/20 p-4 rounded-3xl shadow-[0_0_20px_rgba(219,39,119,0.3)]"><Palette size={28} className="text-pink-500" /></div>
                     <div>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-white">Nova Obra Criativa</h2>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">PROTOCOLO RMP 6.0 STUDIO</p>
                     </div>
                  </header>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]">
                     {/* Left Column: Controls */}
                     <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl space-y-6 overflow-y-auto custom-scrollbar max-h-[800px]">

                        {/* Upload */}
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Referências de Identidade</label>
                           <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-3xl flex flex-col items-center justify-center bg-black/40 cursor-pointer transition-all group overflow-hidden relative" title="Upload Referência Hero" aria-label="Upload Referência Hero">
                              {refFile ? <img src={refFile} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Referencia Hero" title="Referencia Hero" /> : <div className="text-center text-zinc-600 group-hover:text-zinc-400 transition-colors"><User size={24} className="mx-auto mb-2" aria-hidden="true" /><span className="text-[8px] font-black uppercase tracking-widest">Upload</span></div>}
                              <div className="absolute bottom-4 left-4">
                                 <span className="bg-zinc-800 text-zinc-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest hover:bg-zinc-700 transition-colors">+ +REF</span>
                              </div>
                           </div>
                           <input type="file" hidden ref={fileInputRef} onChange={e => handleFile(e, setRefFile)} aria-label="Upload Referência Hero" title="Upload Referência Hero" />
                        </div>

                        {/* Aesthetic */}
                        <div className="space-y-2">
                           <label htmlFor="hero-aesthetic" className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Estética (Opcional)</label>
                           <input id="hero-aesthetic" value={heroAesthetic} onChange={e => setHeroAesthetic(e.target.value)} placeholder="Ex: herói urbano, sci-fi, dark hero..." className="w-full bg-black border border-zinc-800 focus:border-pink-500 rounded-2xl p-4 text-xs font-bold text-white outline-none transition-all placeholder:text-zinc-700" aria-label="Estetica" title="Estetica" />
                        </div>

                        {/* Powers */}
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Poderes (Selecione)</label>
                           <div className="flex flex-wrap gap-2">
                              {heroPowers.map(power => (
                                 <button key={power} onClick={() => setSelectedPowers(power)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedPowers === power ? 'bg-pink-600 text-white shadow-lg' : 'bg-zinc-800 text-zinc-500 hover:text-white'}`} title={power}>{power}</button>
                              ))}
                           </div>
                        </div>

                        {/* Generate Button */}
                        <button onClick={onExecuteProduction} disabled={loading || !refFile} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-6 rounded-3xl font-black text-xs uppercase italic tracking-widest shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform" title="Gerar Hero">
                           {loading ? <Loader2 className="animate-spin" /> : <Zap size={16} />} GERAR HERO
                        </button>
                     </div>

                     {/* Right Column: Preview */}
                     <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-[3rem] p-2 flex items-center justify-center overflow-hidden relative min-h-[600px]">
                        {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover rounded-[2.5rem]" alt="Hero Gerado" title="Hero Gerado" /> : <Zap size={64} className="text-zinc-800" />}
                     </div>
                  </div>
               </div>
            )}

            {/* BUSINESS STYLE */}
            {activeModule === 'business' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <h3 className="text-2xl font-black uppercase italic text-white">Business Portrait</h3>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden" title="Upload Referência Business" aria-label="Upload Referência Business">{refFile ? <img src={refFile} className="w-full h-full object-cover" alt="Referencia Business" title="Referencia Business" /> : <Plus className="text-blue-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={fileInputRef} onChange={e => handleFile(e, setRefFile)} aria-label="Upload Referência Business" title="Upload Referência Business" />
                        <div className="space-y-4">
                           <label htmlFor="biz-lighting" className="sr-only">Iluminação</label>
                           <select id="biz-lighting" value={bizLight} onChange={e => setBizLight(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Iluminacao" title="Iluminacao">{bizLights.map(l => <option key={l}>{l}</option>)}</select>
                           <label htmlFor="biz-outfit" className="sr-only">Roupa Business</label>
                           <input id="biz-outfit" value={bizOutfit} onChange={e => setBizOutfit(e.target.value)} placeholder="Outfit (Ex: Navy Suit)" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Roupa Business" title="Roupa Business" />
                        </div>
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-xs" title="Gerar Portrait">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Gerar Portrait"}</button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden">
                     {generatedImage ? <img src={generatedImage} className="max-h-[600px] rounded-3xl" alt="Business Portrait Gerado" title="Business Portrait Gerado" /> : <Briefcase size={64} className="text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* STUDIO PHOTO */}
            {activeModule === 'studio' && (
               <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
                  <header className="flex items-center gap-6"><div className="bg-cyan-500 p-4 rounded-3xl text-white shadow-xl shadow-cyan-900/20"><Camera size={32} /></div><div><h2 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none">Nova Foto de Estúdio</h2><div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-2"><span className={studioStep === 1 ? "text-cyan-500 underline decoration-2 underline-offset-4" : "opacity-40"}>1. UPLOAD DE REFERÊNCIAS</span><span className="opacity-20">→</span><span className={studioStep === 2 ? "text-cyan-500 underline decoration-2 underline-offset-4" : "opacity-40"}>2. AJUSTE DE IDENTIDADE</span></div></div></header>
                  {studioStep === 1 ? (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                        <div className="bg-zinc-950 p-12 rounded-[4rem] border border-zinc-900 shadow-2xl flex flex-col h-[650px] relative"><div className="flex items-center gap-3 mb-2"><div className="bg-cyan-500/20 p-2 rounded-xl text-cyan-500"><ImageIcon size={20} aria-hidden="true" /></div><h3 className="text-base font-black text-white uppercase tracking-widest">Imagem Base</h3></div><p className="text-[10px] text-zinc-600 uppercase font-black mb-12 tracking-widest text-center">CENÁRIO, POSE E ROUPA</p><div onClick={() => studioBaseRef.current?.click()} className={`flex-1 border-2 border-dashed rounded-[3.5rem] flex items-center justify-center cursor-pointer transition-all ${studioBase ? 'border-cyan-500 bg-cyan-500/5 shadow-2xl' : 'border-zinc-800 bg-zinc-900/20 hover:border-cyan-500'}`} title="Upload Imagem Base" aria-label="Upload Imagem Base">{studioBase ? <img src={studioBase} className="max-h-full object-contain p-8 rounded-[4.5rem]" alt="Referencia Base" title="Referencia Base" /> : <ImageIcon size={48} className="text-zinc-800" aria-hidden="true" />}</div><input type="file" hidden ref={studioBaseRef} onChange={e => handleFile(e, setStudioBase)} aria-label="Upload Imagem Base Estúdio" title="Upload Imagem Base Estúdio" /><button onClick={() => studioBaseRef.current?.click()} className="mt-8 mx-auto flex items-center gap-3 px-12 py-4 bg-zinc-900 text-[10px] font-black uppercase tracking-[0.4em] rounded-full border border-zinc-800 text-zinc-500 hover:text-cyan-400 shadow-xl" aria-label="Adicionar Referência Base" title="Adicionar Referência Base">+ +REF</button></div>
                        <div className="bg-zinc-950 p-12 rounded-[4rem] border border-zinc-900 shadow-2xl flex flex-col h-[650px] relative"><div className="flex items-center gap-3 mb-2"><div className="bg-cyan-500/20 p-2 rounded-xl text-cyan-500"><User size={22} aria-hidden="true" /></div><h3 className="text-base font-black text-white uppercase tracking-widest">O Modelo</h3></div><p className="text-[10px] text-zinc-600 uppercase font-black mb-12 tracking-widest text-center">IDENTIDADE E ROSTO</p><div onClick={() => studioModelRef.current?.click()} className={`flex-1 border-2 border-dashed rounded-[3.5rem] flex items-center justify-center cursor-pointer transition-all ${studioModel ? 'border-cyan-500 bg-cyan-500/5 shadow-2xl' : 'border-zinc-800 bg-zinc-900/20 hover:border-cyan-500'}`} title="Upload Modelo" aria-label="Upload Modelo">{studioModel ? <img src={studioModel} className="max-h-full object-contain p-8 rounded-[4.5rem]" alt="Referencia Modelo" title="Referencia Modelo" /> : <User size={48} className="text-zinc-800" aria-hidden="true" />}</div><input type="file" hidden ref={studioModelRef} onChange={e => handleFile(e, setStudioModel)} aria-label="Upload Modelo Estúdio" title="Upload Modelo Estúdio" /><button onClick={() => studioModelRef.current?.click()} className="mt-8 mx-auto flex items-center gap-3 px-12 py-4 bg-zinc-900 text-[10px] font-black uppercase rounded-full border border-zinc-800 text-zinc-500 hover:text-cyan-400 shadow-xl" aria-label="Adicionar Referência Modelo" title="Adicionar Referência Modelo">+ +REF</button></div>
                        <div className="lg:col-span-2 flex justify-center pt-8"><button onClick={onExecuteProduction} disabled={loading || !studioBase || !studioModel} className="px-24 py-10 bg-cyan-600 text-white font-black rounded-[3rem] shadow-[0_25px_60px_rgba(8,145,178,0.4)] text-base uppercase italic tracking-tighter transition-all hover:scale-[1.03] active:scale-95 group overflow-hidden relative disabled:opacity-50" title="Gerar Foto Principal"><div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>{loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : <Sparkles size={24} />}<span className="ml-4">{loading ? "Sintonizando Core..." : "GERAR FOTO PRINCIPAL"}</span></button></div>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-4 items-start animate-in zoom-in duration-700">
                        <div className="lg:col-span-6 space-y-10">
                           <div className="bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] p-1 shadow-2xl relative group overflow-hidden"><div className="absolute inset-0 bg-cyan-500/5 blur-[100px] pointer-events-none"></div><img src={generatedImage!} className="w-full h-auto rounded-[3.8rem] shadow-inner" alt="Main Result" title="Main Result" /><div className="absolute top-8 right-8 flex gap-3"><button className="bg-black/60 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-cyan-600 border border-white/10 shadow-xl shadow-cyan-900/10" aria-label="Baixar resultado" title="Baixar Resultado"><Download size={20} /></button><button onClick={() => setStudioStep(1)} className="bg-black/60 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-red-600 border border-white/10 shadow-xl shadow-red-900/10" aria-label="Fechar" title="Fechar"><X size={20} /></button></div></div>
                           <div className="space-y-6"><h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] px-4">Fotos da Sessão</h3><div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">{sessionPhotos.map((photo, idx) => (<div key={idx} onClick={() => setGeneratedImage(photo)} className={`flex-shrink-0 w-32 aspect-square rounded-3xl border-4 cursor-pointer transition-all ${generatedImage === photo ? 'border-cyan-500 scale-105 shadow-2xl shadow-cyan-900/20' : 'border-zinc-900'}`} title={`Selecionar Foto ${idx + 1}`}><img src={photo} className="w-full h-full object-cover rounded-[1.2rem]" alt={`Foto sessao ${idx + 1}`} /></div>))}</div></div>
                        </div>
                        <div className="lg:col-span-6 space-y-12 pt-4 bg-zinc-950 p-12 rounded-[4rem] border border-zinc-900 shadow-2xl">
                           <div className="space-y-6"><div className="flex items-center justify-between px-2"><div className="flex items-center gap-3"><div className="bg-cyan-500/10 p-1.5 rounded-lg text-cyan-500"><Target size={18} /></div><label htmlFor="studio-sim" className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Semelhança Facial</label></div><span className="text-sm font-black text-cyan-500 italic">{facialSim}%</span></div><input id="studio-sim" type="range" min="50" max="100" value={facialSim} onChange={(e) => setFacialSim(Number(e.target.value))} className="w-full h-2 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-cyan-500 shadow-inner" aria-label="Nivel de semelhanca" title="Nivel de semelhanca" /></div>
                           <div className="space-y-3"><label htmlFor="studio-outfit" className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-2">Troca de Roupa</label><input id="studio-outfit" value={studioOutfit} onChange={e => setStudioOutfit(e.target.value)} placeholder="Ex: Terno slim azul marinho..." className="w-full p-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[11px] font-bold text-white outline-none focus:border-cyan-500 shadow-inner" aria-label="Troca de Roupa" title="Troca de Roupa" /></div>
                           <div className="space-y-6 pt-6"><button onClick={onExecuteProduction} disabled={loading} className="w-full py-8 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-black rounded-[2.5rem] shadow-2xl text-sm uppercase italic transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative" title="Regerar Foto Principal"><div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>RE-GERAR FOTO PRINCIPAL</button></div>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* REMIX LAYOUT - RESTORED */}
            {activeModule === 'remix' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <header className="mb-2">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="bg-purple-500/20 p-2 rounded-xl text-purple-500"><Maximize2 size={20} /></div>
                              <h3 className="text-xl font-black uppercase italic text-white">Remix Layout</h3>
                           </div>
                           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Fusão Estrutural + Estilística</p>
                        </header>

                        <div className="space-y-4">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2" htmlFor="remix-map-input"><Layout size={12} aria-hidden="true" /> 1. Layout (Estrutura)</label>
                              <div onClick={() => remixMapRef.current?.click()} className="h-32 border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden hover:border-purple-500 transition-colors" title="Upload Layout Map" aria-label="Upload Layout Map">
                                 {remixMap ? <img src={remixMap} className="w-full h-full object-cover" alt="Layout Map" title="Layout Map" /> : <Plus className="text-zinc-600" size={24} aria-hidden="true" />}
                              </div>
                              <input type="file" hidden ref={remixMapRef} onChange={e => handleFile(e, setRemixMap)} aria-label="Upload Layout Map" title="Upload Layout Map" id="remix-map-input" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2" htmlFor="remix-soul-input"><Palette size={12} aria-hidden="true" /> 2. Soul (Estilo/Cor)</label>
                              <div onClick={() => remixSoulRef.current?.click()} className="h-32 border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden hover:border-purple-500 transition-colors" title="Upload Soul Style" aria-label="Upload Soul Style">
                                 {remixSoul ? <img src={remixSoul} className="w-full h-full object-cover" alt="Soul Style" title="Soul Style" /> : <Plus className="text-zinc-600" size={24} aria-hidden="true" />}
                              </div>
                              <input type="file" hidden ref={remixSoulRef} onChange={e => handleFile(e, setRemixSoul)} aria-label="Upload Soul Style" title="Upload Soul Style" id="remix-soul-input" />
                           </div>
                        </div>

                        <button onClick={onExecuteProduction} disabled={loading || !remixMap || !remixSoul} className="w-full bg-purple-600 py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2" title="Executar Fusão">
                           {loading ? <Loader2 className="animate-spin" /> : <Maximize2 size={16} />} Executar Fusão
                        </button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden shadow-2xl">
                     {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover rounded-[3.8rem]" alt="Remix Gerado" title="Remix Gerado" /> : <Maximize2 size={80} className="text-zinc-800 opacity-50" />}
                  </div>
               </div>
            )}

            {/* MOCKUP PRO */}
            {activeModule === 'mockup' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <h3 className="text-2xl font-black uppercase italic text-white">Mockup Produto</h3>
                        <div onClick={() => mockupInputRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden" aria-label="Upload Produto Mockup">{mockupProduct ? <img src={mockupProduct} className="w-full h-full object-cover" alt="Produto Mockup" title="Produto Mockup" /> : <Plus className="text-green-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={mockupInputRef} onChange={e => handleFile(e, setMockupProduct)} aria-label="Upload Produto Mockup" title="Upload Produto Mockup" />
                        <div className="space-y-4">
                           <label htmlFor="mockup-env" className="sr-only">Ambiente</label>
                           <input id="mockup-env" value={mockupEnv} onChange={e => setMockupEnv(e.target.value)} placeholder="Ambiente (Ex: Mesa de Madeira)" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Ambiente" title="Ambiente" />
                           <label htmlFor="mockup-comp" className="sr-only">Composição</label>
                           <input id="mockup-comp" value={mockupComp} onChange={e => setMockupComp(e.target.value)} placeholder="Composição (Ex: Minimalista)" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Composicao" title="Composicao" />
                        </div>
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-green-600 py-4 rounded-xl font-black uppercase text-xs" title="Gerar Mockup">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Gerar Mockup"}</button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden">
                     {generatedImage ? <img src={generatedImage} className="max-h-[600px] rounded-3xl" alt="Mockup Gerado" title="Mockup Gerado" /> : <Box size={64} className="text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* UGC CREATOR */}
            {activeModule === 'ugc' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <h3 className="text-2xl font-black uppercase italic text-white">UGC Creator</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div onClick={() => ugcProductRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-900/30 cursor-pointer" aria-label="Upload Produto UGC">{ugcProduct ? <img src={ugcProduct} className="w-full h-full object-cover rounded-xl" alt="Produto UGC" title="Produto UGC" /> : <div className="text-center"><Box size={20} className="mx-auto" aria-hidden="true" /><span className="text-[8px] font-bold">PRODUTO</span></div>}</div>
                           <div onClick={() => ugcModelRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-900/30 cursor-pointer" aria-label="Upload Modelo UGC">{ugcModel ? <img src={ugcModel} className="w-full h-full object-cover rounded-xl" alt="Modelo UGC" title="Modelo UGC" /> : <div className="text-center"><User size={20} className="mx-auto" aria-hidden="true" /><span className="text-[8px] font-bold">MODELO</span></div>}</div>
                        </div>
                        <input type="file" hidden ref={ugcProductRef} onChange={e => handleFile(e, setUgcProduct)} aria-label="Upload Produto UGC" title="Upload Produto UGC" />
                        <input type="file" hidden ref={ugcModelRef} onChange={e => handleFile(e, setUgcModel)} aria-label="Upload Modelo UGC" title="Upload Modelo UGC" />
                        <label htmlFor="ugc-context" className="sr-only">Contexto UGC</label>
                        <textarea id="ugc-context" value={ugcContext} onChange={e => setUgcContext(e.target.value)} placeholder="Contexto (Ex: Selfie no espelho da academia)" className="w-full h-32 bg-black border border-zinc-800 p-4 rounded-2xl text-xs text-white resize-none" aria-label="Contexto UGC" title="Contexto UGC" />
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-emerald-600 py-4 rounded-xl font-black uppercase text-xs" title="Gerar UGC">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Gerar UGC"}</button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden">
                     {generatedImage ? <img src={generatedImage} className="max-h-[600px] rounded-3xl" alt="UGC Gerado" title="UGC Gerado" /> : <Smartphone size={64} className="text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* RESTORE */}
            {activeModule === 'restore' && (
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <h3 className="text-2xl font-black uppercase italic text-white">Restaurador Pro</h3>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center bg-zinc-900/30 cursor-pointer overflow-hidden" title="Upload Referência para Restaurar" aria-label="Upload Referência para Restaurar">{refFile ? <img src={refFile} className="w-full h-full object-cover" alt="Referencia" title="Referencia" /> : <Plus className="text-purple-600" size={32} aria-hidden="true" />}</div>
                        <input type="file" hidden ref={fileInputRef} onChange={e => handleFile(e, setRefFile)} aria-label="Upload Imagem para Restaurar" title="Upload Imagem para Restaurar" />
                        <div className="space-y-4">
                           <label htmlFor="restore-mode" className="sr-only">Modo Restauração</label>
                           <select id="restore-mode" value={restoreMode} onChange={e => setRestoreMode(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Modo Restauracao" title="Modo Restauracao">{restoreModes.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select>
                           <label htmlFor="restore-damage" className="sr-only">Nível de Dano</label>
                           <select id="restore-damage" value={damageLevel} onChange={e => setDamageLevel(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Nivel de Dano" title="Nivel de Dano"><option>Leve</option><option>Médio</option><option>Grave</option></select>
                        </div>
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-purple-600 py-4 rounded-xl font-black uppercase text-xs" title="Restaurar">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Restaurar"}</button>
                     </div>
                  </div>
                  <div className="lg:col-span-8 flex items-center justify-center bg-zinc-950 border-2 border-zinc-900 rounded-[4rem] min-h-[600px] relative overflow-hidden">
                     {generatedImage ? <img src={generatedImage} className="max-h-[600px] rounded-3xl" alt="Imagem Restaurada" title="Imagem Restaurada" /> : <RefreshCcw size={64} className="text-zinc-800" />}
                  </div>
               </div>
            )}

            {/* CONSULTANT */}
            {activeModule === 'consultant' && (
               <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in">
                  <header className="flex items-center gap-4">
                     <div className="bg-blue-600 p-4 rounded-3xl shadow-xl"><Search size={28} className="text-white" /></div>
                     <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Consultoria Visual AI</h2>
                  </header>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div onClick={() => consultProfileRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500" title="Upload Perfil">{consultProfile ? <img src={consultProfile} className="w-full h-full object-cover rounded-xl" alt="Consultoria Perfil" title="Consultoria Perfil" /> : <span className="text-xs font-bold text-zinc-500">PERFIL</span>}</div>
                           <div onClick={() => consultFeedRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500" title="Upload Feed">{consultFeed ? <img src={consultFeed} className="w-full h-full object-cover rounded-xl" alt="Consultoria Feed" title="Consultoria Feed" /> : <span className="text-xs font-bold text-zinc-500">FEED</span>}</div>
                        </div>
                        <input type="file" hidden ref={consultProfileRef} onChange={e => handleFile(e, setConsultProfile)} aria-label="Upload Perfil Consultoria" title="Upload Perfil Consultoria" />
                        <input type="file" hidden ref={consultFeedRef} onChange={e => handleFile(e, setConsultFeed)} aria-label="Upload Feed Consultoria" title="Upload Feed Consultoria" />
                        <label htmlFor="consultant-niche" className="sr-only">Nicho Consultoria</label>
                        <input id="consultant-niche" value={consultNiche} onChange={e => setConsultNiche(e.target.value)} placeholder="Nicho (Ex: Design, Fitness)" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white" aria-label="Nicho Consultoria" title="Nicho Consultoria" />
                        <button onClick={onExecuteProduction} disabled={loading} className="w-full bg-blue-600 py-6 rounded-2xl font-black uppercase text-xs" title="Analisar Perfil">{loading ? <Loader2 className="animate-spin mx-auto" /> : "Analisar Perfil"}</button>
                     </div>
                     <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl overflow-y-auto max-h-[600px] custom-scrollbar">
                        {consultData ? (
                           <div className="space-y-6 text-sm text-zinc-300">
                              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                                 <span className="font-bold text-white text-lg">Score de Marca</span>
                                 <span className="text-2xl font-black text-blue-500">{consultData.score}/10</span>
                              </div>
                              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                                 <h4 className="font-black text-white mb-2 uppercase text-xs tracking-widest">Bio Sugerida</h4>
                                 <p className="mb-1"><span className="text-blue-500">Autoridade:</span> {consultData.strategy?.suggestedBio?.authority}</p>
                                 <p className="mb-1"><span className="text-blue-500">Transformação:</span> {consultData.strategy?.suggestedBio?.transformation}</p>
                                 <p><span className="text-blue-500">CTA:</span> {consultData.strategy?.suggestedBio?.cta}</p>
                              </div>
                              <div className="space-y-2">
                                 <h4 className="font-black text-white uppercase text-xs tracking-widest">Plano de Ação</h4>
                                 {consultData.actionPlan?.map((item: any, i: number) => (
                                    <div key={i} className="flex gap-3 items-start">
                                       <div className="bg-blue-900/30 text-blue-400 font-bold w-6 h-6 rounded flex items-center justify-center text-xs shrink-0">{item.step}</div>
                                       <div><p className="font-bold text-white">{item.title}</p><p className="text-xs text-zinc-500">{item.description}</p></div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (
                           <div className="h-full flex flex-col items-center justify-center text-zinc-700">
                              <Search size={48} className="mb-4 opacity-20" />
                              <p className="text-xs font-black uppercase tracking-widest">Aguardando Análise</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {/* HISTORY */}
            {activeModule === 'history' && !selectedDetail && (
               <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
                  <header className="flex justify-between items-end"><div className="space-y-2"><h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none text-white text-center">Galeria <span className="text-purple-600">Core</span></h2><p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em] ml-1 text-center">CACHE DE PRODUÇÃO EM ALTA FIDELIDADE</p></div></header>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                     {history.map(item => (
                        <div key={item.id} onClick={() => setSelectedDetail(item)} className="relative group aspect-square rounded-[3rem] overflow-hidden border border-zinc-900 shadow-2xl hover:border-purple-600 transition-all cursor-pointer" title="Ver Detalhes">
                           <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Item Historico" title="Item Historico" />
                           <div className="absolute inset-0 bg-purple-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"><Maximize2 size={32} className="text-white" /></div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* DETALHE DA GALERIA */}
            {selectedDetail && (
               <div className="max-w-7xl mx-auto animate-in zoom-in duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-black/60 backdrop-blur-3xl rounded-[5rem] p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
                     <button onClick={() => setSelectedDetail(null)} className="absolute top-12 left-12 p-4 bg-zinc-900/80 rounded-2xl hover:bg-red-600 transition-all z-50 shadow-xl border border-white/5" aria-label="Fechar Detalhe" title="Fechar Detalhe"><X size={24} /></button>
                     <div className="lg:col-span-7 flex items-center justify-center"><img src={selectedDetail.url} className="max-h-[750px] rounded-[4rem] border-[16px] border-zinc-900 shadow-2xl relative z-10" alt="Detalhe da Obra" title="Detalhe da Obra" /></div>
                     <div className="lg:col-span-5 space-y-12 py-6">
                        <header className="space-y-6"><div className="flex gap-3">{selectedDetail.tags?.map((t: string) => (<span key={t} className="px-4 py-2 bg-zinc-800 rounded-xl text-[9px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-700 italic shadow-xl">#{t}</span>))}</div><h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">Obra Criativa Core</h2><p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">SÍNTESE EXECUTADA EM: {selectedDetail.date}</p></header>
                        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[3rem] relative group shadow-inner"><div className="flex items-center gap-3 mb-6 text-zinc-600"><Terminal size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Neural Source Code</span></div><div className="h-48 overflow-y-auto custom-scrollbar text-[11px] font-mono text-zinc-400 leading-loose italic pr-4">{selectedDetail.prompt}</div></div>
                        <div className="space-y-6"><button className="w-full bg-zinc-800 py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 border border-zinc-700 hover:bg-white hover:text-black transition-all shadow-xl shadow-purple-900/10" title="Baixar 8K HD"><Download size={20} /> BAIXAR 8K HD</button></div>
                     </div>
                  </div>
               </div>
            )}

         </main>

         {/* FOOTER PLATFORM GLASSMORFISM */}
         <div className="fixed bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 lg:gap-12 bg-zinc-950/90 backdrop-blur-3xl px-8 lg:px-14 py-4 lg:py-6 rounded-full border border-zinc-800 shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-50 pointer-events-auto border-white/5 max-w-[90vw] lg:max-w-none justify-center">
            <div className="flex items-center gap-3 lg:gap-5 group cursor-pointer" onClick={() => setActiveModule('settings')} title="Configurações">
               <div className="bg-purple-600 p-1.5 lg:p-2 rounded-xl shadow-[0_0_20px_#9333ea] text-white"><Star size={16} className="lg:w-5 lg:h-5 fill-white" /></div>
               <p className="text-[10px] lg:text-[13px] font-black text-zinc-300 tracking-[0.2em] lg:tracking-[0.4em] uppercase group-hover:text-purple-400 transition-colors leading-none truncate max-w-[100px] lg:max-w-none">{profile.displayName}.design</p>
            </div>
            <div className="h-4 lg:h-6 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-2 lg:gap-3">
               <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]"></div>
               <span className="text-[9px] lg:text-[11px] font-black text-zinc-600 uppercase tracking-widest italic leading-none hidden lg:block">Neural Core Unlimited • Platinum</span>
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic leading-none lg:hidden">Platinum</span>
            </div>
         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 20px; border: 2px solid black; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9333ea; }
        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234b5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-size: 16px; background-position: right 1rem center; background-repeat: no-repeat; appearance: none; }
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; background: white; border-radius: 50%; cursor: pointer; border: 4px solid #06b6d4; box-shadow: 0 0 15px rgba(6,182,212,0.6); transition: transform 0.2s; }
        input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; background: #18181b; border-radius: 10px; }
      `}} />
      </div>
   );
};

export default App;