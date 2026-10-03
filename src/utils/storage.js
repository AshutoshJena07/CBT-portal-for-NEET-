// LocalStorage management for NEET CBT Portal

const STORAGE_KEYS = {
  ATTEMPTS: 'neet_cbt_attempts',
  BOOKMARKS: 'neet_cbt_bookmarks',
  PROFILE: 'neet_cbt_profile',
  CUSTOM_TESTS: 'neet_cbt_custom_tests',
  APP_THEME: 'neet_cbt_theme'
};

const DEFAULT_PROFILE = {
  name: 'Dr. Sahiba',
  rollNo: 'NEET-2026-AIR1',
  center: 'National CBT Center 042 (Lab 3)',
  targetCollege: 'AIIMS New Delhi / Top Govt Medical College',
  avatarEmoji: '👩‍⚕️',
  personalNote: 'Proud of your hard work! Take your time, read questions carefully and remember I am always rooting for you! 🩺💖'
};

export const getProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
  } catch (e) {
    console.error('Error reading profile from localStorage', e);
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage', e);
  }
};

export const getAttempts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading attempts', e);
    return [];
  }
};

export const saveAttempt = (attempt) => {
  try {
    const current = getAttempts();
    const updated = [attempt, ...current];
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving attempt', e);
    return [];
  }
};

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading bookmarks', e);
    return [];
  }
};

export const toggleBookmark = (question) => {
  try {
    const bookmarks = getBookmarks();
    const index = bookmarks.findIndex((b) => b.id === question.id);
    let updated;
    if (index > -1) {
      updated = bookmarks.filter((b) => b.id !== question.id);
    } else {
      updated = [question, ...bookmarks];
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error toggling bookmark', e);
    return [];
  }
};

export const getCustomTests = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TESTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading custom tests', e);
    return [];
  }
};

export const saveCustomTest = (newTest) => {
  try {
    const current = getCustomTests();
    const updated = [newTest, ...current];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TESTS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving custom test', e);
    return [];
  }
};
