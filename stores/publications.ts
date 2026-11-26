import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ProjectId } from '@/stores/projects';
import scholarPublications from '../assets/scholar_publications.json';

export enum PublicationCategory {
  MACHINE_LEARNING = 'Machine Learning',
  SECURITY = 'Security',
  HARDWARE = 'Hardware',
  PRIVACY = 'Privacy',
  ROBOTICS = 'Robotics'
}

export interface Publication {
  title: string
  authors?: string[]
  venue?: string
  year: number
  link: string
  pdf?: string
  award?: string
  projectId?: ProjectId
  citations?: number
  categories: PublicationCategory[],
  description?: string,
  openSource?: boolean
}

// Define the hardcoded metadata for publications
// This allows us to keep the categories, projectId, award, local PDF and fallback link data that isn't in the scholar JSON
interface PublicationMetadata {
  title: string // Used for matching with Scholar data
  categories: PublicationCategory[]
  projectId?: ProjectId
  award?: string
  link?: string
  pdf?: string
}

const openSourcePublications: Publication[] = [
  {
    title: 'Magika',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    link: 'https://github.com/google/magika',
    venue: 'GitHub',
    description: 'Fast and accurate AI-powered file type detection system, protecting Gmail, Drive, and Chrome.',
    year: 2024,
    authors: []
  },
  {
    title: 'WaseFire',
    categories: [PublicationCategory.HARDWARE, PublicationCategory.SECURITY],
    link: 'https://github.com/google/WaseFire',
    venue: 'GitHub',
    description: 'WaseFire is a platform to build secure firmware in a usable way.',
    year: 2024,
    authors: []
  },
  {
    title: 'UniSim',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    link: 'https://github.com/google/unisim',
    venue: 'GitHub',
    description: 'Package for efficiently computing similarity, performing fuzzy matching, deduplicating datasets, and clustering data.',
    year: 2023,
    authors: []
  },
  {
    title: 'Getting Things GNOME! (GTG)',
    categories: [],
    link: 'https://github.com/getting-things-gnome/gtg',
    venue: 'GitHub',
    description: 'Personal task and organizer application for the GNOME desktop environment.',
    year: 2010,
    authors: []
  }
]

// Hardcoded metadata that will be merged with the Scholar data
const publicationMetadata: PublicationMetadata[] = [
  {
    title: 'Trajectory design for autonomous underwater vehicles for basin exploration',
    categories: [PublicationCategory.ROBOTICS]
  },
  {
    title: 'Geometric control for autonomous underwater vehicles: overcoming a thruster failure',
    categories: [PublicationCategory.ROBOTICS],
    projectId: ProjectId.SCAAML
  },
  {
    title: 'A geometric approach to trajectory design for an autonomous underwater vehicle: Surveying the bulbous bow of a ship',
    categories: [PublicationCategory.ROBOTICS],
    pdf: '/papers/2011-a-geometric-approach-to-trajectory-design.pdf'
  },
  {
    title: 'Message In A Bottle: Sailing Past Censorship',
    categories: [PublicationCategory.PRIVACY],
    pdf: '/papers/2012-message-in-a-bottle-sailing-past.pdf'
  },
  {
    title: 'EVILSEED: A Guided Approach to Finding Malicious Web Pages',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2012-evilseed-a-guided-approach-to-finding.pdf'
  },
  {
    title: 'You are what you include: large-scale evaluation of remote javascript inclusions',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2012-you-are-what-you-include-large.pdf'
  },
  {
    title: 'Nazca: Detecting Malware Distribution in Large-Scale Networks',
    categories: [PublicationCategory.SECURITY],
    award: 'UCSB Computer Science Outstanding Publication Award',
    pdf: '/papers/2014-nazca-detecting-malware-distribution-in-large.pdf'
  },
  {
    title: 'Ten Years of iCTF: The Good, The Bad, and The Ugly',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2014-ten-years-of-ictf-the-good.pdf'
  },
  {
    title: 'Do you feel lucky? A large-scale analysis of risk-rewards trade-offs in cyber security',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2014-do-you-feel-lucky-a-large.pdf'
  },
  {
    title: 'Eyes of a human, eyes of a program: Leveraging different views of the web for analysis and detection',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2014-eyes-of-a-human-eyes-of.pdf'
  },
  {
    title: 'What the app is that? deception and countermeasures in the android user interface',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2015-what-the-app-is-that-deception.pdf'
  },
  {
    title: 'Baredroid: Large-scale analysis of android apps on real devices',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2015-baredroid-large-scale-analysis-of-android.pdf'
  },
  {
    title: 'Detecting malware infestations in large-scale networks',
    categories: [PublicationCategory.SECURITY],
    link: 'https://patents.google.com/patent/US8959643B1/en',
    pdf: '/papers/2015-detecting-malware-infestations-in-large-scale.pdf'
  },
  {
    title: 'Detecting the stealthy distribution of malicious and abusive content online',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Cloak of Visibility: Detecting When Machines Browse A Different Web',
    categories: [PublicationCategory.SECURITY, PublicationCategory.MACHINE_LEARNING],
    pdf: '/papers/2016-cloak-of-visibility-detecting-when-machines.pdf'
  },
  {
    title: 'Understanding the mirai botnet',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2017-understanding-the-mirai-botnet.pdf'
  },
  {
    title: 'Data Breaches, Phishing, or Malware?: Understanding the Risks of Stolen Credentials',
    categories: [PublicationCategory.SECURITY, PublicationCategory.PRIVACY],
    projectId: ProjectId.PASSWORD_CHECKUP,
    pdf: '/papers/2017-data-breaches-phishing-or-malware-understanding.pdf'
  },
  {
    title: 'Gossip: Automatically identifying malicious domains from mailing list discussions',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    pdf: '/papers/2017-gossip-automatically-identifying-malicious-domains-from.pdf'
  },
  {
    title: 'Tracking ransomware end-to-end',
    categories: [PublicationCategory.SECURITY],
    projectId: ProjectId.RANSOMWARE,
    pdf: '/papers/2018-tracking-ransomware-end-to-end.pdf'
  },
  {
    title: 'Three years of the Right to be Forgotten',
    categories: [PublicationCategory.PRIVACY],
    pdf: '/papers/2018-three-years-of-the-right-to.pdf'
  },
  {
    title: 'Keras Tuner',
    categories: [PublicationCategory.MACHINE_LEARNING],
    projectId: ProjectId.KERAS_TUNER
  },
  {
    title: 'Protecting accounts from credential stuffing with password breach alerting',
    categories: [PublicationCategory.SECURITY, PublicationCategory.PRIVACY],
    projectId: ProjectId.PASSWORD_CHECKUP,
    award: 'Best Paper Award',
    pdf: '/papers/2019-protecting-accounts-from-credential-stuffing-with.pdf'
  },
  {
    title: 'Five years of the right to be forgotten',
    categories: [PublicationCategory.PRIVACY],
    pdf: '/papers/2019-five-years-of-the-right-to.pdf'
  },
  {
    title: 'Serverless Cybersecurity Training',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'CoinPolice: Detecting Hidden Cryptojacking Attacks with Neural Networks',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    pdf: '/papers/2020-coinpolice-detecting-hidden-cryptojacking-attacks-with.pdf'
  },
  {
    title: 'Spotlight: Malware Lead Generation at Scale',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2020-spotlight-malware-lead-generation-at-scale.pdf'
  },
  {
    title: 'Hybrid Post-quantum Signatures in Hardware Security Keys',
    categories: [PublicationCategory.HARDWARE, PublicationCategory.SECURITY],
    projectId: ProjectId.OPENSK,
    award: 'Best Paper Award',
    pdf: '/papers/2022-hybrid-post-quantum-signatures-in-hardware.pdf'
  },
  {
    title: 'Generalized power attacks against crypto hardware using long-range deep learning',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.HARDWARE],
    projectId: ProjectId.SCAAML,
    pdf: '/papers/2023-generalized-power-attacks-against-crypto-hardware.pdf'
  },
  {
    title: 'Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context',
    categories: [PublicationCategory.MACHINE_LEARNING],
    pdf: '/papers/2024-gemini-1-5-unlocking-multimodal-understanding.pdf'
  },
  {
    title: 'Give and take: An end-to-end investigation of giveaway scam conversion rates',
    categories: [PublicationCategory.SECURITY],
    pdf: '/papers/2024-give-and-take-an-end-to.pdf'
  },
  {
    title: 'Magika: AI-Powered Content-Type Detection',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    projectId: ProjectId.MAGIKA,
    pdf: '/papers/2024-magika-ai-powered-content-type-detection.pdf'
  },
  {
    title: 'Sedpack: Scalable and Efficient Dataset Library',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.HARDWARE, PublicationCategory.SECURITY],
    projectId: ProjectId.SCAAML
  },
  {
    title: 'Evaluating the robustness of a production malware detection system to transferable adversarial attacks',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    pdf: '/papers/2025-evaluating-the-robustness-of-a-production.pdf'
  },
  {
    title: 'Google announces Sec-Gemini v1, a new experimental cybersecurity model',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY]
  },
  {
    title: 'TypeSeg: Content-Type Segmentation for Mixed Text',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    projectId: ProjectId.MAGIKA,
    award: 'Spotlight Talk'
  },
  {
    title: 'TRIAGE-CPG: A Cross-Model Study of Budgeted Static Malware Triage with Large Language Models',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    projectId: ProjectId.SECGEMINI,
    link: 'https://arxiv.org/abs/2611.21331',
    pdf: '/papers/2026-triage-cpg-a-cross-model-study.pdf'
  },
  {
    title: 'From Payload to Plugin: Web-Scale Ecosystem Attribution of JavaScript Injection Campaigns',
    categories: [PublicationCategory.SECURITY],
    award: 'Distinguished Paper Award',
    link: 'https://sites.cs.ucsb.edu/~chris/research/doc/ccs26_plugin.pdf',
    pdf: '/papers/2026-from-payload-to-plugin-web-scale.pdf'
  },
  {
    title: 'ExploitGym: Can AI Agents Turn Security Vulnerabilities into Real Attacks?',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    pdf: '/papers/2026-exploitgym-can-ai-agents-turn-security.pdf'
  },
  {
    title: 'Honeyval: A Comprehensive Evaluation Framework for LLM-powered HTTP Honeypots',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    pdf: '/papers/2026-honeyval-a-comprehensive-evaluation-framework-for.pdf'
  }
];

// Function to normalize title for case-insensitive comparison
const normalizeTitle = (title: string): string => {
  return title.toLowerCase().trim().replace(/\.+$/, '');
};

// Function to merge Scholar data with our metadata
const mergePublicationData = (): Publication[] => {
  const metadataMap = new Map<string, PublicationMetadata>();

  // Create a map of metadata by normalized title
  publicationMetadata.forEach(meta => {
    metadataMap.set(normalizeTitle(meta.title), meta);
  });

  // Merge scholar data with our metadata
  return [...scholarPublications, ...openSourcePublications].map(pub => {

    const normalizedTitle = normalizeTitle(pub.title);
    const metadata = metadataMap.get(normalizedTitle) || {
      title: pub.title,
      categories: [],
      projectId: undefined,
      award: undefined,
      link: undefined,
      pdf: undefined,
    };

    return {
      ...pub,
      link: metadata.link || pub.link,
      pdf: metadata.pdf,
      categories: metadata.categories.length > 0 ? metadata.categories : (pub.categories || []),
      projectId: metadata.projectId || pub.projectId,
      award: metadata.award || pub.award,
      openSource: Boolean(pub.venue && /github/i.test(pub.venue))
    } as Publication;
  });
};

export const usePublicationsStore = defineStore('publications', () => {
  // State
  const recentPublications = ref<Publication[]>(mergePublicationData());

  // Getters
  const groupedPublications = computed(() => {
    const grouped = recentPublications.value.reduce((acc: Record<number, Publication[]>, pub) => {
      if (!acc[pub.year]) {
        acc[pub.year] = []
      }
      (acc[pub.year] || []).push(pub)
      return acc
    }, {} as Record<number, Publication[]>)

    return Object.entries(grouped)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .reduce((acc, [year, pubs]) => {
        acc[Number(year)] = pubs
        return acc
      }, {} as Record<number, Publication[]>)
  });

  const allCategories = computed(() => {
    const categories = new Set<PublicationCategory>()
    recentPublications.value.forEach(pub => {
      pub.categories.forEach((cat: PublicationCategory) => categories.add(cat))
    })

    return Array.from(categories)
  });

  // Return state and getters
  return {
    recentPublications,
    groupedPublications,
    allCategories
  };
});
