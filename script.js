
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
/* ============================================
   effects.js
   ============================================ */

// ============================================
// 1. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ============================================
// 2. TYPING EFFECT
// ============================================
const titles = [
    "Data Analyst",
    "BI Developer",
    "Database Developer",
];

const jobTitleEl = document.querySelector('.job-title');

if (jobTitleEl) {
    jobTitleEl.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
    const typingEl = jobTitleEl.querySelector('.typing-text');

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIndex];

        if (!isDeleting) {
            typingEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            typingEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }

        const speed = isDeleting ? 60 : 100;
        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}

// ============================================
// 3. PARTICLES BACKGROUND (Hero)
// ============================================
const hero = document.querySelector('.hero');

if (hero) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    hero.style.position = 'relative';
    hero.prepend(canvas);
    document.querySelector('.social-sidebar').style.zIndex = '10';

    // رفع باقي محتوى الـ hero فوق الـ canvas
    hero.querySelectorAll(':scope > *:not(canvas)').forEach(el => {
        el.style.position = 'relative';
        el.style.zIndex = '1';
    });

    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.7 ? '#00d4a8' : '#ffffff';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // عدد النقط على حسب حجم الشاشة
    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) particles.push(new Particle());

    // خطوط بين النقط القريبة
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#00d4a8';
                    ctx.globalAlpha = (1 - dist / 120) * 0.12;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }

    animate();
}


// ============================================
// 2. COUNTER NUMBERS - عداد للـ skill bars
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

const countUp = (el, target, duration = 100) => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        el.textContent = Math.round(start) + '%';
    }, 16);
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentEl = entry.target.querySelector('.skill-info span:last-child');
            const barFill = entry.target.querySelector('.bar-fill');
            if (percentEl && !entry.target.dataset.counted) {
                entry.target.dataset.counted = true;
                const target = parseInt(percentEl.textContent);
                // animate bar width
                barFill.style.width = '0%';
                setTimeout(() => {
                    barFill.style.transition = 'width .5s ease-out';
                    barFill.style.width = target + '%';
                }, 100);
                // animate counter
                countUp(percentEl, target);
            }
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => skillObserver.observe(card));