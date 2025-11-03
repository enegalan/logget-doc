import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Logget
          </Heading>
          <p className={styles.heroSubtitle}>
            Extract browser logs and network data from web pages
          </p>
          <p className={styles.heroDescription}>
            A command-line tool similar to curl that uses an embedded Chromium browser to capture console logs and network requests. Perfect for debugging, monitoring, and analyzing web applications.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className={styles.primaryButton}
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className={styles.secondaryButton}
              to="https://github.com/enegalan/logget">
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}) {
  return (
    <div className={styles.feature}>
      <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Features</Heading>
        </div>
        <div className={styles.featuresGrid}>
          <Feature
            title="Console Logs"
            description="Capture all console messages including log, error, warn, and info"
          />
          <Feature
            title="Network Monitoring"
            description="Track HTTP requests with headers, status codes, and detailed timing metrics"
          />
          <Feature
            title="Multiple Formats"
            description="Output data in JSON, CSV, or HAR format for easy parsing and analysis"
          />
          <Feature
            title="Cross-Platform"
            description="Works on Windows, Linux, and macOS with embedded Chromium"
          />
          <Feature
            title="Real-time Streaming"
            description="Stream logs and network requests in real-time with follow mode"
          />
          <Feature
            title="Advanced Filtering"
            description="Filter by status code, domain, MIME type, size, and resource type"
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
          <Heading as="h2" className={styles.sectionTitle}>Quick Start</Heading>
          <p className={styles.quickStartDescription}>Get started in seconds with these examples</p>
          <div className={styles.codeBlock}>
            <pre>
              <code>
                <span className={styles.codeComment}># Show console logs</span>{'\n'}
                <span className={styles.codeCommand}>logget</span> <span className={styles.codeOption}>--logs</span> <span className={styles.codeUrl}>https://example.com</span>{'\n'}
                {'\n'}
                <span className={styles.codeComment}># Show network requests</span>{'\n'}
                <span className={styles.codeCommand}>logget</span> <span className={styles.codeOption}>--network</span> <span className={styles.codeUrl}>https://example.com</span>{'\n'}
                {'\n'}
                <span className={styles.codeComment}># Show both logs and network data</span>{'\n'}
                <span className={styles.codeCommand}>logget</span> <span className={styles.codeOption}>--logs</span> <span className={styles.codeOption}>--network</span> <span className={styles.codeUrl}>https://example.com</span>{'\n'}
                {'\n'}
                <span className={styles.codeComment}># Output in JSON format</span>{'\n'}
                <span className={styles.codeCommand}>logget</span> <span className={styles.codeOption}>--logs</span> <span className={styles.codeOption}>--network</span> <span className={styles.codeOption}>--json</span> <span className={styles.codeUrl}>https://example.com</span>{'\n'}
                {'\n'}
                <span className={styles.codeComment}># Stream logs in real-time</span>{'\n'}
                <span className={styles.codeCommand}>logget</span> <span className={styles.codeOption}>-f</span> <span className={styles.codeOption}>--logs</span> <span className={styles.codeUrl}>https://example.com</span>
              </code>
            </pre>
          </div>
          <Link
            className={styles.documentationLink}
            to="/docs/getting-started/installation">
            Read the documentation →
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
