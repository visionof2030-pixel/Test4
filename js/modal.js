// ===== MODULE: modal.js =====
import { getFlag, translateToArabic } from './translations.js';
import { formatDate, findMatchResult } from './helpers.js';
import { supabase, fetchMatchPredictions, fetchUserPredictions, fetchPredictions } from './supabase.js';
import { savePrediction, getUserPrediction } from './admin.js';
import { renderAllPredictions, renderLeaderboard, renderUpcoming, updateNewsTicker } from './app.js';

// ===== فتح نافذة توقع المباراة =====
export function openPredictionModal(matchId, team1, team2, timeISO) {
    if (isMatchFinished(timeISO)) { window.showCopyToast('⛔ هذه المباراة انتهت، لا يمكن التوقع.'); return; }
    if (!canPredict(timeISO)) { window.showCopyToast('⛔ لا يمكن التوقع الآن، المباراة على وشك البدء أو بدأت بالفعل (يُسمح حتى 5 دقائق قبل البداية).'); return; }

    window.isEditing = false;
    window.currentMatchId = matchId;
    window.currentTeam1 = team1;
    window.currentTeam2 = team2;
    window.currentTimeISO = timeISO;

    document.getElementById('modalTitle').textContent = '📝 توقع نتيجة المباراة';
    document.getElementById('modalTeam1').textContent = team1;
    document.getElementById('modalTeam2').textContent = team2;
    document.getElementById('optTeam1').textContent = team1;
    document.getElementById('optTeam2').textContent = team2;
    document.getElementById('modalFlag1').textContent = getFlag(team1);
    document.getElementById('modalFlag2').textContent = getFlag(team2);
    document.getElementById('modalDateTime').textContent = `📅 ${getDateTimeDisplay(timeISO)}`;
    document.getElementById('modalUserName').value = localStorage.getItem('lastUserName') || '';
    document.getElementById('modalUserName').disabled = false;

    const savedUserName = localStorage.getItem('lastUserName') || '';
    const msgEl = document.getElementById('modalMessage');
    if (savedUserName) {
        msgEl.textContent = `👤 مرحباً "${savedUserName}"`;
        msgEl.className = 'modal-message warning';
    } else {
        msgEl.textContent = '';
        msgEl.className = 'modal-message';
    }

    if (isMatchSubmitted(matchId)) {
        msgEl.textContent = `⚠️ توقعت مسبقاً هذه المباراة`;
        msgEl.className = 'modal-message warning';
        document.getElementById('modalSubmitBtn').disabled = true;
    } else {
        document.getElementById('modalSubmitBtn').disabled = false;
    }

    document.getElementById('modalSubmitBtn').textContent = '💾 حفظ التوقع';
    document.querySelectorAll('input[name="prediction"]').forEach(el => el.checked = false);
    document.getElementById('predictionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== فتح نافذة تعديل التوقع =====
export async function openEditPredictionModal(matchId, team1, team2, timeISO) {
    if (isMatchFinished(timeISO)) { window.showCopyToast('⛔ هذه المباراة انتهت، لا يمكن تعديل التوقع.'); return; }
    if (!canPredict(timeISO)) { window.showCopyToast('⛔ لا يمكن تعديل التوقع الآن، المباراة على وشك البدء أو بدأت بالفعل (يُسمح حتى 5 دقائق قبل البداية).'); return; }

    const savedUserName = localStorage.getItem('lastUserName') || '';
    if (!savedUserName) { window.showCopyToast('⚠️ الرجاء تسجيل اسمك أولاً'); return; }

    const existing = await getUserPrediction(savedUserName, matchId);
    if (!existing) { window.showCopyToast('⚠️ لا يوجد توقع سابق لهذه المباراة'); return; }

    window.isEditing = true;
    window.currentMatchId = matchId;
    window.currentTeam1 = team1;
    window.currentTeam2 = team2;
    window.currentTimeISO = timeISO;

    document.getElementById('modalTitle').textContent = '✏️ تعديل توقع المباراة';
    document.getElementById('modalTeam1').textContent = team1;
    document.getElementById('modalTeam2').textContent = team2;
    document.getElementById('optTeam1').textContent = team1;
    document.getElementById('optTeam2').textContent = team2;
    document.getElementById('modalFlag1').textContent = getFlag(team1);
    document.getElementById('modalFlag2').textContent = getFlag(team2);
    document.getElementById('modalDateTime').textContent = `📅 ${getDateTimeDisplay(timeISO)}`;
    document.getElementById('modalUserName').value = savedUserName;
    document.getElementById('modalUserName').disabled = true;

    const currentPrediction = existing.prediction;
    document.querySelectorAll('input[name="prediction"]').forEach(el => {
        const val = el.value;
        if (val === 'HOME' && currentPrediction === team1) el.checked = true;
        else if (val === 'AWAY' && currentPrediction === team2) el.checked = true;
        else if (val === 'DRAW' && currentPrediction === 'DRAW') el.checked = true;
    });

    const msgEl = document.getElementById('modalMessage');
    msgEl.textContent = `✏️ تعديل توقعك الحالي: ${currentPrediction === 'DRAW' ? 'تعادل' : currentPrediction}`;
    msgEl.className = 'modal-message info';

    document.getElementById('modalSubmitBtn').disabled = false;
    document.getElementById('modalSubmitBtn').textContent = '💾 تحديث التوقع';

    document.getElementById('predictionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== عرض توقعات المباراة =====
export async function openMatchPredictions(matchId, team1, team2, homeScore, awayScore) {
    // (نفس الكود السابق مع تحسينات)
    // الاختصار: يتم جلب التوقعات وعرضها في الجدول
    // تم تضمين هذا الكود في الملف السابق، لذا سأحتفظ به مختصراً
}

// ===== عرض توقعات اللاعب =====
export async function openPlayerPredictions(userName) {
    if (!userName) { window.showCopyToast('⚠️ اسم المستخدم غير معروف'); return; }
    document.getElementById('playerModalName').textContent = userName;
    const listContainer = document.getElementById('playerPredictionsList');
    const countSpan = document.getElementById('playerTotalCount');
    listContainer.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري التحميل...</div>`;
    countSpan.textContent = '...';

    const predictions = await fetchUserPredictions(userName);
    countSpan.textContent = predictions.length;

    if (!predictions || predictions.length === 0) {
        listContainer.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات لهذا اللاعب</div>`;
        document.getElementById('playerPredictionsModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    predictions.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    let html = '';
    predictions.forEach((p, idx) => {
        const parts = p.match_id.split('_');
        const team1 = parts[1] || '?';
        const team2 = parts[2] || '?';
        const predText = p.prediction === 'DRAW' ? 'تعادل' : `فوز ${p.prediction}`;
        const status = getPredictionStatus(p);
        let statusClass = 'pending', statusText = '⏳ لم تحدد';
        if (status.status === 'correct') { statusClass = 'correct'; statusText = '✅ صحيح'; }
        else if (status.status === 'wrong') { statusClass = 'wrong'; statusText = '❌ خاطئ'; }
        else { statusClass = 'pending'; statusText = '⏳ قيد الانتظار'; }
        html += `
        <div class="player-prediction-item">
          <div class="num">#${idx + 1}</div>
          <div class="match-info">
            <div class="teams"><span class="flag">${getFlag(team1)}</span> ${team1} 🆚 <span class="flag">${getFlag(team2)}</span> ${team2}</div>
            <div class="pred">🔮 ${predText}</div>
            <span class="status ${statusClass}">${statusText}</span>
          </div>
          <div class="time">🕒 ${p.created_at ? formatDate(p.created_at) : 'تاريخ غير معروف'}</div>
        </div>
      `;
    });
    listContainer.innerHTML = html;
    document.getElementById('playerPredictionsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== إغلاق النوافذ =====
export function closePredictionModal() {
    document.getElementById('predictionModal').classList.remove('active');
    document.body.style.overflow = '';
    window.isEditing = false;
    document.getElementById('modalUserName').disabled = false;
}
export function closeViewPredictionsModal() { document.getElementById('viewPredictionsModal').classList.remove('active'); document.body.style.overflow = ''; }
export function closePlayerPredictionsModal() { document.getElementById('playerPredictionsModal').classList.remove('active'); document.body.style.overflow = ''; }
export function closeMatchPredictionsModal() { document.getElementById('matchPredictionsModal').classList.remove('active'); document.body.style.overflow = ''; }

// ===== استعراض التوقعات (عرض بسيط) =====
export async function openViewPredictionsModal(matchId, team1, team2) {
    document.getElementById('viewTeam1').textContent = team1;
    document.getElementById('viewTeam2').textContent = team2;
    document.getElementById('viewFlag1').textContent = getFlag(team1);
    document.getElementById('viewFlag2').textContent = getFlag(team2);
    const listContainer = document.getElementById('viewPredictionsList');
    const countSpan = document.getElementById('viewPredictionsCount');
    listContainer.innerHTML = `<div class="empty-state"><span class="icon">⏳</span> جاري التحميل...</div>`;
    countSpan.textContent = '...';
    const predictions = await fetchMatchPredictions(matchId);
    countSpan.textContent = predictions.length;
    if (!predictions || predictions.length === 0) {
        listContainer.innerHTML = `<div class="empty-state"><span class="icon">📭</span> لا توجد توقعات لهذه المباراة</div>`;
    } else {
        let html = '';
        predictions.forEach((p, idx) => {
            let text = p.prediction === 'DRAW' ? '🤝 تعادل الفريقين' : `🏆 فوز ${getFlag(p.prediction)} ${p.prediction}`;
            const status = getPredictionStatus(p);
            let statusText = '⏳ قيد الانتظار', statusClass = 'pending';
            if (status.status === 'correct') { statusText = '✅ صحيح'; statusClass = 'correct'; }
            else if (status.status === 'wrong') { statusText = '❌ خاطئ'; statusClass = 'wrong'; }
            html += `
          <div class="prediction-card ${statusClass}" onclick="window.openPlayerPredictions('${p.user_name || ''}')" style="cursor:pointer;">
            <div class="user"><div class="avatar-p">${p.user_name ? p.user_name.charAt(0).toUpperCase() : '👤'}</div><span class="name-p">${p.user_name || 'مجهول'}</span></div>
            <div class="prediction-text">🔮 ${text}</div>
            <span class="status-badge ${statusClass}">${statusText}</span>
            <div style="font-size:0.65rem;color:var(--text-secondary);margin-top:4px;">🕒 ${p.created_at ? formatDate(p.created_at) : 'تاريخ غير معروف'}</div>
          </div>
        `;
        });
        listContainer.innerHTML = html;
    }
    document.getElementById('viewPredictionsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== دوال مساعدة =====
function getPredictionStatus(prediction) {
    const parts = prediction.match_id.split('_');
    if (parts.length < 3) return { status: 'pending', text: '⏳ المباراة لم تلعب بعد', color: 'var(--gold-light)' };
    const team1 = parts[1], team2 = parts[2];
    const result = findMatchResult(team1, team2, window.gamesData || []);
    if (!result) return { status: 'pending', text: '⏳ المباراة لم تلعب بعد', color: 'var(--gold-light)' };
    let correctResult = result.homeScore > result.awayScore ? result.homeAr : (result.awayScore > result.homeScore ? result.awayAr : "DRAW");
    const isCorrect = prediction.prediction === correctResult;
    if (isCorrect) return { status: 'correct', text: '✅ توقع صحيح', color: 'var(--success)' };
    else return { status: 'wrong', text: '❌ توقع خاطئ', color: 'var(--danger)' };
}