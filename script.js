document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  // Toggle Dark Mode
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Toggle Sidebar for Mobile
  hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
  });
  
  // Lazy load dynamic content
  function navigateTo(section) {
    const dynamicContent = document.getElementById('dynamic-content');
    switch (section) {
      case 'home':
        dynamicContent.innerHTML = '<h2>Welcome to The Peterson Hub!</h2>';
        break;
      case 'daily-verse':
        fetchDailyVerse();
        break;
      // Add cases for other sections...
      default:
        dynamicContent.innerHTML = '<h2>Section under construction...</h2>';
    }
  }

  // Fetch Daily Verse from API
  function fetchDailyVerse() {
    fetch('https://labs.bible.org/api/?passage=random&type=json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('dynamic-content').innerHTML = `
          <h2>Daily Verse</h2>
          <p>"${data[0].text}" - ${data[0].bookname} ${data[0].chapter}:${data[0].verse}</p>
        `;
      })
      .catch(() => {
        document.getElementById('dynamic-content').innerHTML = '<p>Unable to fetch verse. Try again later.</p>';
      });
  }
});
