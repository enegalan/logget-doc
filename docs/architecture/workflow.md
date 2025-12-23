# How logget Works

This document explains how logget works from a conceptual perspective, helping you understand what happens when you use it.

## What is logget?

logget is a command-line tool that opens a web page in an invisible browser and captures everything that happens: network requests, console messages, and JavaScript errors. Think of it as a spy or observer that watches what a website does behind the scenes.

## The Big Picture

```mermaid
flowchart LR
    User[You] -->|Run logget| Tool[logget]
    Tool -->|Opens| Browser[Invisible Browser]
    Browser -->|Visits| Website[Web Page]
    Website -- Generates --> Data["Network Requests<br>& Console Logs"]
    Tool --> Filter["Process and filter"]
    Filter -- Outputs --> Results["Formatted Results"]
    Data -- Captured by --> Tool
    
    style User fill:#90EE90,stroke:#000000,color: #035c04
    style Tool fill:#87CEEB,stroke:#000000,color:#005a6c
    style Browser fill:#DDA0DD,stroke:#000000,color:#fff
    style Website fill:#FFA07A,stroke:#000000,color:#b44618
    style Results fill:#F5DEB3,stroke:#000000,color:#a58346
    style Filter fill:#FDF4A3,stroke:#000000,color:#817904
    style Data fill:#6EA4DB,stroke:#000000,color:#0c355f
```

## Two Ways to Use logget

### Normal Mode - One-Time Capture

In normal mode, logget loads the page once, captures everything that happens, and then shows you the results.

```mermaid
flowchart TD
    Start([Start]) --> Load[Load Web Page]
    Load --> Wait[Wait for Page to Load]
    Wait --> Capture[Capture All Events]
    Capture --> Filter[Apply Filters]
    Filter --> Format[Format Output]
    Format --> Show[Show Results]
    
    style Start fill:#90EE90,stroke:#000000,color:#035c04
    style Show fill:#F5DEB3,stroke:#000000,color:#a58346
    style Capture fill:#F0E68C,stroke:#000000,color:#5b5205
```

**Use this when:** You want to see what happens when a page loads once.

### Follow Mode - Real-Time Streaming

In follow mode, logget continuously watches the page and shows you events as they happen in real-time.

```mermaid
flowchart TD
    Start([Start]) --> Load[Load Web Page]
    Load --> Watch[Watch Continuously]
    Watch --> Event{New Event?}
    Event -->|Yes| Capture[Capture Event]
    Event -->|No| Watch
    Capture --> Filter{Passes Filter?}
    Filter -->|Yes| Format[Format Output]
    Filter -->|No| Watch
    Format --> Show[Show Results]
    Show --> Watch
    
    style Start fill:#90EE90,stroke:#000000,color:#035c04
    style Watch fill:#F0E68C,stroke:#000000,color:#5b5205
    style Show fill:#F5DEB3,stroke:#000000,color:#a58346
```

**Use this when:** You want to monitor a page that updates dynamically or makes ongoing requests.

## Key Concepts

### Invisible Browser
logget uses a "headless" browser - a browser that runs without a visible window. This allows it to work on servers and in automated environments.

### Event-Driven
Everything logget captures is based on events: when a network request happens, when a console message appears, when an error occurs. logget listens to these events and records them.

### Non-Intrusive
logget doesn't modify the web page or interfere with its behavior. It simply observes and records what happens naturally.

### Flexible Output
The same captured data can be formatted in multiple ways, making it easy to use the results in different contexts (human reading, program processing, analysis tools).
