const principles = [
  "Learn prompt engineering through practical web development work.",
  "Practice with feedback that teaches, not just scores.",
  "Experiment safely in an isolated development studio.",
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">PromptLab</p>
        <h1>Don&apos;t just use AI. Learn to master it.</h1>
        <p className="lede">
          Learn. Practice. Experiment. Build. A practical path to AI-assisted
          web development is coming together here.
        </p>
        <div className="actions">
          <a className="button primary" href="#path">
            Explore the path
          </a>
          <a className="button secondary" href="#principles">
            How it works
          </a>
        </div>
      </section>

      <section className="content-grid" id="principles">
        {principles.map((principle, index) => (
          <article className="card" key={principle}>
            <span className="card-number">0{index + 1}</span>
            <p>{principle}</p>
          </article>
        ))}
      </section>

      <section className="path-card" id="path">
        <div>
          <p className="eyebrow">Release 1</p>
          <h2>Web Development</h2>
          <p>
            Five levels, practical projects, and a capstone built around
            thoughtful prompting and verified results.
          </p>
        </div>
        <span className="coming-soon">Foundation phase</span>
      </section>
    </main>
  );
}
