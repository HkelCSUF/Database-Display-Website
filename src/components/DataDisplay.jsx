import { useState } from 'react';
import Table from './Table';

export default function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', margin: '10px 0' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '12px',
          textAlign: 'left',
          background: '#f5f5f5',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Collapsible Wrapper */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s ease-out',
        }}
      >
        {/* Content Container */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px' }}>
            <ul>
              {children.map((entry) => (
                  <Table
                      key={entry.id}
                      children={entry}
                  />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
