import React from 'react';
import Layout from '@theme/Layout';

export default function TestDemo(): React.JSX.Element {
  return (
    <Layout
      title="Test Demo Page"
      description="Test page to verify routing works"
    >
      <div style={{ padding: '2rem' }}>
        <h1>Test Demo Page</h1>
        <p>This is a test page to verify that custom pages work in Docusaurus.</p>
        <p>If you can see this, the routing is working correctly.</p>
      </div>
    </Layout>
  );
}
