document.addEventListener('DOMContentLoaded', function() {
  // ========== SMOOTH SCROLL NAVIGATION ==========
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== PROJECT FILTERING ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'tous' || category === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Merci pour votre message ! Nous vous répondrons bientôt.');
      contactForm.reset();
    });
  }

  // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  const cards = document.querySelectorAll('.team-card, .project-card, .skill-card, .skill-category, .about-content, .timeline-content');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // ========== MOBILE MENU TOGGLE ==========
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});

