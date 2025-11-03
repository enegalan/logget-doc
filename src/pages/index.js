import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroTitle}>
          <Heading as="h1" className="hero__title">
            <span className={styles.titleHighlight}>Logget</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            A command-line tool similar to curl that extracts browser logs and network data from web pages
          </p>
        </div>
        <div className={styles.heroDescription}>
          <p>
            Extract browser logs and network data from web pages using an embedded Chromium browser. 
            Perfect for debugging, monitoring, and analyzing web applications.
          </p>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Get Started →
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/enegalan/logget">
            <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description, icon}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Key Features</Heading>
          <p>Everything you need to monitor and debug web applications</p>
        </div>
        <div className="row">
          <Feature
            title="Console Log Collection"
            description="Capture all console.log, console.error, console.warn, and console.info messages"
            icon="📋"
          />
          <Feature
            title="Network Monitoring"
            description="Track all HTTP requests (fetch, XMLHttpRequest) with headers, status codes, and timing"
            icon="🌐"
          />
          <Feature
            title="Multiple Formats"
            description="Output data in JSON, CSV, or HAR format for easy parsing and analysis"
            icon="📊"
          />
        </div>
        <div className="row">
          <Feature
            title="Cross-Platform"
            description="Works on Windows, Linux, and macOS with embedded Chromium via chromedp"
            icon="💻"
          />
          <Feature
            title="Real-time Streaming"
            description="Stream logs and network requests in real-time with follow mode"
            icon="⚡"
          />
          <Feature
            title="Advanced Filtering"
            description="Filter by status code, domain, MIME type, size, and resource type"
            icon="🔍"
          />
        </div>
        <div className="row">
          <Feature
            title="Performance Metrics"
            description="Detailed timing metrics (TTFB, DNS, SSL, Connect, Send, Wait, Receive times)"
            icon="⏱️"
          />
          <Feature
            title="Fingerprint Rotation"
            description="Rotate navigator fingerprints to prevent tracking (userAgent, platform, WebGL, Canvas)"
            icon="🔄"
          />
          <Feature
            title="File Support"
            description="Read headers and cookies from files, write output to files, and append mode"
            icon="📁"
          />
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className={styles.quickStartContent}>
          <Heading as="h2">Quick Start</Heading>
          <p>Get started with logget in seconds</p>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`# Show console logs
logget --logs https://example.com

# Show network requests
logget --network https://example.com

# Show both logs and network data
logget --logs --network https://example.com

# Output in JSON format
logget --logs --network --json https://example.com

# Stream logs in real-time
logget -f --logs https://example.com`}</code>
            </pre>
          </div>
          <Link
            className="button button--primary"
            to="/docs/getting-started/installation">
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Logget Documentation"
      description="A command-line tool for tracking, filtering and analyzing web application logs and network requests">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickStart />
      </main>
    </Layout>
  );
}

