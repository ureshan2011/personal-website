import { createRoot } from 'react-dom/client';
import ScrumStudio from './scrum/ScrumStudio';
import tokens from './tokens.css?inline';
import studioCss from './scrum-studio.css?inline';

// Mounts the Scrum studio into any element marked [data-scrum-studio] — or
// into its [data-studio-root] child when it has one, so the page can keep a
// poster underneath until the scene is ready. The styles travel inside this
// file and are injected once, so the embed is a single request.

function injectStyles() {
  if (document.getElementById('scrum-studio-css')) return;
  const style = document.createElement('style');
  style.id = 'scrum-studio-css';
  style.textContent = `${tokens}\n${studioCss}`;
  document.head.appendChild(style);
}

export function mount(host: HTMLElement) {
  if (host.dataset.mounted) return;
  host.dataset.mounted = 'true';
  injectStyles();
  const target = host.querySelector<HTMLElement>('[data-studio-root]') || host;
  target.classList.add('bt', 'bt--project', 'sst-host');
  createRoot(target).render(<ScrumStudio />);
  host.classList.add('is-live');
}

document.querySelectorAll<HTMLElement>('[data-scrum-studio]').forEach(mount);
