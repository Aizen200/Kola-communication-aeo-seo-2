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
        <span className="label">(06) How we work</span>
        <h2 className="h-section max-w-[980px]">Every project starts with a clear goal and ends with a result we can point to.</h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.no} className={`relative overflow-hidden rounded-2xl p-8 ${i === 2 ? 'bg-ink text-white shadow-float' : 'border border-line bg-paper'}`}>
              {i === 2 && <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/40 blur-[60px]" />}
              <div className="relative flex items-center justify-between">
                <span className={`kicker text-[11px] ${i === 2 ? 'text-white/60' : 'text-muted'}`}>{s.kicker}</span>
                <span className={`display text-[56px] leading-none ${i === 2 ? 'text-orange' : 'text-line'}`}>{s.no}</span>
              </div>
              <h3 className="display relative mt-10 text-[28px]">{s.title}</h3>
              <p className={`relative mt-3 text-[15px] leading-relaxed ${i === 2 ? 'text-white/70' : 'text-muted'}`}>{s.text}</p>
            </article>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {values.map((v) => (
            <li key={v} className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[14px] font-bold">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
