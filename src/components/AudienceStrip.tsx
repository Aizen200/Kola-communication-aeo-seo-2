import React from 'react';

export default function AudienceStrip() {
  return (
    <div className="audience-strip">
      <div className="wrap audience-inner">
        <div className="eyebrow">
          Built for considered
          <br />
          buying decisions
        </div>
        <div className="audience-items">
          <span className="audience-item">
            <svg aria-hidden="true">
              <use href="#factory" />
            </svg>
            Manufacturers
          </span>
          <span className="audience-item">
            <svg aria-hidden="true">
              <use href="#building" />
            </svg>
            B2B businesses
          </span>
          <span className="audience-item">
            <svg aria-hidden="true">
              <use href="#technical" />
            </svg>
            Technical brands
          </span>
        </div>
      </div>
    </div>
  );
}

