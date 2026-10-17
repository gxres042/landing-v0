import type landing from '../data/landing.json';

type Copy = Pick<typeof landing.en, 'tour' | 'chat' | 'ui' | 'secrets'>;
type GapState = 'open' | 'review' | 'applying' | 'done';
type Beat = readonly [name: string, chapter: number, duration: number];

// Each beat mirrors one observable change in the reference mockup, not a network operation.
const BEATS: readonly Beat[] = [
  ['a_idle', 0, 900], ['a_user', 0, 1500], ['a_think', 0, 1100], ['a_reply', 0, 2600], ['a_proj', 0, 1400],
  ['b_g1', 1, 650], ['b_g2', 1, 650], ['b_g3', 1, 650], ['b_g4', 1, 650], ['b_g5', 1, 650], ['b_g6', 1, 650], ['b_reply', 1, 1900], ['b_adv', 1, 900], ['b_advOn', 1, 2800],
  ['c_badge', 2, 1300], ['c_list', 2, 1500], ['c_press1', 2, 800], ['c_review1', 2, 2800], ['c_apply1', 2, 800], ['c_receipt1', 2, 1900], ['c_press2', 2, 700], ['c_review2', 2, 2300], ['c_apply2', 2, 700], ['c_receipt2', 2, 1500], ['c_back', 2, 2600],
  ['d_user', 3, 1500], ['d_reply', 3, 1700], ['d_gone', 3, 1300], ['d_check', 3, 3400],
  ['e_user', 4, 1400], ['e_reply', 4, 1800], ['e_boxes', 4, 1200], ['e_try', 4, 1600], ['e_stop', 4, 0],
];
const INDEX = Object.fromEntries(BEATS.map(([name], i) => [name, i]));
const FIRST = [0, 5, 14, 25, 29];
const LAST = [4, 13, 24, 28, 33];
const SERVICES = [
  { name: 'web', kind: 'Deployment', pods: 2 },
  { name: 'api', kind: 'Deployment', pods: 2 },
  { name: 'db', kind: 'Cluster · CloudNativePG', pods: 1 },
  { name: 'worker', kind: 'Deployment', pods: 1 },
];
const APPLY_OUTPUT = ['namespace/my-shop created', 'deployment.apps/web created', 'httproute.gateway.networking.k8s.io/web created', 'deployment.apps/api created', 'cluster.postgresql.cnpg.io/db created', 'deployment.apps/worker created'];
const PODS = ['NAME                  READY   STATUS', 'web-7d9f8-k2x9p        1/1     Running', 'api-5c6b2-m7r3t        1/1     Running', 'db-1                  1/1     Running', 'worker-6b8c4-t9n2d     1/1     Running'];
const SECRET_OUTPUT = ['NAME                      TYPE', 'db-credentials            Opaque', 'api-key                   Opaque', 'shop-example-com-tls      kubernetes.io/tls'];
const DIFFS = [
  ['+ apiVersion: k8up.io/v1', '+ kind: Schedule', '+ metadata:', '+   name: db-backup', '+   namespace: my-shop', '+ spec:', '+   backup:', '+     schedule: "0 3 * * *"'],
  ['  # Deployment/web and Deployment/api', '  containers:', '+   resources:', '+     limits:', '+       cpu: 500m'],
  ['  # Deployment/worker', '  containers:', '  - name: worker', '+   livenessProbe:', '+     exec:', '+       command: ["/app/healthcheck"]', '+     initialDelaySeconds: 10', '+     periodSeconds: 30'],
];

class EngawaDemo extends HTMLElement {
  private copy!: Copy;
  private beat = 0;
  private mode: 'agent' | 'terminal' = 'agent';
  private reduced = false;
  private visible = false;
  private userPaused = false;
  private finished = false;
  private playing = false;
  private advanced: boolean | null = null;
  private page: 'projects' | 'suggestions' | null = null;
  private gaps = new Map<number, GapState>();
  private messageNodes = new Map<string, HTMLElement>();
  private terminalChapter = -1;
  private timer: number | undefined;
  private remaining = BEATS[0][2];
  private deadline = 0;
  private observer: IntersectionObserver | undefined;
  private motion: MediaQueryList | undefined;
  private events: AbortController | undefined;

  connectedCallback() {
    if (this.events) return;
    this.copy = JSON.parse(this.dataset.copy ?? '{}') as Copy;
    this.events = new AbortController();
    const { signal } = this.events;
    this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = this.motion.matches;
    if (this.reduced) this.beat = LAST[0];
    this.remaining = BEATS[this.beat][2];
    this.addEventListener('click', this.onClick, { signal });
    document.addEventListener('visibilitychange', this.syncPlayback, { signal });
    this.motion.addEventListener('change', this.onMotion, { signal });
    // Observe the actual stage: a long caption alone must not start the demonstration.
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = !!entry?.isIntersecting;
      this.syncPlayback();
    }, { threshold: 0.15 });
    this.observer.observe(this.find('.dt-stage'));
    this.render();
  }

  disconnectedCallback() {
    this.stopTimer();
    this.observer?.disconnect();
    this.events?.abort();
    this.events = undefined;
    this.playing = false;
    this.visible = false;
  }

  private find<T extends HTMLElement = HTMLElement>(selector: string, root: ParentNode = this): T {
    const element = root.querySelector<T>(selector);
    if (!element) throw new Error(`Missing demo element: ${selector}`);
    return element;
  }

  private show(selector: string, show: boolean, root: ParentNode = this) {
    this.find(selector, root).hidden = !show;
  }

  private text(selector: string, text: string, root: ParentNode = this) {
    const element = this.find(selector, root);
    if (element.textContent !== text) element.textContent = text;
  }

  private at(name: string) { return this.beat >= INDEX[name]; }
  private get chapter() { return BEATS[this.beat][1]; }
  private get isAdvanced() { return this.advanced ?? (this.chapter === 1 && this.at('b_advOn')); }
  private get suggestionsOpen() { return this.page === 'suggestions' || (this.page === null && this.at('c_list') && !this.at('c_back')); }

  private stopTimer() {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
      this.remaining = Math.max(0, this.deadline - performance.now());
    }
  }

  private syncPlayback = () => {
    this.stopTimer();
    this.playing = this.isConnected && this.visible && !document.hidden && !this.reduced && !this.userPaused && !this.finished;
    if (this.playing) {
      this.deadline = performance.now() + this.remaining;
      this.timer = window.setTimeout(() => {
        this.timer = undefined;
        this.beat = Math.min(this.beat + 1, BEATS.length - 1);
        this.finished = this.beat === BEATS.length - 1;
        this.remaining = BEATS[this.beat][2];
        this.render();
        this.syncPlayback();
      }, this.remaining);
    }
    this.renderPlayback();
  };

  private onMotion = (event: MediaQueryListEvent) => {
    this.stopTimer();
    this.reduced = event.matches;
    if (this.reduced) this.beat = LAST[this.chapter];
    this.remaining = BEATS[this.beat][2];
    this.finished = this.beat === BEATS.length - 1;
    this.render();
    this.syncPlayback();
  };

  private selectChapter(chapter: number) {
    this.stopTimer();
    this.beat = this.reduced || this.userPaused ? LAST[chapter] : FIRST[chapter];
    this.remaining = BEATS[this.beat][2];
    this.finished = this.beat === BEATS.length - 1;
    this.advanced = null;
    this.page = null;
    this.gaps.clear();
    this.render();
    this.syncPlayback();
  }

  private onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]');
    if (!button || !this.contains(button)) return;
    const action = button.dataset.action;
    const index = Number(button.dataset.index);
    if (action === 'chapter') { this.selectChapter(index); return; }
    if (action === 'agent' || action === 'terminal') {
      this.mode = action;
      this.render();
      return;
    }
    if (action === 'play') {
      this.userPaused = this.playing;
      if (!this.userPaused && this.finished) {
        this.beat = 0;
        this.finished = false;
        this.remaining = BEATS[0][2];
        this.gaps.clear();
        this.page = null;
        this.advanced = null;
      }
      this.render();
      this.syncPlayback();
      return;
    }
    if (action === 'replay') {
      this.userPaused = false;
      this.selectChapter(0);
      return;
    }
    // Manipulating the mock pauses the narrative so it never overwrites a review in progress.
    this.userPaused = true;
    this.stopTimer();
    if (action === 'advanced') this.advanced = !this.isAdvanced;
    if (action === 'sidebar') {
      const sidebar = this.find('[data-sidebar]');
      const open = sidebar.classList.toggle('dt-expanded');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? this.copy.ui.collapse : this.copy.ui.expand);
      this.show('[data-collapse-icon]', open);
      this.show('[data-expand-icon]', !open);
    }
    if (action === 'projects' || action === 'suggestions') {
      if (!this.at('a_proj')) {
        this.beat = LAST[1];
        this.remaining = BEATS[this.beat][2];
      }
      this.page = action;
    }
    if (action === 'review') this.gaps.set(index, 'review');
    if (action === 'cancel' || action === 'undo') this.gaps.set(index, 'open');
    if (action === 'apply') this.gaps.set(index, 'done');
    this.render();
    this.syncPlayback();
    // The same buttons stay mounted throughout playback; move focus only when one is hidden.
    if (button.hidden || button.closest('[hidden]')) {
      const next = action === 'apply' ? 'undo' : 'review';
      this.querySelector<HTMLButtonElement>(`[data-action="${next}"][data-index="${index}"]`)?.focus({ preventScroll: true });
    }
  };

  private renderPlayback() {
    this.dataset.running = String(this.playing);
    this.show('[data-reduced]', this.reduced);
    this.show('[data-playback]', !this.reduced);
    this.text('[data-play-label]', this.playing ? this.copy.tour.pause : this.copy.tour.play);
    this.show('[data-pause-icon]', this.playing);
    this.show('[data-resume-icon]', !this.playing);
    this.querySelectorAll<HTMLButtonElement>('[data-action="chapter"]').forEach((button, chapter) => {
      const current = chapter === this.chapter;
      button.setAttribute('aria-current', current ? 'step' : 'false');
      const first = FIRST[chapter];
      const length = LAST[chapter] - first + 1;
      const progress = chapter < this.chapter ? 1 : current ? (this.reduced ? 1 : (this.beat - first + 1) / length) : 0;
      const fill = this.find('[data-progress]', button);
      fill.style.width = `${progress * 100}%`;
      fill.style.transitionDuration = this.playing && current ? `${this.remaining}ms` : '0ms';
    });
  }

  private render() {
    const { tour } = this.copy;
    const titles = [...tour.ch];
    if (this.mode === 'terminal') titles[0] = tour.ch0k;
    this.querySelectorAll<HTMLButtonElement>('[data-action="chapter"]').forEach((button, i) => {
      this.text('[data-chapter-title]', titles[i], button);
      button.setAttribute('aria-label', tour.stepAria.replace('{n}', String(i + 1)) + titles[i]);
    });
    this.text('[data-caption-number]', `0${this.chapter + 1}`);
    this.text('[data-caption-title]', titles[this.chapter]);
    this.text('[data-caption-body]', this.chapter === 0 && this.mode === 'terminal' ? tour.cap0k : tour.caps[this.chapter].body);
    const extra = tour.caps[this.chapter].extra;
    this.text('[data-caption-extra]', extra);
    this.show('[data-caption-extra]', !!extra);
    this.text('[data-left-label]', this.mode === 'agent' ? tour.leftAgent : tour.leftTerm);
    this.find('[data-action="agent"]').setAttribute('aria-pressed', String(this.mode === 'agent'));
    this.find('[data-action="terminal"]').setAttribute('aria-pressed', String(this.mode === 'terminal'));
    this.show('[data-chat]', this.mode === 'agent');
    this.show('[data-terminal]', this.mode === 'terminal');
    this.renderConversation();
    this.renderApp();
    this.renderPlayback();
  }

  private message(kind: 'user' | 'agent' | 'note', text: string, code?: string[]) {
    const template = this.find<HTMLTemplateElement>('[data-template="message"]');
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    this.find('.dt-message', fragment).classList.add(`dt-${kind}`);
    this.text('p', text, fragment);
    if (code) {
      this.show('.dt-message-code', true, fragment);
      this.text('pre', code.join('\n'), fragment);
    }
    return this.find('.dt-message', fragment);
  }

  private renderConversation() {
    const { chat } = this.copy;
    const messages = this.find('[data-messages]');
    if (!this.messageNodes.size) messages.replaceChildren();
    const active = new Set<string>();
    // A beat may add a reply, but must not remount earlier messages and restart their entrance.
    const retain = (key: string, create: () => HTMLElement) => {
      const id = `${this.chapter}:${key}`;
      active.add(id);
      if (!this.messageNodes.has(id)) {
        const node = create();
        this.messageNodes.set(id, node);
        messages.append(node);
      }
    };
    const add = (kind: 'user' | 'agent' | 'note', text: string, code?: string[]) =>
      retain(`${kind}:${text}`, () => this.message(kind, text, code));
    const typing = () => retain('typing', () => {
      const fragment = this.find<HTMLTemplateElement>('[data-template="typing"]').content.cloneNode(true) as DocumentFragment;
      return this.find('.dt-message', fragment);
    });
    const term: string[] = [];
    if (this.chapter === 0) {
      if (this.at('a_user')) { add('user', chat.m0u); term.push('$ kubectl apply -f my-shop.yaml'); }
      if (this.beat === INDEX.a_think) typing();
      if (this.at('a_reply')) { add('agent', chat.m0a, ['$ kubectl apply -f my-shop.yaml', ...APPLY_OUTPUT]); term.push(...APPLY_OUTPUT); }
      if (this.at('a_proj')) add('agent', chat.m0b);
    } else if (this.chapter === 1) {
      add('user', chat.m1u);
      term.push(chat.t1);
      if (this.at('b_reply')) { add('agent', chat.m1a); term.push('$ kubectl get pods -n my-shop', ...PODS); }
      else if (this.beat > INDEX.b_g1) typing();
    } else if (this.chapter === 2) {
      add('note', chat.note2);
      term.push(chat.t2);
    } else if (this.chapter === 3) {
      add('user', chat.m3u);
      term.push('$ helm uninstall engawa -n engawa-system');
      if (this.at('d_reply')) { add('agent', chat.m3a, ['$ helm uninstall engawa -n engawa-system', 'release "engawa" uninstalled']); term.push('release "engawa" uninstalled'); }
      if (this.at('d_check')) {
        const code = ['$ kubectl get pods -n my-shop', ...PODS, '$ curl -sI https://shop.example.com | head -1', 'HTTP/2 200'];
        add('agent', chat.m3b, code);
        term.push(...code);
      }
    } else {
      add('user', chat.m4u);
      term.push('$ kubectl get secrets -n my-shop');
      if (this.at('e_reply')) { add('agent', chat.m4a); term.push(...SECRET_OUTPUT); }
      else typing();
      if (this.at('e_boxes')) term.push(chat.t4);
    }
    if (!active.size) {
      retain('empty', () => {
        const empty = document.createElement('p');
        empty.className = 'dt-chat-empty';
        empty.textContent = chat.empty;
        return empty;
      });
    }
    for (const [id, node] of this.messageNodes) {
      if (!active.has(id)) {
        node.remove();
        this.messageNodes.delete(id);
      }
    }

    const terminal = this.find('[data-terminal-lines]');
    if (this.terminalChapter !== this.chapter) {
      terminal.replaceChildren();
      this.terminalChapter = this.chapter;
    }
    const lines = [...term, '$ ▍'];
    lines.forEach((line, i) => {
      let span = terminal.children[i] as HTMLElement | undefined;
      if (!span) {
        span = document.createElement('span');
        terminal.append(span);
      }
      if (span.textContent !== line) span.textContent = line;
      const tone = line.startsWith('$') ? 'dt-command' : line.startsWith('#') ? 'dt-terminal-note' : '';
      if (span.className !== tone) span.className = tone;
    });
    while (terminal.children.length > lines.length) terminal.lastElementChild?.remove();
  }

  private gapState(index: number): GapState {
    const manual = this.gaps.get(index);
    if (manual) return manual;
    if (index === 2) return 'open';
    const n = index + 1;
    if (this.at(`c_receipt${n}`)) return 'done';
    if (this.at(`c_apply${n}`)) return 'applying';
    if (this.at(`c_review${n}`)) return 'review';
    return 'open';
  }

  private renderApp() {
    const { ui } = this.copy;
    const advanced = this.isAdvanced;
    const hasProject = this.at('a_proj');
    const secrets = this.at('e_boxes');
    const gone = this.at('d_gone') && !secrets;
    const suggestionPage = this.suggestionsOpen;
    this.show('[data-app]', !secrets);
    this.find('[data-app]').classList.toggle('dt-removed', gone);
    this.find('[data-app]').inert = gone || secrets;
    this.show('[data-gone]', gone);
    this.show('[data-gone-check]', this.at('d_check'));
    this.show('[data-secrets]', secrets);
    this.show('[data-empty]', !hasProject && !suggestionPage);
    this.show('[data-project-column]', hasProject);
    this.show('[data-overview]', hasProject && !suggestionPage);
    this.show('[data-suggestions]', suggestionPage);
    this.find('[data-action="projects"]').setAttribute('aria-pressed', String(!suggestionPage));
    this.find('[data-action="suggestions"]').setAttribute('aria-pressed', String(suggestionPage));
    this.find('[data-action="advanced"]').setAttribute('aria-pressed', String(advanced));
    this.find('[data-action="advanced"]').classList.toggle('dt-highlight', this.beat === INDEX.b_adv);
    this.show('[data-backing]', advanced);

    const growth = this.at('b_reply') ? 99 : this.at('b_g1') ? this.beat - INDEX.b_g1 + 1 : 0;
    const completed: boolean[] = [];
    let count = 0;
    SERVICES.forEach((service, i) => {
      const phase = Math.min(3, Math.max(0, growth - i));
      const done = phase === 3;
      completed[i] = done;
      if (phase) count++;
      const row = this.find(`[data-service="${i}"]`);
      row.hidden = phase === 0;
      this.show(`[data-project-service="${i}"]`, phase > 0);
      this.find(`[data-project-service="${i}"] .dt-dot`).classList.toggle('dt-ok', done);
      this.text('[data-kind]', service.kind, row);
      this.show('[data-kind]', advanced, row);
      this.text('[data-status-word]', done ? ui.running : ui.starting, row);
      this.find('[data-status]', row).classList.toggle('dt-ok', done);
      const running = done ? service.pods : phase === 2 ? Math.floor(service.pods / 2) : 0;
      this.find('[data-pods]', row).setAttribute('aria-label', `${ui.pods} ${running}/${service.pods}`);
      row.querySelectorAll('[data-pods] li').forEach((cell, n) => cell.classList.toggle('dt-pod-running', n < running));
    });
    this.text('[data-service-count]', this.copy.ui.serviceCount.replace('{n}', String(count)));
    this.show('[data-no-url]', !completed[0] && !completed[1]);
    this.show('[data-url="0"]', completed[0]);
    this.show('[data-url="1"]', completed[1]);
    this.show('[data-advanced-url]', advanced && completed[0]);
    this.show('[data-no-storage]', !completed[0] && !completed[2]);
    this.show('[data-storage="0"]', completed[0]);
    this.show('[data-storage="1"]', completed[2]);
    this.show('[data-advanced-storage]', advanced && completed[0]);
    this.show('[data-no-backup]', !completed[2]);
    this.show('[data-backup]', completed[2]);
    const backupDone = this.gapState(0) === 'done';
    this.text('[data-backup-status]', backupDone ? ui.daily : ui.noBackup);
    this.find('[data-backup-status]').classList.toggle('dt-ok', backupDone);
    this.find('[data-backup-status]').classList.toggle('dt-warn', !backupDone);
    this.show('[data-backup-example]', backupDone);

    let open = 0;
    ui.gaps.forEach((gap, i) => {
      const row = this.find(`[data-gap="${i}"]`);
      const state = this.gapState(i);
      const done = state === 'done';
      if (!done) open++;
      const severity = this.find('[data-gap-status]', row);
      severity.textContent = done ? ui.applied : ui.sev[gap.s as 'high' | 'medium'];
      severity.className = `dt-status ${done ? 'dt-ok' : i === 0 ? 'dt-fail' : 'dt-warn'}`;
      this.show('[data-action="review"]', !done, row);
      this.show('[data-action="undo"]', done, row);
      this.show('[data-review]', state === 'review' || state === 'applying', row);
      this.show('[data-receipt]', done, row);
      this.find('[data-action="apply"]', row).classList.toggle('dt-highlight', state === 'applying');
      this.find('[data-action="review"]', row).classList.toggle('dt-highlight', this.beat === INDEX[`c_press${i + 1}`]);
      const diff = this.find('[data-diff]', row);
      if (!diff.childElementCount) {
        const lines = document.createDocumentFragment();
        DIFFS[i].forEach((line) => {
          const span = document.createElement('span');
          span.textContent = line;
          if (line.startsWith('+')) span.className = 'dt-diff-add';
          lines.append(span);
        });
        diff.append(lines);
      }
    });
    this.text('[data-badge]', String(open));
    this.show('[data-badge]', this.at('b_reply') && open > 0);
    this.text('[data-open-count]', this.copy.ui.openCount.replace('{n}', String(open)));
    this.querySelectorAll<HTMLElement>('[data-secret-try], [data-secret-line]').forEach((element) => { element.hidden = !this.at('e_try'); });
    this.querySelectorAll<HTMLElement>('[data-secret-stop]').forEach((element) => { element.hidden = !this.at('e_stop'); });
  }
}

if (!customElements.get('engawa-demo')) customElements.define('engawa-demo', EngawaDemo);
