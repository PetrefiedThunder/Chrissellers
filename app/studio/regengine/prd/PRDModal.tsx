'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ChevronRight, FileText, Database, Lock, Zap, Server, Code, BarChart3, Truck, Shield, Users } from 'lucide-react'

interface PRDSection {
  id: string
  title: string
  icon: React.ElementType
  content: React.ReactNode
}

const sections: PRDSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    icon: FileText,
    content: (
      <div className="space-y-4">
        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-text-accent">RegEngine</span> is an enterprise-grade, 
          event-driven B2B SaaS platform designed to solve the "Handoff Problem" in agricultural and food supply chains.
        </p>
        <p>
          Driven by the FDA's FSMA 204 mandate, organizations are now legally required to maintain end-to-end 
          traceability of Critical Tracking Events (CTEs) and Key Data Elements (KDEs). RegEngine acts as the 
          translation and enforcement layer between disparate supply chain systems—ingesting unstructured data, 
          normalizing it into a canonical schema, and building a traversable cryptographic graph of the global food supply.
        </p>
      </div>
    ),
  },
  {
    id: 'problem-statement',
    title: 'Problem Statement',
    icon: Shield,
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="font-semibold text-red-400 mb-2">The Risk</p>
          <p>Failure to comply with FSMA 204 results in massive fines, product embargoes, and brand destruction.</p>
        </div>
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="font-semibold text-amber-400 mb-2">The Friction</p>
          <p>Retailers and distributors cannot force upstream farmers and packers to use the same software.</p>
        </div>
        <p className="text-text-secondary">
          The food supply chain operates on fractured, siloed data (paper logs, legacy ERPs, PDFs, and EDI). Under FSMA 204, 
          if a foodborne illness outbreak occurs, the FDA requires companies to produce an electronic sortable 
          spreadsheet of traceability data within <span className="font-semibold text-text-accent">24 hours</span>.
        </p>
      </div>
    ),
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    icon: Users,
    content: (
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="p-4 rounded-lg bg-bg-surface border border-border-light">
            <span className="text-xs uppercase tracking-wider text-text-accent mb-2 block">Primary Persona</span>
            <p className="font-semibold">Chief Compliance Officer (CCO) / Quality Assurance Director</p>
            <p className="text-sm text-text-secondary">Mid-Market to Enterprise Food Distributors</p>
          </div>
          <div className="p-4 rounded-lg bg-bg-surface border border-border-light">
            <span className="text-xs uppercase tracking-wider text-text-secondary mb-2 block">Secondary Persona</span>
            <p className="font-semibold">Facility Managers / Receiving Clerks</p>
            <p className="text-sm text-text-secondary">Interacting via mobile scanning and bulk uploads</p>
          </div>
          <div className="p-4 rounded-lg bg-bg-surface border border-border-light">
            <span className="text-xs uppercase tracking-wider text-text-secondary mb-2 block">Tertiary Persona</span>
            <p className="font-semibold">System Administrators / IT Integrators</p>
            <p className="text-sm text-text-secondary">Configuring webhooks, API keys, and EDI connections</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'core-features',
    title: 'Core Features',
    icon: Zap,
    content: (
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-text-accent flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-text-accent/20 flex items-center justify-center text-xs">1</span>
            Universal Ingestion Engine
          </h4>
          <p className="text-sm text-text-secondary">Accept traceability data in whatever format the user currently possesses, eliminating adoption friction.</p>
          <ul className="text-sm space-y-1 text-text-secondary/80 ml-8 list-disc list-inside">
            <li>API/Webhook Ingestion for modern ERPs</li>
            <li>AI-driven NLP extraction for PDFs and Bills of Lading</li>
            <li>Legacy EDI 856 (ASN) parsing</li>
            <li>Progressive Web App barcode/QR scanning</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-text-accent flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-text-accent/20 flex items-center justify-center text-xs">2</span>
            Graph-Based Traceability
          </h4>
          <p className="text-sm text-text-secondary">Instantly resolve One-Up / One-Down lineage across millions of discrete shipping events.</p>
          <ul className="text-sm space-y-1 text-text-secondary/80 ml-8 list-disc list-inside">
            <li>Neo4j Graph Database for CTE mapping</li>
            <li>Recursive graph traversal in under 2 seconds</li>
            <li>Nodes: Facilities, Lot Codes | Edges: Transformations, Shipments</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-text-accent flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-text-accent/20 flex items-center justify-center text-xs">3</span>
            Compliance Control Plane
          </h4>
          <p className="text-sm text-text-secondary">Unified dashboard for CCOs to monitor compliance posture in real-time.</p>
          <ul className="text-sm space-y-1 text-text-secondary/80 ml-8 list-disc list-inside">
            <li>FSMA 204 Readiness Health Scoring</li>
            <li>Recall Simulator (Fire Drill)</li>
            <li>Exception Queue for malformed data</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-text-accent flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-text-accent/20 flex items-center justify-center text-xs">4</span>
            Tamper-Evident Audit Trail
          </h4>
          <p className="text-sm text-text-secondary">Ensure absolute data integrity and non-repudiation for regulatory audits.</p>
          <ul className="text-sm space-y-1 text-text-secondary/80 ml-8 list-disc list-inside">
            <li>Merkle-tree cryptographic hashing</li>
            <li>Immutable event chain</li>
            <li>Mathematical proof of record integrity</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture',
    title: 'Technical Architecture',
    icon: Server,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Event Backbone', tech: 'Apache Kafka' },
            { label: 'Graph DB', tech: 'Neo4j' },
            { label: 'Primary DB', tech: 'PostgreSQL + RLS' },
            { label: 'Compute', tech: 'AWS EKS' },
            { label: 'Ingestion', tech: 'REST + EDI' },
            { label: 'Audit', tech: 'Merkle Trees' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-bg-surface border border-border-light">
              <p className="text-xs text-text-secondary mb-1">{item.label}</p>
              <p className="font-semibold text-text-accent text-sm">{item.tech}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">Performance Targets</h4>
          <ul className="text-sm space-y-1 text-text-secondary">
            <li>• FDA export generation: <span className="font-semibold text-text-primary">&lt;60s</span> for 1M records</li>
            <li>• Graph traversal: <span className="font-semibold text-text-primary">&lt;2s</span> for 5-depth chain</li>
            <li>• Kafka consumer lag autoscaling on EKS</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    icon: Lock,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-surface border border-border-light">
            <Lock className="w-5 h-5 text-text-accent mt-0.5" />
            <div>
              <p className="font-semibold">Multi-Tenant Isolation</p>
              <p className="text-sm text-text-secondary">PostgreSQL Row-Level Security bound to JWT claims. No tenant data bleed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-surface border border-border-light">
            <Shield className="w-5 h-5 text-text-accent mt-0.5" />
            <div>
              <p className="font-semibold">Regulatory Compliance</p>
              <p className="text-sm text-text-secondary">SOC 2 Type II + GDPR ready. Includes Right to be Forgotten purging.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-surface border border-border-light">
            <Users className="w-5 h-5 text-text-accent mt-0.5" />
            <div>
              <p className="font-semibold">Authentication</p>
              <p className="text-sm text-text-secondary">MFA enforcement for all Admin accounts.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'roadmap',
    title: 'Release Roadmap',
    icon: BarChart3,
    content: (
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border-light" />
          <div className="space-y-6">
            <div className="relative pl-10">
              <div className="absolute left-2 w-2 h-2 rounded-full bg-text-accent" />
              <p className="font-semibold text-text-accent">Phase 1: Core Compliance (MVP)</p>
              <p className="text-sm text-text-secondary">API Ingestion, CTE Normalization, Basic Neo4j Graph, FDA Export Generation</p>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-2 w-2 h-2 rounded-full bg-text-secondary/40" />
              <p className="font-semibold">Phase 2: Supplier Onboarding</p>
              <p className="text-sm text-text-secondary">NLP PDF Parsing, Mobile Web Scanner, Exception Queue, Webhooks</p>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-2 w-2 h-2 rounded-full bg-text-secondary/20" />
              <p className="font-semibold">Phase 3: Intelligence</p>
              <p className="text-sm text-text-secondary">Predictive Compliance Drift Alerts, Supplier Risk Scoring, Anomaly Simulation</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

interface PRDModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PRDModal({ isOpen, onClose }: PRDModalProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (isOpen) {
      setCompletedSections(prev => {
        const next = new Set(prev)
        next.add(activeSection)
        return next
      })
    }
  }, [activeSection, isOpen])

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1)
    }
  }

  const handleSectionClick = (index: number) => {
    setActiveSection(index)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-page/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-50 flex flex-col"
          >
            <div className="flex-1 flex flex-col bg-bg-surface rounded-2xl border border-border-light overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-text-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-text-primary">RegEngine PRD</h2>
                    <p className="text-xs text-text-secondary">Product Requirements Document</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">
                    {activeSection + 1} / {sections.length}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-bg-surface transition-colors"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <nav className="w-64 border-r border-border-light overflow-y-auto hidden md:block">
                  <div className="p-4 space-y-1">
                    {sections.map((section, index) => {
                      const Icon = section.icon
                      const isActive = activeSection === index
                      const isCompleted = completedSections.has(index)
                      return (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(index)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                            isActive
                              ? 'bg-text-accent/10 text-text-accent'
                              : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'
                          }`}
                        >
                          <div className={`relative ${isCompleted && !isActive ? 'text-green-500' : ''}`}>
                            <Icon className="w-4 h-4" />
                            {isCompleted && !isActive && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500" />
                            )}
                          </div>
                          <span className="text-sm font-medium truncate">{section.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </nav>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-6">
                          {sections[activeSection].icon && (
                            <div className="w-8 h-8 rounded-lg bg-text-accent/10 flex items-center justify-center">
                              {(() => {
                                const Icon = sections[activeSection].icon
                                return <Icon className="w-4 h-4 text-text-accent" />
                              })()}
                            </div>
                          )}
                          <h3 className="text-xl font-semibold text-text-primary">
                            {sections[activeSection].title}
                          </h3>
                        </div>
                        <div className="text-text-primary leading-relaxed">
                          {sections[activeSection].content}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </main>
              </div>

              {/* Footer Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border-light bg-bg-page/50">
                <button
                  onClick={handlePrev}
                  disabled={activeSection === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-bg-surface'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Previous</span>
                </button>
                <div className="flex gap-1">
                  {sections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSectionClick(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeSection === index
                          ? 'bg-text-accent w-6'
                          : 'bg-text-secondary/30 hover:bg-text-secondary/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={activeSection === sections.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === sections.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-bg-surface'
                  }`}
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}