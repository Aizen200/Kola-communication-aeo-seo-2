import React from 'react';

const faqs = [
  {
    question: 'Why does AEO (Answer Engine Optimization) matter alongside SEO in 2026?',
    answer:
      'Traditional SEO gets your page to rank in a list of results. AEO gets your content cited as the answer itself, which is a meaningfully different thing. When an AI tool reads a question and provides a direct response, it is pulling from sources it has determined to be clear, authoritative, and well-structured. AEO is the work of becoming one of those sources. Right now in India, very few businesses are actively optimising for AEO, which makes this a rare early-mover window.',
  },
  {
    question: 'Is AEO replacing SEO?',
    answer:
      'No, AEO is extending SEO, not replacing it. Traditional Google search is still enormous and remains critical for most businesses. AEO addresses the growing share of queries that are now answered directly by AI tools like ChatGPT, Perplexity, and Google AI Overview. The businesses doing best in 2026 are doing both: strong technical SEO foundations with AEO-ready content structure layered on top.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization) and how does it complete our search presence?',
    answer:
      'GEO extends the same principles to generative platforms like ChatGPT, Google AI, Claude and Perplexity, which compose answers from multiple sources. AI systems evaluate whether a website is a genuine authority on a topic, not just individual page quality. We build that authority through structured schema markup, rich snippet engineering, and consistent, question-focused content.',
  },
  {
    question: 'How do I know if my website is AEO-ready?',
    answer:
      'Ask yourself three questions. First, does your content directly answer the questions your audience asks, or does it mostly describe your services using industry terms? Second, do your pages have FAQ sections with real questions and concise answers? Third, do you have FAQPage schema markup implemented so AI tools can read those questions and answers as structured data? If the answer to any of these is no, your content is not fully AEO-ready yet.',
  },
  {
    question: 'What is the typical timeline to see measurable results?',
    answer:
      'Technical fixes like noindex tags and robots.txt problems can show results within days once Google recrawls your website, and new pages are typically indexed within one to four weeks. Most businesses see featured snippet improvements within six to twelve weeks of implementing FAQ schema and restructuring content. AI citation presence builds over months as topical authority accumulates.',
  },
  {
    question: 'What kinds of businesses do you do SEO, AEO and GEO for?',
    answer:
      'Clients include financial advisory (Dhanuka Investments), steel and industrial products (Kanodia Enterprises), real estate (Veena Developers), AI platforms (Revent AI), and e-commerce brands in India and Australia (Livyor, Zevana Jewels, Carpet Cuts). Each one gets target keyphrases, schema markup and AEO-ready FAQ content built for Google and AI answer engines.',
  },
  {
    question: 'How do we choose between the monthly retainer and a one-time setup?',
    answer:
      'If you have a defined scope (such as fixing indexing and technical SEO issues, or setting up schema markup and FAQ sections on your key pages), a One-Time Setup is ideal. For ongoing keyword growth, question-led content, link acquisition and AI search visibility, our Monthly Retainer gives you a fully managed team at predictable rates.',
  },
  {
    question: 'Will we own the content, schema and reporting accounts?',
    answer:
      'Yes, 100%. All content, schema markup, Google Search Console and Analytics access stay in your name, with zero lock-in.',
  },
  {
    question: 'Do you sign mutual Non-Disclosure Agreements (NDAs)?',
    answer:
      'Yes. We respect client confidentiality and regularly sign mutual NDAs before reviewing sensitive business data or project requirements.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="section faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="wrap faq-grid">
        <div className="section-intro">
          <div className="eyebrow">
            <i className="dot"></i> 07 / FREQUENTLY ASKED QUESTIONS
          </div>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p>
            Common questions about SEO, AEO and GEO, engagement models, timelines and ownership.
          </p>
          <a className="text-link" href="#contact">
            Ask our team a custom question{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
        <div className="questions">
          {faqs.map((faq, idx) => (
            <details key={idx} open={idx === 0}>
              <summary>
                {faq.question}
                <i className="plus" aria-hidden="true"></i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
