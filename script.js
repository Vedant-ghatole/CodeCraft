// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
document.querySelector('nav').appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Add your form submission logic here
    console.log('Form submitted:', { name, email, message });
    
    // Reset form and show success message
    this.reset();
    alert('Thank you for your message! We will get back to you soon.');
});

// Testimonial slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showSlide(index) {
    testimonials.forEach(slide => slide.style.display = 'none');
    testimonials[index].style.display = 'block';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);
showSlide(0);

// Animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.feature-card, .subject-card, .testimonial-card').forEach(el => {
    observer.observe(el);
}); 