export type ServiceTheme = 'blue' | 'violet' | 'teal' | 'slate'

export type ServiceMetric = {
  label: string
  value: string
  detail: string
}

export type ServiceNode = {
  id: string
  label: string
  value: string
  tone: string
}

export type ServiceFeature = {
  id: string
  eyebrow: string
  title: string
  description: string
}

export type ServiceContent = {
  id: string
  number: string
  breadcrumbLabel: string
  eyebrow: string
  title: string
  intro: string
  ctaLabel: string
  ctaTarget: string
  theme: ServiceTheme
  heroMetric: ServiceMetric
  nodes: ServiceNode[]
  features: ServiceFeature[]
  dashboardTitle: string
  dashboardSubtitle: string
  dashboardMetrics: ServiceMetric[]
  statementEyebrow: string
  statementTitle: string
  statementCopy: string
  ctaEyebrow: string
  ctaTitle: string
}

export const serviceContent: Record<string, ServiceContent> = {
  support: {
    id: 'support',
    number: '01',
    breadcrumbLabel: 'IT Support',
    eyebrow: 'IT SUPPORT / INFRASTRUCTURE',
    title: 'Your IT should just work.',
    intro:
      'Mindspring takes ownership of the technology your organisation depends on, from everyday workstations to the infrastructure behind them.',
    ctaLabel: 'Explore support',
    ctaTarget: '#support-services',
    theme: 'blue',
    heroMetric: { label: 'Response window', value: '< 15 min', detail: 'for active support requests' },
    nodes: [
      { id: 'server', label: 'SERVER', value: 'Operational', tone: 'blue' },
      { id: 'network', label: 'NETWORK', value: 'Connected', tone: 'blue' },
      { id: 'workstations', label: 'WORKSTATIONS', value: 'Protected', tone: 'blue' },
      { id: 'support', label: 'SUPPORT', value: 'Available', tone: 'blue' },
    ],
    features: [
      { id: 'remote', eyebrow: '01', title: 'Remote and onsite help', description: 'Practical support for teams that need issues resolved quickly without interrupting the workday.' },
      { id: 'users', eyebrow: '02', title: 'User and device care', description: 'Keep desktops, laptops and user environments stable, secure and easy to use.' },
      { id: 'systems', eyebrow: '03', title: 'Systems administration', description: 'Reliable oversight for the services and tools your organisation uses every day.' },
      { id: 'coordination', eyebrow: '04', title: 'Clear support coordination', description: 'A calm, visible support experience with ownership, updates and fewer surprises.' },
    ],
    dashboardTitle: 'Live support posture',
    dashboardSubtitle: 'A compact view of service health and response clarity.',
    dashboardMetrics: [
      { label: 'Tickets resolved', value: '98%', detail: 'within agreed SLA' },
      { label: 'Devices monitored', value: '412', detail: 'workstations and endpoints' },
      { label: 'Uptime', value: '99.99%', detail: 'service availability trend' },
    ],
    statementEyebrow: 'A RELIABLE BASELINE',
    statementTitle: 'Technology should reduce friction, not create it.',
    statementCopy:
      'The best support is the kind people barely notice. We keep the systems, users and services behind your business running smoothly so your team can stay focused on their work.',
    ctaEyebrow: 'READY TO STABILIZE OPERATIONS',
    ctaTitle: 'Make everyday IT feel effortless.',
  },
  networks: {
    id: 'networks',
    number: '02',
    breadcrumbLabel: 'Networks & Servers',
    eyebrow: 'INFRASTRUCTURE / NETWORKS & SERVERS',
    title: 'Infrastructure that works.',
    intro:
      'We design, build and maintain reliable technology infrastructure that keeps your business connected, productive and ready to scale.',
    ctaLabel: 'Explore infrastructure',
    ctaTarget: '#infrastructure-services',
    theme: 'slate',
    heroMetric: { label: 'Infrastructure uptime', value: '99.99%', detail: 'continuously monitored services' },
    nodes: [
      { id: 'internet', label: 'Internet', value: 'Ingress', tone: 'slate' },
      { id: 'firewall', label: 'Firewall', value: 'Protected', tone: 'slate' },
      { id: 'cloud', label: 'Cloud', value: 'Elastic', tone: 'slate' },
      { id: 'servers', label: 'Servers', value: 'Virtualized', tone: 'slate' },
      { id: 'users', label: 'Users', value: 'Connected', tone: 'slate' },
    ],
    features: [
      { id: 'lan', eyebrow: '01', title: 'LAN and WAN design', description: 'Structured networks with clean routing, sensible segmentation and room to grow.' },
      { id: 'servers', eyebrow: '02', title: 'Windows and Linux servers', description: 'Server environments built for availability, maintainability and operational confidence.' },
      { id: 'virtual', eyebrow: '03', title: 'Virtualization and cloud', description: 'Flexible infrastructure layers that make resources easier to manage and scale.' },
      { id: 'support', eyebrow: '04', title: 'Infrastructure support', description: 'Ongoing technical care that keeps the stack healthy behind the scenes.' },
    ],
    dashboardTitle: 'Infrastructure command view',
    dashboardSubtitle: 'A premium monitoring surface for the systems underneath the business.',
    dashboardMetrics: [
      { label: 'Network health', value: 'Healthy', detail: 'latency and packet loss nominal' },
      { label: 'Server load', value: '74%', detail: 'balanced across nodes' },
      { label: 'Storage', value: '2.8 TB', detail: 'available and monitored' },
    ],
    statementEyebrow: 'THE FOUNDATION MATTERS',
    statementTitle: 'Strong infrastructure should feel invisible when it is working well.',
    statementCopy:
      'Our job is to build infrastructure that behaves quietly, predicts issues early and gives your team a stable foundation to depend on.',
    ctaEyebrow: 'READY WHEN YOU ARE',
    ctaTitle: 'Build infrastructure you can rely on.',
  },
  security: {
    id: 'security',
    number: '03',
    breadcrumbLabel: 'Security & Testing',
    eyebrow: 'SECURITY / TESTING',
    title: 'Security without compromise.',
    intro:
      'Protect your systems, networks and data with security solutions designed to reduce risk, strengthen resilience and keep your business moving.',
    ctaLabel: 'Explore security',
    ctaTarget: '#security-services',
    theme: 'violet',
    heroMetric: { label: 'Threat reduction', value: '92%', detail: 'across monitored controls' },
    nodes: [
      { id: 'firewall', label: 'Firewall', value: 'Locked down', tone: 'violet' },
      { id: 'monitoring', label: 'Monitoring', value: 'Active', tone: 'violet' },
      { id: 'endpoint', label: 'Endpoint', value: 'Shielded', tone: 'violet' },
      { id: 'recovery', label: 'Recovery', value: 'Ready', tone: 'violet' },
    ],
    features: [
      { id: 'firewalls', eyebrow: '01', title: 'Firewalls and network security', description: 'Control access and reduce exposure with carefully configured perimeter and internal defenses.' },
      { id: 'monitoring', eyebrow: '02', title: 'Security monitoring', description: 'Watch critical systems so emerging issues are easier to spot before they grow.' },
      { id: 'endpoints', eyebrow: '03', title: 'Endpoint protection', description: 'Keep devices protected without slowing down the people using them.' },
      { id: 'recovery', eyebrow: '04', title: 'Backup and recovery', description: 'Build a practical recovery story that supports continuity when things go wrong.' },
    ],
    dashboardTitle: 'Security signal',
    dashboardSubtitle: 'A concise view of protection, readiness and active response.',
    dashboardMetrics: [
      { label: 'Alerts reviewed', value: '24', detail: 'high-priority events this week' },
      { label: 'Vulnerabilities closed', value: '17', detail: 'patched and verified' },
      { label: 'Recovery readiness', value: 'A-', detail: 'tested backup posture' },
    ],
    statementEyebrow: 'THE RIGHT APPROACH',
    statementTitle: "Security isn't a checkbox.",
    statementCopy:
      'Your infrastructure, users, applications and data form part of the same environment. Effective security means understanding how those pieces interact and protecting the whole system.',
    ctaEyebrow: 'LET US HARDEN THE ENVIRONMENT',
    ctaTitle: 'Build a safer, stronger business.',
  },
  hosting: {
    id: 'hosting',
    number: '04',
    breadcrumbLabel: 'Internet & Hosting',
    eyebrow: 'CONNECTIVITY / HOSTING',
    title: 'Connected, wherever work happens.',
    intro:
      'Reliable connectivity, hosting and cloud services that keep your people, systems and online presence available when they matter.',
    ctaLabel: 'Explore connectivity',
    ctaTarget: '#connectivity-services',
    theme: 'teal',
    heroMetric: { label: 'Availability', value: '99.99%', detail: 'service continuity target' },
    nodes: [
      { id: 'web', label: 'WEB', value: 'Online', tone: 'teal' },
      { id: 'cloud', label: 'CLOUD', value: 'Protected', tone: 'teal' },
      { id: 'mail', label: 'MAIL', value: 'Delivering', tone: 'teal' },
      { id: 'backup', label: 'BACKUP', value: 'Synced', tone: 'teal' },
    ],
    features: [
      { id: 'internet', eyebrow: '01', title: 'Internet connectivity', description: 'Dependable business connectivity designed around the way your organisation communicates.' },
      { id: 'hosting', eyebrow: '02', title: 'Website and domain hosting', description: 'Managed hosting with a stable home for the services your organisation depends on.' },
      { id: 'email', eyebrow: '03', title: 'Cloud email', description: 'Reliable communication, administration and access wherever the team works.' },
      { id: 'backup', eyebrow: '04', title: 'Cloud backup', description: 'Protect vital information with backup services designed for resilience and recovery.' },
    ],
    dashboardTitle: 'Service continuity',
    dashboardSubtitle: 'Availability, routing and resilience presented as a clean operational surface.',
    dashboardMetrics: [
      { label: 'Edge uptime', value: '99.99%', detail: 'rolling 30 day average' },
      { label: 'Mail delivery', value: 'Stable', detail: 'queue and relay healthy' },
      { label: 'Backups verified', value: '6 / 6', detail: 'all critical assets protected' },
    ],
    statementEyebrow: 'BUILT FOR CONTINUITY',
    statementTitle: 'Available is not a nice-to-have.',
    statementCopy:
      'The services connecting your organisation should work quietly in the background. We help make that possible with dependable infrastructure and support that keeps your business within reach.',
    ctaEyebrow: 'KEEP YOUR BUSINESS CONNECTED',
    ctaTitle: 'Create a stronger digital foundation.',
  },
}
