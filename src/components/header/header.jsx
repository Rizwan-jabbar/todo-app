import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") setShowMenu(false);
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Prevent background scroll when drawer is open (mobile)
  useEffect(() => {
    if (!showMenu) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const NavItem = ({ children }) => (
    <li>
      <button
        type="button"
        className="w-full lg:w-auto text-left lg:text-center rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
      >
        {children}
      </button>
    </li>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm" />
            <div className="min-w-0">
              <p className="text-sm font-extrabold tracking-tight text-gray-900 truncate">
                My Todo App
              </p>
              <p className="text-xs text-gray-500 truncate">
                Organize. Focus. Finish.
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <NavItem>Home</NavItem>
              <NavItem>My Todos</NavItem>
              <NavItem>About</NavItem>
              <NavItem>Contact</NavItem>
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Profile dropdown (desktop) */}
            {/* Profile dropdown (desktop) */}
            <div className="relative hidden lg:block group">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <FaUserCircle size={22} className="text-gray-700 group-hover:text-gray-900" />
                <span className="ml-2">Account</span>
              </button>

              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-200 bg-white shadow-lg opacity-0 invisible translate-y-1
    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
    transition-all duration-200"
              >
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Hamburger (mobile) */}
            <div ref={hamburgerRef} className="lg:hidden">
              <button
                type="button"
                onClick={() => setShowMenu((s) => !s)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                aria-label="Open menu"
                aria-expanded={showMenu}
              >
                <GiHamburgerMenu size={22} className="text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/30 transition-opacity ${showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setShowMenu(false)}
      />

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-dvh w-[85%] max-w-sm bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 ease-out ${showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm" />
            <div>
              <p className="text-sm font-extrabold text-gray-900">Menu</p>
              <p className="text-xs text-gray-500">Quick navigation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMenu(false)}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
            aria-label="Close menu"
          >
            <FaTimes className="text-gray-800" />
          </button>
        </div>

        <div className="px-4 py-4">
          <ul ref={menuRef} className="flex flex-col gap-1">
            <NavItem>Home</NavItem>
            <NavItem>My Todos</NavItem>
            <NavItem>About</NavItem>
            <NavItem>Contact</NavItem>

            <li className="mt-2 pt-3 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>

          <p className="mt-6 text-xs text-gray-400">
            Tip: Press <span className="font-semibold">Esc</span> to close.
          </p>
        </div>
      </aside>
    </header>
  );
}

export default Header;