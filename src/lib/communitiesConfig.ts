import {
  Scale, Eye, BrainCircuit, Flame, Link, Handshake, Activity,
  Puzzle, Zap, UsersRound, Briefcase, PenTool, Landmark, Users, Circle,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface CommunityConfig {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  category: 'core' | 'social' | 'neuro' | 'build';
  starters?: string[];
}

export const FALLBACK_ICON = Circle;

export const COMMUNITIES_CONFIG: CommunityConfig[] = [
  { name: "Campo Etico", description: "Filosofia aplicada, dilemas morais, decisoes dificeis.", icon: Scale, color: "#8B0000", category: "core" },
  { name: "Observatorio Social", description: "Critica cultural, analise de narrativas, desmontagem de discursos.", icon: Eye, color: "#1F2937", category: "core" },
  { name: "Mentes em Tensao", description: "Pensamento vivo e intenso. Ideias que nao descansam.", icon: BrainCircuit, color: "#4B0082", category: "core" },
  { name: "Corpo & Prazer", description: "Experiencia corporal e prazer. O corpo como territorio de presenca.", icon: Flame, color: "#3B0A0A", category: "social" },
  { name: "Sexo, Desejo & Vinculo", description: "Sexo, desejo e relacoes entre adultos. Escolhas explicitas, acordos claros.", icon: Link, color: "#2E1065", category: "social" },
  { name: "Relacoes & Vinculos", description: "Amizades, relacionamentos, familia. Conexoes no mundo real.", icon: Handshake, color: "#6B21A8", category: "social" },
  { name: "Corpo & Sensorialidade", description: "Hipersensibilidade, percepcao corporal, limites fisicos.", icon: Activity, color: "#374151", category: "social" },
  { name: "Autismo & Masking", description: "Mascaramento, exaustao social, identidade autistica.", icon: Puzzle, color: "#0F172A", category: "neuro" },
  { name: "TDAH & Produtividade", description: "Foco, dispersao, sistemas reais.", icon: Zap, color: "#1E3A8A", category: "neuro" },
  { name: "Ansiedade Social", description: "Interacoes sociais, limites, exaustao relacional.", icon: UsersRound, color: "#111827", category: "neuro" },
  { name: "Networking Atipico", description: "Relacoes profissionais sem verniz corporativo.", icon: Briefcase, color: "#92400E", category: "build" },
  { name: "Lab de Criacao", description: "Projetos, escrita, arte, experimentacao.", icon: PenTool, color: "#065F46", category: "build" },
  { name: "Bastidores da Governanca", description: "Transparencia, decisoes estruturais, regras.", icon: Landmark, color: "#7C2D12", category: "build" },
  { name: "Circulo de Pares", description: "Apoio horizontal. Escuta ativa. Sem hierarquia terapeutica.", icon: Users, color: "#334155", category: "core" },
];

export const COMMUNITY_BY_NAME: Record<string, CommunityConfig> = {};
COMMUNITIES_CONFIG.forEach(c => { COMMUNITY_BY_NAME[c.name] = c; });
