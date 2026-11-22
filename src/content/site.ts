/**
 * ============================================================================
 * BLANKJEEBA SITE CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * Edit this file to update videos, playlist details, social links,
 * bio/copy in English & Hindi, Vision pages, or your achievements list.
 *
 * Step-by-step instructions with examples live in README.md.
 * ============================================================================
 */

export type Language = 'en' | 'hi';

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface VideoItem {
  /** The 11-character YouTube video ID (e.g. "FI202Yv8Bh0") */
  id: string;
  /** Optional fallback title if YouTube oEmbed cannot be reached */
  title?: LocalizedText;
}

export type VisionIconKey =
  | 'youtube'
  | 'photo-download'
  | 'ai-assistant'
  | 'project-jeeba'
  | 'project-dream'
  | 'project-qr';

export interface ComingSoonPageConfig {
  /** URL path without leading slash (e.g. "youtube" -> /youtube and /hi/youtube) */
  slug: string;
  iconKey?: VisionIconKey;
  /** Keep false while "Coming soon" so search engines do not index it yet */
  indexable: boolean;
  title: LocalizedText;
  teaser: LocalizedText;
  description: LocalizedText;
}

export interface PhilosophyItem {
  id: string;
  iconKey: 'compass' | 'sparkles' | 'shield' | 'flame' | 'layers' | 'eye';
  title: LocalizedText;
  quote: LocalizedText;
}

export interface AchievementItem {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
  year?: string;
}

export type SocialPlatformId =
  | 'instagram'
  | 'x'
  | 'facebook'
  | 'whatsapp'
  | 'youtube'
  | 'tiktok'
  | 'reddit'
  | 'linkedin'
  | 'github'
  | 'telegram'
  | 'snapchat'
  | 'pinterest'
  | 'spotify';

export interface SocialLinkItem {
  id: SocialPlatformId;
  name: string;
  url: string;
  /** Brand hover accent color */
  brandColor: string;
  ariaLabel: LocalizedText;
}

export const SITE_CONFIG = {
  /** Core brand & domain metadata */
  brand: {
    name: 'BlankJeeba',
    owner: 'Jitendra Ahirwar',
    domain: 'https://blankjeeba.com',
    email: 'jitendra@blankjeeba.com',
    tagline: {
      en: 'Simplify Everything',
      hi: 'हर चीज़ को सरल बनाना',
    } as LocalizedText,
    copyrightYear: 2026,
  },

  /** Optimized WebP photos (originals preserved in /public/assets/aistudio/) */
  assets: {
    headerAvatar: '/assets/optimized/avatar.webp',
    heroPrimary: '/assets/optimized/hero-1.webp',
    heroSecondary: '/assets/optimized/hero-2.webp',
    portfolioPhoto: '/assets/optimized/portfolio.webp',
    logoSvg: '/assets/aistudio/BlankJeeba_logo_5893802c.svg',
    footerLogo: '/assets/aistudio/BlankJeeba_logo_5893802c.svg',
    jIcon: '/assets/aistudio/BlankJeeba_icon_ec4022c9.png',
    jSymbol: '/j-symbol.svg',
    ogImage: 'https://blankjeeba.com/og-image.png',
  },

  /** Top header navigation (English & Hindi) */
  nav: {
    home: { en: 'Home', hi: 'होम' },
    videos: { en: 'Videos', hi: 'वीडियो' },
    about: { en: 'About', hi: 'परिचय' },
    contact: { en: 'Contact', hi: 'संपर्क' },
  },

  /** Home page Hero section */
  hero: {
    headline: {
      en: 'BlankJeeba',
      hi: 'BlankJeeba',
    },
    subline: {
      en: 'Simplify Everything',
      hi: 'Simplify Everything · हर चीज़ सरल बनाएं',
    },
    description: {
      en: 'Making AI and tech simple, one video at a time.',
      hi: 'एक समय में एक वीडियो के ज़रिए AI और टेक को सरल बनाना।',
    },
    primaryCta: {
      label: { en: 'Subscribe on YouTube', hi: 'YouTube पर सब्सक्राइब करें' },
      url: 'https://www.youtube.com/@blankjeeba?sub_confirmation=1',
    },
    secondaryCta: {
      label: { en: 'Follow on Instagram', hi: 'Instagram पर फ़ॉलो करें' },
      url: 'https://instagram.com/blankjeeba',
    },
  },

  /**
   * ==========================================================================
   * FEATURED VIDEOS (NEWEST FIRST)
   * To add a new video, paste its 11-character YouTube ID at the TOP of this list.
   * ==========================================================================
   */
  featuredVideos: [
    { id: 'FI202Yv8Bh0' },
    { id: '8fLK5sGqG1A' },
    { id: '7DAp4haZVCU' },
    { id: '0vMMCH6Vkn8' },
    { id: 'GEGLV95Ps7w' },
  ] as VideoItem[],

  /** Live YouTube playlist placed at the end of /videos */
  playlist: {
    id: 'PLWHRjcOaoWBkSIvA7QZkW_BnlWVjOFLpl',
    title: {
      en: 'Tutorials and AI Videos',
      hi: 'ट्यूटोरियल और AI वीडियो',
    } as LocalizedText,
    buttonLabel: {
      en: 'View full playlist on YouTube',
      hi: 'YouTube पर पूरी प्लेलिस्ट देखें',
    } as LocalizedText,
  },

  /** Videos section & page copy */
  videosCopy: {
    homeSectionTitle: { en: 'Featured Videos', hi: 'चुनिंदा वीडियो' },
    homeSectionSubtitle: {
      en: 'Practical AI guides and tech walkthroughs, newest first.',
      hi: 'व्यावहारिक AI गाइड और टेक वीडियो, सबसे नए से शुरू।',
    },
    viewAllButton: { en: 'Explore all videos', hi: 'सभी वीडियो देखें' },
    pageTitle: { en: 'Videos & Tutorials', hi: 'वीडियो और ट्यूटोरियल' },
    pageIntro: {
      en: 'Watch my latest AI tutorials, walkthroughs, and the live YouTube playlist that updates as new videos go up.',
      hi: 'मेरे नवीनतम AI ट्यूटोरियल, गाइड और लाइव YouTube प्लेलिस्ट देखें जो हर नए वीडियो के साथ अपने आप अपडेट होती है।',
    },
    watchFallback: { en: 'Watch on YouTube', hi: 'YouTube पर देखें' },
    playLabel: { en: 'Play video', hi: 'वीडियो चलाएं' },
    featuredLabel: { en: 'Latest', hi: 'नवीनतम' },
  },

  /** Vision statement & six Vision teaser pages */
  vision: {
    sectionTitle: { en: 'My Vision', hi: 'मेरा विज़न' },
    statement: {
      en: 'I love AI research, technology, and solving digital problems. My vision is to build simple, powerful tools and products that give everyone easy access to the best of AI, and to make the complicated simple.',
      hi: 'मुझे AI रिसर्च, टेक्नोलॉजी और डिजिटल समस्याओं को सुलझाना पसंद है। मेरा विज़न ऐसे सरल और शक्तिशाली टूल्स व प्रोडक्ट्स बनाना है जो हर किसी को AI की बेहतरीन क्षमताओं तक आसान पहुँच दें—और जटिल चीज़ों को सरल बनाएं।',
    } as LocalizedText,
    items: [
      {
        slug: 'youtube',
        iconKey: 'youtube',
        indexable: false,
        title: { en: 'YouTube', hi: 'YouTube' },
        teaser: {
          en: 'AI and tech made simple, on video.',
          hi: 'AI और टेक की सरल समझ, वीडियो के ज़रिए।',
        },
        description: {
          en: 'A dedicated hub for step-by-step AI explainers, tool comparisons, and practical tech workflows is taking shape here.',
          hi: 'चरण-दर-चरण AI गाइड, टूल्स की तुलना और व्यावहारिक टेक वर्कफ़्लो के लिए एक समर्पित हब यहाँ तैयार हो रहा है।',
        },
      },
      {
        slug: 'photo-download',
        iconKey: 'photo-download',
        indexable: false,
        title: { en: 'Photo Download', hi: 'Photo Download' },
        teaser: {
          en: 'My photography, free to download.',
          hi: 'मेरी फ़ोटोग्राफ़ी, मुफ़्त डाउनलोड के लिए।',
        },
        description: {
          en: 'A clean gallery of original travel and street frames shot on my journeys, free for creators to download and use.',
          hi: 'मेरी यात्राओं की मूल फ़ोटो का एक साफ़-सुथरा संग्रह, जिसे क्रिएटर्स मुफ़्त में डाउनलोड और इस्तेमाल कर सकेंगे।',
        },
      },
      {
        slug: 'ai-assistant',
        iconKey: 'ai-assistant',
        indexable: false,
        title: { en: 'AI Assistant', hi: 'AI Assistant' },
        teaser: {
          en: 'An easy AI helper, built my way.',
          hi: 'एक आसान AI सहायक, मेरे अपने तरीके से बना।',
        },
        description: {
          en: 'A calm, uncluttered AI companion designed for clear everyday answers without prompt jargon or complex menus.',
          hi: 'रोज़मर्रा के सवालों के साफ़ जवाब देने वाला एक शांत और सरल AI साथी, बिना किसी जटिल सेटिंग के।',
        },
      },
      {
        slug: 'project-jeeba',
        iconKey: 'project-jeeba',
        indexable: false,
        title: { en: 'Project Jeeba', hi: 'Project Jeeba' },
        teaser: {
          en: 'The big idea behind the brand.',
          hi: 'इस ब्रांड के पीछे की बड़ी सोच।',
        },
        description: {
          en: 'Where tools, tutorials, and creative experiments connect into one unified ecosystem built around simplifying technology.',
          hi: 'जहाँ टूल्स, ट्यूटोरियल और क्रिएटिव प्रयोग जुड़कर टेक्नोलॉजी को आसान बनाने वाला एक साझा इकोसिस्टम बनाते हैं।',
        },
      },
      {
        slug: 'project-dream',
        iconKey: 'project-dream',
        indexable: false,
        title: { en: 'Project Dream', hi: 'Project Dream' },
        teaser: {
          en: 'Something I am dreaming up.',
          hi: 'कुछ ऐसा जिसे मैं आकार देने का सपना देख रहा हूँ।',
        },
        description: {
          en: 'An early-stage long-term idea exploring how thoughtful software can feel more human and effortless.',
          hi: 'एक शुरुआती चरण का दीर्घकालिक विचार, जो सॉफ्टवेयर को अधिक सहज और मानवीय बनाने की दिशा में है।',
        },
      },
      {
        slug: 'project-qr',
        iconKey: 'project-qr',
        indexable: false,
        title: { en: 'Project QR', hi: 'Project QR' },
        teaser: {
          en: 'Small tools that do one thing well.',
          hi: 'छोटे टूल्स जो एक काम को बेहतरीन तरीके से करें।',
        },
        description: {
          en: 'Fast, single-purpose utility micro-tools starting with clean QR generation—no sign-ups, no clutter.',
          hi: 'तेज़ और एकल-उद्देश्य वाले छोटे यूटिलिटी टूल्स, साफ़ QR जनरेशन से शुरुआत—बिना साइन-अप और बिना उलझन।',
        },
      },
    ] as ComingSoonPageConfig[],
  },

  /** Four personal sandbox pages (public, noindex, hidden from menu & sitemap) */
  personalPages: [
    {
      slug: 'lab',
      indexable: false,
      title: { en: 'Lab', hi: 'लैब' },
      teaser: {
        en: 'Experiments, prototypes, and AI tests.',
        hi: 'प्रयोग, प्रोटोटाइप और AI परीक्षण।',
      },
      description: {
        en: 'A quiet workspace for testing small interactive prototypes and ideas before they become public tools.',
        hi: 'छोटे इंटरैक्टिव प्रोटोटाइप और विचारों को सार्वजनिक करने से पहले परखने की एक शांत जगह।',
      },
    },
    {
      slug: 'notes',
      indexable: false,
      title: { en: 'Notes', hi: 'नोट्स' },
      teaser: {
        en: 'Short learnings on AI, tech, and clarity.',
        hi: 'AI, टेक और स्पष्टता पर संक्षिप्त नोट्स।',
      },
      description: {
        en: 'Personal field notes and distilled lessons gathered while researching and building.',
        hi: 'रिसर्च और निर्माण के दौरान सीखे गए व्यक्तिगत अनुभव और संक्षिप्त नोट्स।',
      },
    },
    {
      slug: 'ideas',
      indexable: false,
      title: { en: 'Ideas', hi: 'विचार' },
      teaser: {
        en: 'Rough concepts waiting for their turn.',
        hi: 'वे शुरुआती विचार जो अपनी बारी का इंतज़ार कर रहे हैं।',
      },
      description: {
        en: 'An open notebook of product sparks, video series concepts, and digital problems worth solving.',
        hi: 'प्रोडक्ट आइडियाज़, वीडियो सीरीज़ और सुलझाने लायक डिजिटल समस्याओं की एक खुली नोटबुक।',
      },
    },
    {
      slug: 'playground',
      indexable: false,
      title: { en: 'Playground', hi: 'प्लेग्राउंड' },
      teaser: {
        en: 'Interactive UI and motion sandboxes.',
        hi: 'इंटरैक्टिव UI और मोशन सैंडबॉक्स।',
      },
      description: {
        en: 'A testbed for micro-interactions, typography experiments, and creative front-end demos.',
        hi: 'माइक्रो-इंटरैक्शन, टाइपोग्राफी प्रयोगों और क्रिएटिव फ्रंट-एंड डेमो के लिए एक परीक्षण स्थान।',
      },
    },
  ] as ComingSoonPageConfig[],

  /** Philosophy cards ("What I believe" — never attributed to any named person) */
  philosophy: {
    sectionTitle: { en: 'What I believe', hi: 'मेरे विचार और विश्वास' },
    readMoreLabel: { en: 'Read all beliefs & story', hi: 'मेरी कहानी और सभी विचार पढ़ें' },
    items: [
      {
        id: 'experience',
        iconKey: 'compass',
        title: { en: 'Experience over belief.', hi: 'विश्वास से ऊपर अनुभव।' },
        quote: {
          en: "I don't accept anything just because it is said. I trust what I have tested and experienced myself.",
          hi: 'मैं किसी बात को सिर्फ़ इसलिए नहीं मानता क्योंकि वह कही गई है। मैं उस पर भरोसा करता हूँ जिसे मैंने खुद परखा और अनुभव किया है।',
        },
      },
      {
        id: 'universe',
        iconKey: 'sparkles',
        title: { en: 'You are the universe.', hi: 'आप ही ब्रह्मांड हैं।' },
        quote: {
          en: 'You are not separate from the universe. You are the universe experiencing itself.',
          hi: 'आप ब्रह्मांड से अलग नहीं हैं। आप स्वयं ब्रह्मांड हैं जो खुद को अनुभव कर रहा है।',
        },
      },
      {
        id: 'confidence',
        iconKey: 'shield',
        title: { en: 'Believe in yourself.', hi: 'खुद पर भरोसा रखें।' },
        quote: {
          en: 'Confidence is not about knowing everything. It is trusting that you can figure it out.',
          hi: 'आत्मविश्वास का मतलब सब कुछ जानना नहीं है। इसका मतलब यह भरोसा है कि आप रास्ता निकाल सकते हैं।',
        },
      },
      {
        id: 'impossible',
        iconKey: 'flame',
        title: { en: 'Nothing is impossible.', hi: 'कुछ भी असंभव नहीं है।' },
        quote: {
          en: 'Most limits are drawn in the mind first. Start, and the path shows up.',
          hi: 'ज़्यादातर सीमाएँ पहले मन में बनती हैं। शुरुआत कीजिए, रास्ता खुद दिखने लगता है।',
        },
      },
      {
        id: 'simplify',
        iconKey: 'layers',
        title: { en: 'Simplify everything.', hi: 'हर चीज़ को सरल बनाएं।' },
        quote: {
          en: 'If something feels complicated, it has not been explained well yet.',
          hi: 'अगर कोई बात जटिल लगती है, तो अभी उसे सही तरीके से समझाया नहीं गया है।',
        },
      },
      {
        id: 'beginners-mind',
        iconKey: 'eye',
        title: { en: "Beginner's mind.", hi: 'जिज्ञासु और खुला मन।' },
        quote: {
          en: 'Stay blank, stay open. There is always more to learn, and that keeps me curious.',
          hi: 'मन को साफ़ और खुला रखें। सीखने के लिए हमेशा कुछ नया होता है, और यही मुझे जिज्ञासु रखता है।',
        },
      },
    ] as PhilosophyItem[],
  },

  /** About page content (bio + Beyond AI + optional Achievements) */
  about: {
    heading: { en: 'About Jitendra Ahirwar', hi: 'जितेन्द्र अहिरवार के बारे में' },
    subheading: {
      en: 'Creator behind BlankJeeba · AI, technology & digital clarity',
      hi: 'BlankJeeba के पीछे की सोच · AI, टेक्नोलॉजी और डिजिटल सरलता',
    },
    bioParagraphs: {
      en: [
        "I'm Jitendra Ahirwar, the person behind BlankJeeba. I go deep into whatever I pick up, and right now that is AI.",
        'With around 9 years in technology and 2+ years working closely with AI, I turn what I learn into simple videos, tutorials, and practical tools.',
        'Before this, I spent years teaching English—guiding 1,000+ students online and 200+ offline—and that is where I learned that anything can be explained simply. I also love photography, travel, and films. BlankJeeba is where all of it comes together.',
      ],
      hi: [
        'मैं जितेन्द्र अहिरवार हूँ, BlankJeeba के पीछे का व्यक्ति। मैं जिस भी विषय को चुनता हूँ उसकी गहराई तक जाता हूँ, और अभी मेरा पूरा ध्यान AI पर है।',
        'टेक्नोलॉजी में लगभग 9 वर्षों और AI के साथ 2+ वर्षों के अनुभव के साथ, मैं जो सीखता हूँ उसे सरल वीडियो, ट्यूटोरियल और उपयोगी टूल्स में बदलता हूँ।',
        'इससे पहले मैंने वर्षों तक अंग्रेज़ी पढ़ाई—1,000+ छात्रों को ऑनलाइन और 200+ छात्रों को ऑफ़लाइन पढ़ाया—और वहीं मैंने सीखा कि किसी भी विषय को सरल भाषा में समझाया जा सकता है। मुझे फ़ोटोग्राफ़ी, यात्रा और फ़िल्में भी बेहद पसंद हैं। BlankJeeba वह जगह है जहाँ यह सब एक साथ आता है।',
      ],
    },
    beyondAiTitle: { en: 'Beyond AI', hi: 'AI से परे' },
    beyondAiItems: [
      {
        key: 'teaching',
        title: { en: 'Teaching', hi: 'शिक्षण' },
        detail: {
          en: 'Years of teaching English to 1,000+ online and 200+ offline learners shaped how I break down complex ideas.',
          hi: '1,000+ ऑनलाइन और 200+ ऑफ़लाइन छात्रों को अंग्रेज़ी पढ़ाने के अनुभव ने सिखाया कि जटिल विचारों को आसान कैसे बनाया जाए।',
        },
      },
      {
        key: 'photography',
        title: { en: 'Photography', hi: 'फ़ोटोग्राफ़ी' },
        detail: {
          en: 'Capturing candid moments, architecture, and light—soon shared free to download on BlankJeeba.',
          hi: 'सहज पलों, वास्तुकला और रोशनी को कैमरे में क़ैद करना—जिसे जल्द ही मुफ़्त डाउनलोड के लिए साझा किया जाएगा।',
        },
      },
      {
        key: 'travel',
        title: { en: 'Travel', hi: 'यात्रा' },
        detail: {
          en: 'Exploring new cities and perspectives keeps curiosity alive and ideas fresh.',
          hi: 'नए शहरों और नए नज़रियों की खोज जिज्ञासा को जीवित और विचारों को ताज़ा रखती है।',
        },
      },
      {
        key: 'films',
        title: { en: 'Films', hi: 'फ़िल्में' },
        detail: {
          en: 'Studying storytelling, pacing, and visual craft in cinema shapes how I edit and structure videos.',
          hi: 'सिनेमा में कहानी कहने की कला, गति और विज़ुअल क्राफ़्ट मेरे वीडियो बनाने के तरीके को आकार देते हैं।',
        },
      },
    ],
    achievementsTitle: { en: 'Achievements & Milestones', hi: 'उपलब्धियाँ और पड़ाव' },
    /**
     * Leave empty (`[]`) to keep the Achievements section hidden.
     * Add items anytime (instructions in README.md) and the section appears automatically.
     */
    achievements: [] as AchievementItem[],
    allLinksTitle: { en: 'All my links', hi: 'मेरे सभी लिंक' },
    otherPlacesTitle: { en: 'Other places', hi: 'अन्य प्लेटफॉर्म' },
  },

  /** Contact page copy */
  contact: {
    heading: { en: 'Get in touch', hi: 'संपर्क करें' },
    intro: {
      en: 'For collaborations, questions, or feedback on a video or tool, reach out directly by email or connect on any platform below.',
      hi: 'सहयोग, सवाल या किसी वीडियो व टूल पर फ़ीडबैक के लिए सीधे ईमेल करें या नीचे दिए गए किसी भी प्लेटफॉर्म पर जुड़ें।',
    },
    emailLabel: { en: 'Direct Email', hi: 'सीधा ईमेल' },
    copyLabel: { en: 'Copy email', hi: 'ईमेल कॉपी करें' },
    copiedLabel: { en: 'Copied!', hi: 'कॉपी हो गया!' },
    openMailLabel: { en: 'Send an email', hi: 'ईमेल भेजें' },
    socialHeading: { en: 'Connect online', hi: 'ऑनलाइन जुड़ें' },
  },

  /** Coming soon & 404 copy */
  comingSoon: {
    line: { en: 'This page is coming soon.', hi: 'यह पेज जल्द आ रहा है।' },
    backButton: { en: 'Back to Home', hi: 'होम पर लौटें' },
    backPrevious: { en: 'Go back', hi: 'वापस जाएं' },
  },
  notFound: {
    code: '404',
    title: { en: 'Page not found', hi: 'पेज नहीं मिला' },
    message: {
      en: "The page you're looking for doesn't exist or may have moved.",
      hi: 'आप जिस पेज को खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया है।',
    },
    backHome: { en: 'Return to BlankJeeba Home', hi: 'BlankJeeba होम पर जाएं' },
  },

  /** Home "Find me online" & Footer labels */
  findMeOnline: {
    title: { en: 'Find me online', hi: 'मुझसे ऑनलाइन जुड़ें' },
    morePlaces: { en: 'More places', hi: 'अन्य प्लेटफॉर्म' },
  },

  /**
   * ==========================================================================
   * SOCIAL LINKS
   * Showcase: ONLY X, Instagram, Facebook, WhatsApp Channel (large icon buttons).
   * Other places: Shown as a smaller icon row on About and Contact only.
   * ==========================================================================
   */
  social: {
    showcase: [
      {
        id: 'x',
        name: 'X',
        url: 'https://x.com/blankjeeba',
        brandColor: '#F3F4F8',
        ariaLabel: { en: 'Follow BlankJeeba on X', hi: 'X पर BlankJeeba को फ़ॉलो करें' },
      },
      {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/blankjeeba',
        brandColor: '#E4405F',
        ariaLabel: { en: 'Follow BlankJeeba on Instagram', hi: 'Instagram पर BlankJeeba को फ़ॉलो करें' },
      },
      {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://www.facebook.com/BlankJeeba',
        brandColor: '#1877F2',
        ariaLabel: { en: 'Follow BlankJeeba on Facebook', hi: 'Facebook पर BlankJeeba को फ़ॉलो करें' },
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp Channel',
        url: 'https://whatsapp.com/channel/0029VaDeq8vIN9ix8Vqz7L1a',
        brandColor: '#25D366',
        ariaLabel: { en: 'Join BlankJeeba WhatsApp Channel', hi: 'BlankJeeba WhatsApp चैनल से जुड़ें' },
      },
    ] as SocialLinkItem[],

    otherPlaces: [
      {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com/@blankjeeba',
        brandColor: '#FF0000',
        ariaLabel: { en: 'Subscribe to BlankJeeba on YouTube', hi: 'YouTube पर BlankJeeba को सब्सक्राइब करें' },
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        url: 'https://tiktok.com/@blankjeeba',
        brandColor: '#FE2C55',
        ariaLabel: { en: 'BlankJeeba on TikTok', hi: 'TikTok पर BlankJeeba' },
      },
      {
        id: 'reddit',
        name: 'Reddit',
        url: 'https://www.reddit.com/user/blankjeeba',
        brandColor: '#FF4500',
        ariaLabel: { en: 'BlankJeeba on Reddit', hi: 'Reddit पर BlankJeeba' },
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/blankjeeba',
        brandColor: '#0A66C2',
        ariaLabel: { en: 'BlankJeeba on LinkedIn', hi: 'LinkedIn पर BlankJeeba' },
      },
      {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/BlankJeeba',
        brandColor: '#F3F4F8',
        ariaLabel: { en: 'BlankJeeba on GitHub', hi: 'GitHub पर BlankJeeba' },
      },
      {
        id: 'telegram',
        name: 'Telegram',
        url: 'https://t.me/blankjeeba',
        brandColor: '#26A5E4',
        ariaLabel: { en: 'BlankJeeba on Telegram', hi: 'Telegram पर BlankJeeba' },
      },
      {
        id: 'snapchat',
        name: 'Snapchat',
        url: 'https://www.snapchat.com/@blankjeeba',
        brandColor: '#FFFC00',
        ariaLabel: { en: 'BlankJeeba on Snapchat', hi: 'Snapchat पर BlankJeeba' },
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        url: 'https://www.pinterest.com/blankjeeba',
        brandColor: '#BD081C',
        ariaLabel: { en: 'BlankJeeba on Pinterest', hi: 'Pinterest पर BlankJeeba' },
      },
      {
        id: 'spotify',
        name: 'Spotify',
        url: 'https://open.spotify.com/user/31ddxfazeop2t2nalsxljg4ieo4u',
        brandColor: '#1DB954',
        ariaLabel: { en: 'BlankJeeba on Spotify', hi: 'Spotify पर BlankJeeba' },
      },
    ] as SocialLinkItem[],
  },

  /** Per-route SEO metadata */
  seo: {
    home: {
      title: {
        en: 'BlankJeeba | Simplify Everything: AI, Tech and Creator',
        hi: 'BlankJeeba | हर चीज़ सरल बनाएं: AI, टेक और क्रिएटर',
      },
      description: {
        en: 'Making AI and tech simple, one video at a time. Official website of Jitendra Ahirwar (BlankJeeba) featuring tutorials, vision projects, and links.',
        hi: 'एक समय में एक वीडियो के ज़रिए AI और टेक को सरल बनाना। जितेन्द्र अहिरवार (BlankJeeba) की आधिकारिक वेबसाइट—वीडियो, विज़न प्रोजेक्ट्स और सभी लिंक।',
      },
    },
    videos: {
      title: {
        en: 'Videos & AI Tutorials | BlankJeeba',
        hi: 'वीडियो और AI ट्यूटोरियल | BlankJeeba',
      },
      description: {
        en: 'Watch the latest AI tutorials, tech explainers, and the live BlankJeeba YouTube playlist.',
        hi: 'BlankJeeba के नवीनतम AI ट्यूटोरियल, टेक गाइड और लाइव YouTube प्लेलिस्ट देखें।',
      },
    },
    about: {
      title: {
        en: 'About Jitendra Ahirwar | BlankJeeba',
        hi: 'जितेन्द्र अहिरवार का परिचय | BlankJeeba',
      },
      description: {
        en: 'Learn about Jitendra Ahirwar—9 years in technology, 2+ years in AI, creator of BlankJeeba, philosophy, photography, and links.',
        hi: 'जितेन्द्र अहिरवार के बारे में जानें—टेक्नोलॉजी में 9 साल, AI में 2+ साल, BlankJeeba की कहानी, विचार और सभी सोशल लिंक।',
      },
    },
    contact: {
      title: {
        en: 'Contact | BlankJeeba',
        hi: 'संपर्क | BlankJeeba',
      },
      description: {
        en: 'Reach Jitendra Ahirwar (BlankJeeba) directly at jitendra@blankjeeba.com or connect across social platforms.',
        hi: 'जितेन्द्र अहिरवार (BlankJeeba) से सीधे jitendra@blankjeeba.com पर या सोशल मीडिया के ज़रिए संपर्क करें।',
      },
    },
  },
} as const;
