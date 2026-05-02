
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');

  function setActive() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    // لو فوق كل السكشنز ارجع للـ home
    if (window.scrollY < 100) {
      current = 'home';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // تشغيل فور فتح الصفحة عشان home يبدأ أخضر
  setActive();

  // تشغيل عند السكرول
  window.addEventListener('scroll', setActive);
// تحديد العناصر من الـ HTML
const projectSlider = document.getElementById('projectSlider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// وظيفة زر "التالي"
nextBtn.addEventListener('click', () => {
    // نقوم بتحريك التمرير لليمين بمقدار 380 بكسل (عرض البطاقة + الفراغ)
    projectSlider.scrollBy({
        left: 380,
        behavior: 'smooth' // حركة ناعمة
    });
});

// وظيفة زر "السابق"
prevBtn.addEventListener('click', () => {
    // نقوم بتحريك التمرير لليسار بمقدار 380 بكسل
    projectSlider.scrollBy({
        left: -380,
        behavior: 'smooth'
    });
});

// اختياري: تغيير لون الأسهم عند الوصول للنهاية أو البداية
projectSlider.addEventListener('scroll', () => {
    // إذا وصلنا للبداية
    if (projectSlider.scrollLeft <= 0) {
        prevBtn.style.opacity = "0.5";
        prevBtn.style.cursor = "default";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
    }
    
    // إذا وصلنا للنهاية
    if (projectSlider.scrollLeft + projectSlider.clientWidth >= projectSlider.scrollWidth - 5) {
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "default";
    } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
    }
});