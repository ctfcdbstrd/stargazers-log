// Fetch and render starred repositories
async function loadRepositories() {
  const container = document.getElementById('repositories-container');
  const loadingEl = document.getElementById('loading');
  const listEl = document.getElementById('repositories-list');

  try {
    // Show loading state
    loadingEl.style.display = 'block';

    // Fetch events.json
    const response = await fetch('events.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load repositories: ${response.status}`);
    }

    const repositories = await response.json();

    // Clear loading state
    loadingEl.style.display = 'none';

    // Render repositories
    repositories.forEach(repo => {
      const listItem = createRepositoryElement(repo);
      listEl.appendChild(listItem);
    });

  } catch (error) {
    loadingEl.style.display = 'none';
    const errorEl = document.getElementById('error');
    errorEl.textContent = `Error: ${error.message}`;
    errorEl.style.display = 'block';
    console.error('Error loading repositories:', error);
  }
}

// Create a repository list item element
function createRepositoryElement(repo) {
  const li = document.createElement('li');
  li.className = 'repository-item';

  const starredDate = new Date(repo.starredAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  li.innerHTML = `
    <div class="repository-header">
      <div class="repository-title">
        <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <span class="owner">by ${repo.owner}</span>
      </div>
      <span class="stars-badge">⭐ ${repo.stars.toLocaleString()}</span>
    </div>
    <p class="repository-description">${repo.description}</p>
    <div class="repository-footer">
      <span class="starred-date">Starred on ${starredDate}</span>
      <a href="${repo.url}" target="_blank" rel="noopener noreferrer" style="color: #667eea; text-decoration: none;">View on GitHub →</a>
    </div>
  `;

  return li;
}

// Load repositories when the page loads
document.addEventListener('DOMContentLoaded', loadRepositories);
