import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Allowed layout options for each custom page:
 * - "full"        : Header + Footer visible
 * - "header-only" : Header visible, no Footer
 * - "footer-only" : No Header, Footer visible
 * - "none"        : No Header and no Footer
 */
export type PageLayout = 'full' | 'header-only' | 'footer-only' | 'none';

export interface CustomPageConfig {
  path: string;
  title: string;
  layout: PageLayout;
  component: LazyExoticComponent<ComponentType>;
}

/**
 * ============================================================================
 * CUSTOM BLANK PAGES CONFIG
 * ============================================================================
 * To change a page's header/footer visibility, update its `layout` value below.
 * To add a new page later:
 *   1. Create one new page file in `src/pages/` (e.g. `Page11.tsx`)
 *   2. Add one entry to this `CUSTOM_PAGES` list.
 * Routes and the "Pages" dropdown in the menu update automatically.
 * ============================================================================
 */
export const CUSTOM_PAGES: CustomPageConfig[] = [
  {
    path: '/page1',
    title: 'Page 1',
    layout: 'footer-only',
    component: lazy(() => import('../pages/Page1')),
  },
  {
    path: '/page2',
    title: 'Page 2',
    layout: 'footer-only',
    component: lazy(() => import('../pages/Page2')),
  },
  {
    path: '/page3',
    title: 'Page 3',
    layout: 'footer-only',
    component: lazy(() => import('../pages/Page3')),
  },
  {
    path: '/page4',
    title: 'Page 4',
    layout: 'footer-only',
    component: lazy(() => import('../pages/Page4')),
  },
  {
    path: '/page5',
    title: 'Page 5',
    layout: 'footer-only',
    component: lazy(() => import('../pages/Page5')),
  },
  {
    path: '/me',
    title: 'Me',
    layout: 'none',
    component: lazy(() => import('../pages/Page6')),
  },
  {
    path: '/page7',
    title: 'Page 7',
    layout: 'none',
    component: lazy(() => import('../pages/Page7')),
  },
  {
    path: '/page8',
    title: 'Page 8',
    layout: 'header-only',
    component: lazy(() => import('../pages/Page8')),
  },
  {
    path: '/page9',
    title: 'Page 9',
    layout: 'header-only',
    component: lazy(() => import('../pages/Page9')),
  },
  {
    path: '/page10',
    title: 'Page 10',
    layout: 'header-only',
    component: lazy(() => import('../pages/Page10')),
  },
];
