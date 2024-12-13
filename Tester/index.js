const content = {
    section1: {
      title: "Section 1",
      body: "This is the detailed information about Section 1."
    },
    section2: {
      title: "Section 2",
      body: "This is the detailed information about Section 2."
    },
    section3: {
      title: "Section 3",
      body: "This is the detailed information about Section 3."
    }
  };
  
  // Add event listeners to the links
  document.querySelectorAll('.left-column a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      const section = event.target.getAttribute('data-section');
      const contentArea = document.getElementById('content');
      
      // Update content dynamically
      contentArea.innerHTML = `
        <h2>${content[section].title}</h2>
        <p>${content[section].body}</p>
      `;
    });
  });
  