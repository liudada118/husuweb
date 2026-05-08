export function Header() {
  const navItems = ["Home", "About", "Awards", "Cases", "Media", "Contact"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10"
      style={{
        height: "80px",
        backgroundColor: "#030604",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: "#FFFFFF",
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontFamily: "serif",
        }}
      >
        大学长
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = item === "Awards";
          return (
            <a
              key={item}
              href="#"
              className="relative transition-colors duration-200"
              style={{
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? "#D6B36A" : "#A0A0A0",
                textDecoration: "none",
                paddingBottom: isActive ? "4px" : "0",
                borderBottom: isActive ? "1px solid #D6B36A" : "none",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
