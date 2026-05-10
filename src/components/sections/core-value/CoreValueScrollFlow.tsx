"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { useLanguage } from "@/i18n/LanguageProvider";

type CoreValueItem = {
  number: string;
  title: string;
  body: ReactNode;
  image: string;
};

const coreValueItems: CoreValueItem[] = [
  {
    number: "No.1",
    title: "Our Spiritual Totem: Tiger",
    image: "/assets/core/core1.webp",
    body: (
      <>
        As quoted from an ancient Chinese book the Dragon Classic : &quot;Bi An (狴犴) is good at
        litigation&quot;. Bi An is a mythical creature in charge of litigation in Chinese mythology, which is also
        the seventh son of the Dragon. In the real world, it presents itself in the image of Tiger. Therefore,
        Tiger, powerful and solemn, appears on all Chinese cultural relics related to litigation. Tiger, as the
        king of the forest, is strong and powerful itself, but meanwhile it keeps itself invisible before taking a
        critical strike at its prey. We choose Tiger as our totem because we are just Tigers. We litigate, and we
        hunt like top predators.
      </>
    ),
  },
  {
    number: "No.2",
    title: "We focus on tangible benefits clients could get from our legal services",
    image: "/assets/core/core2.webp",
    body: (
      <>
        Dispute Resolution Legal Services are inherently different from non-litigation legal services. The
        result-oriented nature of the legal services makes the dispute resolution full of challenges. While
        emphasizing the quality of legal services itself, we place more attention on protecting tangible benefits
        of our clients in our cases. We believe that our value as dispute resolution lawyers would not be
        ultimately realized, when our clients&apos; ultimate interests are not realized.
      </>
    ),
  },
  {
    number: "No.3",
    title: 'The "Hands-on"',
    image: "/assets/core/core3.webp",
    body: (
      <>
        <p>
          The result of a dispute resolution case could be as far removed as heaven from earth, that is because
          different lawyers handle a case in different ways during the whole process, from strategic planning at
          the beginning, to evidence collecting, trial presentation, and post-trial briefing. Therefore, we
          guaranty our partners&apos; Hands-on throughout the process:
        </p>
        <ul className="mt-6 space-y-3 text-[#99a1af]">
          {[
            "Hands on communication directly with clients on substantial and procedural issues.",
            "Hands on evidence collecting and organization.",
            "Hands on drafting core legal documents.",
            "Hands on court presentations.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.65em] block size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

const zhCoreValueItems: CoreValueItem[] = [
  {
    number: "",
    title: "价值观之一：精神图腾“虎”",
    image: "/assets/core/core1.webp",
    body: (
      <>
        《龙经》有云：“狴犴(bì àn)好讼”。狴犴，系中国神话中掌管诉讼的神兽，为龙的第七子。在现实世界中，往往又以“虎”之形象示人。故在中国历代有关诉讼的文物器件中均有虎的形象出现，孔武有力、威严振振。老虎，森林之王，自身雄壮有力的同时，行迹却隐于山林，捕猎先发制人，出奇制胜。正是基于虎的这些特性，我们选择了“虎”作为我们的精神图腾。
      </>
    ),
  },
  {
    number: "",
    title: "事务所价值观之二：注重法律服务给客户带来的实际利益",
    image: "/assets/core/core2.webp",
    body: (
      <>
        争议解决法律服务业务先天性地与非诉法律服务有所区别，结果导向的属性让争议解决法律服务业务充满挑战，在强调法律服务质量本身的同时，我们更加重视代理案件在结果上保障客户的实际利益——我们相信，没有客户最终经济利益的实现，就没有我们作为争议解决律师价值的最终实现。
      </>
    ),
  },
  {
    number: "",
    title: "事务所价值观之三：争议解决法律服务的“属人性”",
    image: "/assets/core/core3.webp",
    body: (
      <>
        <p>
          争议解决案件，从案件起始的“策略方案制定”，到“证据搜集整理”，到“庭审陈述”，再到“庭后文件表达”，都因实际操作办理案件个人不同而有重大差异。故，我们保证合伙人的“四个全程办案”，具体而言：
        </p>
        <ul className="mt-6 space-y-3 text-[#99a1af]">
          {[
            "由合伙人全程与客户直接对接案件办理的法律及程序事项。",
            "由合伙人全程负责完成证据挖掘、组织工作。",
            "由合伙人全程负责核心法律文件的起草。",
            "由合伙人全程负责庭审展示文稿准备，以及全程庭审发言。",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[0.65em] block size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

function CoreImageStack({ items, progress }: { items: CoreValueItem[]; progress: number }) {
  const itemCount = items.length;

  return (
    <div className="relative aspect-[16/14] w-full overflow-hidden rounded-[1.5rem]">
      {items.map((item, index) => {
        const clipFraction = Math.min(Math.max(progress - index, 0), 1);
        const clipBottomPct = clipFraction * 100;
        const revealFraction = index === 0 ? 1 : Math.min(Math.max(progress - (index - 1), 0), 1);
        const translateY = (1 - revealFraction) * 48;

        return (
          <div
            key={`${item.image}-${index}`}
            className="absolute inset-0"
            style={{
              zIndex: itemCount - index,
              clipPath: `inset(0 0 ${clipBottomPct}% 0 round 1.5rem)`,
              willChange: "clip-path, transform",
            }}
          >
            <ImageWithFallback
              src={item.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 block size-full rounded-[1.5rem] object-cover"
              style={{
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.05s linear",
                willChange: "transform",
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(to_top,rgba(22,25,21,0.6)_0%,transparent_50%)]" />
            {item.number ? (
              <div className="absolute bottom-5 left-5 rounded-lg border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                <span className="text-[0.875rem] font-medium tracking-[0.08em] text-white/85">{item.number}</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function CoreValueBlock({ item, active }: { item: CoreValueItem; active: boolean }) {
  return (
    <article className="flex min-h-screen items-center py-24">
      <div
        className={`max-w-[48rem] transition-all duration-500 ${
          active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-35"
        }`}
      >
        <h2 className="text-[1.75rem] font-semibold leading-[1.25] tracking-[0.01em] text-[#d9b27a]">
          {[item.number, item.title].filter(Boolean).join(" ")}
        </h2>
        <div className="mt-8 text-justify text-[1.5rem] font-normal leading-[1.75] tracking-[0.01em] text-[#d1d5dc]">
          {item.body}
        </div>
      </div>
    </article>
  );
}

export function CoreValueScrollFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const nearViewportRef = useRef(true);
  const [progress, setProgress] = useState(0);
  const { language } = useLanguage();
  const items = language === "zh" ? zhCoreValueItems : coreValueItems;
  const itemCount = items.length;
  const activeIndex = Math.min(Math.floor(progress), itemCount - 1);

  useEffect(() => {
    const updateProgress = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const nextProgress = -rect.top / window.innerHeight;
      setProgress(Math.max(0, Math.min(itemCount - 1 + 0.999, nextProgress)));
    };

    const scheduleUpdate = () => {
      if (!nearViewportRef.current || frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        nearViewportRef.current = entry.isIntersecting;
        if (entry.isIntersecting) scheduleUpdate();
      },
      { rootMargin: "100% 0px" },
    );

    const element = containerRef.current;
    if (element) observer.observe(element);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [itemCount]);

  return (
    <section className="bg-[#171717] py-20 lg:py-0">
      <div className="site-shell mt-14 space-y-14 lg:hidden">
        {items.map((item, index) => (
          <article key={`${item.image}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111814]">
            <ImageWithFallback src={item.image} alt="" loading="lazy" className="aspect-[16/14] w-full object-cover" />
            <div className="p-7">
              <h3 className="text-[1.75rem] font-semibold leading-[1.25] text-[#d9b27a]">
                {[item.number, item.title].filter(Boolean).join(" ")}
              </h3>
              <div className="mt-6 text-justify text-[1.5rem] font-normal leading-[1.75] text-[#d1d5dc]">
                {item.body}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div ref={containerRef} className="site-shell hidden gap-16 lg:flex" style={{ height: `${itemCount * 100}vh` }}>
        <div className="flex flex-1 flex-col">
          {items.map((item, index) => (
            <CoreValueBlock key={`${item.image}-${index}`} item={item} active={activeIndex === index} />
          ))}
        </div>

        <div className="w-[clamp(34rem,48%,46rem)] shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="w-full translate-y-[5rem]">
              <div className="w-full scale-90">
                <CoreImageStack items={items} progress={progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-24 lg:block" />
    </section>
  );
}
