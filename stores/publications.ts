import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // Import ref and computed
import { ProjectId } from '@/stores/projects';
import scholarPublications from '../assets/scholar_publications.json';

export enum PublicationCategory {
  MACHINE_LEARNING = 'Machine Learning',
  SECURITY = 'Security',
  HARDWARE = 'Hardware',
  PRIVACY = 'Privacy',
  CENSORSHIP = 'Censorship',
  ROBOTICS = 'Robotics'
}

export interface Publication {
  title: string
  authors?: string[]
  venue?: string
  year: number
  link: string
  award?: string
  projectId?: ProjectId
  citations?: number
  categories: PublicationCategory[],
  description?: string,
  openSource?: boolean
}

// Define the hardcoded metadata for publications
// This allows us to keep the categories, projectId and award data that isn't in the scholar JSON
interface PublicationMetadata {
  title: string // Used for matching with Scholar data
  categories: PublicationCategory[]
  projectId?: ProjectId
  award?: string
}

const openSourcePublications: Publication[] = [
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
  }
]

// Hardcoded metadata that will be merged with the Scholar data
const publicationMetadata: PublicationMetadata[] = [
  {
    title: 'Geometric control for autonomous underwater vehicles: overcoming a thruster failure',
    categories: [PublicationCategory.ROBOTICS],
    projectId: ProjectId.SCAAML
  },
  {
    title: 'Message In A Bottle: Sailing Past Censorship',
    categories: [PublicationCategory.CENSORSHIP]
  },
  {
    title: 'EVILSEED: A Guided Approach to Finding Malicious Web Pages',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Nazca: Detecting Malware Distribution in Large-Scale Networks',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Understanding the mirai botnet',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Protecting accounts from credential stuffing with password breach alerting',
    categories: [PublicationCategory.SECURITY, PublicationCategory.PRIVACY],
    projectId: ProjectId.PASSWORD_CHECKUP,
    award: 'Best Paper Award'
  },
  {
    title: 'Data Breaches, Phishing, or Malware?: Understanding the Risks of Stolen Credentials',
    categories: [PublicationCategory.SECURITY, PublicationCategory.PRIVACY],
    projectId: ProjectId.PASSWORD_CHECKUP
  },
  {
    title: 'CoinPolice: Detecting Hidden Cryptojacking Attacks with Neural Networks',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY]
  },
  {
    title: 'Spotlight: Malware Lead Generation at Scale',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Hybrid Post-quantum Signatures in Hardware Security Keys',
    categories: [PublicationCategory.HARDWARE, PublicationCategory.SECURITY],
    projectId: ProjectId.OPENSK,
    award: 'Best Paper Award'
  },
  {
    title: 'Generalized power attacks against crypto hardware using long-range deep learning',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.HARDWARE],
    projectId: ProjectId.SCAAML
  },
  {
    title: 'Give and take: An end-to-end investigation of giveaway scam conversion rates',
    categories: [PublicationCategory.SECURITY]
  },
  {
    title: 'Magika: AI-Powered Content-Type Detection',
    categories: [PublicationCategory.MACHINE_LEARNING, PublicationCategory.SECURITY],
    projectId: ProjectId.MAGIKA
  }
];

// Function to normalize title for case-insensitive comparison
const normalizeTitle = (title: string): string => {
  return title.toLowerCase().trim();
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
    };

    return {
      ...pub,
      categories: metadata.categories,
      projectId: metadata.projectId || pub.projectId,
      award: metadata.award || pub.award,
      openSource: pub.venue && /github/i.test(pub.venue)
    } as Publication;
  });
};

export const usePublicationsStore = defineStore('publications', () => {
  // State
  const recentPublications = ref<Publication[]>(mergePublicationData());
  const researchAreas = ref([
    {
      title: 'Machine Learning Security',
      description: 'Applying ML/AI to security problems like malware detection, file-type identification (Magika), side-channel analysis (SCAAML/GPAM), and abuse/fraud detection (CoinPolice, Giveaway Scams).'
    },
    {
      title: 'System and Network Security',
      description: 'Securing computer systems and networks, including large-scale malware analysis and distribution detection (Nazca, EvilSeed), vulnerability analysis (e.g., outdated libraries), botnet analysis (Mirai), and Android security.'
    },
    {
      title: 'Hardware Security',
      description: 'Analyzing and securing hardware components, focusing on side-channel vulnerabilities in cryptographic hardware (SCAAML/GPAM), security key architectures, post-quantum cryptography implementations, and secure firmware.'
    },
    {
      title: 'Privacy and Abuse Prevention',
      description: 'Protecting user privacy online and combating web abuse. Includes research on credential stuffing risks, cryptojacking, large-scale scam detection, and analysis of privacy policies like the "Right to be Forgotten".'
    },
    {
      title: 'Censorship Resistance',
      description: 'Developing and analyzing techniques to bypass internet censorship and ensure free communication.'
    },
    {
      title: 'Robotics / Autonomous Systems',
      description: 'Earlier work focused on control strategies for autonomous systems, particularly autonomous underwater vehicles (AUVs).'
    }
  ]);

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
    researchAreas,
    groupedPublications,
    allCategories
  };
});