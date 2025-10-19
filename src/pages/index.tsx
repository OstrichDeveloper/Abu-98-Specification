import React from 'react';
import Layout from '@theme/Layout';
import HelpSystem from '@site/src/components/HelpSystem';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Abu OS 98 Help System"
      description="Windows 98 F1 Help System for Abu OS Documentation"
    >
      <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
        <HelpSystem />
      </div>
    </Layout>
  );
}