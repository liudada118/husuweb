import { Outlet, Link } from "react-router";
import { Menu, X, Hexagon, Globe } from "lucide-react";
import { useState, createContext, useContext } from "react";

type Language = 'en' | 'zh';

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "HOME",
    about: "ABOUT US",
    industries: "INDUSTRIES",
    team: "OUR TEAM",
    vision: "VISION",
    events: "EVENTS",
    contact: "Contact Us",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookie: "Cookie Policy",
    accessibility: "Accessibility Statement",
    slogan: "Pioneering the future of global industries through innovative solutions, unwavering dedication, and unparalleled strategic expertise.",
    copyright: `© ${new Date().getFullYear()} AuraCorp International. All rights reserved.`,
    footerSlogan: "Refined Precision. Infinite Possibilities.",
  },
  zh: {
    home: "首页",
    about: "关于我们",
    industries: "核心业务",
    team: "专业团队",
    vision: "企业愿景",
    events: "最新动态",
    contact: "联系我们",
    legal: "法律声明",
    privacy: "隐私政策",
    terms: "服务条款",
    cookie: "Cookie政策",
    accessibility: "无障碍声明",
    slogan: "通过创新的解决方案、坚定不移的奉献精神和无与伦比的战略专长，引领全球工业的未来。",
    copyright: `© ${new Date().getFullYear()} AuraCorp 跨国集团 版权所有.`,
    footerSlogan: "极致精准。无限可能。",
  }
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function Layout() {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');
  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <LayoutContent />
    </LanguageContext.Provider>
  );
}

function LayoutContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-gray-300 font-sans selection:bg-[#E5E5E5] selection:text-[#09090B]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#141414]/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Hexagon className="w-8 h-8 text-[#E5E5E5] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            <span className="text-xl font-light tracking-[0.2em] text-white">
              AURA<span className="font-semibold text-[#E5E5E5]">CORP</span>
            </span>
          </Link>

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-10 text-xs font-semibold tracking-[0.15em] uppercase">
              <Link to="/" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('home')}</Link>
              <Link to="/about" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('about')}</Link>
              <Link to="/industries" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('industries')}</Link>
              <Link to="/team" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('team')}</Link>
              <a href="/#vision" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('vision')}</a>
              <Link to="/events" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('events')}</Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300">{t('contact')}</Link>
            </nav>
            
            {/* Divider */}
            <div className="w-[1px] h-4 bg-white/20"></div>
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300 uppercase cursor-pointer group"
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" strokeWidth={1.5} />
              <span className={lang === 'en' ? 'text-[#E5E5E5]' : ''}>EN</span>
              <span className="text-white/20">/</span>
              <span className={lang === 'zh' ? 'text-[#E5E5E5]' : ''}>中</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            {/* Language Toggle Mobile */}
            <button 
              onClick={toggleLang}
              className="p-2 text-gray-400 hover:text-[#E5E5E5] transition-colors flex items-center"
            >
              <Globe className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs ml-1 font-semibold">{lang === 'en' ? 'EN' : '中'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-gray-300 hover:text-[#E5E5E5] transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1A1A1A] border-t border-white/5 py-6 px-6 flex flex-col gap-6 shadow-2xl absolute w-full">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('home')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('about')}</Link>
            <Link to="/industries" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('industries')}</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('team')}</Link>
            <a href="/#vision" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('vision')}</a>
            <Link to="/events" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('events')}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest text-gray-400 hover:text-[#E5E5E5] uppercase">{t('contact')}</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#09090B] text-white pt-20 pb-10 border-t border-[#E5E5E5]/20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5]/50 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <Hexagon className="w-8 h-8 text-[#E5E5E5]" strokeWidth={1.5} />
                <span className="text-xl font-light tracking-[0.2em] text-white">
                  AURA<span className="font-semibold text-[#E5E5E5]">CORP</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
                {t('slogan')}
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-white text-xs font-semibold tracking-[0.2em] mb-8 uppercase">{t('contact')}</h4>
              <ul className="text-gray-400 space-y-4 text-sm font-light">
                <li>1234 Global Business Blvd.</li>
                <li>Innovation City, IC 90210</li>
                <li className="pt-4 hover:text-[#E5E5E5] transition-colors duration-300"><a href="mailto:contact@auracorp.com">contact@auracorp.com</a></li>
                <li className="hover:text-[#E5E5E5] transition-colors duration-300"><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white text-xs font-semibold tracking-[0.2em] mb-8 uppercase">{t('legal')}</h4>
              <ul className="text-gray-400 space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-[#E5E5E5] transition-colors duration-300">{t('privacy')}</a></li>
                <li><a href="#" className="hover:text-[#E5E5E5] transition-colors duration-300">{t('terms')}</a></li>
                <li><a href="#" className="hover:text-[#E5E5E5] transition-colors duration-300">{t('cookie')}</a></li>
                <li><a href="#" className="hover:text-[#E5E5E5] transition-colors duration-300">{t('accessibility')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light tracking-wider">
            <p>{t('copyright')}</p>
            <p className="mt-4 md:mt-0">{t('footerSlogan')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
