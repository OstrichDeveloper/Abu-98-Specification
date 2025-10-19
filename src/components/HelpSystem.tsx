import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface HelpSystemProps {
  className?: string;
}

function HelpSystemInner({ className = '' }: HelpSystemProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import the Web Kernel components to avoid SSR issues
    const initializeWebKernel = async () => {
      try {
        const { Shell, MockKernel, mount, pluginRegistry, HelpSystem: HelpSystemComponent } = await import('@melalawi/abu-web-kernel');

        // Create the Help System plugin
        const helpSystemPlugin = {
          id: 'help-system',
          name: 'Help Topics',
          version: '1.0.0',
          component: HelpSystemComponent,
          defaultTitle: 'Help Topics',
          defaultIcon: 'icon-help-book',
          defaultSize: {
            width: 800,
            height: 600
          },
          isResizable: true,
          onInstall: () => {
            console.log('Help System plugin installed');
          },
          onUninstall: () => {
            console.log('Help System plugin uninstalled');
          }
        };

        // Register the plugin
        pluginRegistry.registerWindow(helpSystemPlugin);

        // Create kernel instance
        const kernel = new MockKernel();

        // Mount the shell
        mount(Shell, {
          target: containerRef.current,
          props: {
            kernel,
            plugins: [helpSystemPlugin]
          }
        });

        // Open the help system window immediately
        setTimeout(() => {
          // Use the window manager to open the help system
          const { windowManager } = require('@melalawi/abu-web-kernel');
          windowManager.open('help-system');
        }, 100);
      } catch (error) {
        console.error('Failed to initialize Web Kernel:', error);
      }
    };

    initializeWebKernel();

    // Cleanup is handled by Svelte's unmount
    return () => {
      // No explicit cleanup needed as Svelte handles it
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`help-system-container ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        overflow: 'hidden'
      }}
    />
  );
}

export default function HelpSystem(props: HelpSystemProps): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading Help System...</div>}>
      {() => <HelpSystemInner {...props} />}
    </BrowserOnly>
  );
}
