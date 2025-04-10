// جدول المواعيد المحدث
const lessons = [
    { day: 0, hour: 20, name: "الأحد: 8 مساءً (تلاوة وتفسير)" },
    { day: 2, hour: 22, name: "الثلاثاء: 10 مساءً (مجلس حفظ)" },
    { day: 4, hour: 20, name: "الخميس: 8 مساءً (مراجعة جماعية)" }
];

// دالة التحقق من الإشعارات
function checkNotifications() {
    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "granted") {
        startNotificationCheck();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                startNotificationCheck();
            }
        });
    }
}

// التحقق من المواعيد
function startNotificationCheck() {
    checkForUpcomingLessons();
    setInterval(checkForUpcomingLessons, 5 * 60 * 1000); // كل 5 دقائق
}

function checkForUpcomingLessons() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    lessons.forEach(lesson => {
        if (lesson.day === currentDay) {
            // قبل الموعد بنصف ساعة
            if (currentHour === lesson.hour - 1 && currentMinutes === 30) {
                showNotification(lesson.name);
            }
        }
    });
}

function showNotification(lessonName) {
    if (Notification.permission === "granted") {
        new Notification("تذكير بالمجلس القرآني", {
            body: `موعد ${lessonName} يبدأ بعد نصف ساعة`,
            icon: "https://cdn-icons-png.flaticon.com/512/2821/2821807.png"
        });
    }
}

// بدء التشغيل
document.addEventListener('DOMContentLoaded', checkNotifications);