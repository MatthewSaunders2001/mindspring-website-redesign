import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mindspringOrbitRender from './assets/mindspring-orbit-render.webp'
import './App.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

function App() {
  const siteRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let cleanupHeroPointer = () => {}

    const ctx = gsap.context(() => {
      // =====================================================
      // HERO — CINEMATIC ENTRANCE
      // =====================================================

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      heroTimeline
        .from('.nav', {
          y: -30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          '.hero .eyebrow',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.35',
        )
        .from(
          '.hero h1',
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          '-=0.4',
        )
        .from(
          '.hero-world',
          {
            x: 80,
            opacity: 0,
            duration: 1.2,
          },
          '-=0.85',
        )
        .from(
          '.hero-copy',
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5',
        )
        .from(
          '.hero-actions',
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.4',
        )

      // =====================================================
      // HERO PARALLAX
      // =====================================================

      gsap.to('.hero-content', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.25,
        },
      })

      gsap.to('.hero-orbit-path', {
        rotation: -140,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.35,
        },
      })

      gsap.utils.toArray<HTMLElement>('.story-route').forEach((route, index) => {
        gsap.fromTo(
          route,
          { yPercent: 14, rotation: index % 2 ? -5 : 5 },
          {
            yPercent: -14,
            rotation: index % 2 ? 5 : -5,
            ease: 'none',
            scrollTrigger: {
              trigger: route.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          },
        )
      })

      gsap.fromTo(
        '.story-orb-echo',
        { scale: 0.86, xPercent: 12, opacity: 0.35 },
        {
          scale: 1.08,
          xPercent: -8,
          opacity: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        },
      )

      const hero = document.querySelector<HTMLElement>('.hero')
      const world = document.querySelector<HTMLElement>('.hero-world')
      const moveWorldX = world ? gsap.quickTo(world, 'x', { duration: 0.7, ease: 'power3.out' }) : null
      const moveWorldY = world ? gsap.quickTo(world, 'y', { duration: 0.7, ease: 'power3.out' }) : null

      const handleHeroPointerMove = (event: PointerEvent) => {
        if (!hero || !moveWorldX || !moveWorldY) return
        const bounds = hero.getBoundingClientRect()
        moveWorldX(((event.clientX - bounds.left) / bounds.width - 0.5) * 18)
        moveWorldY(((event.clientY - bounds.top) / bounds.height - 0.5) * 12)
      }

      const resetHeroPointer = () => {
        moveWorldX?.(0)
        moveWorldY?.(0)
      }

      hero?.addEventListener('pointermove', handleHeroPointerMove)
      hero?.addEventListener('pointerleave', resetHeroPointer)
      cleanupHeroPointer = () => {
        hero?.removeEventListener('pointermove', handleHeroPointerMove)
        hero?.removeEventListener('pointerleave', resetHeroPointer)
      }

      // =====================================================
      // SECTION HEADINGS
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.section-heading')
        .forEach((heading) => {
          gsap.from(heading.children, {
            y: 45,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })
        })

      // =====================================================
      // SERVICE CARDS
      // =====================================================

      gsap.from('.service-card', {
        y: 70,
        opacity: 0,
        scale: 0.97,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.service-grid',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      // =====================================================
      // SERVICE CARD HOVER
      // =====================================================

      gsap.utils
        .toArray<HTMLElement>('.service-card')
        .forEach((card) => {
          const moveX = gsap.quickTo(card, 'x', {
            duration: 0.35,
            ease: 'power3.out',
          })

          const moveY = gsap.quickTo(card, 'y', {
            duration: 0.35,
            ease: 'power3.out',
          })

          const handleMouseMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect()

            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            const rotateX = (y / rect.height - 0.5) * -4
            const rotateY = (x / rect.width - 0.5) * 4

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: true,
            })

            moveX((x / rect.width - 0.5) * 4)
            moveY((y / rect.height - 0.5) * 4)
          }

          const handleMouseLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              duration: 0.6,
              ease: 'power3.out',
              overwrite: true,
            })
          }

          card.addEventListener('mousemove', handleMouseMove)
          card.addEventListener('mouseleave', handleMouseLeave)
        })

        

      // =====================================================
      // FOOTER
      // =====================================================

      gsap.from('.footer-brand, .footer-links, .footer-bottom', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.story-panel', {
        y: 52,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-canvas',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to('.story-ribbon', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-canvas',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.35,
        },
      })

      ScrollTrigger.refresh()
    }, siteRef)

    return () => {
      cleanupHeroPointer()
      ctx.revert()
    }
  }, [])

  return (
    <main className="site" id="top" ref={siteRef}>
      {/* NAVIGATION */}
      <nav className="nav">
        <a className="logo" href="/">
          <span className="logo-wordmark" aria-label="Mindspring Computing">
            <strong>MindSpring</strong>
            <small>COMPUTING</small>
          </span>
        </a>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#approach">Approach</a>
        </div>

        <a className="nav-cta" href="#contact">
          Talk to us
          <span>↗</span>
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-world" aria-hidden="true">
          <div className="hero-orbit-path">
            <span className="hero-orbit-track hero-orbit-track-one" />
            <span className="hero-orbit-track hero-orbit-track-two" />
            <span className="hero-orbit-track hero-orbit-track-three" />
          </div>
          <div className="hero-orb"><img src={mindspringOrbitRender} alt="" /></div>
        </div>
        <div className="hero-content">
          <p className="eyebrow">SUPPORT FOR MODERN BUSINESSES</p>

          <h1>
            IT that simply <em>works.</em>
          </h1>

          <p className="hero-copy">
            Clear, dependable technology support for businesses that need their people to stay productive every day.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Talk to Mindspring
              <span>↗</span>
            </a>

            <a className="secondary-link" href="#services">
              Explore services
              <span>↓</span>
            </a>
          </div>

        </div>

      </section>

      <section className="story-canvas" id="services">
        <svg className="story-ribbon" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 91 -8 C 52 12 88 38 61 66 S 97 105 61 137 S 8 179 47 213 S 95 247 58 285 S 8 330 54 372 S 96 402 72 420" />
          <path className="story-ribbon__echo" d="M 91 -8 C 52 12 88 38 61 66 S 97 105 61 137 S 8 179 47 213 S 95 247 58 285 S 8 330 54 372 S 96 402 72 420" />
        </svg>

        <article className="story-panel story-promise">
          <p className="eyebrow">OUR PROMISE</p>
          <h2>Technology your organisation can depend on.</h2>
          <p>Clear, practical support that keeps your people productive and your business moving.</p>
        </article>

        <article className="story-panel story-services">
          <p className="eyebrow">HOW WE HELP</p>
          <h2>Services that make an impact.</h2>
          <div className="story-service-list">
            <a href="#contact"><span>01</span><h3>Networks &amp; Servers</h3><p>Reliable foundations that keep work moving.</p><b>↗</b></a>
            <a href="#contact"><span>02</span><h3>Security &amp; Testing</h3><p>Practical protection without friction.</p><b>↗</b></a>
            <a href="#contact"><span>03</span><h3>IT Support</h3><p>Friendly help when your team needs it.</p><b>↗</b></a>
            <a href="#contact"><span>04</span><h3>Internet &amp; Hosting</h3><p>Connection wherever work happens.</p><b>↗</b></a>
          </div>
        </article>

        <article className="story-panel story-trust" id="about">
          <div>
            <p className="eyebrow">THE MINDSPRING DIFFERENCE</p>
            <h2>A trusted partner. Every step of the way.</h2>
            <p>We take ownership, speak plainly, and build solutions around the way your business works.</p>
          </div>
          <blockquote>“MindSpring gives our team confidence that technology is handled.”<cite>LONG-TERM CLIENT</cite></blockquote>
        </article>

        <article className="story-panel story-approach" id="approach">
          <p className="eyebrow">OUR APPROACH</p>
          <h2>Simple. Thoughtful. Effective.</h2>
          <ol><li><b>01</b><strong>Understand</strong><span>We listen before we recommend.</span></li><li><b>02</b><strong>Design</strong><span>We make the right plan for you.</span></li><li><b>03</b><strong>Deliver</strong><span>We stay accountable after launch.</span></li></ol>
        </article>

        <article className="story-panel story-final" id="contact">
          <p className="eyebrow">START A CONVERSATION</p>
          <h2>Let’s build something that works beautifully.</h2>
          <p>Reliable IT. Clear advice. Real impact.</p>
          <a className="primary-button" href="mailto:info@mindspring.co.za">Talk to Mindspring <span>↗</span></a>
        </article>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <a className="logo" href="#top" aria-label="Mindspring Computing home">
            <span className="logo-wordmark" aria-hidden="true">
              <strong>MindSpring</strong>
              <small>COMPUTING</small>
            </span>
          </a>

          <p>
            IT infrastructure, support and technology services for
            organisations that depend on them.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <span>CONNECT</span>
            <a href="#contact">Support</a>
            <a href="#contact">Email</a>
            <a href="#contact">Phone</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mindspring</span>
          <span>Cape Town · South Africa</span>
        </div>
      </footer>
    </main>
  )
}

export default App
