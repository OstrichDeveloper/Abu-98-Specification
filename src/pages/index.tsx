import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.win98Window}>
          <div className={styles.win98Titlebar}>
            <div className={styles.win98TitlebarLeft}>
              <div className={styles.win98Icon}></div>
              <span className={styles.win98Title}>Abu 98 Specification</span>
            </div>
            <div className={styles.win98TitlebarRight}>
              <div className={styles.win98Button}></div>
              <div className={styles.win98Button}></div>
              <div className={styles.win98Button}></div>
            </div>
          </div>
          <div className={styles.win98Content}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Exploring - 5min ⏱️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Complete documentation for the Abu 98 ecosystem - Web Kernel, Enterprise Dashboard, and Service">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
