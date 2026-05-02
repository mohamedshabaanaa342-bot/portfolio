
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function setActive() {
    let current = '';
    
    // 1. التحقق من الوصول لنهاية الصفحة لتفعيل "Contact Me" إجبارياً
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    if (isAtBottom) {
        current = 'contact'; // تأكد أن id قسم التواصل هو contact بالضبط
    } 
    // 2. التحقق من التواجد في أعلى الصفحة لتفعيل "Home"
    else if (window.scrollY < 100) {
        current = 'home';
    } 
    // 3. تحديد القسم النشط بناءً على مكان السكرول
    else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // إزاحة لتناسب الهيدر الثابت
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
    }

    // 4. تحديث الكلاس active في القائمة
    navLinks.forEach(link => {
        link.classList.remove('active');
        // نستخدم includes لضمان المطابقة حتى لو كان الرابط يحتوي على المسار الكامل
        if (link.getAttribute('href').includes(`#${current}`)) {
            link.classList.add('active');
        }
    });
}

// تشغيل الوظيفة فور تحميل الصفحة
window.addEventListener('load', setActive);

// تشغيل الوظيفة عند التمرير
window.addEventListener('scroll', setActive);

// تحديد العناصر من الـ HTML
const projectSlider = document.getElementById('projectSlider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const getDynamicStep = () => {
    const firstCard = projectSlider.querySelector('.project-card');
    if (firstCard) {
        const style = window.getComputedStyle(projectSlider);
        const gap = parseInt(style.columnGap) || parseInt(style.gap) || 20;
        return firstCard.offsetWidth + gap;
    }
    return 380;
};

nextBtn.addEventListener('click', () => {
    projectSlider.scrollBy({ left: getDynamicStep(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    projectSlider.scrollBy({ left: -getDynamicStep(), behavior: 'smooth' });
});

// مراقبة السكرول بدقة عالية للموبايل
projectSlider.addEventListener('scroll', () => {
    // استخدمنا Math.ceil لجبر أي كسور بكسل ناتجة عن زووم الموبايل
    const scrollLeft = Math.ceil(projectSlider.scrollLeft);
    const maxScroll = projectSlider.scrollWidth - projectSlider.clientWidth;

    // 1. حالة سهم "السابق"
    if (scrollLeft <= 5) {
        prevBtn.style.opacity = "0.3";
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
    }

    // 2. حالة سهم "التالي" (زدنا السماحية لـ 15 بكسل لضمان التفعيل في الموبايل)
    // الحسبة: إذا كان السكرول الحالي + عرض الشاشة >= العرض الكلي للمشاريع
    if (scrollLeft >= maxScroll - 15) {
        nextBtn.style.opacity = "0.3";
        nextBtn.style.pointerEvents = "none";
    } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
    }
});
// الكود سيظل يعمل للشاشات الكبيرة فقط
if (window.innerWidth > 768) {
    const projectSlider = document.getElementById('projectSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', () => {
        const cardWidth = projectSlider.querySelector('.project-card').offsetWidth;
        projectSlider.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = projectSlider.querySelector('.project-card').offsetWidth;
        projectSlider.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    });
}
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

// استهداف عناصر الهوم
document.querySelectorAll('.hero-text, .hero-image').forEach((el) => {
    observer.observe(el);
});
