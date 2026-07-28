import { useState } from 'react';
import Table from './Table';

export default function Collapsible({ title, children, action }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="collapsible-toggle"
      >
        <span>{title}</span>
        <span>{isOpen ? '▼' : '▲'}</span>
      </button>

      {/* Collapsible Wrapper */}
      <div className={`collapsible-panel ${isOpen ? 'open' : ''}`}>
        {/* Content Container */}
        <div className="collapsible-clip">
          <div className="collapsible-inner">
            {Array.isArray(children) && children.length ? (
              <Table data={children} />
            ) : (
              <div>No data</div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2 mt-auto justify-content-center">
          {action}
      </div>
    </div>
  );
}
