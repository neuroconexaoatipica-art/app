import { motion } from "motion/react";
import { CheckCircle, Shield, MessageCircle, UserCheck } from "lucide-react";

interface ClaritySectionProps {
  onCtaClick: () => void;
}

export function ClaritySection({ onCtaClick }: ClaritySectionProps) {
  const steps = [
    {
      icon: UserCheck,
      title: "Perfil criado imediatamente",
      description: "Você entra e já pode explorar.",
    },
    {
      icon: CheckCircle,
      title: "Exploração das comunidades liberada",
      description: "Acesse todas as 14 comunidades desde o primeiro momento.",
    },
    {
      icon: Shield,
      title: "Se desejar ser fundador — passa por curadoria ética",
      description: "Fundadores constroem a base. A seleção é humana e cuidadosa.",
    },
    {
      icon: MessageCircle,
      title: "Contato humano estruturado",
      description: "Nada automatizado. Cada interação é real.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-28 bg-black">
      <div className="mx-auto max-w-[900px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-semibold text-white">
            O que acontece depois do cadastro
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
            Transparência total. Sem surpresas.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-5 mb-14">
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex items-start gap-5 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-[#81D8D0]/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#81D8D0]/15 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-5 w-5 text-[#81D8D0]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-white/60 font-normal">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reforço final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-lg text-white/50 italic mb-8">
            Sem automatização invasiva.<br />
            Sem spam.<br />
            Sem pressão.
          </p>

          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-10 py-4 bg-[#81D8D0] text-black rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Entrar na Comunidade
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
