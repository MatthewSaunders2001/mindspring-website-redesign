import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mindspringOrbitRender from './assets/mindspring-orbit-render.webp'
import './App.css'
import './premium.css'
import './refinement.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

type ServiceIconName = 'network' | 'security' | 'support' | 'hosting'

const services: Array<{ number: string; title: string; outcome: string; detail: string; icon: ServiceIconName }> = [
  { number: '01', title: 'Networks & Servers', outcome: 'Keep every site connected.', detail: 'Infrastructure that gives your people a reliable foundation for work.', icon: 'network' },
  { number: '02', title: 'Security & Testing', outcome: 'Protect people, data and uptime.', detail: 'Practical security built around the risks your organisation actually faces.', icon: 'security' },
  { number: '03', title: 'IT Support', outcome: 'Get help without the runaround.', detail: 'Remote and on-site support from a team that knows your environment.', icon: 'support' },
  { number: '04', title: 'Internet & Hosting', outcome: 'Stay online wherever work happens.', detail: 'Connectivity, hosting and cloud services that keep business moving.', icon: 'hosting' },
]

function ServiceIcon({ name }: { name: ServiceIconName }) {
  if (name === 'network') return <svg className="service-icon__network" viewBox="0 0 120 80" aria-hidden="true"><path d="M18 57 48 31l30 26M48 31h43M48 31V12" /><rect x="7" y="50" width="22" height="17" rx="3" /><rect x="80" y="22" width="28" height="19" rx="3" /><circle cx="48" cy="12" r="7" /><circle cx="78" cy="57" r="8" /></svg>
  if (name === 'security') return <svg viewBox="0 0 120 80" aria-hidden="true"><path d="M60 8 92 20v20c0 19-13 29-32 35-19-6-32-16-32-35V20L60 8Z" /><path d="m47 41 9 9 18-20" /><circle className="service-icon__ping" cx="94" cy="17" r="7" /></svg>
  if (name === 'support') return <svg className="service-icon__support" viewBox="0 0 120 80" aria-hidden="true"><path d="M29 42a31 31 0 0 1 62 0" /><path d="M29 42v13c0 5 4 9 9 9h4V44h-4c-5 0-9 4-9 9ZM91 42v13c0 5-4 9-9 9h-4V44h4c5 0 9 4 9 9Z" /><path d="M78 65c0 7-7 10-16 10h-7" /><circle cx="51" cy="75" r="3" /></svg>
  return <svg viewBox="0 0 120 80" aria-hidden="true"><path d="M18 54h70c9 0 16-6 16-14 0-8-7-14-15-14-2-13-22-16-29-4-10-8-27-1-27 12-9 0-15 8-15 20Z" /><path d="M32 66h57" /><path className="service-icon__signal" d="M25 17c10-10 25-10 35 0M32 24c6-6 15-6 21 0" /></svg>
}

function App() {
  const siteRef = useRef<HTMLElement | null>(null)
  const ctaTimerRef = useRef<number | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatReply, setChatReply] = useState('Tell us what you need and we will point you in the right direction.')

  useLayoutEffect(() => {
    let cleanupHeroPointer = () => {}
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.nav', { y: -24, opacity: 0, duration: 0.7 })
        .from('.hero .eyebrow, .hero h1, .hero-copy, .hero-actions', { y: 28, opacity: 0, stagger: 0.12, duration: 0.78 }, '-=0.28')
        .from('.hero-world', { x: 60, opacity: 0, duration: 1.1 }, '-=0.8')
      gsap.to('.hero-content', { yPercent: -7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.25 } })
      gsap.to('.hero-orbit-path', { rotation: -140, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.35 } })
      gsap.from('.service-card', { y: 34, opacity: 0, stagger: 0.09, duration: 0.6, scrollTrigger: { trigger: '.service-grid', start: 'top 80%' } })
      gsap.utils.toArray<HTMLElement>('.partnership__points article').forEach((point) => {
        gsap.from(point, { x: 72, opacity: 0, duration: 0.72, ease: 'power3.out', scrollTrigger: { trigger: point, start: 'top 82%', toggleActions: 'play none none reverse' } })
      })
      const hero = document.querySelector<HTMLElement>('.hero')
      const world = document.querySelector<HTMLElement>('.hero-world')
      const moveX = world ? gsap.quickTo(world, 'x', { duration: 0.7, ease: 'power3.out' }) : null
      const moveY = world ? gsap.quickTo(world, 'y', { duration: 0.7, ease: 'power3.out' }) : null
      const onMove = (event: PointerEvent) => {
        if (!hero || !moveX || !moveY) return
        const box = hero.getBoundingClientRect()
        moveX(((event.clientX - box.left) / box.width - 0.5) * 14)
        moveY(((event.clientY - box.top) / box.height - 0.5) * 10)
      }
      const onLeave = () => { moveX?.(0); moveY?.(0) }
      hero?.addEventListener('pointermove', onMove)
      hero?.addEventListener('pointerleave', onLeave)
      cleanupHeroPointer = () => { hero?.removeEventListener('pointermove', onMove); hero?.removeEventListener('pointerleave', onLeave) }
    }, siteRef)
    return () => { cleanupHeroPointer(); if (ctaTimerRef.current) window.clearTimeout(ctaTimerRef.current); ctx.revert() }
  }, [])

  const openChat = () => setChatOpen(true)
  const chooseTopic = (reply: string) => setChatReply(reply)
  const armConversation = () => { ctaTimerRef.current = window.setTimeout(openChat, 1500) }
  const disarmConversation = () => { if (ctaTimerRef.current) window.clearTimeout(ctaTimerRef.current); ctaTimerRef.current = null }

  return <main className="site premium-site" id="top" ref={siteRef}>
    <nav className="nav"><a className="logo" href="#top" aria-label="Mindspring Computing home"><span className="logo-wordmark"><strong>MindSpring</strong><small>COMPUTING</small></span></a><div className="nav-links"><a href="#services">Services</a><a href="#about">Why Mindspring</a><a href="#approach">Our approach</a></div><button className="nav-cta" type="button" onClick={openChat}>Talk to us <span>&rarr;</span></button></nav>
    <section className="hero"><div className="hero-world" aria-hidden="true"><div className="hero-orbit-path"><span className="hero-orbit-track hero-orbit-track-one" /><span className="hero-orbit-track hero-orbit-track-two" /><span className="hero-orbit-track hero-orbit-track-three" /></div><div className="hero-orb"><img src={mindspringOrbitRender} alt="" /></div></div><div className="hero-content"><p className="eyebrow">SUPPORT FOR MODERN BUSINESSES</p><h1 className="hero-lockup"><span>IT that</span><span>simply <em>works.</em></span></h1><p className="hero-copy">Clear, dependable technology support for businesses that need their people to stay productive every day.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={openChat}>Start a conversation <span>&rarr;</span></button><a className="secondary-link" href="#services">Explore services <span>&darr;</span></a></div></div></section>
    <section className="proof-strip" aria-label="Mindspring at a glance"><p>One accountable team for the technology your organisation depends on.</p><div><strong>Since 1991</strong><span>Supporting NGOs and SMEs</span></div><div><strong>Remote + on-site</strong><span>Support that meets you where you work</span></div><div><strong>Service desk</strong><span>Clear support paths for existing clients</span></div></section>
    <section className="services-showcase" id="services"><div className="section-intro premium-intro"><p className="eyebrow">HOW WE HELP</p><h2>Technology that pulls its weight.</h2><div className="service-intro-aside"><span>01 - 04</span><p>Connected IT, security, support and hosting - designed to work as one system.</p></div></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-card__top"><span>{service.number}</span><ServiceIcon name={service.icon} /></div><div><h3>{service.title}</h3><p className="service-card__outcome">{service.outcome}</p><p>{service.detail}</p></div><button type="button" onClick={openChat}>Ask about this service <span>&rarr;</span></button></article>)}</div></section>
    <section className="partnership" id="about"><div className="partnership__copy"><p className="eyebrow">WHY MINDSPRING</p><h2>Not another supplier. Your IT team.</h2><p>We connect the parts of your environment, take ownership of the issues between them, and keep the decisions clear.</p><button className="text-cta" type="button" onClick={openChat}>Talk through your setup <span>&rarr;</span></button></div><div className="partnership__points"><article><span>01</span><h3>One point of accountability</h3><p>Networks, infrastructure, hosting and support work as one joined-up service.</p></article><article><span>02</span><h3>Support that knows your environment</h3><p>A familiar team, not a new explanation every time something goes wrong.</p></article><article><span>03</span><h3>Advice built around your work</h3><p>Practical recommendations that fit your people, priorities and budget.</p></article></div></section>
    <section className="approach-section" id="approach"><div className="section-intro premium-intro"><p className="eyebrow">OUR APPROACH</p><h2>Simple, thoughtful, effective.</h2></div><ol className="approach-steps"><li><span>01</span><h3>Understand</h3><p>We listen before we recommend.</p></li><li><span>02</span><h3>Design</h3><p>We make the right plan for you.</p></li><li><span>03</span><h3>Deliver</h3><p>We stay accountable after launch.</p></li></ol></section>
    <section className="conversation" id="contact"><div><p className="eyebrow">START A CONVERSATION</p><h2>Tell us where technology is getting in the way.</h2><p>We will help you find the right next step.</p></div><button className="primary-button primary-button--light conversation__cta" type="button" onClick={openChat} onMouseEnter={armConversation} onMouseLeave={disarmConversation}>Talk to Mindspring <span>&rarr;</span></button></section>
    <footer className="footer premium-footer"><div className="footer-brand"><a className="logo" href="#top"><span className="logo-wordmark"><strong>MindSpring</strong><small>COMPUTING</small></span></a><p>IT infrastructure, support and technology services for organisations that depend on them.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#services">Services</a><a href="#about">Why Mindspring</a><a href="#approach">Our approach</a></div><div><span>CONNECT</span><button type="button" onClick={openChat}>Start a conversation</button><a href="https://za.linkedin.com/company/mindspring-computing" target="_blank" rel="noreferrer">LinkedIn</a><a href="tel:+27216571780">+27 21 657 1780</a></div></div><div className="footer-bottom"><span>&copy; {new Date().getFullYear()} Mindspring Computing</span><span>Cape Town, South Africa</span></div></footer>
    <button className="chat-launcher" type="button" onClick={openChat} aria-label="Open Mindspring demo chat"><span>?</span> Let's talk</button>
    {chatOpen && <div className="chat-backdrop" role="presentation" onMouseDown={() => setChatOpen(false)}><section className="chat-panel" role="dialog" aria-modal="true" aria-label="Mindspring demo chat" onMouseDown={(event) => event.stopPropagation()}><div className="chat-panel__header"><div><span className="chat-status" />Mindspring conversation</div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">x</button></div><div className="chat-panel__body"><p className="chat-kicker">DEMO CHAT</p><h2>How can we help?</h2><p>{chatReply}</p><div className="chat-options"><button type="button" onClick={() => chooseTopic('Tell us what is happening with your technology. Our support team can help you find the right next step.')}>I need IT support</button><button type="button" onClick={() => chooseTopic('Great. Choose the area you are exploring and we will connect you with the right person.')}>I am exploring services</button><button type="button" onClick={() => chooseTopic('Existing clients can be directed to the service desk for faster support.')}>I am an existing client</button><button type="button" onClick={() => chooseTopic('Our sales team can arrange a conversation around your current setup and goals.')}>Speak to sales</button></div></div><div className="chat-panel__footer">For the live site, this can connect to a real team or chatbot platform.</div></section></div>}
  </main>
}

export default App
