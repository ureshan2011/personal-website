import { createRoot, type Root } from 'react-dom/client';
import type { ComponentType } from 'react';
import './index.css';

import DatabaseConceptsPage from './lessons/database-concepts';
import ERDiagramsPage from './lessons/er-diagrams';
import SQLProgrammingPage from './lessons/sql-programming';
import ERActivitiesPage from './lessons/er-activities';
import ERAdvancedPage from './lessons/er-advanced';
import ERAttributesPage from './lessons/er-attributes';
import APAReferencingPage from './lessons/apa-referencing';
import JiraCertificationsPage from './lessons/jira-certifications';
import SQLCertificationsPage from './lessons/sql-certifications';
import VibeToProductionPage from './lessons/vibe-to-production';

const LESSONS: Record<string, ComponentType> = {
  'database-concepts': DatabaseConceptsPage,
  'er-diagrams': ERDiagramsPage,
  'sql-programming': SQLProgrammingPage,
  'er-activities': ERActivitiesPage,
  'er-advanced': ERAdvancedPage,
  'er-attributes': ERAttributesPage,
  'apa-referencing': APAReferencingPage,
  'jira-certifications': JiraCertificationsPage,
  'sql-certifications': SQLCertificationsPage,
  'vibe-to-production': VibeToProductionPage,
};

const roots = new WeakMap<HTMLElement, Root>();

// Exposed to the host page (app/js/app.js) — it dynamically imports this
// bundle only when a #/lessons/deck/:slug route is visited, then calls
// mountLesson(container, slug) and, on navigating away, the unmount()
// it returns.
function mountLesson(el: HTMLElement, slug: string): (() => void) | null {
  const Component = LESSONS[slug];
  if (!Component) return null;
  const root = createRoot(el);
  roots.set(el, root);
  root.render(<Component />);
  return () => {
    root.unmount();
    roots.delete(el);
  };
}

declare global {
  interface Window {
    mountLesson: typeof mountLesson;
    LESSON_DECK_SLUGS: string[];
  }
}

window.mountLesson = mountLesson;
window.LESSON_DECK_SLUGS = Object.keys(LESSONS);
