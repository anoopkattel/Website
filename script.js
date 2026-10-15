/* ==========================================================================
   DURATION CALCULATOR (Career Journey section)
   ========================================================================== */

// Function to calculate duration between two dates
function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    // Adjust for days if needed
    if (end.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }

    const yearText = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

    if (yearText && monthText) {
        return `${yearText} ${monthText}`;
    } else if (yearText) {
        return yearText;
    } else if (monthText) {
        return monthText;
    } else {
        return 'Less than 1 month';
    }
}

// Calculate and display durations
document.addEventListener('DOMContentLoaded', function () {
    // Internship duration
    const internDuration = calculateDuration('2024-06-01', '2024-10-31');
    document.getElementById('internDuration').textContent = `Duration: ${internDuration}`;

    // Accounts Officer duration
    const officerDuration = calculateDuration('2024-10-01', 'Present');
    document.getElementById('officerDuration').textContent = `Duration: ${officerDuration}`;
});


/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});


/* ==========================================================================
   SMOOTH SCROLLING
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


/* ==========================================================================
   BUTTON CLICK ANIMATIONS
   ========================================================================== */
const buttons = document.querySelectorAll('.cta-button, .social-links a, .whatsapp-button');

buttons.forEach(button => {
    button.addEventListener('mousedown', function () {
        this.style.transform = 'translateY(-2px) scale(0.98)';
    });

    button.addEventListener('mouseup', function () {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});


/* ==========================================================================
   TIMELINE ANIMATION ON SCROLL
   ========================================================================== */
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    observer.observe(item);
});


/* ==========================================================================
   RESPONSIVE ADJUSTMENTS
   ========================================================================== */
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});


/* ==========================================================================
   ACCA PROGRESS COUNTER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('.progress-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                let current = 0;
                const target = Number(counter.dataset.target);

                function updateCounter() {
                    if (current <= target) {
                        counter.textContent = `${current}/13`;
                        current++;
                        setTimeout(updateCounter, 100);
                    }
                }

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.1 // Starts when 10% of the element is visible
    });

    observer.observe(counter);
});


/* ==========================================================================
   TYPING EFFECT (Hero heading)
   ========================================================================== */
const text = 'Student\n& Accounting Aspirant';
const typing = document.getElementById('typing');

let i = 0;

function type() {
    if (i < text.length) {

        if (text.charAt(i) === '\n') {
            typing.innerHTML += '<br>';
        } else {
            typing.innerHTML += text.charAt(i);
        }

        i++;
        setTimeout(type, 40);
    }
}

type();


/* ==========================================================================
   CURSOR LINE EFFECT
   ========================================================================== */
(() => {
    const CONFIG = {
        segments: 28,
        followSpeed: 0.38,
        tailSpeed: 0.55,
        baseWidth: 3,
        hoverWidth: 6,
        color: [67, 97, 238],        // your --primary
        hoverColor: [247, 37, 133],  // your --accent
        interactiveSelector: 'a, button, .cta-button, .whatsapp-button, .skill-item, .timeline-content, .summary, .acca-progress, .acca-achievements, .profile-img, .mobile-profile-img'
    };

    const canvas = document.getElementById('cursor-line');
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let w = 0, h = 0, points = [];
    let width = CONFIG.baseWidth, targetWidth = CONFIG.baseWidth;
    let color = CONFIG.color.slice(), targetColor = CONFIG.color.slice();
    let alpha = 0;
    const mouse = { x: -100, y: -100, visible: false };
    const lerp = (a, b, t) => a + (b - a) * t;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function resetPoints(x, y) {
        points = Array.from({ length: CONFIG.segments }, () => ({ x, y }));
    }

    window.addEventListener('pointermove', (e) => {
        if (!mouse.visible) resetPoints(e.clientX, e.clientY);
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.visible = true;
        const hovering = e.target.closest && e.target.closest(CONFIG.interactiveSelector);
        targetWidth = hovering ? CONFIG.hoverWidth : CONFIG.baseWidth;
        targetColor = hovering ? CONFIG.hoverColor : CONFIG.color;
    }, { passive: true, capture: true });

    document.addEventListener('mouseleave', () => { mouse.visible = false; });
    window.addEventListener('blur', () => { mouse.visible = false; });
    window.addEventListener('resize', resize);

    function frame() {
        ctx.clearRect(0, 0, w, h);
        alpha = lerp(alpha, mouse.visible ? 1 : 0, 0.12);
        width = lerp(width, targetWidth, 0.15);
        color = color.map((c, i) => lerp(c, targetColor[i], 0.15));

        if (alpha > 0.01 && points.length) {
            const rm = reduceMotion.matches;
            points[0].x = lerp(points[0].x, mouse.x, rm ? 1 : CONFIG.followSpeed);
            points[0].y = lerp(points[0].y, mouse.y, rm ? 1 : CONFIG.followSpeed);
            for (let i = 1; i < points.length; i++) {
                points[i].x = lerp(points[i].x, points[i - 1].x, rm ? 1 : CONFIG.tailSpeed);
                points[i].y = lerp(points[i].y, points[i - 1].y, rm ? 1 : CONFIG.tailSpeed);
            }

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            const [r, g, b] = color.map(Math.round);
            for (let i = 0; i < points.length - 1; i++) {
                const k = 1 - i / (points.length - 1);
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[i + 1].x, points[i + 1].y);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(k * 0.9 * alpha).toFixed(3)})`;
                ctx.lineWidth = Math.max(0.5, width * k);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, width * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
            ctx.fill();
        }
        requestAnimationFrame(frame);
    }

    resize();
    resetPoints(-100, -100);
    requestAnimationFrame(frame);
})();
