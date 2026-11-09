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

// Verbatim from the kolacommunications.com homepage values.
const values = [
  { title: 'Results Driven', text: 'We focus on delivering measurable outcomes that directly impact your business growth and success.' },
  { title: 'Innovation First', text: 'We stay ahead of digital trends and leverage cutting edge technologies to give you a competitive edge.' },
  { title: 'Client Centric', text: 'Your success is our priority. We build lasting partnerships through transparent communication and dedicated support.' },
  { title: 'Quality Excellence', text: 'We maintain the highest standards in every project, ensuring exceptional quality and attention to detail.' },
];

// Small dotted UI mocks, one per step
function CallMock() {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {Array.from({ length: 21 }, (_, i) => (
        <span
          key={i}
          className={`aspect-square rounded-md border ${i === 11 ? 'border-orange bg-orange' : [3, 9, 17].includes(i) ? 'border-ink bg-[repeating-linear-gradient(0deg,#141414_0_1px,transparent_1px_4px)]' : 'border-ink/20'}`}
        />
      ))}
    </div>
  );
}

function ChecklistMock() {
  return (
    <ul className="space-y-3">
      {[0.9, 0.7, 0.8, 0.55].map((w, i) => (
        <li key={i} className="flex items-center gap-3 border-b border-ink/10 pb-3">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-ink text-[11px] text-paper">✓</span>
          <span className="h-[3px] rounded bg-ink/60" style={{ width: `${w * 70}%` }} />
        </li>
      ))}
    </ul>
  );
}

function ChartMock() {
  return (
    <div className="flex h-[150px] items-end gap-3">
      {[38, 55, 48, 72, 100].map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-t-md border border-ink ${i === 4 ? 'bg-orange' : 'bg-[radial-gradient(circle,#141414_1px,transparent_1.3px)] [background-size:5px_5px]'}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const mocks = [<CallMock key="call" />, <ChecklistMock key="list" />, <ChartMock key="chart" />];

export default function Approach() {
  return (
    <>
      <section id="approach" className="section bg-orange">
        <div className="wrap">
          <span className="label text-ink/60">How we work</span>
          <h2 className="h-section max-w-[900px]">Every project starts with a clear goal and ends with a result we can point to.</h2>

          <div className="mt-16 space-y-20 lg:space-y-28">
            {steps.map((s, i) => (
              <div key={s.no} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div data-reveal>
                  <div className="kicker text-[12px] text-ink/60">
                    {s.no} / 0{steps.length}
                  </div>
                  <h3 className="display mt-4 text-[46px] sm:text-[64px]">{s.title}</h3>
                  <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-ink/80">{s.text}</p>
                </div>
                <div data-reveal className="dot-shadow mx-auto w-full max-w-[460px]">
                  <div className="rounded-2xl border border-ink bg-paper p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="kicker text-[11px] text-muted">{s.kicker}</span>
                      <span className="kicker text-[11px]">{s.no}</span>
                    </div>
                    {mocks[i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Our values" className="section pb-0">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <article
              key={v.title}
              data-reveal
              style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
              className={`flex min-h-[250px] flex-col rounded-2xl border border-ink p-6 ${i === 1 ? 'bg-ink text-paper' : i === 2 ? 'bg-orange' : 'bg-paper'}`}
            >
              <div className="flex items-center justify-between">
                <span className="kicker text-[12px]">0{i + 1}</span>
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-current text-[18px] opacity-70">
                  +
                </span>
              </div>
              <h3 className="mt-auto text-[26px] font-bold leading-[1.05] tracking-[-0.04em]">{v.title}</h3>
              <p className={`mt-3 text-[14px] leading-relaxed ${i === 1 ? 'text-paper/65' : 'text-ink/70'}`}>{v.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
