import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenuToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const menu = document.getElementById('mobile-nav');
    if (!menu) return;
    menu.classList.toggle('hidden', !open);
    menu.setAttribute('aria-hidden', String(!open));
  }, [open]);

  return (
    <button
      type="button"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
      aria-controls="mobile-nav"
      onClick={() => setOpen((v) => !v)}
      className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
    >
      {open ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
