import React from 'react';

// Verbatim from kolacommunications.com/about
const steps = [
  {
    no: '01',
    kicker: 'Consult',
    title: 'Consult & Align',
    text: 'We dive deep into your brand, audience, and business goals on a discovery call, and map out a clear growth blueprint.',
  },
  {
    no: '02',
    kicker: 'Execute',
    title: 'Craft & Execute',
    text: 'From clean code to conversion copy and campaign setup, our team executes with attention to detail and milestone updates.',
  },
  {
    no: '03',
    kicker: 'Measure',
    title: 'Scale & Measure',
    text: 'We track every key metric with transparent weekly and monthly reporting, iterating continuously to maximise return.',
  },
];

const values = ['Results-Driven', 'Innovation First', 'Client-Centric', 'Quality Excellence'];

export default function Approach() {
  return (
    <section id="approach" className="section border-y-2 border-ink bg-sand">
      <div className="wrap">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="label">(06) How we work</span>
            <h2 className="h-section">Every project starts with a clear goal and ends with a result we can point to.</h2>
          </div>
          <p className="text-[17px] leading-relaxed">
            Design, data and strategy come together so nothing we build is just decoration, it is built to perform.
          </p>
        </div>

        <div className="grid border-t-2 border-ink md:grid-cols-3">
          {steps.map((s, i) => (
            <article
              key={s.no}
              className={`pb-8 pt-8 md:pb-2 ${i > 0 ? 'border-t-2 border-ink md:border-l-2 md:border-t-0 md:pl-8' : 'md:pr-8'} ${
                i === 1 ? 'md:pr-8' : ''
              }`}
            >
              <div className={`display text-[110px] leading-[0.85] lg:text-[136px] ${i === 2 ? 'text-orange' : 'text-outline text-ink'}`}>
                {s.no}
              </div>
              <div className="kicker mt-5 text-muted">{s.kicker}</div>
              <h3 className="display mt-2 text-[34px]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-10 border-2 border-ink bg-ink p-8 text-paper shadow-hard-orange sm:p-11 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h3 className="font-serif text-[30px] italic leading-snug sm:text-[36px]">We care about the details most agencies skip:</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-paper/80">
              how a page loads on a slow connection, how a headline reads on a phone screen, how a campaign performs in week eight, not just week one. That care is what keeps our clients with us long after the first project ends.
            </p>
          </div>
          <ul className="border-t border-paper/25">
            {values.map((v) => (
              <li key={v} className="display border-b border-paper/25 py-3 text-[28px]">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
