import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum ProjectId {
    SECGEMINI = 'secgemini',
    MAGIKA = 'magika',
    SCAAML = 'scaaml',
    OPENSK = 'opensk',
    PASSWORD_CHECKUP = 'password-checkup',
    VAXEN = 'vaxen',
    KERAS_TUNER = 'keras-tuner',
    RANSOMWARE = 'ransomware',
    CREDENTIAL_ALERTING = 'credential-alerting',
    SHATTERED = 'shattered'
}

export enum ProjectTag {
    AI = 'AI',
    SECURITY_RESEARCH = 'Security Research',
    ANTI_ABUSE = 'Anti-Abuse',
    HARDWARE_SECURITY = 'Hardware Security',
    OPEN_SOURCE = 'Open Source',
    PRIVACY = 'Privacy'
}

export interface OnlineItem {
    name: string
    type: 'blog' | 'news' | 'github' | 'website'
    url: string
}

export interface Project {
    id: ProjectId
    title: string
    urls?: OnlineItem[]
    featured: boolean
    blurb: string
    description: string
    tags: ProjectTag[],
    archived?: boolean,
    award?: string,

}

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>([
        {
            id: ProjectId.CREDENTIAL_ALERTING,
            title: 'Credential Alerting',
            urls: [
                {
                    name: 'Google Cloud Blog',
                    type: 'blog',
                    url: 'https://cloud.google.com/blog/products/identity-security/automatically-disabling-leaked-service-account-keys-what-you-need-to-know'
                },
                {
                    name: 'John Mathews Blog',
                    type: 'blog',
                    url: 'https://johnmathews.is/blog/i-leaked-credentials-onto-a-public-github-repo'
                },
            ],
            archived: true,
            award: 'Google Tech Award',
            featured: false,
            blurb: 'Automatic detection and disabling of leaked keys',
            description: 'Automatically detects and disables leaked service account keys and API keys in Google Cloud Platform.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.ANTI_ABUSE]
        },
        {
            id: ProjectId.SHATTERED,
            title: 'Shattered',
            urls: [
                {
                    name: 'Website',
                    type: 'website',
                    url: 'https://marc-stevens.nl/research/shattered.io/'
                },
                {
                    name: 'Google Security Blog',
                    type: 'blog',
                    url: 'https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html'
                },
                {
                    name: 'Ars Technica',
                    type: 'news',
                    url: 'https://arstechnica.com/information-technology/2017/02/watershed-sha1-collision-just-broke-the-webkit-repository-others-may-follow/'
                },
                {
                    name: 'Forbes',
                    type: 'news',
                    url: 'https://www.forbes.com/sites/thomasbrewster/2017/02/23/google-sha-1-hack-why-it-matters/'
                },
                {
                    name: 'The Hacker News',
                    type: 'news',
                    url: 'https://thehackernews.com/2017/02/sha1-collision-attack.html'
                },
            ],
            archived: true,
            featured: false,
            blurb: 'First practical collision against SHA-1',
            description: 'First practical collision against the SHA-1 hash function, which led major browsers and organizations to deprecate SHA-1.',
            award: 'Pwnie Award',
            tags: [ProjectTag.SECURITY_RESEARCH]
        },
        {
            id: ProjectId.KERAS_TUNER,
            title: 'Keras Tuner',
            urls: [
                {
                    name: 'Website',
                    type: 'website',
                    url: 'https://keras.io/keras_tuner/'
                },
                {
                    name: 'GitHub',
                    type: 'github',
                    url: 'https://github.com/keras-team/keras-tuner'
                }
            ],
            featured: false,
            blurb: 'Hyperparameter optimization for Keras',
            description: 'Hyperparameter optimization library for Keras models that searches across candidate configurations automatically.',
            archived: true,
            tags: [ProjectTag.AI, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.RANSOMWARE,
            title: 'Ransomware',
            urls: [
                {
                    name: 'Google Workspace Blog',
                    type: 'blog',
                    url: 'https://workspace.google.com/blog/product-announcements/ai-ransomware-detection-in-google-drive'
                },
                {
                    name: 'BBC',
                    type: 'news',
                    url: 'https://www.bbc.com/news/technology-40737060'
                },
                {
                    name: 'Threatpost',
                    type: 'news',
                    url: 'https://threatpost.com/google-study-quantifies-ransomware-revenue/127057/'
                },
                {
                    name: 'Forbes',
                    type: 'news',
                    url: 'https://www.forbes.com/sites/thomasbrewster/2017/07/25/google-ransomware-multi-million-dollar-business-with-locky-and-cerber/'
                },
                {
                    name: 'CCN',
                    type: 'news',
                    url: 'https://www.ccn.com/google-ransomware-extortionists-net-25-million-in-two-years-95-percent-cashed-out-through-btc-e/'
                }
            ],
            featured: false,
            blurb: 'Quantifying ransomware revenue',
            description: 'End-to-end study quantifying ransomware revenue through cryptocurrency payments. This work later led to ransomware detection in Google Drive.',
            archived: true,
            tags: [ProjectTag.SECURITY_RESEARCH]
        },
        {
            id: ProjectId.SECGEMINI,
            title: 'Sec-Gemini',
            urls: [
                {
                    name: 'Website',
                    type: 'website',
                    url: 'https://secgemini.google'
                },
                {
                    name: 'Sec-Gemini v1 Blog',
                    type: 'blog',
                    url: 'https://security.googleblog.com/2025/04/google-launches-sec-gemini-v1-new.html'
                },
                {
                    name: 'Summer 2025 Update',
                    type: 'blog',
                    url: 'https://blog.google/technology/safety-security/cybersecurity-updates-summer-2025/'
                },
                {
                    name: 'Google Cloud Blog',
                    type: 'blog',
                    url: 'https://www.googlecloudcommunity.com/gc/Community-Blog/Fueling-AI-Innovation-in-SecOps-Products-The-SecLM-Platform-and/ba-p/913254'
                },
                {
                    name: 'Sec-Gemini v3 Blog',
                    type: 'blog',
                    url: 'https://blog.google/intl/en-in/company-news/building-the-safety-foundations-for-indias-agentic-future/'
                },
                {
                    name: 'TechRepublic',
                    type: 'news',
                    url: 'https://www.techrepublic.com/article/news-google-sec-gemini-v1/'
                },
                {
                    name: 'SecurityWeek',
                    type: 'news',
                    url: 'https://www.securityweek.com/google-pushing-sec-gemini-ai-model-for-threat-intel-workflows/'
                },
                {
                    name: 'Forbes',
                    type: 'news',
                    url: 'https://www.forbes.com/sites/thomasbrewster/2025/04/08/the-wiretap-plagued-by-child-predators-former-200-million-whisper-app-has-disappeared/'
                }
            ],
            featured: true,
            blurb: 'Experimental AI model for agentic security',
            description: 'Experimental AI model for cybersecurity defense, combining machine learning with security workflows for threat detection and analysis.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.AI],
        },
        {
            id: ProjectId.MAGIKA,
            title: 'Magika',
            urls: [
                {
                    name: 'Website',
                    type: 'website',
                    url: 'https://google.github.io/magika/'
                },
                {
                    name: 'Launch Blog (2024)',
                    type: 'blog',
                    url: 'https://opensource.googleblog.com/2024/02/magika-ai-powered-fast-and-efficient-file-type-identification.html'
                },
                {
                    name: 'Magika 1.0 Blog',
                    type: 'blog',
                    url: 'https://opensource.googleblog.com/2025/11/announcing-magika-10-now-faster-smarter.html'
                },
                {
                    name: 'Forbes',
                    type: 'news',
                    url: 'https://www.forbes.com/sites/daveywinder/2024/02/15/new-google-security-includes-gmail-magic-protection--ai-cyber-defense-initiative/'
                },
                {
                    name: 'The Hacker News',
                    type: 'news',
                    url: 'https://thehackernews.com/2024/02/google-open-sources-magika-ai-powered.html'
                },
                {
                    name: 'The Register',
                    type: 'news',
                    url: 'https://www.theregister.com/2024/02/15/google_magika_open_source/'
                }
            ],
            featured: true,
            blurb: 'ML-based file type detection system',
            description: 'Machine-learning file type identification system protecting Gmail, Drive, and Chrome, and adopted across open-source projects.',
            tags: [ProjectTag.ANTI_ABUSE, ProjectTag.AI, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.SCAAML,
            title: 'SCAAML',
            featured: false,
            urls: [
                {
                    name: 'GitHub',
                    type: 'github',
                    url: 'https://github.com/google/scaaml'
                },
                {
                    name: 'Code Walkthrough',
                    type: 'blog',
                    url: 'https://elie.net/blog/security/hacker-guide-to-deep-learning-side-channel-attacks-code-walkthrough'
                },
                {
                    name: 'Long-Range DL Post',
                    type: 'blog',
                    url: 'https://elie.net/publication/generalized-power-attacks-against-crypto-hardware-using-long-range-deep-learning'
                },
            ],
            blurb: 'Side-channel attack analysis with ML',
            description: 'Open-source framework for Side-Channel Analysis with Machine Learning, providing tools and datasets for analyzing cryptographic hardware.',
            tags: [ProjectTag.HARDWARE_SECURITY, ProjectTag.SECURITY_RESEARCH, ProjectTag.AI, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.OPENSK,
            title: 'OpenSK',
            featured: false,
            urls: [
                {
                    name: 'GitHub',
                    type: 'github',
                    url: 'https://github.com/google/OpenSK'
                },
                {
                    name: 'Google Security Blog',
                    type: 'blog',
                    url: 'https://security.googleblog.com/2020/01/say-hello-to-opensk-fully-open-source.html'
                },
                {
                    name: 'Android Police',
                    type: 'news',
                    url: 'https://www.androidpolice.com/2020/01/30/google-releases-open-source-2fa-security-key-platform/'
                },
                {
                    name: 'Help Net Security',
                    type: 'news',
                    url: 'https://www.helpnetsecurity.com/2020/01/31/make-security-key/'
                },
                {
                    name: 'SecurityWeek',
                    type: 'news',
                    url: 'https://www.securityweek.com/google-open-sources-code-security-key-devices/'
                }
            ],
            blurb: 'Open-source FIDO security key implementation',
            description: 'Open-source security key implementation written in Rust supporting FIDO U2F and FIDO2, used in commercial keys and the 2026 DEF CON badge.',
            tags: [ProjectTag.HARDWARE_SECURITY, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.VAXEN,
            title: 'Scam Detection',
            featured: false,
            urls: [
                {
                    name: 'Google Security Blog',
                    type: 'blog',
                    url: 'https://security.googleblog.com/2020/02/improving-malicious-document-detection.html'
                },
                {
                    name: 'GitHub',
                    type: 'github',
                    url: 'https://github.com/google/maldoca'
                },
                {
                    name: 'Wired',
                    type: 'news',
                    url: 'https://www.wired.com/story/gmail-catching-more-malicious-attachments-deep-learning/'
                }
            ],
            blurb: 'ML-based malicious document detection',
            description: 'Machine-learning system for detecting malicious documents across Gmail, Drive, Safe Browsing, and VirusTotal.',
            archived: false,
            tags: [ProjectTag.ANTI_ABUSE, ProjectTag.AI, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.PASSWORD_CHECKUP,
            title: 'Password Checkup',
            featured: false,
            urls: [
                {
                    name: 'ZDNet',
                    type: 'news',
                    url: 'https://www.zdnet.com/article/google-launches-password-checkup-feature-will-add-it-to-chrome-later-this-year/'
                },
                {
                    name: 'Time',
                    type: 'news',
                    url: 'https://time.com/5528092/google-password-checkup-tool-chrome/'
                },
                {
                    name: 'Forbes',
                    type: 'news',
                    url: 'https://www.forbes.com/sites/daveywinder/2024/03/14/google-password-security-updated-chrome-iphone-ios-password-checker/'
                },
                {
                    name: 'Ars Technica',
                    type: 'news',
                    url: 'https://arstechnica.com/information-technology/2019/10/google-adds-password-checkup-into-web-account-password-manager/'
                },
                {
                    name: 'Sophos',
                    type: 'news',
                    url: 'https://news.sophos.com/en-us/2019/10/03/googles-password-manager-now-checks-for-breached-credentials/'
                }
            ],
            blurb: 'Privacy-preserving password breach checker',
            description: 'Privacy-preserving credential check that alerts users when passwords appear in data breaches, integrated into Chrome and Google Password Manager.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.ANTI_ABUSE, ProjectTag.PRIVACY]
        }
    ]);

    const getProjectById = (id: ProjectId): Project | undefined => {
        return projects.value.find(project => project.id === id);
    };

    return {
        projects,
        getProjectById
    };
});
