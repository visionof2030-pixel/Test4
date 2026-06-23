// ===== js/data/storage.js =====

export function getSubmittedMatches() {
    try {
        const raw = localStorage.getItem('submitted_matches');
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

export function addSubmittedMatch(matchId) {
    const current = getSubmittedMatches();
    if (!current.includes(matchId)) {
        current.push(matchId);
        localStorage.setItem('submitted_matches', JSON.stringify(current));
    }
}

export function removeSubmittedMatch(matchId) {
    const current = getSubmittedMatches();
    const filtered = current.filter(id => id !== matchId);
    localStorage.setItem('submitted_matches', JSON.stringify(filtered));
}

export function isMatchSubmitted(matchId) {
    return getSubmittedMatches().includes(matchId);
}

export function getLocalPredictions() {
    try {
        const data = localStorage.getItem('predictions');
        return data ? JSON.parse(data) : {};
    } catch { return {}; }
}

export function saveLocalPrediction(userName, matchId, prediction) {
    try {
        const predictions = getLocalPredictions();
        predictions[`${userName}_${matchId}`] = { userName, matchId, prediction, timestamp: new Date().toISOString() };
        localStorage.setItem('predictions', JSON.stringify(predictions));
        return true;
    } catch { return false; }
}

export function setCache(key, value) {
    localStorage.setItem(key, JSON.stringify({ value, time: Date.now() }));
}

export function getCache(key, maxAge = 5 * 60 * 1000) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.time > maxAge) return null;
        return parsed.value;
    } catch { return null; }
}

export function clearCache(key) {
    localStorage.removeItem(key);
}

export function getLastUserName() {
    return localStorage.getItem('lastUserName') || '';
}

export function setLastUserName(name) {
    localStorage.setItem('lastUserName', name);
}

export function getTheme() {
    return localStorage.getItem('theme') || '';
}

export function setTheme(theme) {
    localStorage.setItem('theme', theme);
}