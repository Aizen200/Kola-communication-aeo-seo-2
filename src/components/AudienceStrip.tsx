import React from 'react';

export default function AudienceStrip() {
  return (
    <div className="audience-strip bg-wash/50">
      <div className="wrap audience-inner">
        <div className="eyebrow">
          Targeted SEO · AEO · GEO for
          <br />
          B2B procurement journeys
        </div>
        <div className="audience-items">
          <span className="audience-item">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#factory" />
            </svg>
            <strong>Technical SEO for Manufacturers</strong> (e.g. Laser Technologies, Kanodia)
          </span>
          <span className="audience-item">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#building" />
            </svg>
            <strong>GEO & Knowledge Graphs for B2B</strong> (e.g. ADT Solutions, Roy Infra)
          </span>
          <span className="audience-item">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#technical" />
            </svg>
            <strong>AEO & LLM Citations for Robotics</strong> (e.g. MIVA Robotics, Revent)
          </span>
        </div>
      </div>
    </div>
  );
}
