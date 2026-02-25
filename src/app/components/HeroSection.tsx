import { motion } from "motion/react";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps { onCtaClick: () => void; onScrollToAgenda?: () => void; onScrollToNucleo?: () => void; }

export function HeroSection({ onCtaClick, onScrollToAgenda, onScrollToNucleo }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #C8C8C8 0%, #D4D4D4 100%)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-[#81D8D0]/20 to-[#81D8D0]/5 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tl from-[#C8102E]/8 to-transparent rounded-full blur-3xl" />
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -30 - i * 8, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} className="absolute w-1.5 h-1.5 bg-[#81D8D0] rounded-full" style={{ top: `${12 + i * 11}%`, left: `${8 + i * 12}%` }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border-2 border-[#1A1A1A]/15 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#81D8D0]" />
              <span className="text-sm text-[#1A1A1A]">Rede adulta para mentes intensas - 18+</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] text-center" style={{ lineHeight: 1.1 }}>
              O Orkut{" "}<motion.span animate={{ color: ["#C8102E", "#E01030", "#C8102E"] }} transition={{ duration: 3, repeat: Infinity }}>voltou.</motion.span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-xl sm:text-2xl md:text-3xl mb-8" style={{ color: "#0A8F85" }}>
            O Orkut das mentes intensas.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="max-w-3xl mx-auto mb-10 space-y-4">
            <p className="text-lg md:text-xl text-[#333]">Um lugar onde{" "}<span className="text-[#1A1A1A]" style={{ fontWeight: 600 }}>mentes intensas</span>{" "}podem se encontrar sem pedir desculpa por estarem vivas.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#666]">
              <span>Conexoes reais</span><span className="text-[#CCC]">-</span><span>Intensidade intelectual</span><span className="text-[#CCC]">-</span><span>Comunidades fortes</span><span className="text-[#CCC]">-</span><span>Lives & encontros</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="flex flex-col items-center gap-4">
            <motion.button onClick={onCtaClick} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block text-base md:text-lg px-10 md:px-12 py-4 md:py-5 bg-[#C8102E] text-white rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl" style={{ fontWeight: 600 }}>Entrar na Comunidade</motion.button>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <motion.button onClick={onScrollToAgenda} whileHover={{ scale: 1.02 }} className="text-sm text-[#C8102E] hover:text-[#C8102E]/80 transition-colors underline underline-offset-4 decoration-[#C8102E]/40" style={{ fontWeight: 600 }}>Ver o que esta acontecendo agora</motion.button>
              <span className="hidden sm:block text-[#CCC]">-</span>
              <motion.button onClick={onScrollToNucleo} whileHover={{ scale: 1.02 }} className="text-sm text-[#666] hover:text-[#333] transition-colors underline underline-offset-4 decoration-[#999]/40" style={{ fontWeight: 500 }}>Sobre o Nucleo Fundador</motion.button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="mt-12">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2 text-[#999]">
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
