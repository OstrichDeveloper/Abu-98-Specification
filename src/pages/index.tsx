import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Abu OS Documentation"
      description="Comprehensive documentation for the Abu OS 98 ecosystem"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--lg">
              <Heading as="h1">Welcome to Abu OS Documentation</Heading>
              <p className="hero__subtitle">
                Complete documentation for the Abu OS 98 ecosystem including Web Kernel, Enterprise, and Service components.
              </p>
            </div>
            <HomepageFeatures />
          </div>
        </div>
      </div>
    </Layout>
  );
}