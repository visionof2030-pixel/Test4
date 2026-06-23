// ===== MODULE: charts.js =====
import { fetchPredictions } from './supabase.js';
import { matchesData } from './matchUtils.js';
import { getFlag } from './translations.js';

let chartInstances = {};

export async function openAnalytics() {
    const modal = document.getElementById('analyticsModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // جلب التوقعات
    const predictions = await fetchPredictions(500);
    if (!predictions || predictions.length === 0) {
        document.getElementById('analyticsContent').innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات للتحليل</div>`;
        return;
    }

    // تدمير الرسوم البيانية السابقة
    Object.values(chartInstances).forEach(chart => chart.destroy());
    chartInstances = {};

    // 1. توزيع التوقعات لكل مباراة
    const matchCounts = {};
    predictions.forEach(p => {
        if (!matchCounts[p.match_id]) matchCounts[p.match_id] = 0;
        matchCounts[p.match_id]++;
    });
    const sortedMatches = Object.entries(matchCounts).sort((a,b) => b[1] - a[1]).slice(0, 10);
    const labels = sortedMatches.map(([id, count]) => {
        const parts = id.split('_');
        return `${parts[1]} 🆚 ${parts[2]}`;
    });
    const data = sortedMatches.map(([id, count]) => count);

    const ctx1 = document.getElementById('chartDistributions').getContext('2d');
    chartInstances.distributions = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'عدد التوقعات',
                data: data,
                backgroundColor: 'rgba(240, 180, 41, 0.6)',
                borderColor: 'rgba(240, 180, 41, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 2. تطور نقاط أفضل 5 لاعبين (محاكاة)
    const userScores = {};
    predictions.forEach(p => {
        if (!userScores[p.user_name]) userScores[p.user_name] = 0;
        userScores[p.user_name]++;
    });
    const topUsers = Object.entries(userScores).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const ctx2 = document.getElementById('chartTrends').getContext('2d');
    const colors = ['#f0b429', '#2ecc71', '#5dade2', '#e74c3c', '#9b59b6'];
    chartInstances.trends = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['الجولة 1', 'الجولة 2', 'الجولة 3', 'الجولة 4', 'الجولة 5'],
            datasets: topUsers.map(([name, score], idx) => ({
                label: name,
                data: [Math.floor(score * 0.3), Math.floor(score * 0.5), Math.floor(score * 0.7), Math.floor(score * 0.9), score],
                borderColor: colors[idx % colors.length],
                fill: false,
                tension: 0.1
            }))
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 3. أكثر المباريات توقعاً (نفس البيانات الأولى)
    const ctx3 = document.getElementById('chartTopMatches').getContext('2d');
    chartInstances.topMatches = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: labels.slice(0, 5),
            datasets: [{
                data: data.slice(0, 5),
                backgroundColor: ['#f0b429', '#2ecc71', '#5dade2', '#e74c3c', '#9b59b6']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

export function closeAnalytics() {
    document.getElementById('analyticsModal').classList.remove('active');
    document.body.style.overflow = '';
    Object.values(chartInstances).forEach(chart => chart.destroy());
    chartInstances = {};
}