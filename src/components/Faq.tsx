import React from 'react';

// Verbatim from Kola's blog articles on AEO vs SEO and on Google indexing, and the services page.
const faqs = [
  {
    question: "Is AEO replacing SEO?",
    answer:
      "No, AEO is extending SEO, not replacing it. Traditional Google search is still enormous and remains critical for most businesses. AEO addresses the growing share of queries that are now answered directly by AI tools like ChatGPT, Perplexity, and Google AI Overview. The businesses doing best in 2026 are doing both, strong technical SEO foundations with AEO-ready content structure layered on top.",
  },
  {
    question: "How do I know if my website is AEO-ready?",
    answer:
      "Ask yourself three questions. First, does your content directly answer the questions your audience asks or does it mostly describe your services using industry terms? Second, do your pages have FAQ sections with real questions and concise answers? Third, do you have FAQPage schema markup implemented so AI tools can read those questions and answers as structured data? If the answer to any of these is no, your content is not fully AEO-ready yet.",
  },
  {
    question: "Does AEO work for small businesses in India?",
    answer:
      "Particularly well, actually. Large national brands dominate traditional search through domain authority and backlink volume. But AI tools evaluate content quality and clarity, not just domain power. A well-written, question-focused page from a small Mumbai agency can be cited by ChatGPT alongside content from much larger organisations, because the AI is looking for the most useful answer, not the most authoritative domain.",
  },
  {
    question: "How long does it take to see results from AEO?",
    answer:
      "AEO does not have a clear ranking timeline the way SEO does because AI citation is not a publicly trackable metric in the same way search rankings are. What you can measure is featured snippet wins in Google, increases in zero-click visibility in Search Console, and whether your content appears when you manually test relevant questions in ChatGPT or Perplexity. Most businesses start seeing featured snippet improvements within six to twelve weeks of implementing FAQ schema and restructuring content. AI citation presence builds over months as topical authority accumulates.",
  },
  {
    question: "How long does it take for a new website to appear on Google?",
    answer:
      "For a new website with a submitted sitemap and no indexing errors, Google typically discovers and indexes the main pages within one to four weeks. Using the URL Inspection tool in Google Search Console to request indexing speeds this up. Websites with existing inbound links or those published on established domains tend to be indexed faster than completely new domains.",
  },
  {
    question: "My website was showing on Google before but has disappeared. What happened?",
    answer:
      "A website that was previously indexed and has disappeared from Google results is usually experiencing one of three things: a noindex tag or robots.txt change that was introduced during a recent site update, a Google penalty for low-quality or duplicate content, or a significant drop in authority caused by lost inbound links. The first step is to check Google Search Console for any manual actions or coverage errors. If nothing obvious appears there, an SEO audit will identify the cause.",
  },
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs)?",
    answer:
      "Yes. We respect client confidentiality and regularly sign mutual NDAs before reviewing sensitive business data or project requirements.",
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
    <section id="faq" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="label">(07) FAQ</span>
          <h2 className="h-section">Frequently Asked Questions</h2>
          <a href="#contact" className="btn-orange mt-8">
            Book a Free Strategy Call <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="border-t-2 border-ink">
          {faqs.map((faq, idx) => (
            <details key={faq.question} open={idx === 0} className="group border-b-2 border-ink">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink text-[20px] font-bold group-open:bg-orange"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="max-w-[640px] pb-7 text-[16px] leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
