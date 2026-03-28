export const projects = [
  {
    id: 'cos-cdc-dashboard',
    title: 'Cos-CdC-Dashboard',
    shortDesc: 'Unified data integration platform for multi-source project analytics.',
    role: 'Senior Data Engineer',
    problem:
      'Project data was scattered across Tempo Timesheet, Jira, Appsheet, and BambooHR with no unified analytics view. This created silos and made it difficult for teams to get real-time project insights.',
    approach:
      'Built a real-time ETL pipeline using Singer.io to ingest data from all sources, orchestrated with Apache Airflow, and stored in Postgres. Deployed on Azure Virtual Machine for scalability.',
    tech: ['Singer.io', 'Airflow', 'Postgres', 'Azure VM', 'Python', 'SQL'],
    metrics: [
      {
        label: 'Data sources integrated',
        value: '5+ sources (Tempo, Jira, Appsheet, BambooHR, etc.)',
        note: null,
      },
      {
        label: 'Manual reporting time reduction',
        value: '~40% estimated reduction in manual reporting overhead',
        note: '(estimate, unverified)',
      },
      {
        label: 'Real-time sync latency',
        value: 'Sub-minute synchronization for all data sources',
        note: '(estimate, unverified)',
      },
    ],
  },
  {
    id: 'verizon-modernisation',
    title: 'Verizon Real-Time Modernisation',
    shortDesc: 'Successfully migrated legacy IBM-streams infrastructure to GCP Dataflow.',
    role: 'Senior Data Engineer',
    problem:
      'Legacy IBM-streams infrastructure was difficult to scale, had high maintenance costs, and no cloud integration. The team needed a modern, cloud-native solution.',
    approach:
      'Analyzed and migrated stream processing logic from IBM-streams proprietary language to GCP Dataflow pipelines using Python and Java. Ensured logic parity through comprehensive testing and validation.',
    tech: ['IBM-streams', 'GCP Dataflow', 'Pub/Sub', 'Python', 'Java'],
    metrics: [
      {
        label: 'Operational overhead reduction',
        value: '~50% reduction in maintenance and operational costs',
        note: '(estimate, unverified)',
      },
      {
        label: 'Scalability improvement',
        value: 'Auto-scaling cloud infrastructure vs. fixed on-premise capacity',
        note: '(estimate, unverified)',
      },
      {
        label: 'Latency preservation',
        value: 'Maintained sub-second event processing latency post-migration',
        note: '(estimate, unverified)',
      },
    ],
  },
  {
    id: 'vimeo-cdn-processors',
    title: 'Vimeo CDN Data Processors',
    shortDesc: 'Real-time CDN data analytics pipeline for video hosting platform.',
    role: 'Data Engineer',
    problem:
      'Large-scale CDN data from the video hosting service needed real-time processing and analytics. Data scientists needed dashboards and metrics for iterative analysis.',
    approach:
      'Built a data processing pipeline on GCP using Dataflow and Pub/Sub to ingest CDN events in real-time, then enabled interactive analytics dashboards and visualizations for the data science team.',
    tech: ['GCP Dataflow', 'Pub/Sub', 'BigQuery', 'Python', 'Google Analytics'],
    metrics: [
      {
        label: 'Event throughput',
        value: '~10M+ events per day with 99.5% delivery reliability',
        note: '(estimate, unverified)',
      },
      {
        label: 'Analytics dashboards',
        value: '50+ real-time metrics and KPI dashboards',
        note: '(estimate, unverified)',
      },
      {
        label: 'Data scientist productivity',
        value: '~3x faster iteration on analytics queries and insights',
        note: '(estimate, unverified)',
      },
    ],
  },
]
