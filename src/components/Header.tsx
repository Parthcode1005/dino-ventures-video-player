import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, Cast, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = React.memo(
  ({ searchQuery, onSearchChange }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isSearchOpen) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [isSearchOpen]);

    const openSearch = useCallback(() => setIsSearchOpen(true), []);

    const closeSearch = useCallback(() => {
      setIsSearchOpen(false);
      onSearchChange("");
    }, [onSearchChange]);

    const handleClear = useCallback(() => {
      onSearchChange("");
      inputRef.current?.focus();
    }, [onSearchChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") closeSearch();
      },
      [closeSearch],
    );

    return (
      <header className="glass h-[52px] flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 border-b border-white/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSearchOpen ? (
            <motion.div
              key="search-bar"
              className="flex items-center gap-2 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}>
              <Search size={18} className="text-text-secondary shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search videos..."
                className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-secondary/50 outline-none caret-accent"
                aria-label="Search videos"
              />
              {searchQuery.length > 0 && (
                <button
                  className="size-7 flex items-center justify-center text-text-secondary rounded-full transition-colors duration-150 hover:bg-white/10 shrink-0"
                  onClick={handleClear}
                  aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
              <button
                className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors duration-150 shrink-0 px-1"
                onClick={closeSearch}
                aria-label="Close search">
                Cancel
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="header-default"
              className="flex items-center justify-between w-full"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-xl font-bold tracking-tight">
                  <span className="text-accent">Dino</span>
                  <span className="text-text-primary">Ventures</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="size-9 flex items-center justify-center text-white rounded-full transition-colors duration-150 hover:bg-white/8"
                  aria-label="Search"
                  onClick={openSearch}>
                  <Search size={20} />
                </button>
                <button
                  className="hidden md:flex size-9 items-center justify-center text-white rounded-full transition-colors duration-150 hover:bg-white/8"
                  aria-label="Cast">
                  <Cast size={20} />
                </button>
                <button
                  className="size-[30px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white"
                  aria-label="Profile">
                  <User size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  },
);

Header.displayName = "Header";

export default Header;
