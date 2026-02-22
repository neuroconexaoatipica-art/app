import { forwardRef } from "react";
import { motion } from "motion/react";
import { Crown, Users, Video, Landmark, Calendar } from "lucide-react";

export const NucleoFounderSection = forwardRef<HTMLElement>(
  function NucleoFounderSection(_props, ref) {
    const founderRoles = [
      {
        icon: Users,
        text: "Criar e moderar comunidades temáticas",
      },
      {
        icon: Video,
        text: "Organizar lives e debates autorais",
      },
      {
        icon: Landmark,
        text: "Contribuir com a cultura e governança do espaço",
      },
      {
        icon: Calendar,
        text: "No futuro, auxiliar na organização de encontros presenciais",
      },
    ];

    return (
      <section
        ref={ref}
        id="nucleo-fundador"
        className="w-full py-16 md:py-24 lg:py-28 bg-[#35363A] relative overflow-hidden"
      >
        {/* Decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#81D8D0] rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1000px] px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#81D8D0]/10 border border-[#81D8D0]/30 rounded-full mb-6">
              <Crown className="h-4 w-4 text-[#81D8D0]" />
              <span className="text-sm text-[#81D8D0] font-semibold tracking-wide uppercase">
                Núcleo Fundador
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-semibold text-white">
              Construa este espaço com a gente
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-normal leading-relaxed">
              Fundadores ajudam a moldar a cultura do espaço desde o início.
            </p>
          </motion.div>

          {/* Lista de papéis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
          >
            {founderRoles.map((role, i) => {
              const IconComponent = role.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-start gap-4 bg-black/30 border border-white/10 rounded-xl p-5 hover:border-[#81D8D0]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#81D8D0]/15 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-[#81D8D0]" />
                  </div>
                  <p className="text-white/90 font-medium">{role.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Reforço estrutural */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
              Aqui você não entra apenas para consumir.<br />
              <span className="text-[#81D8D0]">Você entra para construir.</span>
            </p>
          </motion.div>

          {/* Nota sobre pagamento futuro */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto mt-10 bg-black/40 border border-white/10 rounded-xl p-6 text-center"
          >
            <p className="text-white/70 font-normal leading-relaxed">
              Este espaço será pago no futuro para garantir sustentabilidade.
            </p>
            <p className="text-[#81D8D0] font-medium mt-2">
              Quem está no núcleo inicial participa gratuitamente como membro fundador.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
);
