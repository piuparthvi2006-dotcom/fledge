import { useState } from 'react';
import {
  ArrowRight,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STUDY_FORMATS = [
  {
    id: 'summary',
    label: 'Summary',
    icon: FileText,
    eyebrow: 'REVISION SUMMARY',
    title: 'Bioremediation at a glance',
    description:
      'A structured overview of the key concepts, definitions and examples in your notes.',
    points: [
      'Core concepts grouped by topic',
      'Important terminology highlighted',
      'Examples retained from your material',
    ],
  },
  {
    id: 'quiz',
    label: 'Quiz',
    icon: CircleHelp,
    eyebrow: 'QUICK KNOWLEDGE CHECK',
    title: 'Test what you understood',
    description:
      'Which treatment stage relies most directly on microbial activity?',
    points: [
      'A. Preliminary screening',
      'B. Secondary biological treatment',
      'C. Final filtration',
    ],
  },
  {
    id: 'mock-exam',
    label: 'Mock exam',
    icon: ClipboardCheck,
    eyebrow: '60 MINUTES · 20 QUESTIONS',
    title: 'Practise under exam conditions',
    description:
      'A balanced paper built from your notes, with clear sections and marks for each question.',
    points: [
      'Section A: multiple-choice questions',
      'Section B: short-answer questions',
      'Section C: applied response',
    ],
  },
];

const PLATFORM_FEATURES = [
  {
    icon: Search,
    title: 'Discover',
    description:
      'Search internships, programmes, research and competitions in one place.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Personalise',
    description:
      'See opportunities matched to your year, major and connected NUS Outlook.',
  },
  {
    icon: Sparkles,
    title: 'Prepare',
    description:
      'Turn your own notes into summaries, quizzes and mock exams when it is time to study.',
  },
];

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Find what fits',
    description:
      'Browse current opportunities and filter out the ones that do not match your needs.',
  },
  {
    number: '02',
    title: 'Keep it organised',
    description:
      'Save useful listings and return to the details, eligibility and deadlines later.',
  },
  {
    number: '03',
    title: 'Study with your notes',
    description:
      'Upload your course material and generate the revision format you need next.',
  },
];

export default function LandingFeatures() {
  const [selectedFormat, setSelectedFormat] = useState(STUDY_FORMATS[0]);

  return (
    <>
      <section className="landing-overview" id="learn-more">
        <div className="landing-container">
          <div className="landing-section-heading landing-section-heading--centered">
            <span className="landing-eyebrow">ONE STUDENT WORKSPACE</span>
            <h2>Find the opportunity. Be ready for it.</h2>
            <p>
              Fledge brings opportunity discovery and study preparation together,
              so useful information does not disappear across inboxes, tabs and files.
            </p>
          </div>

          <div className="landing-capabilities">
            {PLATFORM_FEATURES.map(({ description, icon: Icon, title }) => (
              <article className="landing-capability" key={title}>
                <span className="landing-capability__icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-study" id="study-tools">
        <div className="landing-container landing-study__layout">
          <div className="landing-study__copy">
            <span className="landing-eyebrow">FLEDGE STUDY</span>
            <h2>Your notes, ready to revise.</h2>
            <p>
              Upload PDF, DOCX or TXT notes, choose what you need and generate
              study material grounded in your own course content.
            </p>

            <div className="landing-format-selector" aria-label="Preview a study format">
              {STUDY_FORMATS.map(format => {
                const Icon = format.icon;
                const isSelected = format.id === selectedFormat.id;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={isSelected ? 'is-selected' : ''}
                    key={format.id}
                    onClick={() => setSelectedFormat(format)}
                    type="button"
                  >
                    <Icon aria-hidden="true" size={18} strokeWidth={1.9} />
                    {format.label}
                  </button>
                );
              })}
            </div>

            <div className="landing-study__actions">
              <Link className="landing-button landing-button--primary" to="/study">
                Try Fledge Study
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link className="landing-text-link" to="/explore">
                Explore opportunities
              </Link>
            </div>
          </div>

          <div className="landing-study-preview" aria-live="polite">
            <div className="landing-study-preview__topbar">
              <span className="landing-file-chip">
                <FileText aria-hidden="true" size={16} />
                LSM1111_topic_7.pdf
              </span>
              <span className="landing-ai-label">
                <Sparkles aria-hidden="true" size={14} />
                AI generated
              </span>
            </div>

            <div className="landing-study-preview__body">
              <span className="landing-preview-eyebrow">{selectedFormat.eyebrow}</span>
              <h3>{selectedFormat.title}</h3>
              <p>{selectedFormat.description}</p>
              <div className="landing-preview-points">
                {selectedFormat.points.map(point => (
                  <div key={point}>
                    <span aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-workflow">
        <div className="landing-container">
          <div className="landing-section-heading">
            <span className="landing-eyebrow">BUILT AROUND YOUR WEEK</span>
            <h2>Less searching. More doing.</h2>
          </div>

          <div className="landing-workflow__steps">
            {WORKFLOW_STEPS.map(step => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
