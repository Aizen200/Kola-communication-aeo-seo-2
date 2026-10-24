import React from 'react';

// Verbatim from kolacommunications.com/about
const steps = [
  {
    kicker: '01 / CONSULT',
    title: 'Consult & Align',
    text: 'We dive deep into your brand, audience, and business goals on a discovery call, and map out a clear growth blueprint.',
  },
  {
    kicker: '02 / EXECUTE',
    title: 'Craft & Execute',
    text: 'From clean code to conversion copy and campaign setup, our team executes with attention to detail and milestone updates.',
  },
  {
    kicker: '03 / MEASURE',
    title: 'Scale & Measure',
    text: 'We track every key metric with transparent weekly and monthly reporting, iterating continuously to maximise return.',
  },
];

const values = ['Results-Driven', 'Innovation First', 'Client-Centric', 'Quality Excellence'];

export default function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 06 / HOW WE WORK
            </div>
            <h2>
              Every project starts with a clear goal and ends with a result we can point to.
            </h2>
          </div>
          <p>
            Design, data and strategy come together so nothing we build is just decoration, it is built to perform.
          </p>
        </div>
        <div className="process">
          {steps.map((step) => (
            <article className="process-step" key={step.kicker}>
              <div className="process-kicker">
                {step.kicker}
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#arrow-right" />
                </svg>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="engagement">
          <div>
            <h3>We care about the details most agencies skip:</h3>
            <p>
              how a page loads on a slow connection, how a headline reads on a phone screen, how a campaign performs in week eight, not just week one. That care is what keeps our clients with us long after the first project ends.
            </p>
          </div>
          <div className="checklist">
            {values.map((item) => (
              <div className="checklist-item" key={item}>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#check" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
