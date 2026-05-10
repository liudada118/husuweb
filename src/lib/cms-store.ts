import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { OfficialCmsPublicState, OfficialCmsSiteState } from "@/cms/official-state";

const cmsDataPath = path.join(process.cwd(), "data", "cms-site.json");

export const defaultCmsSiteState: OfficialCmsSiteState = {
  version: 1,
  updatedAt: "2026-05-10T12:30:00.000Z",
  assets: {
    titleLogo: "/assets/title/logo.svg",
    footerLogo: "/assets/foot/logo.svg",
    footerQr: "/assets/foot/QRcode.png?v=202605101205",
  },
  footer: {
    phone: "010-85885228",
    email: "contact@tigerpartners.cn",
  },
  home: {
    heroTitle: {
      en: "WE KNOW HOW TO WIN",
      zh: "WE KNOW HOW TO WIN",
    },
    heroVideo: "/assets/home/海浪0508.mp4",
    eventSlugs: [
      "kinsey-kang-hong-kong-legal-counsel",
      "official-account-mini-program-upgrade",
      "benchmark-litigation-2022-dispute-resolution",
      "civil-code-contract-termination-rules-part-one",
      "wuhan-kingold-fake-gold-jurisdiction-objection",
    ],
  },
  events: {
    overrides: {},
  },
};

function mergeCmsState(value: Partial<OfficialCmsSiteState>): OfficialCmsSiteState {
  return {
    ...defaultCmsSiteState,
    ...value,
    assets: {
      ...defaultCmsSiteState.assets,
      ...value.assets,
    },
    footer: {
      ...defaultCmsSiteState.footer,
      ...value.footer,
    },
    home: {
      ...defaultCmsSiteState.home,
      ...value.home,
      heroTitle: {
        ...defaultCmsSiteState.home.heroTitle,
        ...value.home?.heroTitle,
      },
      eventSlugs: value.home?.eventSlugs?.filter(Boolean) ?? defaultCmsSiteState.home.eventSlugs,
    },
    events: {
      ...defaultCmsSiteState.events,
      ...value.events,
      overrides: value.events?.overrides ?? defaultCmsSiteState.events.overrides,
    },
  };
}

export async function getCmsSiteState(): Promise<OfficialCmsSiteState> {
  try {
    const raw = await readFile(cmsDataPath, "utf8");
    return mergeCmsState(JSON.parse(raw) as Partial<OfficialCmsSiteState>);
  } catch {
    return defaultCmsSiteState;
  }
}

export async function saveCmsSiteState(nextState: OfficialCmsSiteState): Promise<OfficialCmsSiteState> {
  const state = mergeCmsState({
    ...nextState,
    version: 1,
    updatedAt: new Date().toISOString(),
  });

  await mkdir(path.dirname(cmsDataPath), { recursive: true });
  await writeFile(cmsDataPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");

  return state;
}

export async function getPublicCmsState(): Promise<OfficialCmsPublicState> {
  return getCmsSiteState();
}
