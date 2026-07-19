import LessonShell from '../LessonShell';
import VibeToProductionLesson from './VibeToProductionLesson';

export default function VibeToProductionPage() {
  return (
    <LessonShell
      eyebrow="Capstone Bonus Lecture"
      titleLead="Let's make sense of"
      titleAccent="shipping your own site."
      gradient="linear-gradient(90deg, #7c3aed, #4f46e5, #059669)"
      accent="#7c3aed"
      orb2="#4f46e5"
      orb3="#059669"
      subtitle="How to go from an idea to a live website in one sitting, using Google Stitch, Claude Code, and GitHub Pages."
      pills={[
        { emoji: '🎨', name: 'Google Stitch 2.0', color: '#7c3aed' },
        { emoji: '⌘', name: 'Claude Code (Web)', color: '#4f46e5' },
        { emoji: '🚀', name: 'GitHub Pages', color: '#059669' },
      ]}
    >
      <VibeToProductionLesson />
    </LessonShell>
  );
}
