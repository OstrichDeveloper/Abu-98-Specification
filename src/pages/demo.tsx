import React from 'react';
import Layout from '@theme/Layout';

export default function Demo(): React.JSX.Element {
  return (
    <Layout
      title="Abu OS 98 Demo"
      description="Windows 98 F1 Help System Demo - Experience the authentic Windows 98 interface"
    >
      <div style={{ 
        height: '100vh', 
        width: '100%', 
        margin: 0, 
        padding: 0,
        position: 'relative'
      }}>
        <iframe
          src="/Abu-98-Specification/web-kernel-demo.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#c0c0c0'
          }}
          title="Abu OS 98 Demo"
        />
      </div>
    </Layout>
  );
}