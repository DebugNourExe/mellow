// Explore Rooms Button (Fancybox)
Fancybox.bind('[data-fancybox="rooms"]', {
  });
const exploreRoomsBtn = document.getElementById('explore-rooms-btn');
exploreRoomsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('[data-fancybox="rooms"]').click();
});
// Rooms Section (Swiper)
document.addEventListener('DOMContentLoaded', () => {
    new Swiper('#rooms-swiper', {
        slidesPerView: 1,
        spaceBetween: '2%',
        speed: 700,
        rewind: true,
        grabCursor: true,
        longSwipesRatio: 0.15,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '#rooms-pagination',
            clickable: true,
            bulletClass: 'rooms-bullet',
            bulletActiveClass: 'rooms-bullet-active',
            renderBullet: (index, className) =>
                `<button type="button" aria-label="Go to slide ${index + 1}" class="${className} w-3 h-3 rounded-full cursor-pointer bg-co-100 [&.rooms-bullet-active]:bg-co-600 transition-colors duration-300"></button>`,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
});
//  Gallery Section (Swiper) 
document.addEventListener('DOMContentLoaded', () => {
    new Swiper('#gallery-swiper', {
        slidesPerView: 1,
        speed: 700,
        grabCursor: true,
        navigation: {
        prevEl: '#gallery-prev',
            nextEl: '#gallery-next',
        },
    });
});
//  Menu Mobile
const menuMobile = document.getElementById('menu-mobile');
const btnMobile = document.getElementById('btn-mobile');
const menuIcon = document.getElementById('menu-icon')
const menuLinks = menuMobile.querySelectorAll('a');
btnMobile.addEventListener('click',  ()=> {
    menuMobile.classList.toggle('max-sm:translate-x-full');
    menuMobile.classList.toggle('max-sm:translate-x-0');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
});
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.remove('max-sm:translate-x-0');
        menuMobile.classList.add('max-sm:translate-x-full');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        
    });
});
//  Search Form
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const sections = {
    home: 'home',
    about: 'about',
    rooms: 'room',
    services: 'services',
    news: 'news',
    contact: 'contact'
};
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = searchInput.value.trim().toLowerCase();
    if (!value) {
        showMessage('Please enter a section name');
        return;
    }
    const matchedSection = Object.keys(sections).find(section =>
        section.startsWith(value)
    );
    if (!matchedSection) {
        showMessage('Section not found');
        return;
    }
    const target = document.getElementById(sections[matchedSection]);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    hideMessage();
    searchInput.value = '';
});
function showMessage(message) {
    searchMessage.textContent = message;
    searchMessage.classList.remove('hidden');
    setTimeout(() => {
        searchMessage.classList.add('hidden');
    }, 3000);
}
function hideMessage() {
    searchMessage.classList.add('hidden');
}
//  Availability Form
const availabilityForm = document.getElementById('availability-form');
const checkIn = document.getElementById('check-in');
const checkOut = document.getElementById('check-out');
const rooms = document.getElementById('rooms');
const guests = document.getElementById('guests');
const availabilityMessage = document.getElementById('availability-message');
const today = new Date().toISOString().split('T')[0];
checkIn.min = today;
checkOut.min = today;
checkIn.addEventListener('change', () => {
    checkOut.min = checkIn.value;
    if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = '';
    }
});
availabilityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkIn.value || !checkOut.value) {
        showAvailabilityMessage(
            'Please select check-in and check-out dates.',
            false
        );
        return;
    }
    if (checkOut.value <= checkIn.value) {
        showAvailabilityMessage(
            'Check-out must be after check-in.',
            false
        );
        return;
    }
    showAvailabilityMessage(
        `${rooms.value} available for ${guests.value}.`,
        true
    );
});
function showAvailabilityMessage(message, success) {
    availabilityMessage.textContent = message;
    availabilityMessage.classList.remove(
        'hidden',
        'text-red-500',
        'text-green-600'
    );
    availabilityMessage.classList.add(
        success ? 'text-green-600' : 'text-red-500'
    );
}
//  Counters
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const suffix = counter.dataset.suffix || '';
            let current = 0;
            const duration = 1500;
            const interval = 30;
            const increment = target / (duration / interval);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, interval);
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});
counters.forEach((counter) => {
    observer.observe(counter);
});
//  Service Modal
const serviceButtons = document.querySelectorAll('.service-more');
const serviceModal = document.getElementById('service-modal');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalDescription = document.getElementById('service-modal-description');
serviceButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        serviceModalTitle.textContent = button.dataset.title;
        serviceModalDescription.textContent = button.dataset.description;
        serviceModal.classList.remove('hidden');
        serviceModal.classList.add('flex');
    });
});
const serviceModalClose = document.getElementById('service-modal-close');
function closeServiceModal() {
    serviceModal.classList.add('hidden');
    serviceModal.classList.remove('flex');
}
serviceModalClose.addEventListener('click', closeServiceModal);
serviceModal.addEventListener('click', (event) => {
    if (event.target === serviceModal) {
        closeServiceModal();
    }
});
//  Newsletter Form
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
    const firstNameInput = document.getElementById("newsletter-first-name");
    const lastNameInput = document.getElementById("newsletter-last-name");
    const emailInput = document.getElementById("newsletter-email");
    const firstNameError = document.getElementById("first-name-error");
    const lastNameError = document.getElementById("last-name-error");
    const emailError = document.getElementById("email-error");
    const newsletterMessage = document.getElementById("newsletter-message");
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove("hidden");
        input.classList.add("border-red-500");
        input.setAttribute("aria-invalid", "true");
    }
    function clearError(input, errorElement) {
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
        input.classList.remove("border-red-500");
        input.removeAttribute("aria-invalid");
    }
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        let isValid = true;
        newsletterMessage.classList.add("hidden");
        // First Name Validation
        if (firstName === "") {
            showError(firstNameInput, firstNameError, "First name is required.");
            isValid = false;
        } else {
            clearError(firstNameInput, firstNameError);
        }
        // Last Name Validation
        if (lastName === "") {
            showError(lastNameInput, lastNameError, "Last name is required.");
            isValid = false;
        } else {
            clearError(lastNameInput, lastNameError);
        }
        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            showError(emailInput, emailError, "Email address is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, emailError, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }
        if (!isValid) {
            return;
        }
        // Temporary success message (EmailJS not connected yet)
        newsletterMessage.textContent =
            `Thank you, ${firstName} ${lastName}! Your information is valid.`;
        newsletterMessage.classList.remove("hidden", "text-red-500");
        newsletterMessage.classList.add("text-green-600");
        // Clear all fields
        newsletterForm.reset();
        console.log("Newsletter validation successful!");
        setTimeout(() => {
            newsletterMessage.classList.add("hidden");
        }, 5000);
    });
}
//  Copyright Year
const copyrightYear = document.getElementById("copyright-year");
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}
