const links = ["Home", "About", "Services", "Leadership", "Contact"];

/** Transparent nav meant to sit over a photo hero. Move into layout.tsx once more pages exist. */
export function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <span className="font-serif text-2xl font-medium text-cream">Avira</span>
      <ul className="hidden gap-10 sm:flex">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/80 transition-colors hover:text-cream"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
