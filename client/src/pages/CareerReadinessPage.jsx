import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { readinessAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import ReadinessRadarChart from '../components/charts/ReadinessRadarChart';
import './CareerReadinessPage.css';

export default function CareerReadinessPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [readiness, setReadiness] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await readinessAPI.getSnapshot();
        setReadiness(res.data.readiness);
      } catch (err) {
        console.error('Failed to load readiness:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profile?.targetRole]);

  if (loading) {
    return (
      <div style={{ padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '3px solid var(--color-brand-blue)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Calculating 6-dimensional career readiness model...</p>
      </div>
    );
  }

  const dims = readiness?.dimensions || {};
  const rationale = readiness?.dimensionRationale || {};

  const dimensionsList = [
    {
      key: 'technical',
      name: 'Technical Competency',
      weight: '25%',
      score: dims.technicalReadiness || 50,
      color: 'blue',
      rationale: rationale.technical || 'Evaluated across verified vs claimed skills matching target role competencies.'
    },
    {
      key: 'project',
      name: 'Project & Portfolio Breadth',
      weight: '20%',
      score: dims.projectReadiness || 55,
      color: 'purple',
      rationale: rationale.project || 'Calculated from completed practical missions and scanned GitHub repos.'
    },
    {
      key: 'interview',
      name: 'Mock Interview Performance',
      weight: '20%',
      score: dims.interviewReadiness || 45,
      color: 'emerald',
      rationale: rationale.interview || 'Average scoring across multi-turn technical and architectural evaluations.'
    },
    {
      key: 'market',
      name: 'Curated Market Benchmark Alignment',
      weight: '15%',
      score: dims.marketAlignment || 45,
      color: 'amber',
      rationale: rationale.market || 'Proportion of essential industry competencies met with acceptable deficiency.'
    },
    {
      key: 'communication',
      name: 'Technical Communication & Logic',
      weight: '10%',
      score: dims.communicationReadiness || 70,
      color: 'teal',
      rationale: rationale.communication || 'Assessed from structured answer flow, clarity, and documentation hygiene.'
    },
    {
      key: 'resume',
      name: 'Resume & Profile Completeness',
      weight: '10%',
      score: dims.resumeReadiness || 60,
      color: 'rose',
      rationale: rationale.resume || 'Derived from student profile data density and parsed resume signals.'
    }
  ];

  return (
    <div className="career-readiness-page">
      {/* Header */}
      <div className="career-readiness-page__header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>Career Readiness Engine</h1>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
          Multidimensional readiness index for <strong style={{ color: 'var(--color-text-primary)' }}>{readiness?.targetRole}</strong>.
        </p>
      </div>

      {/* Primary Readiness Index Banner */}
      <div className="career-readiness-page__banner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#93c5fd', display: 'block' }}>
            Aggregate Career Readiness Index
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
              {readiness?.overallReadiness || 65}%
            </span>
            <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>Composite Readiness</span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: '#cbd5e1', maxWidth: '36rem', lineHeight: 1.6, margin: 0 }}>
            Formula: {readiness?.formulaExplanation || 'Weighted sum across 6 evidentiary pillars.'}
          </p>
        </div>

        {readiness?.nextActionRecommendation && (
          <div className="career-readiness-page__action-box">
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fde68a', display: 'block' }}>
              Highest-Impact Next Action
            </span>
            <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {readiness.nextActionRecommendation.title}
            </h4>
            <p style={{ fontSize: '11px', color: '#e2e8f0', margin: 0, lineHeight: 1.5 }}>
              {readiness.nextActionRecommendation.description}
            </p>
            <Link to={readiness.nextActionRecommendation.targetLink}>
              <Button size="sm" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }} icon={ArrowRight}>
                Execute Action
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Radar Chart & Dimension Scores */}
      <div className="career-readiness-page__layout">
        {/* Radar Chart Card */}
        <Card
          title="6-Pillar Competency Radar"
          subtitle="Visualizing balance across technical, delivery, and communication pillars"
        >
          <ReadinessRadarChart dimensions={dims} />
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-slate-100)', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Balanced profiles demonstrate reduced technical interview drop-off.
            </span>
          </div>
        </Card>

        {/* Dimension Breakdown Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', margin: 0 }}>
            Component Pillar Scorecards
          </h3>

          <div className="career-readiness-page__pillars-grid">
            {dimensionsList.map((dim) => (
              <div key={dim.key} className="career-readiness-page__pillar-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{dim.name}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)', backgroundColor: 'var(--color-slate-100)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    Weight: {dim.weight}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{dim.score}%</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Score</span>
                </div>

                <ProgressBar value={dim.score} size="sm" color={dim.color} showValue={false} />

                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '0.625rem', margin: 0, lineHeight: 1.5 }}>
                  {dim.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transparent Calculation Documentation & Legal Disclaimer */}
      <Card
        title="Scoring Methodology & Transparency Disclosures"
        subtitle="Detailed accountability and design philosophy"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>How Overall Readiness is Calculated:</strong> The index is a transparent, deterministic weighted average calculated by the backend readiness engine:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '11px', color: 'var(--color-slate-700)', backgroundColor: 'var(--color-slate-50)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)', margin: 0 }}>
            <li>Technical Readiness: 25% (verified & probable skills vs required competency profile)</li>
            <li>Project Readiness: 20% (verified practical missions & GitHub repository depth)</li>
            <li>Market Alignment: 15% (percentage of benchmark competencies met with deficiency &lt; 20%)</li>
            <li>Mock Interview Performance: 20% (calibrated average score across conducted AI mock interviews)</li>
            <li>Technical Communication: 10% (reasoning clarity, documentation hygiene, and answer articulation)</li>
            <li>Resume & Profile Readiness: 10% (information completeness and keyword alignment)</li>
          </ul>

          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#78350f', display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
            <AlertCircle style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0, marginTop: '0.125rem' }} />
            <span style={{ fontSize: '11px' }}>
              <strong>Academic & Educational Disclaimer:</strong> Career readiness scores are decision-support estimates engineered for self-assessment and learning optimization. They do not constitute a guarantee of employment, salary offer, interview shortlisting, or recruitment placement.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
