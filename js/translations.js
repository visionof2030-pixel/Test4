// ===== js/translations.js =====
export const nameMapping = new Map([
    ["مکزیک", "المكسيك"],
    ["Mexico", "المكسيك"],
    // ... (جميع الإدخالات السابقة)
]);

export const groupLetters = {
    'A': 'أ', 'B': 'ب', 'C': 'ج', 'D': 'د', 'E': 'هـ', 'F': 'و',
    'G': 'ز', 'H': 'ح', 'I': 'ط', 'J': 'ي', 'K': 'ك', 'L': 'ل'
};

export function getFlag(name) {
    const map = {
        "المكسيك": "🇲🇽", "جنوب أفريقيا": "🇿🇦", "الأرجنتين": "🇦🇷",
        // ... (جميع الأعلام السابقة)
    };
    return map[name] || "🏁";
}

export function translateToArabic(raw) {
    if (!raw) return "";
    let trimmed = raw.trim();
    if (nameMapping.has(trimmed)) return nameMapping.get(trimmed);
    // ... باقي منطق الترجمة (نفس الكود السابق)
    return trimmed;
}

export function translateBracketTeamName(name) {
    // ... (نفس الكود السابق)
}