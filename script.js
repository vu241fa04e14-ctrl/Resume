// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Improved Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .section-title, .hero-content, .hero-image, .skill-pill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for blobs
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const blobs = document.querySelectorAll('.bg-blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Contact Form submission with Fetch API
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        button.textContent = 'Sending...';
        button.disabled = true;
        const status = document.getElementById('form-status');
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                status.textContent = 'Message Sent Successfully! ✨';
                status.className = 'form-status success';
                button.textContent = 'Message Sent!';
                button.style.backgroundColor = '#10b981';
                contactForm.reset();
            } else {
                console.log(result);
                status.textContent = 'Error: ' + result.message;
                status.className = 'form-status error';
                button.textContent = 'Error sending';
            }

        } catch (error) {
            console.error(error);
            status.textContent = 'Network error. Please try again.';
            status.className = 'form-status error';
            button.textContent = 'Network error';
        } finally {
            status.style.display = 'block';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = 'var(--primary)';
                button.disabled = false;
                status.style.display = 'none';
            }, 5000);
        }
    });
}
