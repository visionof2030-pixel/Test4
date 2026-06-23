// ===== MODULE: api.js =====
import { getCache, setCache } from './storage.js';
import { translateToArabic } from './translations.js';

export async function fetchOpenfootballData() {
    const cached = getCache("openfootball");
    if (cached) return cached;
    try {
        const res = await fetch("https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json");
        const data = await res.json();
        const matches = data.matches || [];
        setCache("openfootball", matches);
        return matches;
    } catch (e) {
        console.warn("⚠️ فشل تحميل بيانات openfootball:", e);
        return [];
    }
}

export async function fetchGamesFromAPI() {
    const cached = getCache("games");
    if (cached) return cached;
    try {
        const res = await fetch("https://worldcup26.ir/get/games");
        const data = await res.json();
        if (!data?.games) throw new Error('تنسيق غير صحيح');
        const finished = data.games.filter(g => g.finished === "TRUE");
        const games = finished.map(game => ({
            homeAr: translateToArabic(game.home_team_name_fa || game.home_team_name_en || ''),
            awayAr: translateToArabic(game.away_team_name_fa || game.away_team_name_en || ''),
            homeScore: parseInt(game.home_score || 0),
            awayScore: parseInt(game.away_score || 0),
            local_date: game.local_date || '',
            scorers: game.scorers || '',
            stadium_id: game.stadium_id || null,
            home_team_name_en: game.home_team_name_en || '',
            away_team_name_en: game.away_team_name_en || '',
            home_team_name_fa: game.home_team_name_fa || '',
            away_team_name_fa: game.away_team_name_fa || '',
            finished: game.finished === "TRUE"
        }));
        setCache("games", games);
        return games;
    } catch (e) {
        console.error("❌ تحميل API:", e);
        return [];
    }
}