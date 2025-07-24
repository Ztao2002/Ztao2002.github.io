/* Enhanced JavaScript Features for Personal Homepage */

// 动画观察器 - 页面滚动时触发动画
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        this.init();
    }

    init() {
        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll(
            '.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animationPlayState = 'running';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// 打字机效果
class TypewriterEffect {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 数字计数动画
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.start = 0;
        this.increment = target / (duration / 16);
    }

    animate() {
        if (this.start < this.target) {
            this.start += this.increment;
            this.element.textContent = Math.floor(this.start);
            requestAnimationFrame(() => this.animate());
        } else {
            this.element.textContent = this.target;
        }
    }

    start() {
        this.animate();
    }
}

// 技能进度条动画
class SkillProgressAnimation {
    constructor() {
        this.initProgressBars();
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width') || '0%';
                    progressBar.style.setProperty('--progress-width', width);
                    progressBar.classList.add('animate');
                    observer.unobserve(progressBar);
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }
}

// 粒子背景效果
class ParticleBackground {
    constructor(container, particleCount = 50) {
        this.container = container;
        this.particleCount = particleCount;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置和动画延迟
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// 平滑滚动和导航高亮
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // 平滑滚动到锚点
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // 滚动时更新导航状态
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// 主题切换功能
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle btn-modern';
        button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
        `;
        
        button.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(button);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        const button = document.querySelector('.theme-toggle');
        button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// 懒加载图片
class LazyImageLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化动画观察器
    new AnimationObserver();
    
    // 初始化平滑滚动
    new SmoothScrolling();
    
    // 初始化技能进度条
    new SkillProgressAnimation();
    
    // 初始化主题切换
    new ThemeToggle();
    
    // 初始化懒加载
    new LazyImageLoader();
    
    // 添加打字机效果到标题
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        new TypewriterEffect(typewriterElement, [
            'AI Researcher',
            'Robotics Engineer', 
            'VLA Developer',
            'Tech Enthusiast'
        ]);
    }
    
    // 初始化数字计数动画
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    new CounterAnimation(counter, target).start();
                    observer.unobserve(counter);
                }
            });
        });
        observer.observe(counter);
    });
    
    // 添加粒子背景
    const particleContainers = document.querySelectorAll('.particles-container');
    particleContainers.forEach(container => {
        new ParticleBackground(container, 30);
    });
    
    // 添加页面加载动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出供其他脚本使用
window.PersonalWebsite = {
    AnimationObserver,
    TypewriterEffect,
    CounterAnimation,
    SkillProgressAnimation,
    ParticleBackground,
    SmoothScrolling,
    ThemeToggle,
    LazyImageLoader,
    debounce
};
