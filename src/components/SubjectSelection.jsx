import { TreePine, Globe } from 'lucide-react';

export function SubjectSelection({ onSelect }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-12 w-full flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8 sm:mb-16 animate-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main,#fff)] via-[var(--neon-blue)] to-[var(--neon-cyan)] drop-shadow-sm">
          Select Your Subject
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted,#94a3b8)] font-medium max-w-xl mx-auto flex items-center justify-center gap-2">
          Choose a module below to begin practicing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-3xl">
        {/* Forest Management Card */}
        <button
          onClick={() => onSelect('forest')}
          className="glass-panel group relative overflow-hidden flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(16,185,129,0.2)] animate-in slide-in-from-left-8 duration-500 delay-150 border-[var(--border-color)] hover:border-[var(--neon-green)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="p-5 bg-[var(--neon-green)]/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 ring-1 ring-[var(--neon-green)]/30 group-hover:ring-[var(--neon-green)]/50">
            <TreePine className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--neon-green)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text-main,#f8fafc)] group-hover:text-[var(--neon-green)] transition-colors">
            Forests and their Management
          </h2>

        </button>

        {/* Education for Sustainable Development Card */}
        <button
          onClick={() => onSelect('education')}
          className="glass-panel group relative overflow-hidden flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(34,211,238,0.2)] animate-in slide-in-from-right-8 duration-500 delay-300 border-[var(--border-color)] hover:border-[var(--neon-cyan)]"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-[var(--neon-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="p-5 bg-[var(--neon-cyan)]/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 ring-1 ring-[var(--neon-cyan)]/30 group-hover:ring-[var(--neon-cyan)]/50">
            <Globe className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--neon-cyan)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text-main,#f8fafc)] group-hover:text-[var(--neon-cyan)] transition-colors">
            Education for Sustainable Development
          </h2>
        </button>
      </div>
    </div>
  );
}
