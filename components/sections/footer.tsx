export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-[#0f0f0f] border-t border-gold/10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-foreground/50 text-xs md:text-sm leading-relaxed mb-4">
          Este produto tem caráter informativo. Consulte um profissional de saúde antes de iniciar qualquer programa de treino.
        </p>
        <p className="text-foreground/40 text-xs">
          © {currentYear} Heavy Duty Method. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
