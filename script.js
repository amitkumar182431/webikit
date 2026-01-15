'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const suggestionItems = document.querySelectorAll('.search-suggestions li');

let currentFocus = -1;

// Toggle search box
searchToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    searchInput.focus();
  }
});

// Close search box when clicking elsewhere
document.addEventListener('click', function(e) {
  if (!searchBox.contains(e.target) && e.target !== searchToggle) {
    searchBox.classList.remove('active');
  }
});

// Handle search input
searchInput.addEventListener('input', function() {
  const inputValue = this.value.toLowerCase();
  let matches = [];
  
  // Filter suggestions based on input
  suggestionItems.forEach(item => {
    const itemText = item.getAttribute('data-search').toLowerCase();
    if (itemText.includes(inputValue)) {
      item.style.display = 'block';
      matches.push(item);
    } else {
      item.style.display = 'none';
    }
  });
  
  // Reset focus
  currentFocus = -1;
});

// Keyboard navigation for suggestions
searchInput.addEventListener('keydown', function(e) {
  let items = document.querySelectorAll('.search-suggestions li[style*="display: block"]');
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentFocus++;
    addActive(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentFocus--;
    addActive(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (currentFocus > -1 && items[currentFocus]) {
      items[currentFocus].click();
    }
  }
});

// Function to add active class to suggestion
function addActive(items) {
  if (!items) return false;
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (items.length - 1);
  items[currentFocus].classList.add('highlighted');
}

// Function to remove active class from suggestions
function removeActive(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('highlighted');
  }
}

// Handle suggestion clicks
suggestionItems.forEach(item => {
  item.addEventListener('click', function() {
    const searchTerm = this.getAttribute('data-search');
    searchInput.value = searchTerm;
    
    // In a real implementation, you might redirect to a service page
    // For now, just close the search box
    searchBox.classList.remove('active');
    
    // Alert the selected service
    alert(`Searching for: ${this.textContent}`);
  });
});


addEventOnElem(window, "scroll", activeElem);

