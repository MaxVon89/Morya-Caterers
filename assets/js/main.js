(function () {
  "use strict";

  // Toggle scrolled class on body
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Mobile navigation toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToggle);

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  // Dropdown toggling
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader removal
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Scroll to top functionality
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // AOS Initialization
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // GLightbox Initialization
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // PureCounter Initialization
  new PureCounter();

  // Swiper initialization
  let swiper;

  // Fetch and setup dishes
  document.addEventListener("DOMContentLoaded", function () {
    const dishGallery = document.getElementById('dishGallery');
    console.log("Fetching dishes...");

    fetch('assets/json/dishes.json')
      .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(dishes => {
        console.log("Dishes loaded:", dishes);
        const middleIndex = Math.floor(dishes.length / 2);
        dishGallery.innerHTML = ''; // Clear existing slides

        // Create slides
        dishes.forEach((dish) => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');

          const link = document.createElement('a');
          link.classList.add('glightbox');
          link.setAttribute('data-gallery', 'images-gallery');
          link.href = dish.src;

          const img = document.createElement('img');
          img.src = dish.src;
          img.alt = dish.alt;
          img.classList.add('img-fluid', 'fixed-size'); // Add the fixed-size class

          link.appendChild(img);
          slide.appendChild(link);
          dishGallery.appendChild(slide);
        });

        // Initialize Swiper after adding slides
        swiper = new Swiper('.init-swiper', {
          loop: dishes.length > 3, // Enable loop if enough slides
          speed: 600,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            }
          }
        });

        // Ensure that loop mode works correctly
        if (dishes.length > 3) {
          // Check if swiper is initialized before calling slideTo
          if (swiper) {
            swiper.slideTo(middleIndex + 1, 0); // Use +1 for loop adjustment
          } else {
            console.error('Swiper instance not initialized');
          }
        } else {
          if (swiper) {
            swiper.slideTo(middleIndex, 0); // Adjust for non-looping
          } else {
            console.error('Swiper instance not initialized');
          }
        }

        // Log current slide index
        swiper.on('slideChange', function () {
          console.log('Current slide index: ', swiper.realIndex);
        });
      })
      .catch(error => console.error('Error loading dishes:', error));
  });
  
  // Scrollspy for navigation menu
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Set equal heights for team member cards
  window.addEventListener('load', function () {
    const teamMembers = document.querySelectorAll('.chefs .team-member');
    let maxHeight = 0;

    teamMembers.forEach(member => {
      const memberHeight = member.offsetHeight;
      if (memberHeight > maxHeight) {
        maxHeight = memberHeight;
      }
    });

    teamMembers.forEach(member => {
      member.style.height = maxHeight + 'px';
    });
  });
})();
