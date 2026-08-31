import "./index.css";

export default function Index() {
  return (
    <main className="index-page">
      <section className="index-hero">
        <div className="index-hero-content">
          <span className="index-eyebrow">SYSTEMS & TECHNOLOGY</span>

          <h1>
            Technology that
            <br />
            <em>works for you.</em>
          </h1>

          <p>
            We design, build and support reliable technology systems that help
            businesses operate smarter, faster and with less friction.
          </p>

          <div className="index-actions">
            <a href="#solutions" className="index-primary">
              Explore our solutions
              <span>↗</span>
            </a>

            <a href="#contact" className="index-secondary">
              Talk to us
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="index-visual">
          <div className="index-orb">
            <div className="index-orb-core">
              <span>MS</span>
            </div>

            <div className="index-orbit index-orbit-one" />
            <div className="index-orbit index-orbit-two" />
            <div className="index-orbit index-orbit-three" />

            <div className="index-node node-one">CLOUD</div>
            <div className="index-node node-two">SECURITY</div>
            <div className="index-node node-three">SYSTEMS</div>
            <div className="index-node node-four">SUPPORT</div>
          </div>
        </div>
      </section>

      <section className="index-intro" id="solutions">
        <div>
          <span className="index-section-label">01 / WHAT WE DO</span>
        </div>

        <div>
          <h2>
            We turn complicated technology into{" "}
            <em>simple business infrastructure.</em>
          </h2>

          <p>
            From systems and cloud infrastructure to security and technical
            support, we create technology environments that are dependable,
            scalable and built around the way your business actually works.
          </p>
        </div>
      </section>

      <section className="index-pillars">
        <article>
          <span>01</span>
          <h3>Build</h3>
          <p>
            Modern systems designed around your operational needs rather than
            forcing your business into someone else's template.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Protect</h3>
          <p>
            Security-conscious infrastructure that keeps your systems,
            information and people protected.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Support</h3>
          <p>
            Practical technical support that keeps your technology running
            without becoming another problem to manage.
          </p>
        </article>
      </section>

      <section className="index-contact" id="contact">
        <span className="index-eyebrow">LET'S BUILD BETTER</span>

        <h2>
          Your technology should be an
          <em> advantage.</em>
        </h2>

        <a href="mailto:hello@mindspring.co.za" className="index-primary">
          Start a conversation
          <span>↗</span>
        </a>
      </section>
    </main>
  );
}