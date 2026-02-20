<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>تقرير اجتماع</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');

:root{
  --main:#138d75;
  --light:#e8f6f3;
}

body{
  margin:0;
  font-family:'Cairo',sans-serif;
  background:#f4f6f7;
}

/* زر PDF */
.print-btn{
  position:fixed;
  bottom:20px;
  left:20px;
  background:#25D366;
  color:#fff;
  border:none;
  padding:10px 18px;
  border-radius:30px;
  font-weight:700;
  cursor:pointer;
  z-index:999;
}

/* محتوى */
#report-content{
  max-width:900px;
  margin:auto;
  background:#fff;
  padding:15px;
  box-sizing:border-box;
}

/* الهيدر */
.header{
  background:var(--main);
  color:#fff;
  text-align:center;
  padding:20px 10px 40px;
  border-radius:10px;
  position:relative;
  margin-bottom:10px;
}

.header img{
  width:120px;
}

.header-school{
  position:absolute;
  right:15px;
  bottom:10px;
  font-size:13px;
  font-weight:600;
}

.header-education{
  position:absolute;
  left:15px;
  bottom:10px;
  font-size:11px;
}

/* عنوان */
.main-title{
  background:var(--main);
  color:#fff;
  text-align:center;
  padding:10px;
  font-weight:700;
  border-radius:8px;
  margin-bottom:10px;
  font-size:15px;
}

/* جدول */
.report-table{
  width:100%;
  border-collapse:collapse;
  margin-bottom:15px;
  table-layout:fixed;
  font-size:13px;
}

.report-table td,
.report-table th{
  border:1px solid var(--main);
  padding:8px 6px;
  text-align:center;
  word-break:break-word;
}

.report-table th{
  background:var(--light);
}

.label{
  background:#f8fdfc;
  font-weight:600;
  width:25%;
}

/* عناوين أقسام */
.section-title{
  background:var(--main);
  color:#fff;
  text-align:center;
  padding:8px;
  font-weight:700;
  border-radius:8px 8px 0 0;
  margin-top:10px;
}

.section-box{
  border:1px solid var(--main);
  border-top:none;
  padding:12px;
  font-size:13px;
  line-height:1.8;
  margin-bottom:10px;
}

/* فوتر */
.footer-box{
  background:var(--main);
  color:#fff;
  text-align:center;
  padding:8px;
  border-radius:8px;
  font-size:12px;
  margin-top:10px;
}

/* تحسين الجوال */
@media (max-width:768px){
  #report-content{
    padding:10px;
  }
  .report-table{
    font-size:11px;
  }
  .header img{
    width:90px;
  }
}
</style>
</head>

<body>

<button class="print-btn" onclick="generatePDF()">تحميل PDF</button>

<div id="report-content">

<div class="header">
  <img src="https://i.ibb.co/1fc5gB6v/9-C92-E57-B-23-FA-479-D-A024-1-D5-F871-B4-F8-D.png">
  <div class="header-school">مدرسة سعيد بن العاص</div>
  <div class="header-education">إدارة التعليم بمنطقة مكة المكرمة</div>
</div>

<div class="main-title">تقرير اجتماع مجتمعات التعلم المهنية</div>

<table class="report-table">
<tr>
  <td class="label">رقم الاجتماع</td>
  <td>الأول</td>
  <td class="label">موضوع الاجتماع</td>
  <td>الاختبارات التشخيصية</td>
</tr>
<tr>
  <td class="label">الفئة المنفذة</td>
  <td>المعلمون</td>
  <td class="label">نوع الفئة المستهدفة</td>
  <td>اللغة العربية</td>
</tr>
<tr>
  <td class="label">اليوم</td>
  <td>الأحد</td>
  <td class="label">التاريخ</td>
  <td>1447/2/10هـ</td>
</tr>
<tr>
  <td class="label">مقر التنفيذ</td>
  <td>قاعة الاجتماعات</td>
  <td class="label">عدد الحاضرين</td>
  <td>12</td>
</tr>
</table>

<div class="section-title">أهداف الاجتماع</div>
<div class="section-box">
1- التعريف بخطة المجتمعات المهنية.<br>
2- تحليل نتائج الطلاب.<br>
3- وضع خطط تحسين.<br>
4- تعزيز التعاون بين المعلمين.
</div>

<div class="section-title">التوصيات</div>
<div class="section-box">
1- متابعة تنفيذ الخطط.<br>
2- عقد اجتماعات دورية.<br>
3- توثيق النتائج.
</div>

<div class="section-title">توقيع الحاضرين</div>
<table class="report-table">
<tr>
  <th>م</th>
  <th>الاسم الرباعي</th>
  <th>التخصص</th>
  <th>التوقيع</th>
</tr>
<tr><td>1</td><td></td><td></td><td></td></tr>
<tr><td>2</td><td></td><td></td><td></td></tr>
<tr><td>3</td><td></td><td></td><td></td></tr>
<tr><td>4</td><td></td><td></td><td></td></tr>
<tr><td>5</td><td></td><td></td><td></td></tr>
</table>

<div class="section-title">موعد الاجتماع القادم</div>
<table class="report-table">
<tr>
  <td class="label">اليوم</td>
  <td></td>
  <td class="label">التاريخ</td>
  <td></td>
</tr>
<tr>
  <td class="label">موضوع الاجتماع القادم</td>
  <td colspan="3"></td>
</tr>
</table>

<div class="section-title">توقيع الجهة المنفذة</div>
<table class="report-table">
<tr>
  <td class="label">اسم المنفذ</td>
  <td></td>
  <td class="label">اسم المدير</td>
  <td></td>
</tr>
<tr>
  <td class="label">التوقيع</td>
  <td></td>
  <td class="label">التوقيع</td>
  <td></td>
</tr>
</table>

<div class="footer-box">
تقرير عن جلسات مجتمعات التعلم المهني للعام الدراسي (1447هـ - 2026م)
</div>

</div>

<script>
function generatePDF(){
  const element=document.getElementById('report-content');
  html2pdf().set({
    margin:5,
    html2canvas:{scale:2},
    jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}
  }).from(element).save("تقرير-اجتماع.pdf");
}
</script>

</body>
</html>