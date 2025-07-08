// 导航栏交互
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .mechanic-card, .tokenomics-card, .disclaimer-card, .timeline-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 数字计数动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isText = isNaN(target);
        
        if (!isText) {
            const finalNumber = parseInt(target);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentNumber) + (isPercentage ? '%' : '');
            }, 50);
        }
    });
}

// 当主页横幅进入视口时启动数字动画
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// 添加鼠标悬停效果
document.querySelectorAll('.feature, .mechanic-card, .option').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 添加点击波纹效果
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 为按钮添加波纹效果
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// 添加CSS波纹样式
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 检查用户是否已经访问过网站
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        // 可以在这里添加首次访问的特殊效果
    }
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 按ESC键关闭移动端菜单
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 添加触摸设备支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向上滑动
            console.log('向上滑动');
        } else {
            // 向下滑动
            console.log('向下滑动');
        }
    }
}

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

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动相关的处理逻辑
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// 添加错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// 添加页面可见性API支持
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时的处理
        console.log('页面隐藏');
    } else {
        // 页面显示时的处理
        console.log('页面显示');
    }
});

// 语言切换功能
function setLanguage(lang) {
    document.querySelectorAll('.lang-zh').forEach(el => {
        el.style.display = (lang === 'zh') ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = (lang === 'en') ? '' : 'none';
    });
    // 按钮高亮
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // 记住用户选择
    localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        setLanguage(this.dataset.lang);
    });
});

// 页面加载时根据本地存储设置语言
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'zh';
    setLanguage(savedLang);
}); 