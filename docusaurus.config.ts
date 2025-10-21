import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Abu OS Documentation',
  tagline: 'Complete documentation for the Abu OS ecosystem',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ostrichdeveloper.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Abu-98-Specification/',
  
  // Custom routing for dual serving architecture
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OstrichDeveloper', // Usually your GitHub org/user name.
  projectName: 'Abu-98-Specification', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/melalawi/Abu-Specification/tree/main/',
        },
        blog: false,
        pages: {
          path: 'src/pages',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './src/plugins/dual-architecture-plugin.js',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Abu OS',
      logo: {
        alt: 'Abu OS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'designSidebar',
          position: 'left',
          label: 'Design',
        },
        {
          type: 'docSidebar',
          sidebarId: 'specificationsSidebar',
          position: 'left',
          label: 'Specifications',
        },
        {
          type: 'docSidebar',
          sidebarId: 'kernelSidebar',
          position: 'left',
          label: 'Web Kernel',
        },
        {
          type: 'docSidebar',
          sidebarId: 'enterpriseSidebar',
          position: 'left',
          label: 'Enterprise',
        },
        {
          type: 'docSidebar',
          sidebarId: 'serviceSidebar',
          position: 'left',
          label: 'Service',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sharedSidebar',
          position: 'left',
          label: 'Shared',
        },
        {
          to: '/demo.html',
          label: 'Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/melalawi/Abu-Specification',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Design System',
              to: '/docs/design',
            },
            {
              label: 'Specifications',
              to: '/docs/specifications',
            },
          ],
        },
        {
          title: 'Packages',
          items: [
            {
              label: 'Web Kernel',
              to: '/docs/abu-web-kernel',
            },
            {
              label: 'Enterprise',
              to: '/docs/abu-enterprise',
            },
            {
              label: 'Service',
              to: '/docs/abu-service',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/melalawi',
            },
            {
              label: 'Shared Docs',
              to: '/docs/shared',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Abu OS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
