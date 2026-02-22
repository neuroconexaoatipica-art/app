import { motion } from "motion/react";
import { Sparkles, Lock } from "lucide-react";

interface HeroSectionProps {
  onCtaClick: () => void;
  onScrollToNucleo?: () => void;
}

export function HeroSection({ onCtaClick, onScrollToNucleo }: HeroSectionProps) {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-black overflow-hidden">
      {/* Elementos Decorativos Animados - Tiffany (campo de segurança) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#81D8D0]/20 to-[#81D8D0]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-[#C8102E]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Badge Animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#81D8D0]" />
              <span className="text-sm font-medium text-white/90">Mentes intensas, conexões reais</span>
            </div>
          </motion.div>

          {/* Frase de urgência */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-sm md:text-base text-[#81D8D0]/80 font-medium mb-8"
          >
            As primeiras 30 pessoas participarão da definição das diretrizes iniciais da plataforma.
          </motion.p>

          {/* Título Principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 space-y-8"
          >
            {/* Primeira frase */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white text-center font-normal">
              Um lugar onde{" "}
              <span className="font-semibold text-[#C8102E]">mentes intensas</span>
              <br />
              podem se encontrar
              <br />
              sem pedir desculpa por estarem vivas.
            </h1>

            {/* Blocos de negação */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center space-y-3 text-lg md:text-xl lg:text-2xl text-white/80 font-normal"
            >
              <p>Não é um espaço de <span className="italic">"cura etérea"</span>.</p>
              <p>Não é um refúgio de gente que quer se anestesiar.</p>
            </motion.div>

            {/* Afirmação positiva */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-center space-y-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                É um espaço de gente viva.
              </p>

              {/* Lista de características */}
              <div className="text-lg md:text-xl lg:text-2xl text-white/90">
                <p className="mb-3 font-medium">Gente que:</p>
                <div className="space-y-1.5 font-light">
                  <p>pensa rápido</p>
                  <p>sente fundo</p>
                  <p>deseja</p>
                  <p>cria</p>
                  <p>erra</p>
                  <p>ama</p>
                  <p>se excita intelectualmente</p>
                  <p>se conecta</p>
                </div>
              </div>
            </motion.div>

            {/* Frase elétrica */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center space-y-2 pt-6"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-normal">
                Conexões mentais profundas não são calmas.
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#C8102E]">
                Elas são elétricas.
              </p>
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Botão principal */}
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-block text-base md:text-lg lg:text-xl px-8 md:px-10 lg:px-12 py-4 md:py-5 bg-[#81D8D0] text-black rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold overflow-hidden"
            >
              <span className="relative z-10">
                Entrar na Comunidade
              </span>
              <motion.div
                className="absolute inset-0 bg-[#81D8D0]/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Badge de Beta */}
            <div className="flex items-center gap-2 text-white/50">
              <Lock className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">
                Beta Fechado — Vagas limitadas para membros fundadores
              </span>
            </div>

            {/* Botão secundário */}
            <motion.button
              onClick={onScrollToNucleo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm md:text-base text-[#81D8D0]/70 hover:text-[#81D8D0] font-medium transition-colors underline underline-offset-4 decoration-[#81D8D0]/30 hover:decoration-[#81D8D0]/60"
            >
              Quero saber sobre o Núcleo Fundador
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}