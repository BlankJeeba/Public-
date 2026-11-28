import { SITE_CONFIG, type SocialPlatformId } from '../content/site';

/**
 * ============================================================================
 * BLANKJEEBA /ME — LINKS & TABS DATA FILE
 * ============================================================================
 * How to edit this file (no coding knowledge needed):
 *
 * 1. ADD A LINK:
 *    Find the tab you want (for example "AI" or "Shopping"), then copy one
 *    line inside `links: [ ... ]` and paste it below with the new name and URL:
 *      { name: 'Perplexity', url: 'https://www.perplexity.ai' },
 *
 * 2. RENAME A LINK:
 *    Change the text inside `name: '...'`.
 *
 * 3. REMOVE A LINK:
 *    Delete the entire `{ name: '...', url: '...' },` line.
 *
 * 4. LOGO / ICON:
 *    Logos load automatically from the website address. You do NOT need to
 *    upload any image. (Optional: add `faviconDomain: 'example.com'` if a
 *    site's icon lives on a different main domain.)
 * ============================================================================
 */

export type MeTabId =
  | 'home'
  | 'search'
  | 'google'
  | 'office'
  | 'ai'
  | 'media'
  | 'news'
  | 'shopping'
  | 'govt'
  | 'games'
  | 'telecom'
  | 'privacy';

export interface MeLinkItem {
  name: string;
  url: string;
  /** Optional override for favicon lookup domain */
  faviconDomain?: string;
  /** Used for BlankJeeba's own social tiles so they reuse the site's vector icons */
  socialId?: SocialPlatformId;
  /** Brand tint for social vector icons */
  brandColor?: string;
}

export interface MeLinkSection {
  /** Optional small heading shown above this grid (leave empty for no heading) */
  title?: string;
  links: MeLinkItem[];
}

export interface MeTabConfig {
  id: MeTabId;
  label: string;
  sections: MeLinkSection[];
}

/** Reuse the exact social URLs already defined in src/content/site.ts */
function getSiteSocialLink(id: SocialPlatformId, displayName?: string): MeLinkItem {
  const allSocials = [...SITE_CONFIG.social.showcase, ...SITE_CONFIG.social.otherPlaces];
  const found = allSocials.find((item) => item.id === id);

  return {
    name: displayName ?? found?.name ?? id,
    url: found?.url ?? 'https://blankjeeba.com',
    socialId: id,
    brandColor: found?.brandColor,
  };
}

export const ME_TABS: MeTabConfig[] = [
  {
    id: 'home',
    label: 'Home',
    sections: [
      {
        title: 'Social',
        links: [
          getSiteSocialLink('instagram', 'Instagram'),
          getSiteSocialLink('x', 'X'),
          getSiteSocialLink('facebook', 'Facebook'),
          getSiteSocialLink('telegram', 'Telegram'),
          getSiteSocialLink('whatsapp', 'WhatsApp'),
          getSiteSocialLink('youtube', 'YouTube'),
        ],
      },
    ],
  },
  {
    id: 'search',
    label: 'Search',
    sections: [
      {
        links: [
          { name: 'Google', url: 'https://www.google.com' },
          { name: 'Bing', url: 'https://www.bing.com' },
          { name: 'DuckDuckGo', url: 'https://duckduckgo.com' },
          { name: 'Yahoo', url: 'https://search.yahoo.com' },
          { name: 'Brave Search', url: 'https://search.brave.com', faviconDomain: 'brave.com' },
          { name: 'Ecosia', url: 'https://www.ecosia.org' },
        ],
      },
    ],
  },
  {
    id: 'google',
    label: 'Google',
    sections: [
      {
        links: [
          { name: 'Gmail', url: 'https://mail.google.com', faviconDomain: 'gmail.com' },
          { name: 'Drive', url: 'https://drive.google.com' },
          { name: 'Maps', url: 'https://maps.google.com' },
          { name: 'Photos', url: 'https://photos.google.com' },
          { name: 'Translate', url: 'https://translate.google.com' },
          { name: 'Docs', url: 'https://docs.google.com' },
          { name: 'Calendar', url: 'https://calendar.google.com' },
        ],
      },
    ],
  },
  {
    id: 'office',
    label: 'Office',
    sections: [
      {
        links: [
          { name: 'Word', url: 'https://www.office.com/launch/word', faviconDomain: 'word.cloud.microsoft' },
          { name: 'Excel', url: 'https://www.office.com/launch/excel', faviconDomain: 'excel.cloud.microsoft' },
          { name: 'PowerPoint', url: 'https://www.office.com/launch/powerpoint', faviconDomain: 'powerpoint.cloud.microsoft' },
          { name: 'Outlook', url: 'https://outlook.live.com' },
          { name: 'OneDrive', url: 'https://onedrive.live.com' },
          { name: 'Teams', url: 'https://teams.microsoft.com' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    sections: [
      {
        links: [
          { name: 'Claude', url: 'https://claude.ai' },
          { name: 'Gemini', url: 'https://gemini.google.com' },
          { name: 'ChatGPT', url: 'https://chatgpt.com' },
        ],
      },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    sections: [
      {
        title: 'Music',
        links: [
          { name: 'YouTube Music', url: 'https://music.youtube.com' },
          { name: 'Apple Music', url: 'https://music.apple.com' },
          { name: 'Spotify', url: 'https://open.spotify.com' },
        ],
      },
      {
        title: 'Videos',
        links: [
          { name: 'Netflix', url: 'https://www.netflix.com' },
          { name: 'Hotstar', url: 'https://www.hotstar.com' },
          { name: 'Prime Video', url: 'https://www.primevideo.com' },
        ],
      },
    ],
  },
  {
    id: 'news',
    label: 'News',
    sections: [
      {
        title: 'English',
        links: [
          { name: 'BBC News', url: 'https://www.bbc.com/news' },
          { name: 'NDTV', url: 'https://www.ndtv.com' },
          { name: 'The Hindu', url: 'https://www.thehindu.com' },
          { name: 'Times of India', url: 'https://timesofindia.indiatimes.com' },
        ],
      },
      {
        title: 'Hindi',
        links: [
          { name: 'Dainik Bhaskar', url: 'https://www.bhaskar.com' },
          { name: 'Aaj Tak', url: 'https://www.aajtak.in' },
          { name: 'Amar Ujala', url: 'https://www.amarujala.com' },
          { name: 'Navbharat Times', url: 'https://navbharattimes.indiatimes.com' },
        ],
      },
    ],
  },
  {
    id: 'shopping',
    label: 'Shopping',
    sections: [
      {
        links: [
          { name: 'Amazon', url: 'https://www.amazon.in' },
          { name: 'Flipkart', url: 'https://www.flipkart.com' },
          { name: 'Meesho', url: 'https://www.meesho.com' },
          { name: 'Myntra', url: 'https://www.myntra.com' },
          { name: 'Ajio', url: 'https://www.ajio.com' },
        ],
      },
    ],
  },
  {
    id: 'govt',
    label: 'Govt',
    sections: [
      {
        links: [
          { name: 'DigiLocker', url: 'https://www.digilocker.gov.in' },
          { name: 'Aadhaar / UIDAI', url: 'https://uidai.gov.in' },
          {
            name: 'PAN',
            url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
          },
          { name: 'UMANG', url: 'https://web.umang.gov.in' },
          { name: 'India.gov.in', url: 'https://www.india.gov.in' },
          { name: 'IRCTC', url: 'https://www.irctc.co.in' },
          { name: 'Income Tax', url: 'https://www.incometax.gov.in' },
        ],
      },
    ],
  },
  {
    id: 'games',
    label: 'Games',
    sections: [
      {
        links: [
          { name: 'Slow Roads', url: 'https://slowroads.io' },
          { name: 'Chess', url: 'https://www.chess.com' },
          { name: 'Sudoku', url: 'https://sudoku.com' },
          { name: '2048', url: 'https://play2048.co' },
          {
            name: 'Wordle',
            url: 'https://www.nytimes.com/games/wordle/index.html',
            faviconDomain: 'nytimes.com',
          },
        ],
      },
    ],
  },
  {
    id: 'telecom',
    label: 'Telecom',
    sections: [
      {
        links: [
          { name: 'MyJio', url: 'https://www.jio.com' },
          { name: 'Jio Cloud', url: 'https://www.jiocloud.com' },
          { name: 'JioTV', url: 'https://www.jiotv.com' },
          { name: 'Vi App', url: 'https://www.myvi.in' },
        ],
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    sections: [
      {
        links: [
          { name: 'Proton VPN', url: 'https://protonvpn.com' },
          { name: 'Proton Mail', url: 'https://proton.me/mail', faviconDomain: 'proton.me' },
        ],
      },
    ],
  },
];
