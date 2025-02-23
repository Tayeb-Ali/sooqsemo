import React from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export function StoryWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
