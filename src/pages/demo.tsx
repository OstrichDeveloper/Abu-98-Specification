import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';

export default function Demo(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadWebKernel = async () => {
      try {
        // Clear the container first
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100vh;
              background: #008080;
              color: white;
              font-size: 16px;
              font-weight: bold;
              font-family: 'MS Sans Serif', Arial, sans-serif;
            ">
              <div style="
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 16px;
              "></div>
              <div>Loading Abu OS 98 Demo...</div>
            </div>
            <style>
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            </style>
          `;
        }

        // Dynamic import of the Web Kernel
        const { 
          Shell, 
          MockKernel, 
          HelpSystem,
          mount,
          desktop,
          windowManager
        } = await import('@melalawi/abu-web-kernel');
        
        if (containerRef.current) {
          // Create the Help System plugin
          const helpSystemPlugin = {
            id: 'help-system',
            name: 'Help Topics',
            version: '1.0.0',
            component: HelpSystem,
            defaultTitle: 'Help Topics',
            defaultIcon: 'icon-help-book',
            defaultSize: {
              width: 800,
              height: 600
            },
            isResizable: true,
            onInstall: () => {
              console.log('✓ Help System plugin installed');
            },
            onUninstall: () => {
              console.log('✗ Help System plugin uninstalled');
            }
          };

          // Create kernel instance
          const kernel = new MockKernel();
          console.log('✓ Mock kernel created');

          // Clear loading screen and mount the Shell component
          containerRef.current.innerHTML = '';
          
          const shellComponent = mount(Shell, {
            target: containerRef.current,
            props: {
              plugins: [helpSystemPlugin],
              kernel: kernel
            }
          });
          
          console.log('✓ Shell mounted successfully');

          // Add desktop icon for Help System
          desktop.addItem({
            id: 'help-system-icon',
            label: 'Help Topics',
            iconClass: 'icon-help-book',
            type: 'program',
            action: () => {
              console.log('Opening Help Topics window...');
              windowManager.open('help-system');
            }
          });
          console.log('✓ Desktop icon added');

          // Open Help System window on first launch
          setTimeout(() => {
            if (windowManager.count === 0) {
              console.log('Opening Help Topics window (first launch)...');
              windowManager.open('help-system');
            }
          }, 100);
          
          // Store reference for cleanup
          (containerRef.current as any).__svelteComponent = shellComponent;
        }
      } catch (error) {
        console.error('Failed to load Web Kernel:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center; font-family: 'MS Sans Serif', Arial, sans-serif;">
              <h1>Abu OS 98 Demo</h1>
              <p>Failed to load Web Kernel: ${error.message}</p>
              <pre style="text-align: left; margin-top: 1rem; background: #f0f0f0; padding: 1rem; border-radius: 4px;">${error.stack}</pre>
            </div>
          `;
        }
      }
    };

    loadWebKernel();

    // Cleanup function
    return () => {
      if (containerRef.current && (containerRef.current as any).__svelteComponent) {
        const component = (containerRef.current as any).__svelteComponent;
        if (component.$destroy) {
          component.$destroy();
        }
      }
    };
  }, []);

  return (
    <Layout
      title="Abu OS 98 Demo"
      description="Windows 98 F1 Help System Demo"
    >
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100vh',
          margin: 0,
          padding: 0,
          position: 'relative'
        }}
      />
    </Layout>
  );
}
