const KEY = 'probsensei:v1';

const DEFAULT = {
  problemsStatus: {},
  hintsRevealed: {},
  solutionsRevealed: {},
  lecturesVisited: {},
  lastPage: null,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return { ...DEFAULT };
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('[probsensei] storage save failed', err);
  }
}

export const storage = {
  get() {
    return load();
  },

  setProblemStatus(id, status) {
    const s = load();
    if (status === null) {
      delete s.problemsStatus[id];
    } else {
      s.problemsStatus[id] = status;
    }
    save(s);
  },

  getProblemStatus(id) {
    return load().problemsStatus[id] || null;
  },

  setHintsRevealed(id, count) {
    const s = load();
    s.hintsRevealed[id] = Math.max(s.hintsRevealed[id] || 0, count);
    save(s);
  },

  getHintsRevealed(id) {
    return load().hintsRevealed[id] || 0;
  },

  setSolutionRevealed(id, v) {
    const s = load();
    s.solutionsRevealed[id] = !!v;
    save(s);
  },

  isSolutionRevealed(id) {
    return !!load().solutionsRevealed[id];
  },

  markLectureVisited(id) {
    const s = load();
    s.lecturesVisited[id] = Date.now();
    save(s);
  },

  getLecturesVisited() {
    return load().lecturesVisited;
  },

  setLastPage(p) {
    const s = load();
    s.lastPage = p;
    save(s);
  },

  clearAll() {
    localStorage.removeItem(KEY);
  },

  summary(totalProblems) {
    const s = load();
    const values = Object.values(s.problemsStatus);
    const solved = values.filter(v => v === 'solved').length;
    const attempted = values.filter(v => v === 'attempted').length;
    return {
      solved,
      attempted,
      total: totalProblems,
      percent: totalProblems ? Math.round((solved / totalProblems) * 100) : 0,
    };
  },
};
