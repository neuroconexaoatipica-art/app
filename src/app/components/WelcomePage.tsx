import { motion } from "motion/react";
import { PenTool, User, MessageCircle, Sparkles } from "lucide-react";
import { LogoIcon } from "./LogoIcon";
import { useProfileContext } from "../../lib";

interface WelcomePageProps {
  onCreatePost: () => void;
  onCompleteProfile: () => void;
  onContactFounder: () => void;
}

export function WelcomePage({ onCreatePost, onCompleteProfile, onContactFounder }: WelcomePageProps) {
  const { user } = useProfileContext();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-[700px] space-y-10"
      >
        {/* Logo + Boas-vindas */}
        <div className="text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LogoIcon size={72} className="h-[72px] w-[72px] mx-auto mb-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-5xl font-semibold text-white"
          >
            Bem-vindo(a){user?.name ? `, ${user.name}` : ""}.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#81D8D0] font-medium"
          >
            Você está dentro.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-white/70 font-normal leading-relaxed max-w-lg mx-auto"
          >
            O NeuroConexão Atípica é construído por quem participa.
          </motion.p>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-[#81D8D0]/10 border border-[#81D8D0]/30 rounded-xl p-5 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#81D8D0] animate-pulse" />
            <span className="text-sm font-semibold text-[#81D8D0]">
              Conta criada — acesso em ativação
            </span>
          </div>
          <p className="text-sm text-white/50 font-normal">
            Estamos organizando a base com cuidado. Enquanto isso, você já pode
            explorar as comunidades e completar seu perfil.
          </p>
        </motion.div>

        {/* Missão inicial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8102E]/10 border border-[#C8102E]/30 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-[#C8102E]" />
            <span className="text-sm text-[#C8102E] font-semibold">Missão inicial</span>
          </div>
          <p className="text-2xl md:text-3xl text-white font-semibold">
            Escreva seu primeiro post.
          </p>
          <p className="text-white/50 mt-2 font-normal">
            Silêncio mata comunidade. Movimento gera massa crítica.
          </p>
        </motion.div>

        {/* 3 Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="space-y-4"
        >
          <motion.button
            onClick={onCreatePost}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#81D8D0] text-black rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <PenTool className="h-5 w-5" />
            Escrever meu primeiro post
          </motion.button>

          <motion.button
            onClick={onCompleteProfile}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border-2 border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all"
          >
            <User className="h-5 w-5" />
            Completar meu perfil
          </motion.button>

          <motion.button
            onClick={onContactFounder}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border-2 border-[#C8102E]/30 text-white/80 rounded-xl font-semibold text-lg hover:bg-[#C8102E]/10 hover:border-[#C8102E]/50 transition-all"
          >
            <MessageCircle className="h-5 w-5 text-[#C8102E]" />
            Desejo falar com a fundadora
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
