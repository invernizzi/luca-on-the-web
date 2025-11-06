

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
    // State
    const projects = ref<Project[]>([
        {
            id: ProjectId.CREDENTIAL_ALERTING,
            title: 'Credential Alerting',
            urls: [
                {
                    name: "Blog",
                    type: 'blog',
                    url: 'https://cloud.google.com/blog/products/identity-security/automatically-disabling-leaked-service-account-keys-what-you-need-to-know'
                },
                {
                    name: "Blog",
                    type: 'blog',
                    url: 'https://johnmathews.is/blog/i-leaked-credentials-onto-a-public-github-repo'
                },
            ],
            archived: true,
            award: 'Google Tech Award',
            featured: false,
            blurb: 'Tool for detecting and disabling leaked keys',
            description: 'A tool that automatically detects and disables leaked service account keys and api keys in Google Cloud Platform.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.ANTI_ABUSE] // Added tags based on description
        },
        {
            id: ProjectId.SHATTERED,
            title: 'Shattered',
            urls: [
                {
                    name: "Website",
                    type: 'website',
                    url: 'http://shattered.io/'
                }, {
                    name: "Ars Technica",
                    type: 'news',
                    url: 'https://arstechnica.com/information-technology/2017/02/watershed-sha1-collision-just-broke-the-webkit-repository-others-may-follow/'
                },
                {
                    name: "Forbes",
                    type: 'news',
                    url: 'https://www.forbes.com/sites/thomasbrewster/2017/02/23/google-sha-1-hack-why-it-matters/'
                }, {
                    name: "The Hacker News",
                    type: 'news',
                    url: 'https://thehackernews.com/2017/02/sha1-collision-attack.html'
                },
                {
                    name: "Google Security Blog",
                    type: 'blog',
                    url: 'https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html'
                },
            ],
            archived: true,
            featured: false,
            blurb: 'Breaking the SHA-1 hash function',
            description: 'A research effort to break the SHA-1 hash function in practice, finding a collision. It lead to major browsers and companies moving on from SHA-1.',
            award: 'Pwnie Award',
            tags: [ProjectTag.SECURITY_RESEARCH] // Added tags based on description
        },
        {
            id: ProjectId.KERAS_TUNER,
            title: 'Keras Tuner',
            urls: [
                {
                    name: "Website",
                    type: 'website',
                    url: 'https://keras.io/keras_tuner/'
                },
                {
                    name: "GitHub",
                    type: 'github',
                    url: 'https://github.com/keras-team/keras-tuner'
                }
            ],
            featured: false, // Added missing property
            blurb: 'Hyperparameter optimization for Keras', // Added missing property
            description: 'Keras Tuner is a hyperparameter optimization tool for Keras models. It allows you to find the best hyperparameters for your model by searching over a range of possible values.',
            archived: true,
            tags: [ProjectTag.AI, ProjectTag.OPEN_SOURCE] // Added tags based on description
        },
        {
            id: ProjectId.RANSOMWARE,
            title: 'Ransomware',
            urls: [
                {
                    name: "BBC",
                    type: 'news',
                    url: 'https://www.bbc.com/news/technology-40737060'
                },
                {
                    name: "Threatpost",
                    type: 'news',
                    url: 'https://threatpost.com/google-study-quantifies-ransomware-revenue/127057/'
                },
                {
                    name: "Forbes",
                    type: 'news',
                    url: 'https://www.forbes.com/sites/thomasbrewster/2017/07/25/google-ransomware-multi-million-dollar-business-with-locky-and-cerber/'
                },
                {
                    name: "CCN",
                    type: 'news',
                    url: 'https://www.ccn.com/google-ransomware-extortionists-net-25-million-in-two-years-95-percent-cashed-out-through-btc-e/'
                },
                {
                    name: 'Google Workspace',
                    type: 'blog',
                    url: 'https://workspace.google.com/blog/product-announcements/ai-ransomware-detection-in-google-drive'
                }
            ],
            featured: false, 
            blurb: 'Quantifying ransomware revenue',
            description: 'A study that quantifies the revenue generated by ransomware attacks via crypto-currency payments. Eventually, this lead to detecting ransomware on Google Drive.',
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
                    name: 'Google Security Blog',
                    type: 'blog',
                    url: 'https://security.googleblog.com/2025/04/google-launches-sec-gemini-v1-new.html'
                },
                { 
                    name: 'Google main blog',
                    type: 'blog',
                    url: 'https://blog.google/technology/safety-security/cybersecurity-updates-summer-2025/'
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
                },
                {
                    name: "Google Cloud Blog",
                    type: "blog",
                    url: "https://www.googlecloudcommunity.com/gc/Community-Blog/Fueling-AI-Innovation-in-SecOps-Products-The-SecLM-Platform-and/ba-p/913254"
                }
            ],
            featured: true,
            blurb: 'Research model on agentic security',
            description: 'An experimental AI model focused on advancing cybersecurity AI frontiers to help shift the balance back to the defenders. SecGemini combines advanced ML techniques with security expertise to provide real-time threat detection and analysis.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.AI],
        },
        {
            id: ProjectId.MAGIKA,
            title: 'Magika',
            urls: [
                {
                    name: "Forbes",
                    type: 'news',
                    url: 'https://www.forbes.com/sites/daveywinder/2024/02/15/new-google-security-includes-gmail-magic-protection--ai-cyber-defense-initiative/'
                }, {
                    name: "The Hacker News",
                    type: 'news',
                    url: 'https://thehackernews.com/2024/02/google-open-sources-magika-ai-powered.html'
                },
                {
                    name: "Google Open Source Blog",
                    type: 'blog',
                    url: 'https://opensource.googleblog.com/2024/02/magika-ai-powered-fast-and-efficient-file-type-identification.html'
                },
                {
                    name: "The Register",
                    type: 'news',
                    url: 'https://www.theregister.com/2024/02/15/google_magika_open_source/'
                },
                {
                    name: "Website",
                    type: 'github',
                    url: 'https://google.github.io/magika/'
                },
                {
                    name: "Google Open Source Blog",
                    type: 'blog',
                    url: 'https://opensource.googleblog.com/2025/11/announcing-magika-10-now-faster-smarter.html'
            ],
            featured: true,
            blurb: 'ML-based file type detection system',
            description: 'A state-of-the-art file type detection system that uses machine learning to accurately identify file types. Magika provides fast and reliable file type detection, helping to improve security and user experience. Magika protects Gmail, Drive, Chrome, and it has been adopted by many open source projects.',
            tags: [ProjectTag.ANTI_ABUSE, ProjectTag.AI, ProjectTag.OPEN_SOURCE] // Added OPEN_SOURCE tag
        },
        {
            id: ProjectId.SCAAML,
            title: 'SCAAML',
            featured: false,
            urls: [
                {
                    name: "GitHub",
                    type: 'github',
                    url: 'https://github.com/google/scaaml'
                },
                {
                    name: "Blog",
                    type: 'blog',
                    url: 'https://elie.net/blog/security/hacker-guide-to-deep-learning-side-channel-attacks-code-walkthrough'
                },
                {
                    name: "Blog",
                    type: 'blog',
                    url: 'https://elie.net/publication/generalized-power-attacks-against-crypto-hardware-using-long-range-deep-learning'
                },
            ],
            blurb: 'Side-channel attack analysis with ML',
            description: 'A framework for Side-Channel Analysis with Machine Learning. SCAAML provides tools and methodologies for analyzing side-channel attacks using machine learning techniques.',
            tags: [ProjectTag.HARDWARE_SECURITY, ProjectTag.SECURITY_RESEARCH, ProjectTag.AI, ProjectTag.OPEN_SOURCE] // Added AI and OPEN_SOURCE tags
        },
        {
            id: ProjectId.OPENSK,
            title: 'OpenSK',
            featured: false,
            urls: [
                {
                    name: "GitHub",
                    type: 'github',
                    url: 'https://github.com/google/OpenSK'
                },
                {
                    name: "Google Security Blog",
                    type: 'blog',
                    url: 'https://security.googleblog.com/2020/01/say-hello-to-opensk-fully-open-source.html'
                },
                {
                    name: "Android Police",
                    type: 'news',
                    url: 'https://www.androidpolice.com/2020/01/30/google-releases-open-source-2fa-security-key-platform/'
                },
                {
                    name: "Help Net Security",
                    type: 'news',
                    url: 'https://www.helpnetsecurity.com/2020/01/31/make-security-key/'
                },
                {
                    name: "SecurityWeek",
                    type: 'news',
                    url: 'https://www.securityweek.com/google-open-sources-code-security-key-devices/'
                }
            ],
            blurb: 'Open-source FIDO security key implementation',
            description: 'An open-source implementation of security keys written in Rust that supports both FIDO U2F and FIDO2 standards. OpenSK aims to make security keys more accessible and customizable.',
            tags: [ProjectTag.HARDWARE_SECURITY, ProjectTag.OPEN_SOURCE]
        },
        {
            id: ProjectId.VAXEN,
            title: 'Scam Detection',
            featured: false, 
            urls: [
                {
                    name: "Google Security Blog",
                    type: 'blog',
                    url: 'https://security.googleblog.com/2020/02/improving-malicious-document-detection.html'
                },
                {
                    name: "Wired",
                    type: 'news',
                    url: 'https://www.wired.com/story/gmail-catching-more-malicious-attachments-deep-learning/'
                },
                {
                    name: "GitHub",
                    type: 'github',
                    url: 'https://github.com/google/maldoca'
                }
            ],
            blurb: 'ML-based malicious document detection',
            description: 'A system for detecting malicious documents using machine learning in Gmail, Drive, SafeBrowsing, and VirusTotal.',
            archived: false,
            tags: [ProjectTag.ANTI_ABUSE, ProjectTag.AI, ProjectTag.OPEN_SOURCE] 
        },
        {
            id: ProjectId.PASSWORD_CHECKUP,
            title: 'Password Checkup',
            featured: false,
            urls: [
                {
                    name: "ZDNet",
                    type: 'news',
                    url: 'https://www.zdnet.com/article/google-launches-password-checkup-feature-will-add-it-to-chrome-later-this-year/'
                },
                {
                    name: "Time",
                    type: 'news',
                    url: 'https://time.com/5528092/google-password-checkup-tool-chrome/'
                }, {
                    name: "Forbes",
                    type: 'news',
                    url: 'https://www.forbes.com/sites/daveywinder/2024/03/14/google-password-security-updated-chrome-iphone-ios-password-checker/'
                }, {
                    name: "Ars Technica",
                    type: 'news',
                    url: 'https://arstechnica.com/information-technology/2019/10/google-adds-password-checkup-into-web-account-password-manager/'
                },
                {
                    name: "Sophos",
                    type: 'news',
                    url: 'https://news.sophos.com/en-us/2019/10/03/googles-password-manager-now-checks-for-breached-credentials/'
                }
            ],
            blurb: 'Privacy-focused password breach checker',
            description: 'A privacy-preserving tool that helps users check if their passwords have been compromised in data breaches. Password Checkup uses advanced cryptographic techniques to ensure user privacy while providing security benefits.',
            tags: [ProjectTag.SECURITY_RESEARCH, ProjectTag.ANTI_ABUSE, ProjectTag.PRIVACY]
        }
    ]);

    // Getters
    const getProjectById = (id: ProjectId): Project | undefined => {
        return projects.value.find(project => project.id === id);
    };

    // Return state and getters
    return {
        projects,
        getProjectById
    };
});
