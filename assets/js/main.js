(function () {
  "use strict";

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

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    function mobileNavToggle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  new PureCounter();

  document.addEventListener("DOMContentLoaded", function () {
    const dishGallery = document.getElementById('dishGallery');
    console.log("Fetching dishes...");
  
    // Fetch dishes JSON
    fetch('assets/json/dishes.json')
      .then(response => response.json())
      .then(dishes => {
        const middleIndex = Math.floor(dishes.length / 2);
        dishGallery.innerHTML = ''; // Clear existing content
  
        dishes.forEach((dish, index) => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          if (index === middleIndex) {
            slide.classList.add('active-slide'); // Set middle image as active
          }
  
          const link = document.createElement('a');
          link.classList.add('glightbox');
          link.setAttribute('data-gallery', 'images-gallery');
          link.href = dish.src;
  
          const img = document.createElement('img');
          img.src = dish.src;
          img.alt = dish.alt;
          img.classList.add('img-fluid', 'fixed-size'); // Set fixed size
  
          link.appendChild(img);
          slide.appendChild(link);
          dishGallery.appendChild(slide);
        });
  
        // Initialize Swiper with navigation arrows
        const swiper = new Swiper('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          loop: true, // Enable looping through slides
        });
      })
      .catch(error => console.error('Error loading dishes:', error));
  
    // Event Section Clickable Images with JSON info
    const eventItems = document.querySelectorAll('.event-item');
    const eventDetailsSection = document.getElementById('event-details');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventPrice = document.getElementById('event-price');
  
    fetch('assets/json/events.json')
      .then(response => response.json())
      .then(events => {
        eventItems.forEach((item, index) => {
          item.addEventListener('click', () => {
            const event = events[index];
            eventTitle.innerText = event.title;
            eventDescription.innerText = event.description;
            eventPrice.innerText = event.price;
            eventDetailsSection.style.display = 'block'; // Show event details section
            eventDetailsSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to details section
          });
        });
      })
      .catch(error => console.error('Error loading event data:', error));
  });
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data
    fetch('assets/json/events.json')
        .then(response => response.json())
        .then(eventsData => {
            const readMoreButtons = document.querySelectorAll('.read-more');
            const modal = document.getElementById('event-modal');
            const modalTitle = document.getElementById('modal-event-title');
            const modalDescription = document.getElementById('modal-event-description');
            const modalPrice = document.getElementById('modal-event-price');
            const modalImage = document.createElement('img'); // Create image element
            const modalMenu = document.createElement('p'); // Create menu element

            // Append the image and menu elements to the modal content
            document.querySelector('.modal-content').appendChild(modalImage);
            document.querySelector('.modal-content').appendChild(modalMenu);

            // Close modal functionality
            document.querySelector('.close').onclick = function () {
                modal.style.display = 'none';  // Hide modal
            };

            // Set up Read More button click event
            readMoreButtons.forEach((button, index) => {
                button.addEventListener('click', function () {
                    const event = eventsData[index];  // Get the corresponding event from JSON

                    // Set modal content based on event data
                    modalTitle.innerText = event.title;
                    modalDescription.innerText = event.description;
                    modalPrice.innerText = event.price;
                    modalImage.src = event.image; // Set image source
                    modalImage.alt = event.title; // Set image alt text
                    modalMenu.innerText = `Menu: ${event.menu}`; // Set menu text

                    modal.style.display = 'block';  // Show modal
                });
            });
        })
        .catch(error => console.error('Error fetching events data:', error));
});

  
  // Gallery Swiper
  document.addEventListener("DOMContentLoaded", function () {
    const dishGallery = document.getElementById('dishGallery');
  
    fetch('assets/json/dishes.json')
      .then(response => response.json())
      .then(dishes => {
        const middleIndex = Math.floor(dishes.length / 2);
        dishGallery.innerHTML = ''; 
  
        dishes.forEach((dish, index) => {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          if (index === middleIndex) {
            slide.classList.add('active-slide'); 
          }
  
          const link = document.createElement('a');
          link.classList.add('glightbox');
          link.setAttribute('data-gallery', 'images-gallery');
          link.href = dish.src;
  
          const img = document.createElement('img');
          img.src = dish.src;
          img.alt = dish.alt;
          img.classList.add('img-fluid', 'fixed-size'); 
  
          link.appendChild(img);
          slide.appendChild(link);
          dishGallery.appendChild(slide);
        });
  
        const swiper = new Swiper('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          loop: true, 
        });
      })
      .catch(error => console.error('Error loading dishes:', error));
  });
  

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
