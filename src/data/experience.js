// ⚠️ Update company names, dates, and descriptions to match your actual employment history.
export const experience = [
  {
    id: 'exp-1',
    role: 'Senior Data Engineer',
    company: 'Verizon (via Consulting)',
    period: '2023 – Present',
    location: 'Remote',
    summary:
      'Led migration of real-time stream processing from legacy IBM-Streams to GCP Dataflow, reducing operational overhead by ~50% and enabling auto-scaling cloud infrastructure.',
    highlights: [
      'Migrated IBM-Streams proprietary pipelines to GCP Dataflow (Python/Java) with full logic parity',
      'Reduced maintenance and operational costs by ~50% through cloud-native architecture',
      'Preserved sub-second event processing latency post-migration at full production load',
      'Designed Pub/Sub event schemas and Dataflow DAGs for 10M+ daily events',
    ],
    tech: ['GCP Dataflow', 'Pub/Sub', 'Python', 'Java', 'IBM Streams'],
  },
  {
    id: 'exp-2',
    role: 'Data Engineer',
    company: 'Vimeo (via Consulting)',
    period: '2021 – 2023',
    location: 'Remote',
    summary:
      'Built and maintained a large-scale CDN data analytics pipeline on GCP, enabling 50+ real-time KPI dashboards and increasing data scientist productivity by 3×.',
    highlights: [
      'Designed real-time CDN event ingestion pipeline using GCP Dataflow and Pub/Sub',
      'Delivered 50+ KPI dashboards consumed by data science & product teams',
      'Processed 10M+ events/day at 99.5% delivery reliability under peak load',
      'Enabled 3× faster analytics iteration for data science team via BigQuery integration',
    ],
    tech: ['GCP Dataflow', 'Pub/Sub', 'BigQuery', 'Python', 'Google Analytics'],
  },
  {
    id: 'exp-3',
    role: 'Data Engineer',
    company: 'Cos-CdC / Internal Projects',
    period: '2019 – 2021',
    location: 'Gurugram / Remote',
    summary:
      'Designed and delivered a unified data integration platform aggregating project data from 5+ sources, cutting manual reporting overhead by ~40%.',
    highlights: [
      'Integrated Tempo Timesheet, Jira, AppSheet, BambooHR, and more via Singer.io taps',
      'Orchestrated ETL workflows with Apache Airflow on Azure VM for reliable scheduling',
      'Built Postgres data warehouse enabling real-time project analytics and dashboards',
      'Reduced manual reporting overhead by ~40% across project management and HR teams',
    ],
    tech: ['Singer.io', 'Airflow', 'Postgres', 'Azure VM', 'Python', 'SQL'],
  },
]
