import React from 'react'

export default function DataPipeline() {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-chess-cream mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
          Data Pipeline Architecture
        </h2>
        <p className="text-chess-cream/70 text-center mb-12 max-w-2xl mx-auto">
          Strategic data flows orchestrated with precision — like a grandmaster's opening, each move optimizes for scalability, reliability, and speed.
        </p>

        {/* SVG Pipeline Diagram */}
        <div className="glass rounded-xl p-8 overflow-x-auto">
          <svg viewBox="0 0 1200 400" className="w-full min-w-max" xmlns="http://www.w3.org/2000/svg">
            {/* Gradient and Filter Definitions */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a961" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b7355" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#c9a961" />
              </marker>
            </defs>

            {/* Stage 1: Data Sources (Pawn) */}
            <g>
              <rect x="30" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="2"/>
              <text x="90" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♟</text>
              <text x="90" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">DATA SOURCES</text>
              <text x="90" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">APIs, Logs, Streams</text>
            </g>

            {/* Arrow 1 */}
            <g>
              <path d="M 150 200 L 210 200" stroke="#c9a961" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
              <text x="180" y="190" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.6">Extract</text>
            </g>

            {/* Stage 2: Ingestion (Rook) */}
            <g>
              <rect x="220" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="2"/>
              <text x="280" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♜</text>
              <text x="280" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">INGESTION</text>
              <text x="280" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">Pub/Sub, Singer.io, BigQuery</text>
            </g>

            {/* Arrow 2 */}
            <g>
              <path d="M 340 200 L 400 200" stroke="#c9a961" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="370" y="190" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.6">Stream</text>
            </g>

            {/* Stage 3: Orchestration (Knight - central intelligence) */}
            <g>
              <rect x="410" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="3"/>
              <text x="470" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♞</text>
              <text x="470" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">ORCHESTRATION</text>
              <text x="470" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">Airflow, Vertex AI</text>
            </g>

            {/* Arrow 3 */}
            <g>
              <path d="M 530 200 L 590 200" stroke="#c9a961" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
              <text x="560" y="190" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.6">Transform</text>
            </g>

            {/* Stage 4: Processing (Bishop) */}
            <g>
              <rect x="600" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="2"/>
              <text x="660" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♝</text>
              <text x="660" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">PROCESSING</text>
              <text x="660" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">Spark, Python, SQL</text>
            </g>

            {/* Arrow 4 */}
            <g>
              <path d="M 720 200 L 780 200" stroke="#c9a961" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="750" y="190" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.6">Load</text>
            </g>

            {/* Stage 5: Data Warehouse (Queen - central hub) */}
            <g>
              <rect x="790" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="3"/>
              <text x="850" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♛</text>
              <text x="850" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">DATA WAREHOUSE</text>
              <text x="850" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">Snowflake, Postgres, BQ</text>
            </g>

            {/* Arrow 5 */}
            <g>
              <path d="M 910 200 L 970 200" stroke="#c9a961" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
              <text x="940" y="190" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.6">Consume</text>
            </g>

            {/* Stage 6: Analytics (King - ultimate power) */}
            <g>
              <rect x="980" y="150" width="120" height="100" rx="8" fill="#1a1a2e" stroke="#c9a961" strokeWidth="2"/>
              <text x="1040" y="185" textAnchor="middle" fill="#c9a961" fontSize="24" filter="url(#glow)">♔</text>
              <text x="1040" y="220" textAnchor="middle" fill="#c9a961" fontSize="12" fontWeight="bold">ANALYTICS</text>
              <text x="1040" y="235" textAnchor="middle" fill="#c9a961" fontSize="10" opacity="0.7">BI, ML, Dashboards</text>
            </g>

            {/* Feedback Loop - Monitoring & Alerting */}
            <path d="M 1040 250 L 1040 320 L 50 320 L 50 250" stroke="#c9a961" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="5,5"/>
            <text x="545" y="345" textAnchor="middle" fill="#c9a961" fontSize="11" opacity="0.6">Monitoring, Logging, Alerting</text>
          </svg>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: '♞', title: 'Strategic Planning', desc: 'Each move optimized for long-term gain' },
            { icon: '♛', title: 'Centralized Hub', desc: 'Single source of truth for all data' },
            { icon: '♚', title: 'Failsafe Design', desc: 'Built for resilience and recovery' },
          ].map((item, idx) => (
            <div key={idx} className="glass rounded-lg p-6 text-center border border-chess-gold/20 hover:border-chess-gold/50 transition">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-chess-gold font-bold mb-2" style={{fontFamily: 'Playfair Display'}}>{item.title}</h3>
              <p className="text-chess-cream/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
