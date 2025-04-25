import { defineStore } from "pinia";

export interface CommitteeParticipation {
  conference: string;
  year: number;
  url: string;
}

export const useCommitteesStore = defineStore("committees", {
  state: () => ({
    participations: [
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
        conference: "ACM The Web Conference (WWW)",
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
    ],
  }),

  getters: {
    // Get all participations sorted by year (latest first)
    allParticipations: (state) => {
      return [...state.participations].sort((a, b) => b.year - a.year);
    },

    // Get participations grouped by year
    participationsByYear: (state) => {
      const grouped = state.participations.reduce((acc, participation) => {
        if (!acc[participation.year]) {
          acc[participation.year] = [];
        }
        acc[participation.year].push(participation);
        return acc;
      }, {} as Record<number, CommitteeParticipation[]>);

      return Object.entries(grouped)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, participations]) => ({
          year: Number(year),
          participations,
        }));
    },

    // Get unique conferences
    uniqueConferences: (state) => {
      const conferences = new Set<string>();
      state.participations.forEach((participation) => {
        conferences.add(participation.conference);
      });

      return Array.from(conferences);
    },

    // Get participations for a specific conference
    getParticipationsByConference: (state) => (conference: string) => {
      return state.participations
        .filter((participation) => participation.conference === conference)
        .sort((a, b) => b.year - a.year);
    },

    // Get participation counts by year
    participationCountsByYear: (state) => {
      return state.participations.reduce((acc, participation) => {
        acc[participation.year] = (acc[participation.year] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
    },
  },
});
