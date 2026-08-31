import { useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from './useReveal'
import type { ServiceContent } from './serviceContent'

type Props = {
  content: ServiceContent
}

function Dashboard({ content }: { content: ServiceContent }) {
  return (
    <div className="service-dashboard" aria-hidden="true">
      <div className="service-dashboard-glow" />
      <div className="service-dashboard-shell">
        <div className="service-dashboard-header">
          <div>
            <p>Live operations</p>
            <span>{content.dashboardSubtitle}</span>
          </div>
          <div className="service-dashboard-badge">
            <span>{content.number}</span>
            <strong>{content.heroMetric.value}</strong>
          </div>
        </div>

        <div className="service-dashboard-metrics">
          {content.nodes.slice(0, 5).map((node, index) => (
            <article key={node.id} className="service-metric">
              <div className="service-metric-status">
                <i />
                <span>{node.label}</span>
              </div>
              <strong>{node.value}</strong>
              <p>{index % 2 === 0 ? 'Operational signal stable' : 'Connection actively monitored'}</p>
              <div className="service-mini-chart" aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function NetworkTopology({ content }: { content: ServiceContent }) {
  const nodes = content.nodes
  const topologyRef = useRef<HTMLDivElement>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const activeIndex = activeNode ? nodes.findIndex((node) => node.id === activeNode) : -1
  const endpoints = [
    [128, 92], [472, 126], [454, 362], [152, 390], [58, 240],
  ]

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    topologyRef.current?.style.setProperty('--tilt-x', `${x * 2.25}deg`)
    topologyRef.current?.style.setProperty('--tilt-y', `${y * -2.25}deg`)
    topologyRef.current?.style.setProperty('--drift-x', `${x * 9}px`)
    topologyRef.current?.style.setProperty('--drift-y', `${y * 9}px`)
  }

  return (
    <div
      ref={topologyRef}
      className="service-topology"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setActiveNode(null)
        topologyRef.current?.style.removeProperty('--tilt-x')
        topologyRef.current?.style.removeProperty('--tilt-y')
        topologyRef.current?.style.removeProperty('--drift-x')
        topologyRef.current?.style.removeProperty('--drift-y')
      }}
    >
      <div className="service-topology-core">
        <span>{content.number}</span>
        <strong>{content.heroMetric.label}</strong>
        <p>{content.heroMetric.detail}</p>
      </div>

      <svg className="service-topology-lines" viewBox="0 0 600 480" preserveAspectRatio="none">
        {nodes.map((node, index) => {
          const [x2, y2] = endpoints[index]
          const isLit = activeIndex === -1 || index >= activeIndex

          return (
          <g key={node.id} className={isLit ? 'topology-route is-lit' : 'topology-route'}>
          <line
            className={`topology-line topology-line-${index + 1}`}
            x1="300"
            y1="240"
            x2={x2}
            y2={y2}
          />
          <circle className="topology-packet" r="4">
            <animateMotion dur={`${4.8 + index * 0.45}s`} repeatCount="indefinite" path={`M 300 240 L ${x2} ${y2}`} />
          </circle>
          </g>
        )})}
      </svg>

      <div className="service-topology-nodes">
        {nodes.map((node, index) => (
          <button
            type="button"
            key={node.id}
            className={`service-node node-${index + 1} ${activeNode === node.id ? 'is-active' : ''}`}
            data-tone={node.tone}
            aria-pressed={activeNode === node.id}
            onPointerEnter={() => setActiveNode(node.id)}
            onFocus={() => setActiveNode(node.id)}
            onBlur={() => setActiveNode(null)}
          >
            <span>{node.label}</span>
            <strong>{node.value}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}

function SupportVisual() {
  return (
    <div className="support-visual" aria-hidden="true">
      <div className="support-visual-glow" />
      <div className="support-console">
        <div className="support-console-header">
          <span>LIVE SUPPORT QUEUE</span>
          <strong><i /> 3 active</strong>
        </div>
        <div className="support-ticket support-ticket-primary">
          <span>01</span>
          <div><strong>Device access</strong><p>Engineer assigned</p></div>
          <b>04m</b>
        </div>
        <div className="support-ticket">
          <span>02</span>
          <div><strong>Mail sync</strong><p>Remote session ready</p></div>
          <b>09m</b>
        </div>
        <div className="support-ticket">
          <span>03</span>
          <div><strong>New starter</strong><p>Account provisioning</p></div>
          <b>12m</b>
        </div>
      </div>
      <div className="support-device support-device-laptop"><span>●</span></div>
      <div className="support-device support-device-mobile"><span>●</span></div>
      <i className="support-signal support-signal-one" />
      <i className="support-signal support-signal-two" />
    </div>
  )
}

function SecurityVisual() {
  return (
    <div className="security-visual" aria-hidden="true">
      <div className="security-radar" />
      <div className="security-threats">
        <i /><i /><i /><i /><i />
      </div>
      <div className="security-firewall">
        <span>FIREWALL</span>
        <strong>Protected</strong>
      </div>
      <div className="security-shield">✦</div>
      <p>Threats contained</p>
    </div>
  )
}

function HostingVisual() {
  return (
    <div className="hosting-visual" aria-hidden="true">
      <div className="hosting-orbit hosting-orbit-one" />
      <div className="hosting-orbit hosting-orbit-two" />
      <div className="hosting-cloud"><span>Cloud</span><strong>99.99%</strong></div>
      <div className="hosting-edge hosting-edge-one">CDN</div>
      <div className="hosting-edge hosting-edge-two">WEB</div>
      <div className="hosting-edge hosting-edge-three">MAIL</div>
      <i className="hosting-request hosting-request-one" />
      <i className="hosting-request hosting-request-two" />
      <i className="hosting-request hosting-request-three" />
    </div>
  )
}

function SignatureVisual({ content }: { content: ServiceContent }) {
  if (content.id === 'support') return <SupportVisual />
  if (content.id === 'security') return <SecurityVisual />
  if (content.id === 'hosting') return <HostingVisual />

  return <NetworkTopology content={content} />
}

export function ServicePage({ content }: Props) {
  const sectionRef = useReveal()

  return (
    <main className={`service-page service-page-${content.id}`} ref={sectionRef}>
      <section className="service-page-hero reveal-group">
        <div className="service-page-hero-content reveal-item">
          <nav className="service-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.breadcrumbLabel}</span>
          </nav>

          <p className="service-page-number">{content.number}</p>
          <p className="service-page-kicker">{content.eyebrow}</p>

          <h1>
            {content.title.split(' ')[0]}
            <em>{` ${content.title.slice(content.title.indexOf(' ') + 1)}`}</em>
          </h1>

          <p className="service-page-intro">{content.intro}</p>

          <div className="service-page-actions hero-actions-reveal reveal-item">
            <a href={content.ctaTarget} className="primary-button">
              {content.ctaLabel}
              <span>↗</span>
            </a>

            <Link to="/#contact" className="secondary-link">
              Talk to us
              <span>↗</span>
            </Link>
          </div>
        </div>

        <div className="service-page-visual reveal-item">
          <SignatureVisual content={content} />
        </div>
      </section>

      <section className="service-operations reveal-group" aria-labelledby="operations-title">
        <div className="service-operations-copy reveal-item">
          <p className="eyebrow">VISIBLE BY DESIGN</p>
          <h2 id="operations-title">A system your team can <em>trust at a glance.</em></h2>
          <p>{content.statementCopy}</p>
        </div>
        <Dashboard content={content} />
      </section>

      <section className="service-page-story">
        <div className="service-page-story-layout reveal-group">
          <div className="service-page-heading reveal-item">
            <p className="eyebrow">{content.statementEyebrow}</p>
            <h2>
              {content.statementTitle.split(' ')[0]}
              <em>{` ${content.statementTitle.slice(content.statementTitle.indexOf(' ') + 1)}`}</em>
            </h2>
          </div>

          <p className="service-page-story-copy reveal-item">The details should stay quiet. The confidence they create should not.</p>
        </div>

        <div className="service-feature-grid reveal-group" id={content.ctaTarget.slice(1)}>
          {content.features.map((feature) => (
            <article key={feature.id} className="service-feature reveal-item">
              <span>{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-page-cta reveal-group">
        <p className="eyebrow">{content.ctaEyebrow}</p>
        <h2>
          {content.ctaTitle.split(',')[0]}
          <em>{content.ctaTitle.includes(',') ? `,${content.ctaTitle.slice(content.ctaTitle.indexOf(',') + 1)}` : ''}</em>
        </h2>
        <Link to="/#contact" className="primary-button">
          Start a conversation
          <span>↗</span>
        </Link>
      </section>
    </main>
  )
}
