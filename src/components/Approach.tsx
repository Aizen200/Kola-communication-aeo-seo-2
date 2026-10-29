import React from 'react';
import Arrow from './Arrow';

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
    <section id="approach" className="section border-y border-line bg-white">
      <div className="wrap">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="label">(06) How we work</span>
            <h2 className="h-section">Every project starts with a clear goal and ends with a result we can point to.</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-muted">
            Design, data and strategy come together so nothing we build is just decoration, it is built to perform.
          </p>
        </div>

        <div className="grid border-t border-line md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.no} className={`py-10 ${i > 0 ? 'border-t border-line md:border-l md:border-t-0 md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}>
              <div className={`display text-[96px] leading-[0.85] lg:text-[120px] ${i === 2 ? 'text-orange' : 'text-line'}`}>{s.no}</div>
              <div className="kicker mt-8 text-[11px] text-muted">{s.kicker}</div>
              <h3 className="display mt-3 text-[30px]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-14 grid items-center gap-10 overflow-hidden rounded-2xl bg-ink p-8 text-white shadow-float sm:p-12 lg:grid-cols-[1.6fr_1fr]">
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-orange/35 blur-[90px]" />
          <div className="relative">
            <h3 className="display text-[30px] sm:text-[38px]">We care about the details most agencies skip:</h3>
            <p className="mt-5 text-[16px] leading-relaxed text-white/75">
              how a page loads on a slow connection, how a headline reads on a phone screen, how a campaign performs in week eight, not just week one. That care is what keeps our clients with us long after the first project ends.
            </p>
          </div>
          <ul className="relative border-t border-white/15">
            {values.map((v) => (
              <li key={v} className="flex items-center justify-between border-b border-white/15 py-4 text-[20px] font-bold tracking-[-0.02em]">
                {v}
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
