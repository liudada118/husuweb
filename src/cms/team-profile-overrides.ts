import type { OfficialCmsTeamProfileContent } from "@/cms/official-state";
import type { TeamProfile } from "@/data/teamProfiles";

export function applyTeamProfileOverride(
  profile: TeamProfile,
  override?: OfficialCmsTeamProfileContent,
): TeamProfile {
  if (!override) {
    return profile;
  }

  return {
    ...profile,
    name: override.name ?? profile.name,
    zhName: override.zhName ?? profile.zhName,
    title: override.title ?? profile.title,
    zhTitle: override.zhTitle ?? profile.zhTitle,
    image: override.image ?? profile.image,
    phone: override.phone ?? profile.phone,
    email: override.email ?? profile.email,
    serviceIndustries: override.serviceIndustries ?? profile.serviceIndustries,
    education: override.education ?? profile.education,
    qualification: override.qualification ?? profile.qualification,
    languages: override.languages ?? profile.languages,
    socialEngagements: override.socialEngagements ?? profile.socialEngagements,
    practiceArea: override.practiceArea ?? profile.practiceArea,
    practiceExperience: override.practiceExperience ?? profile.practiceExperience,
    honors: override.honors ?? profile.honors,
    achievements: override.achievements ?? profile.achievements,
    zh: {
      ...profile.zh,
      serviceIndustries: override.zhServiceIndustries ?? profile.zh.serviceIndustries,
      education: override.zhEducation ?? profile.zh.education,
      qualification: override.zhQualification ?? profile.zh.qualification,
      languages: override.zhLanguages ?? profile.zh.languages,
      socialEngagements: override.zhSocialEngagements ?? profile.zh.socialEngagements,
      practiceArea: override.zhPracticeArea ?? profile.zh.practiceArea,
      practiceExperience: override.zhPracticeExperience ?? profile.zh.practiceExperience,
      honors: override.zhHonors ?? profile.zh.honors,
      achievements: override.zhAchievements ?? profile.zh.achievements,
    },
  };
}
