import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe, Plus, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onPostAd?: () => void;
  onLanguageChange?: (lang: "en" | "ar") => void;
}

const Header = ({
  isLoggedIn = false,
  username = "Guest User",
  onLogin = () => {},
  onRegister = () => {},
  onPostAd = () => {},
  onLanguageChange = () => {},
}: HeaderProps) => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <header className="w-full h-[72px] bg-white border-b border-border shadow-sm px-4 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">OpenSooq</h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Post Ad Button */}
          <Button onClick={onPostAd} className="hidden sm:flex">
            <Plus className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
            {t("header.postAd")}
          </Button>

          {/* Auth Controls */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t("header.myAds")}</DropdownMenuItem>
                <DropdownMenuItem>{t("header.settings")}</DropdownMenuItem>
                <DropdownMenuItem>{t("header.logout")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={onLogin}>
                {t("header.login")}
              </Button>
              <Button
                variant="secondary"
                onClick={onRegister}
                className="hidden sm:flex"
              >
                {t("header.register")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
