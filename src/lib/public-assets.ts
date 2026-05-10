const publicAssetBaseUrl = (
  process.env.NEXT_PUBLIC_CMS_ASSET_BASE_URL || "https://img-12345.oss-cn-beijing.aliyuncs.com"
).replace(/\/+$/, "");

const nextStaticMediaAssetPaths: Record<string, string> = {
  "0a575519339c4e1e8e30e16fcd10e29f.jpeg": "/uploads/cms-pages/source/workandlife/0a575519339c4e1e8e30e16fcd10e29f.jpeg",
  "logo.svg": "/assets/logo.svg",
  "1238e7fef0914f8376e0ea6a0381f97ef90ade2b.png": "/uploads/cms-pages/source/home/course-book-1.png",
  "136f1ff4d2484f1ab28b7ab27c5ecec8.jpeg": "/uploads/cms-pages/source/workandlife/136f1ff4d2484f1ab28b7ab27c5ecec8.jpeg",
  "246a4c00fa854cdba2dc186950c9c823.jpeg": "/uploads/cms-pages/source/workandlife/246a4c00fa854cdba2dc186950c9c823.jpeg",
  "2ea5b4c13df74888a6cf6b6d411a56a7.jpeg": "/uploads/cms-pages/source/workandlife/2ea5b4c13df74888a6cf6b6d411a56a7.jpeg",
  "33e3a5cf3d2ed2210760dd50677079172211c152.png": "/uploads/cms-pages/source/home/podcast-feature.png",
  "667abc64fe134af9a00caf7fe5f8de69.jpeg": "/uploads/cms-pages/source/workandlife/667abc64fe134af9a00caf7fe5f8de69.jpeg",
  "66d15c0ae84c93c2ed3138ec9ccee838b5f68066.png": "/uploads/cms-pages/source/home/course-book-2.png",
  "6ea3b67a9cd6494cbfbac49518c90085.jpeg": "/uploads/cms-pages/source/workandlife/6ea3b67a9cd6494cbfbac49518c90085.jpeg",
  "about.png": "/uploads/cms-pages/source/about.png",
  "about2.png": "/uploads/cms-pages/source/about2.png",
  "about3.png": "/uploads/cms-pages/source/about3.png",
  "abouticon1.png": "/uploads/cms-pages/source/abouticon1.png",
  "abouticon2.png": "/uploads/cms-pages/source/abouticon2.png",
  "abouticon3.png": "/uploads/cms-pages/source/abouticon3.png",
  "award.png": "/uploads/cms-pages/source/award.png",
  "award1.png": "/uploads/cms-pages/source/award1.png",
  "award2.png": "/uploads/cms-pages/source/award2.png",
  "award3.png": "/uploads/cms-pages/source/award3.png",
  "award4.png": "/uploads/cms-pages/source/award4.png",
  "award5.png": "/uploads/cms-pages/source/award5.png",
  "award6.png": "/uploads/cms-pages/source/award6.png",
  "awards.png": "/uploads/cms-pages/source/awards.png",
  "bilibili.png": "/uploads/cms-pages/source/bilibili.png",
  "Business1.png": "/uploads/cms-pages/source/Business1.png",
  "Business10.png": "/uploads/cms-pages/source/Business10.png",
  "Business11.png": "/uploads/cms-pages/source/Business11.png",
  "Business12.png": "/uploads/cms-pages/source/Business12.png",
  "Business2.png": "/uploads/cms-pages/source/Business2.png",
  "Business3.png": "/uploads/cms-pages/source/Business3.png",
  "Business4.png": "/uploads/cms-pages/source/Business4.png",
  "Business5.png": "/uploads/cms-pages/source/Business5.png",
  "Business6.png": "/uploads/cms-pages/source/Business6.png",
  "Business7.png": "/uploads/cms-pages/source/Business7.png",
  "Business8.png": "/uploads/cms-pages/source/Business8.png",
  "Business9.png": "/uploads/cms-pages/source/Business9.png",
  "contact.png": "/uploads/cms-pages/source/contact.png",
  "contact1.png": "/uploads/cms-pages/source/contact1.png",
  "contactlogo1.png": "/uploads/cms-pages/source/contactlogo1.png",
  "contactlogo2.png": "/uploads/cms-pages/source/contactlogo2.png",
  "contactlogo3.png": "/uploads/cms-pages/source/contactlogo3.png",
  "eb680bb1cc504421bda802c5e9e349de.jpeg": "/uploads/cms-pages/source/workandlife/eb680bb1cc504421bda802c5e9e349de.jpeg",
  "ec95ebd35030dd8f0cdd9eb3811db0702f5aae82.png": "/uploads/cms-pages/source/workandlife/ec95ebd35030dd8f0cdd9eb3811db0702f5aae82.png",
  "event.png": "/uploads/cms-pages/source/event.png",
  "event6.jpeg": "/uploads/cms-pages/source/eventdate/event6.jpeg",
  "event7.jpeg": "/uploads/cms-pages/source/eventdate/event7.jpeg",
  "event8.jpeg": "/uploads/cms-pages/source/eventdate/event8.jpeg",
  "event9.jpeg": "/uploads/cms-pages/source/eventdate/event9.jpeg",
  "eventDate1.png": "/uploads/cms-pages/source/eventDate1.png",
  "eventDate2.png": "/uploads/cms-pages/source/eventDate2.png",
  "eventDate3.png": "/uploads/cms-pages/source/eventDate3.png",
  "eventDate4.jpg": "/uploads/cms-pages/source/eventDate4.jpg",
  "eventDate5.jpeg": "/uploads/cms-pages/source/eventdate/eventDate5.jpeg",
  "eventdatelogo1.png": "/uploads/cms-pages/source/eventdatelogo1.png",
  "eventdatelogo2.png": "/uploads/cms-pages/source/eventdatelogo2.png",
  "eventdatelogo3.png": "/uploads/cms-pages/source/eventdatelogo3.png",
  "eventdatelogo4.png": "/uploads/cms-pages/source/eventdatelogo4.png",
  "main.png": "/uploads/cms-pages/source/main.png",
  "media.png": "/uploads/cms-pages/source/media.png",
  "media2.png": "/uploads/cms-pages/source/media2.png",
  "mediaAward1.png": "/uploads/cms-pages/source/mediaAward1.png",
  "mediaAward2.png": "/uploads/cms-pages/source/mediaAward2.png",
  "mediaAward3.png": "/uploads/cms-pages/source/mediaAward3.png",
  "mediaAward4.png": "/uploads/cms-pages/source/mediaAward4.png",
  "mediaAward5.png": "/uploads/cms-pages/source/mediaAward5.png",
  "medialogo.png": "/uploads/cms-pages/source/medialogo.png",
  "medialogo1.png": "/uploads/cms-pages/source/medialogo1.png",
  "medialogo2.png": "/uploads/cms-pages/source/medialogo2.png",
  "medialogo3.png": "/uploads/cms-pages/source/medialogo3.png",
  "podcast.png": "/uploads/cms-pages/source/podcast.png",
  "podcastlogo1.png": "/uploads/cms-pages/source/podcastlogo1.png",
  "podcastlogo2.png": "/uploads/cms-pages/source/podcastlogo2.png",
  "podcastlogo3.png": "/uploads/cms-pages/source/podcastlogo3.png",
  "podcastlogo4.png": "/uploads/cms-pages/source/podcastlogo4.png",
  "podcastlogo5.png": "/uploads/cms-pages/source/podcastlogo5.png",
  "podcastlogo6.png": "/uploads/cms-pages/source/podcastlogo6.png",
  "programlogo_bilibili.png": "/uploads/cms-pages/source/programlogo_bilibili.png",
  "programlogo_douyin.png": "/uploads/cms-pages/source/programlogo_douyin.png",
  "programlogo_tengxun.png": "/uploads/cms-pages/source/programlogo_tengxun.png",
  "Programlogo_xyz.png": "/uploads/cms-pages/source/Programlogo_xyz.png",
  "programlogo_youku.png": "/uploads/cms-pages/source/programlogo_youku.png",
  "Schedule.jpg": "/uploads/cms-pages/source/Schedule.jpg",
  "Schedule1.jpg": "/uploads/cms-pages/source/Schedule1.jpg",
  "Schedule2.png": "/uploads/cms-pages/source/Schedule2.png",
  "Scheduleicon.png": "/uploads/cms-pages/source/Scheduleicon.png",
  "Scheduleicon2.png": "/uploads/cms-pages/source/Scheduleicon2.png",
  "Scheduleicon3.png": "/uploads/cms-pages/source/Scheduleicon3.png",
  "Thought.png": "/uploads/cms-pages/source/Thought.png",
  "xiaoyuzhou.png": "/uploads/cms-pages/source/xiaoyuzhou.png",
  "播客封面 (1).jpg": "/uploads/cms-pages/source/Special/播客封面 (1).jpg",
  "播客封面 (2).jpg": "/uploads/cms-pages/source/Special/播客封面 (2).jpg",
  "播客封面 (8).jpg": "/uploads/cms-pages/source/Special/播客封面 (8).jpg",
  "播客封面.jpg": "/uploads/cms-pages/source/Special/播客封面.jpg",
  "封面 (1).jpg": "/uploads/cms-pages/source/Special/封面 (1).jpg",
  "封面 (2).jpg": "/uploads/cms-pages/source/Special/封面 (2).jpg",
  "正片封面.jpg": "/uploads/cms-pages/source/Special/正片封面.jpg",
};

function safeDecodePath(path: string) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function uploadedAssetPathFromNextStaticMedia(value: string) {
  const path = (() => {
    try {
      return new URL(value).pathname;
    } catch {
      return value;
    }
  })();
  const decodedPath = safeDecodePath(path);
  const match = decodedPath.match(/^\/_next\/static\/media\/(.+)\.[0-9a-f]+\.(avif|gif|jpe?g|png|svg|webp)$/i);

  if (!match) {
    return null;
  }

  return nextStaticMediaAssetPaths[`${match[1]}.${match[2]}`] ?? null;
}

function uploadedProgramAssetPath(value: string) {
  const path = (() => {
    try {
      return new URL(value).pathname;
    } catch {
      return value;
    }
  })();
  const match = path.match(/^\/_next\/static\/media\/program([1-8])\.[^.]+\.(?:png|jpe?g)$/i);

  if (!match) {
    return null;
  }

  const index = Number(match[1]);
  const extension = index <= 4 ? "png" : "jpeg";

  return `/uploads/cms-pages/source/program/program${index}.${extension}`;
}

export function resolveNextStaticMediaAssetUrl(value: string) {
  const normalizedValue = value.startsWith("/_next/static/media/")
    ? value
    : `/_next/static/media/${value.replace(/^\/+/, "")}`;
  const uploadedPath = uploadedAssetPathFromNextStaticMedia(normalizedValue) ?? uploadedProgramAssetPath(normalizedValue);

  if (!uploadedPath) {
    return null;
  }

  return publicAssetBaseUrl ? `${publicAssetBaseUrl}${uploadedPath}` : uploadedPath;
}

export function resolvePublicAssetUrl(value: string) {
  const uploadedNextStaticPath = uploadedAssetPathFromNextStaticMedia(value);

  if (uploadedNextStaticPath) {
    return publicAssetBaseUrl ? `${publicAssetBaseUrl}${uploadedNextStaticPath}` : uploadedNextStaticPath;
  }

  const uploadedProgramPath = uploadedProgramAssetPath(value);

  if (uploadedProgramPath) {
    return publicAssetBaseUrl ? `${publicAssetBaseUrl}${uploadedProgramPath}` : uploadedProgramPath;
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("//")) {
    return value;
  }

  if (!publicAssetBaseUrl) {
    return value;
  }

  return value.startsWith("/uploads/") || value.startsWith("/assets/") || value.startsWith("/awardimg/")
    ? `${publicAssetBaseUrl}${value}`
    : value;
}

export function resolvePublicAssetUrls<T>(value: T): T {
  if (typeof value === "string") {
    return resolvePublicAssetUrl(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolvePublicAssetUrls(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolvePublicAssetUrls(item)]),
    ) as T;
  }

  return value;
}
