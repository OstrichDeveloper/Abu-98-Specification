import React, { useEffect, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface HelpSystemProps {
  className?: string;
}

function HelpSystemInner({ className = '' }: HelpSystemProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    if (!containerRef.current) return;

    // Create an iframe to load the Web Kernel demo as a standalone app
    const iframe = document.createElement('iframe');
    
    // Use the correct baseUrl for the iframe src
    const baseUrl = siteConfig.baseUrl || '/';
    iframe.src = `${baseUrl}web-kernel-demo.html`;
    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.background = '#c0c0c0';
    
    // Handle iframe load events
    iframe.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    iframe.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    // Clear the container and add the iframe
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    return () => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, [siteConfig.baseUrl]);

  return (
    <div 
      ref={containerRef} 
      className={`help-system-container ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        background: '#c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        position: 'relative'
      }}
    >
      {isLoading && (
        <div className="loading" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          color: '#000',
          zIndex: 10
        }}>
          Loading Abu OS 98 Demo...
        </div>
      )}
      
      {hasError && (
        <div className="error" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          color: '#ff0000',
          textAlign: 'center',
          zIndex: 10
        }}>
          <div>Failed to load Abu OS 98 Demo</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>
            Please check that the Web Kernel assets are available
          </div>
        </div>
      )}
    </div>
  );
}

export default function HelpSystem(props: HelpSystemProps): React.JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading Help System...</div>}>
      {() => <HelpSystemInner {...props} />}
    </BrowserOnly>
  );
}
