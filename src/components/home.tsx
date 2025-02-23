import { useLanguage } from "@/lib/i18n/LanguageContext";
import Header from "./Header";
import SearchSection from "./SearchSection";
import CategoryGrid from "./CategoryGrid";
import FeaturedListings from "./FeaturedListings";

interface HomePageProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onPostAd?: () => void;
  onLanguageChange?: (lang: "en" | "ar") => void;
  onSearch?: (searchParams: {
    query: string;
    category: string;
    location: string;
  }) => void;
  onCategoryClick?: (category: any) => void;
}

const HomePage = ({
  isLoggedIn = false,
  username = "Guest User",
  onLogin = () => {},
  onRegister = () => {},
  onPostAd = () => {},
  onLanguageChange = () => {},
  onSearch = () => {},
  onCategoryClick = () => {},
}: HomePageProps) => {
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={onLogin}
        onRegister={onRegister}
        onPostAd={onPostAd}
        onLanguageChange={onLanguageChange}
      />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Search Section */}
          <section className="flex justify-center">
            <SearchSection onSearch={onSearch} />
          </section>

          {/* Categories Section */}
          <section>
            <CategoryGrid onCategoryClick={onCategoryClick} />
          </section>

          {/* Featured Listings Section */}
          <section>
            <FeaturedListings />
          </section>
        </div>
      </main>

      {/* Footer could be added here */}
    </div>
  );
};

export default HomePage;
