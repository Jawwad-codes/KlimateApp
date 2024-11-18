import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { CitySearch } from "./citySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isdark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop:blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isdark ? "/logo.png" : "/logo2.png"}
            alt="Logo"
            className="h-14"
          />
        </Link>
        <div className="flex items-center justify-between gap-12">
          <div>
            <CitySearch />
          </div>

          {/* Theme toggle button */}
          <div
            onClick={() => setTheme(isdark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500
            ${isdark ? "rotate-180" : "rotate-0"}`}
          >
            {isdark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>

          {/* Search on the right */}
        </div>
      </div>
    </header>
  );
};

export default Header;
