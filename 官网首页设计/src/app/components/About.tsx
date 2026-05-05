import React, { useState } from "react";
import Slider from "react-slick";
import { Hexagon, Quote, ChevronDown } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";

const heroImages = [
  "https://images.unsplash.com/photo-1554478416-6061b7e29d52?q=80&w=1920", // modern office
  "https://images.unsplash.com/photo-1676276383603-adaf8967f71f?q=80&w=1920", // corporate values
  "https://images.unsplash.com/photo-1758518727929-4506fc031e1c?q=80&w=1920", // team
];

const translations = {
  en: {
    heroTitle: "About Us",
    visionHeader: "Vision",
    visionP1: "At our core, we envision a future where sophisticated design seamlessly intersects with uncompromising functional utility. Our mission is not merely to participate in the global market, but to fundamentally elevate it. We believe that true progress is born from a meticulous attention to detail and a profound understanding of the complex ecosystems our clients navigate every day.",
    visionP2: "By embracing the nuanced spaces between aggressive innovation and timeless reliability, we build enduring legacies. Every strategic decision, every technological integration, and every partnership we forge is guided by an unwavering commitment to excellence. We are not just anticipating the world of tomorrow—we are actively, purposefully architecting it.",
    milestones: "Milestones",
    honorsTitle: "Honors & Awards",
    honorsSubtitle: "A detailed chronology of our most significant global recognitions and strategic achievements.",
    awardsWon: "Awards Won",
    distinctions: "Distinctions",
    closeDir: "Close Directory",
    viewDir: "View Directory",
    viewAward: "View Award",
    ethos: "Core Ethos",
    cultureTitle: "Culture",
    cultureP1: "Our culture is forged in the crucible of relentless refinement. We operate under a singular, uncompromising mandate: to distill complexity into elegance. Within these walls, innovation is not a buzzword; it is a rigorous discipline. Every team member, from the architectural drafting tables to the executive boardrooms, is united by an obsessive attention to detail and a profound respect for the craft. We reject the superficial in favor of the substantive, prioritizing deep structural integrity over fleeting trends.",
    cultureP2: "We believe that true brilliance is rarely loud. It is found in the quiet, precise calibration of a system perfectly tuned to its environment. This philosophy extends to how we collaborate. We foster an environment of radical transparency and intellectual rigor, where every idea is subjected to intense scrutiny, ensuring that only the most robust and elegant solutions survive. It is a demanding environment, yes, but one that cultivates mastery and produces work of enduring significance.",
    cultureP3: "Beyond the metrics and the milestones, our cultural bedrock is built on a profound sense of responsibility. We recognize that the systems we design shape the realities of millions. Therefore, our commitment to ethical architecture, sustainable practices, and the long-term well-being of the communities we serve is not secondary to our business objectives—it is the very foundation upon which they rest. We do not merely build; we steward the future.",
    collapse: "Collapse Manifesto",
    readFull: "Read Full Manifesto",
    evolution: "Evolution",
    chronicleTitle: "Chronicle",
    chronicleSubtitle: "A detailed historical timeline mapping our trajectory from foundational concepts to global vanguards.",
    honorsData: [
      {
        year: "2025",
        awards: [
          { title: "Global Industry Vanguard Award", description: "Awarded by the International Corporate Excellence Board, this prestigious honor recognizes our unwavering commitment to sustainable growth and our unparalleled capacity to reshape traditional market dynamics. Evaluators highlighted our pioneering structural frameworks that reduced global operational inefficiencies by over 40% within a single fiscal year." },
          { title: "Digital Transformation Leader", description: "Recognized for spearheading the integration of advanced AI analytics into enterprise logistics, resulting in an unprecedented leap in predictive supply chain capabilities." }
        ]
      },
      {
        year: "2024",
        awards: [
          { title: "Eco-Innovation Certification (Platinum)", description: "Achieved the highest tier of environmental stewardship. This distinction is strictly reserved for organizations that not only meet but exceed global carbon-neutral mandates. Our complete overhaul of enterprise logistics to a 100% renewable-powered model set a new benchmark for the sector." },
          { title: "Design & Architecture Excellence", description: "Awarded for our groundbreaking work in constructing modular, sustainable corporate headquarters that adapt to hybrid workforce requirements seamlessly." },
          { title: "Top 50 Workplaces for Innovators", description: "Selected from over 1,000 global entities for fostering an internal culture that empowers rapid prototyping and rewards disruptive thinking." }
        ]
      },
      {
        year: "2023",
        awards: [
          { title: "Excellence in Human Capital Development", description: "In recognition of our internal growth initiatives, this award celebrates our robust, forward-thinking approach to employee wellness and skill acceleration. By implementing a global cross-training matrix, we cultivated a leadership pipeline that organically filled 90% of our executive vacancies." }
        ]
      },
      {
        year: "2022",
        awards: [
          { title: "Strategic Partnership of the Year", description: "Conferred at the World Economic Summit, recognizing our monumental joint venture with leading tech conglomerates to securely digitize public sector records across three continents. The project was lauded for its seamless integration, uncompromising data security, and flawless execution." },
          { title: "Global Security First Award", description: "Awarded for implementing zero-trust architectures across our international data centers months ahead of industry compliance deadlines." }
        ]
      }
    ],
    chronicleData: [
      {
        year: "2026",
        months: [
          { month: "October", title: "Vanguard Era", description: "Recognized as the foremost leader in structural frameworks. Continuing to architect the future with unparalleled precision and vision, solidifying our global market position." },
          { month: "March", title: "Global Summit", description: "Hosted the premier international summit on sustainable corporate infrastructure, setting new industry standards for modular architecture." }
        ]
      },
      {
        year: "2024",
        months: [
          { month: "November", title: "Sustainable Horizon", description: "Committed to 100% carbon-neutral operations. Overhauled the global supply chain network, receiving top-tier eco-innovation certifications." },
          { month: "July", title: "The Paradigm Shift", description: "Launched the next-generation AI analytics suite. Achieved a milestone of 10 million daily active processes, solidifying market dominance." },
          { month: "February", title: "Strategic Acquisition", description: "Acquired a leading modular design firm to expand our structural engineering capabilities across emerging markets in South America." }
        ]
      },
      {
        year: "2022",
        months: [
          { month: "September", title: "Global Expansion", description: "Opened offices in London, Singapore, and Tokyo. The first iteration of our signature cloud logistics platform was successfully deployed to critical acclaim." },
          { month: "April", title: "Foundation", description: "Established the core architectural framework and secured initial seed funding. The vision was set to redefine enterprise-level modularity." }
        ]
      }
    ]
  },
  zh: {
    heroTitle: "关于我们",
    visionHeader: "企业愿景",
    visionP1: "在我们的核心理念中，我们构想了一个精妙设计与极致实用性无缝交融的未来。我们的使命不仅仅是参与全球市场，而是从根本上提升它。我们相信，真正的进步源于对细节的一丝不苟，以及对客户日常所处的复杂生态系统的深刻理解。",
    visionP2: "通过拥抱激进创新与永恒可靠性之间的微妙平衡，我们铸就了不朽的传承。我们的每一个战略决策、每一次技术整合、以及每一个建立的合作伙伴关系，都以对卓越的坚定承诺为指导。我们不仅仅是在预见明天的世界——我们正在积极、有目的地构建它。",
    milestones: "里程碑",
    honorsTitle: "荣誉与奖项",
    honorsSubtitle: "详细记录了我们最重要的全球性认可与战略成就。",
    awardsWon: "所获奖项",
    distinctions: "项殊荣",
    closeDir: "收起目录",
    viewDir: "查看目录",
    viewAward: "查看详情",
    ethos: "核心精神",
    cultureTitle: "企业文化",
    cultureP1: "我们的文化在不懈追求完美的熔炉中锻造而成。我们遵循一个单一且不妥协的原则：将复杂化为优雅。在这里，创新不是一句空话；它是一种严格的纪律。从建筑制图桌到高管会议室，每一位团队成员都因为对细节的执着关注和对工艺的深切尊重而团结一致。我们摒弃肤浅，追求实质，将深层的结构完整性置于短暂的趋势之上。",
    cultureP2: "我们相信真正的辉煌鲜有喧哗。它存在于一个与环境完美契合的系统的安静、精准的校准之中。这种哲学延伸到了我们的合作方式上。我们培养了一种极度透明和思想严谨的环境，每一个想法都要接受严格的审查，以确保只有最稳健和优雅的解决方案能够脱颖而出。这是一个要求极高的环境，但这正是培养精通并产出具有持久意义作品的土壤。",
    cultureP3: "超越指标和里程碑，我们的文化基石建立在深厚的责任感之上。我们认识到我们设计的系统塑造了数百万人的现实。因此，我们对伦理架构、可持续实践以及我们所服务社区的长期福祉的承诺并不是我们商业目标的次要附属品——它们是我们立足的基石。我们不仅在建设，我们还在守护未来。",
    collapse: "收起宣言",
    readFull: "阅读完整宣言",
    evolution: "发展历程",
    chronicleTitle: "历史篇章",
    chronicleSubtitle: "一份详尽的历史时间轴，描绘了我们从奠基概念走向全球先锋的轨迹。",
    honorsData: [
      {
        year: "2025",
        awards: [
          { title: "全球行业先锋奖", description: "由国际企业卓越委员会颁发，这项殊荣表彰了我们对可持续增长的坚定承诺，以及我们重塑传统市场动态的无与伦比的能力。评估者强调了我们首创的结构框架，该框架在一个财政年度内将全球运营低效降低了 40% 以上。" },
          { title: "数字化转型领袖", description: "因率先将高级 AI 分析整合到企业物流中而受到表彰，从而在预测性供应链能力方面实现了前所未有的飞跃。" }
        ]
      },
      {
        year: "2024",
        awards: [
          { title: "生态创新认证（白金级）", description: "达到了环境管理的最高等级。该荣誉仅授予不仅满足而且超越全球碳中和任务的组织。我们将企业物流彻底转变为 100% 可再生能源模式，为该行业树立了新标杆。" },
          { title: "设计与建筑卓越奖", description: "因在构建模块化、可持续的企业总部方面的突破性工作而获奖，这些总部能够无缝适应混合劳动力的需求。" },
          { title: "创新者前 50 佳工作场所", description: "从 1,000 多家全球实体中脱颖而出，因培养了赋予快速原型设计能力并奖励颠覆性思维的内部文化而入选。" }
        ]
      },
      {
        year: "2023",
        awards: [
          { title: "卓越人力资本开发奖", description: "为表彰我们的内部增长计划，该奖项庆祝我们在员工健康和技能加速方面采取的强健、具有前瞻性的方法。通过实施全球交叉培训矩阵，我们培养了一个有机填补了我们 90% 高管空缺的领导力管道。" }
        ]
      },
      {
        year: "2022",
        awards: [
          { title: "年度战略合作伙伴关系", description: "在世界经济论坛上授予，表彰我们与领先科技集团的里程碑式合资企业，该合资企业安全地将三大洲的公共部门记录数字化。该项目因其无缝集成、毫不妥协的数据安全性和无瑕疵的执行而受到赞誉。" },
          { title: "全球安全第一奖", description: "因在我们的国际数据中心实施零信任架构而获奖，比行业合规截止日期提前了数月。" }
        ]
      }
    ],
    chronicleData: [
      {
        year: "2026",
        months: [
          { month: "10月", title: "先锋时代", description: "被公认为结构框架领域的最前沿领导者。继续以无与伦比的精准度和远见构建未来，巩固了我们的全球市场地位。" },
          { month: "3月", title: "全球峰会", description: "举办了关于可持续企业基础设施的首届国际峰会，为模块化建筑制定了新的行业标准。" }
        ]
      },
      {
        year: "2024",
        months: [
          { month: "11月", title: "可持续视野", description: "致力于 100% 碳中和运营。彻底改革了全球供应链网络，获得了顶级的生态创新认证。" },
          { month: "7月", title: "范式转移", description: "推出了下一代 AI 分析套件。达到了每日一千万活跃流程的里程碑，巩固了市场主导地位。" },
          { month: "2月", title: "战略收购", description: "收购了一家领先的模块化设计公司，以扩大我们在南美新兴市场的结构工程能力。" }
        ]
      },
      {
        year: "2022",
        months: [
          { month: "9月", title: "全球扩张", description: "在伦敦、新加坡和东京开设了办事处。我们标志性的云物流平台的第一个迭代版本成功部署并广受好评。" },
          { month: "4月", title: "奠基", description: "建立了核心架构框架并获得了初始种子资金。确立了重新定义企业级模块化的愿景。" }
        ]
      }
    ]
  }
};

export function About() {
  const [expandedYear, setExpandedYear] = useState<string | null>("2025");
  const [isCultureExpanded, setIsCultureExpanded] = useState(false);
  
  const { lang } = useLanguage();
  const t = translations[lang];

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-12 h-[2px] mx-2 bg-white/30 mt-[-60px] hover:bg-[#D9B27A] transition-colors duration-500 rounded-none cursor-pointer" />
    )
  };

  const toggleYear = (year: string) => {
    setExpandedYear(prev => prev === year ? null : year);
  };

  return (
    <div className="w-full bg-[#141414] selection:bg-[#E5E5E5] selection:text-[#18181B]">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[70vh] min-h-[500px] w-full bg-[#1A1A1A]">
        <Slider {...heroSettings} className="h-full w-full">
          {heroImages.map((url, idx) => (
            <div key={idx} className="relative h-[70vh] min-h-[500px] w-full outline-none">
              <div 
                className="absolute inset-0 bg-cover bg-center animate-kenburns grayscale opacity-80"
                style={{ backgroundImage: `url(${url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#141414] z-10 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h1 className="text-6xl md:text-8xl font-light text-white tracking-[0.2em] uppercase drop-shadow-lg">
                    {t.heroTitle}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 2. VISION */}
      <section className="py-32 bg-[#141414] relative overflow-hidden">
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-[#1A1A1A]/30 rounded-full blur-3xl mix-blend-multiply" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#E5E5E5]" />
              <Hexagon className="w-6 h-6 text-[#E5E5E5]" strokeWidth={1} />
              <div className="w-12 h-[1px] bg-[#E5E5E5]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.2em] uppercase">
              {t.visionHeader}
            </h2>
          </div>
          
          <div className="bg-[#1A1A1A] p-10 md:p-20 relative shadow-2xl">
            <Quote className="absolute top-10 left-10 w-24 h-24 text-[#E5E5E5]/10 -z-0 transform -scale-x-100" strokeWidth={0.5} />
            <div className="relative z-10">
              <p className="text-[#F4F4F5] text-xl md:text-2xl font-light leading-relaxed tracking-wide text-justify indent-12">
                {t.visionP1}
              </p>
              <br />
              <p className="text-[#F4F4F5] text-xl md:text-2xl font-light leading-relaxed tracking-wide text-justify indent-12">
                {t.visionP2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HONORS (Detailed Accordion) */}
      <section className="py-32 bg-[#1A1A1A] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5]/30 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs uppercase mb-4">{t.milestones}</h4>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase">
                {t.honorsTitle}
              </h2>
            </div>
            <p className="text-gray-400 max-w-md font-light text-lg leading-relaxed md:text-right border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
              {t.honorsSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            {t.honorsData.map((group) => {
              const isExpanded = expandedYear === group.year;
              
              return (
                <div key={group.year} className="bg-[#1A1A1A] shadow-xl overflow-hidden transition-all duration-700">
                  <button 
                    onClick={() => toggleYear(group.year)}
                    className="w-full flex items-center justify-between p-8 md:px-12 md:py-10 group/header border-b border-transparent hover:border-[#E5E5E5]/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-8">
                      <span className="text-4xl md:text-5xl font-light text-white tracking-wider">
                        {group.year}
                      </span>
                      <div className="hidden md:flex flex-col items-start border-l border-[#E5E5E5]/40 pl-8">
                        <span className="text-[#E5E5E5] font-semibold tracking-[0.15em] text-xs uppercase">{t.awardsWon}</span>
                        <span className="text-gray-300 font-light mt-1">{group.awards.length} {t.distinctions}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-gray-400 text-xs tracking-widest uppercase hidden sm:block">
                        {isExpanded ? t.closeDir : t.viewDir}
                      </span>
                      <div className={`w-12 h-12 rounded-full border border-[#E5E5E5]/40 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-[#E5E5E5] text-[#141414] rotate-180' : 'bg-transparent text-white group-hover/header:bg-[#E5E5E5] group-hover/header:text-[#141414]'}`}>
                        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                  </button>

                  <div 
                    className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-8 md:p-12 border-t border-white/10 bg-[#141414]/50 space-y-12">
                        {group.awards.map((honor, index) => (
                          <div 
                            key={index} 
                            className="group relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center"
                          >
                            <div className="relative z-10 flex-1 border-l-2 border-white/20 group-hover:border-[#E5E5E5] pl-6 transition-colors duration-500">
                              <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide mb-4">
                                {honor.title}
                              </h3>
                              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed text-justify">
                                {honor.description}
                              </p>
                            </div>
                            
                            <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0 flex justify-end pl-6 md:pl-0">
                              <button className="bg-transparent border border-[#E5E5E5]/50 text-[#E5E5E5] px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#E5E5E5] hover:text-[#141414] transition-all duration-500 flex items-center justify-center gap-4 group/btn w-full md:w-auto cursor-pointer">
                                {t.viewAward}
                                <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CULTURE */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#141414] -skew-x-12 translate-x-32 opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="mb-20 flex flex-col items-center text-center">
            <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs uppercase mb-4">{t.ethos}</h4>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase">
              {t.cultureTitle}
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent mt-8" />
          </div>

          <div className="relative">
            <div className={`text-gray-400 text-lg md:text-xl font-light leading-[2.2] tracking-wide text-justify space-y-8 transition-all duration-1000 ease-in-out ${isCultureExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-[300px] overflow-hidden relative'}`}>
              <p>{t.cultureP1}</p>
              <p>{t.cultureP2}</p>
              <p>{t.cultureP3}</p>
              
              {!isCultureExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#1A1A1A] to-transparent pointer-events-none" />
              )}
            </div>
            
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setIsCultureExpanded(!isCultureExpanded)}
                className="group flex items-center gap-4 text-[#E5E5E5] text-xs font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors duration-500 cursor-pointer"
              >
                <span className="w-8 h-[1px] bg-[#E5E5E5] group-hover:bg-white transition-colors duration-500" />
                {isCultureExpanded ? t.collapse : t.readFull}
                <span className="w-8 h-[1px] bg-[#E5E5E5] group-hover:bg-white transition-colors duration-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHRONICLE (Nested Timeline) */}
      <section className="py-32 bg-[#141414] relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10 relative z-20">
            <div>
              <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs uppercase mb-4">{t.evolution}</h4>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase">
                {t.chronicleTitle}
              </h2>
            </div>
            <p className="text-gray-400 max-w-md font-light text-lg leading-relaxed md:text-right border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
              {t.chronicleSubtitle}
            </p>
          </div>

          <div className="relative mt-20">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2 z-0" />
            
            <div className="space-y-32">
              {t.chronicleData.map((group, yearIndex) => (
                <div key={yearIndex} className="relative z-10 w-full">
                  
                  <div className="relative z-20 flex justify-start md:justify-center mb-16 md:mb-20">
                     <div className="bg-[#141414] py-3 px-6 md:px-10 border border-[#E5E5E5]/30 ml-[20px] md:ml-0 -translate-x-1/2 md:translate-x-0 shadow-[0_0_30px_rgba(20,20,20,1)]">
                       <h3 className="text-2xl md:text-4xl font-light text-[#E5E5E5] tracking-[0.2em] leading-none m-0">
                         {group.year}
                       </h3>
                     </div>
                  </div>

                  <div className="space-y-16">
                    {group.months.map((item, monthIndex) => {
                      const isEven = monthIndex % 2 === 0;
                      return (
                        <div key={monthIndex} className="relative flex flex-col md:flex-row md:items-center w-full group">
                          
                          <div className="absolute left-[20px] md:left-1/2 top-[8px] md:top-1/2 w-[11px] h-[11px] bg-[#141414] border-2 border-[#E5E5E5] rounded-full group-hover:bg-[#E5E5E5] group-hover:shadow-[0_0_15px_rgba(229,229,229,0.5)] transition-all duration-500 -translate-x-1/2 md:-translate-y-1/2 z-10" />

                          <div className={`w-full md:w-1/2 pl-[60px] md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:order-2 md:pl-20'}`}>
                            <div className={`flex items-center gap-4 mb-4 md:group-hover:-translate-y-1 transition-transform duration-500 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                {!isEven && <span className="w-8 h-[1px] bg-[#E5E5E5]/50 hidden md:block" />}
                                <span className="text-[#E5E5E5] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                                  {item.month}
                                </span>
                                {isEven && <span className="w-8 h-[1px] bg-[#E5E5E5]/50 hidden md:block" />}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide mb-3">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`} />
                          
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}