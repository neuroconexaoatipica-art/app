import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[NeuroConexao] Erro capturado pelo ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleClearAndReload = () => {
    // Limpar sessionStorage e cache, mas manter a sessão do Supabase
    try {
      sessionStorage.clear();
    } catch {}
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleCopyError = () => {
    const { error, errorInfo } = this.state;
    const errorText = [
      `[NeuroConexao ErrorBoundary]`,
      `Data: ${new Date().toISOString()}`,
      `URL: ${window.location.href}`,
      `UserAgent: ${navigator.userAgent}`,
      ``,
      `Erro: ${error?.message || 'desconhecido'}`,
      `Stack: ${error?.stack || 'sem stack'}`,
      ``,
      `Component Stack: ${errorInfo?.componentStack || 'sem info'}`,
    ].join('\n');
    
    navigator.clipboard.writeText(errorText).then(() => {
      alert('Erro copiado! Cole na conversa com o assistente para eu analisar.');
    }).catch(() => {
      // Fallback: criar textarea temporario
      const ta = document.createElement('textarea');
      ta.value = errorText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('Erro copiado!');
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#C8102E]/20 border-2 border-[#C8102E]/40 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-3">
              Algo deu errado
            </h1>
            <p className="text-base text-white/70 mb-6 leading-relaxed">
              Pedimos desculpas pelo inconveniente. Um erro inesperado aconteceu. 
              Tente recarregar a pagina.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full px-8 py-3 bg-[#81D8D0] text-black rounded-xl font-bold hover:bg-[#81D8D0]/90 transition-colors"
              >
                Recarregar pagina
              </button>
              <button
                onClick={this.handleClearAndReload}
                className="w-full px-8 py-3 bg-white/10 text-white/70 rounded-xl font-medium hover:bg-white/15 transition-colors text-sm"
              >
                Limpar cache e ir para inicio
              </button>
            </div>
            {this.state.error && (
              <div className="mt-6 text-left">
                <details>
                  <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                    Detalhes tecnicos
                  </summary>
                  <pre className="mt-2 p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50 overflow-auto max-h-40 whitespace-pre-wrap">
                    {this.state.error.message}
                    {this.state.error.stack && '\n\n' + this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                  </pre>
                  <button
                    onClick={this.handleCopyError}
                    className="mt-2 w-full px-4 py-2 bg-[#C8102E]/20 text-[#C8102E] rounded-lg text-xs font-semibold hover:bg-[#C8102E]/30 transition-colors"
                  >
                    Copiar erro para suporte
                  </button>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}