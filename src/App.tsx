import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ListingsPage from "./components/ListingsPage";
import ListingDetails from "./components/ListingDetails";
import routes from "tempo-routes";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<ListingsPage />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
