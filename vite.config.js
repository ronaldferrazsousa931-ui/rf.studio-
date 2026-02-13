import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente do nível do sistema (Netlify) e arquivos .env
  const env = loadEnv(mode, process.cwd(), '');
  
  // Prioriza a chave que está no env (carregado) ou no process.env (sistema)
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Define globalmente para o código React usar
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});