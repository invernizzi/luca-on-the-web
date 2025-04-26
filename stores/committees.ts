import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface CommitteeParticipation {
  conference: string;
  year: number;
  url: string;
}

export const useCommitteesStore = defineStore("committees", () => {
  const participations = ref<CommitteeParticipation[]>([
    {
      conference: "APWG Symposium on Electronic Crime Research (ECRIME)",
      year: 2016,
      url: "https://ieeexplore.ieee.org/xpl/conhome/7486625/proceeding",
    },
    {
      conference: "ACM Web Conference (WWW)",
      year: 2017,
      url: "https://dl.acm.org/doi/proceedings/10.5555/3038912",
    },
    {
      conference: "ACM Web Conference (WWW)",
      year: 2018,
      url: "https://archives.iw3c2.org/www2018/committees/program-committee-members/",
    },
    {
      conference:
        "International Symposium on Research in Attacks, Intrusions and Defenses (RAID)",
      year: 2020,
      url: "https://raid20.usenix.hotcrp.com/users/pc",
    },
    {
      conference:
        "NDSS Workshop on Measurements, Attacks, and Defenses for the Web (MADWeb)",
      year: 2020,
      url: "https://www.ndss-symposium.org/ndss2020/submissions/cfp-madweb-workshop/",
    },
    {
      conference:
        "ACM Conference on Computer and Communications Security (CCS)",
      year: 2021,
      url: "https://www.sigsac.org/ccs/CCS2021/program-committee.html",
    },
    {
      conference: "IEEE Symposium on Security and Privacy (S&P)",
      year: 2021,
      url: "https://www.ieee-security.org/TC/SP2021/cfpapers.html",
    },
    {
      conference: "ACM Web Conference (WWW)",
      year: 2022,
      url: "https://archives.iw3c2.org/www2022/program-committee-members-by-tracks/",
    },
    {
      conference: "IEEE Symposium on Security and Privacy (S&P)",
      year: 2022,
      url: "https://oakland22-first.hotcrp.com/users/pc",
    },
    {
      conference:
        "NDSS Workshop on Measurements, Attacks, and Defenses for the Web (MADWeb)",
      year: 2022,
      url: "https://www.ndss-symposium.org/ndss2022/cfp-madweb-workshop/",
    },
    {
      conference: "USENIX Security Symposium",
      year: 2024,
      url: "https://s3.eurecom.fr/~balzarot/files/USENIX_Security_24_Opening_Remarks.pdf",
    },
    {
      conference: "USENIX Security Symposium",
      year: 2025,
      url: "https://sec25cycle1.usenix.hotcrp.com/users/pc?sort=aff",
    },
    {
      conference: "Annual Computer Security Applications Conference (ACSAC)",
      year: 2025,
      url: "https://www.acsac.org/2025/submissions/artifacts_competition/committee/",
    },
    {
      conference: "USENIX Security Symposium",
      year: 2026,
      // Not the PC url yet
      url: "https://www.usenix.org/conference/usenixsecurity26",
    },
  ]);

  // Get all participations sorted by year (latest first)
  const allParticipations = computed(() => {
    return [...participations.value].sort((a, b) => b.year - a.year);
  });

  // Get participations grouped by year
  const participationsByYear = computed(() => {
    const grouped = participations.value.reduce((acc, participation) => {
      if (!acc[participation.year]) {
        acc[participation.year] = [];
      }
      acc[participation.year].push(participation);
      return acc;
    }, {} as Record<number, CommitteeParticipation[]>);

    return Object.entries(grouped)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, parts]) => ({
        year: Number(year),
        participations: parts,
      }));
  });

  // Get unique conferences
  const uniqueConferences = computed(() => {
    const conferences = new Set<string>();
    participations.value.forEach((participation) => {
      conferences.add(participation.conference);
    });

    return Array.from(conferences);
  });

  // Get participations for a specific conference
  const getParticipationsByConference = computed(() => {
    return (conference: string) => {
      return participations.value
        .filter((participation) => participation.conference === conference)
        .sort((a, b) => b.year - a.year);
    };
  });

  // Get participation counts by year
  const participationCountsByYear = computed(() => {
    return participations.value.reduce((acc, participation) => {
      acc[participation.year] = (acc[participation.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  });

  return {
    participations,
    allParticipations,
    participationsByYear,
    uniqueConferences,
    getParticipationsByConference,
    participationCountsByYear,
  };
});
