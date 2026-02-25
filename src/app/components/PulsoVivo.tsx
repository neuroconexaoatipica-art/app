import { forwardRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Radio, Video, Flame, Megaphone, MessageCircleQuestion, ArrowRight, Heart, Check, Loader2, Users } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAnnouncements } from "../../lib/useCMS";
import type { Announcement } from "../../lib/useCMS";

const FALLBACK_AVISOS = [
  { id: "1", texto: "Cadastros abertos — primeiros 50 a 80 membros fundadores com acesso vitalicio", tipo: "destaque" },
  { id: "2", texto: "10 comunidades procuram Founder — candidate-se apos o cadastro", tipo: "info" },
  { id: "3", texto: "Encontro presencial Sao Paulo — Abril 2026 em organizacao", tipo: "evento" },
  { id: "4", texto: "Lives toda semana — confira a agenda ao lado", tipo: "info" },
];

const DESAFIO = { titulo: "Desafio da Semana", texto: "Conte para alguem — pessoalmente — algo que voce costuma guardar so pra si.", tag: "Semana 1" };
const PERGUNTA = { titulo: "Pergunta do Dia", texto: "O que voce faria diferente se soubesse que ninguem ia te julgar?", autor: "Mila" };

function formatDate(iso: string) {
  const d = new Date(iso);
  const meses = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  return { dia: d.getDate().toString().padStart(2,"0"), mes: meses[d.getMonth()], hora: `${d.getHours()}h` };
}

export const PulsoVivo = forwardRef<HTMLElement>(function PulsoVivo(_props, ref) {
  const [lives, setLives] = useState<any[]>([]);
  const [livesLoading, setLivesLoading] = useState(true);
  const [interesseLives, setInteresseLives] = useState<Record<string, boolean>>({});
  const { announcements, isLoading: muralLoading } = useAnnouncements();

  useEffect(() => {
    let cancelled = false;
    async function loadLives() {
      try {
        const { data, error } = await supabase.from("events").select("*").in("status", ["published", "live"]).gte("starts_at", new Date().toISOString()).order("starts_at", { ascending: true }).limit(10);
        if (error) throw error;
        if (!cancelled && data) {
          const communityIds = [...new Set(data.map((e: any) => e.community_id).filter(Boolean))];
          const hostIds = [...new Set(data.map((e: any) => e.host_id).filter(Boolean))];
          const [commResult, hostResult] = await Promise.all([
            communityIds.length > 0 ? supabase.from("communities").select("id, name").in("id", communityIds) : { data: [] },
            hostIds.length > 0 ? supabase.from("users").select("id, name").in("id", hostIds) : { data: [] },
          ]);
          const commMap: Record<string, string> = {}; (commResult.data || []).forEach((c: any) => { commMap[c.id] = c.name; });
          const hostMap: Record<string, string> = {}; (hostResult.data || []).forEach((h: any) => { hostMap[h.id] = h.name; });
          setLives(data.map((e: any) => ({ ...e, community_name: commMap[e.community_id] || null, host_name: hostMap[e.host_id] || "Mila" })));
        }
      } catch { /* fallback silencioso */ }
      finally { if (!cancelled) setLivesLoading(false); }
    }
    loadLives();
    return () => { cancelled = true; };
  }, []);

  const muralItems = announcements.length > 0
    ? announcements.map((a: Announcement) => ({ id: a.id, texto: a.content || a.title, tipo: a.announcement_type === "urgent" ? "destaque" : "info" }))
    : FALLBACK_AVISOS;

  return (
    <section ref={ref} className="w-full py-10 md:py-16 relative overflow-hidden" style={{ background: "#D4D4D4" }}>
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#1A1A1A] rounded-full mb-5 shadow-lg">
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Radio className="h-5 w-5 text-[#C8102E]" /></motion.div>
            <span className="text-sm text-white tracking-wider uppercase" style={{ fontWeight: 700 }}>Acontecendo agora</span>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-[#C8102E] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-2" style={{ fontWeight: 700 }}>Isso aqui e <span className="text-[#C8102E]">vivo</span></h2>
          <p className="text-base text-[#555] max-w-xl mx-auto">Lives confirmadas, desafios, perguntas e avisos. Tudo real.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs text-[#1A1A1A] uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontWeight: 700 }}><Video className="h-4 w-4 text-[#C8102E]" />Lives & Eventos</h3>
            {livesLoading ? (
              <div className="bg-white border-2 border-[#1A1A1A]/10 rounded-2xl p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-[#C8102E] mb-3" /><p className="text-sm text-[#999]">Carregando agenda...</p></div>
            ) : lives.length === 0 ? (
              <div className="bg-white border-2 border-[#1A1A1A]/10 rounded-2xl p-8 text-center"><Video className="h-10 w-10 text-[#CCC] mx-auto mb-3" /><p className="text-sm text-[#999]">Nenhum evento agendado no momento.</p></div>
            ) : (
              <div className="space-y-3">
                {lives.map((live: any, idx: number) => {
                  const dt = formatDate(live.starts_at);
                  const temInteresse = interesseLives[live.id];
                  return (
                    <motion.div key={live.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.08 }} className="bg-white border-2 border-[#1A1A1A]/10 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex gap-4">
                        <div className={`flex-shrink-0 w-16 md:w-20 text-center rounded-xl p-2 md:p-3 ${idx === 0 ? "bg-[#1A1A1A]" : "bg-[#EBEBEB]"}`}>
                          <span className={`block text-xl md:text-2xl ${idx === 0 ? "text-white" : "text-[#1A1A1A]"}`} style={{ fontWeight: 700 }}>{dt.dia}</span>
                          <span className={`block text-[10px] uppercase tracking-wider ${idx === 0 ? "text-[#C8102E]" : "text-[#999]"}`} style={{ fontWeight: 600 }}>{dt.mes}</span>
                          <span className={`block text-xs mt-0.5 ${idx === 0 ? "text-white/70" : "text-[#999]"}`} style={{ fontWeight: 600 }}>{dt.hora}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#C8102E] text-white rounded-full" style={{ fontWeight: 700 }}>LIVE</span>
                            {live.status === "live" && <span className="text-[10px] uppercase px-2 py-0.5 bg-[#C8102E] text-white rounded-full animate-pulse" style={{ fontWeight: 700 }}>AO VIVO</span>}
                          </div>
                          <h4 className="text-[#1A1A1A] text-base md:text-lg mb-1" style={{ fontWeight: 600 }}>{live.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-[#666] mb-2 flex-wrap">
                            {live.community_name && <span>Comunidade: <span className="text-[#1A1A1A]" style={{ fontWeight: 600 }}>{live.community_name}</span></span>}
                            <span className="text-[#999]">Host: {live.host_name}</span>
                          </div>
                          <motion.button onClick={() => setInteresseLives(prev => ({ ...prev, [live.id]: !prev[live.id] }))} whileTap={{ scale: 0.95 }} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${temInteresse ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#555] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/30"}`} style={{ fontWeight: 600 }}>
                            {temInteresse ? <><Check className="h-3 w-3" /> Tenho interesse!</> : <><Heart className="h-3 w-3" /> Quero participar</>}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center"><Megaphone className="h-4 w-4 text-white" /></div><h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Mural de Avisos</h3></div>
              {muralLoading ? <Loader2 className="h-4 w-4 animate-spin text-white/40" /> : (
                <div className="space-y-3">
                  {muralItems.map((aviso: any) => (
                    <div key={aviso.id} className="flex items-start gap-2.5">
                      <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0" style={{ color: aviso.tipo === "destaque" ? "#C8102E" : aviso.tipo === "evento" ? "#FF6B35" : "#81D8D0" }} />
                      <p className={`text-sm leading-relaxed ${aviso.tipo === "destaque" ? "text-white" : "text-white/70"}`} style={aviso.tipo === "destaque" ? { fontWeight: 600 } : {}}>{aviso.texto}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border-2 border-[#C8102E]/25 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-[#C8102E]/15 flex items-center justify-center border border-[#C8102E]/20"><Flame className="h-4 w-4 text-[#C8102E]" /></div><div><h3 className="text-[#1A1A1A] text-sm" style={{ fontWeight: 700 }}>{DESAFIO.titulo}</h3><span className="text-[10px] text-[#C8102E]/60 uppercase tracking-wider">{DESAFIO.tag}</span></div></div>
              <p className="text-[#333] text-sm leading-relaxed italic">"{DESAFIO.texto}"</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border-2 border-[#81D8D0]/25 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-[#81D8D0]/20 flex items-center justify-center border border-[#81D8D0]/30"><MessageCircleQuestion className="h-4 w-4 text-[#0A8F85]" /></div><h3 className="text-[#1A1A1A] text-sm" style={{ fontWeight: 700 }}>{PERGUNTA.titulo}</h3></div>
              <p className="text-[#333] text-sm leading-relaxed italic mb-2">"{PERGUNTA.texto}"</p>
              <span className="text-xs text-[#0A8F85]/60">— {PERGUNTA.autor}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});
