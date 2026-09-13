const users = [
  { id: 1, name: 'Ava Patel', friends: 4, initials: 'AP', role: 'Product Designer' },
  { id: 2, name: 'Jyothi', friends: 5, initials: 'MC', role: 'Data Analyst' },
  { id: 3, name: 'Gopi', friends: 3, initials: 'SK', role: 'UI Engineer' },
  { id: 4, name: 'Murali', friends: 4, initials: 'NR', role: 'Cloud Architect' },
  { id: 5, name: 'Priya', friends: 6, initials: 'LO', role: 'Marketing Lead' },
  { id: 6, name: 'Rajesh', friends: 3, initials: 'ES', role: 'Mobile Developer' },
  { id: 7, name: 'Suresh', friends: 5, initials: 'LB', role: 'AI Researcher' },
  { id: 8, name: 'Ananya', friends: 4, initials: 'MN', role: 'Content Strategist' },
  { id: 9, name: 'Gayathri', friends: 2, initials: 'EC', role: 'Systems Engineer' },
  { id: 10, name: 'Lakshmi', friends: 4, initials: 'AS', role: 'Startup Mentor' }
];

const friendships = {
  1: [2, 3, 4],
  2: [1, 3, 5],
  3: [1, 2, 6],
  4: [1, 5, 7],
  5: [2, 4, 8],
  6: [3, 7, 9],
  7: [4, 6, 10],
  8: [5, 9, 10],
  9: [6, 8],
  10: [7, 8]
};

function getRecommendations(userId) {
  const queue = [{ id: userId, depth: 0 }];
  const visited = new Set([userId]);
  const results = [];

  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = friendships[current.id] || [];

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor);

      if (current.depth + 1 === 2) {
        const mutualFriends = countMutualFriends(userId, neighbor);
        if (mutualFriends > 0) {
          results.push({ id: neighbor, mutualFriends });
        }
      } else {
        queue.push({ id: neighbor, depth: current.depth + 1 });
      }
    }
  }

  return results
    .sort((a, b) => b.mutualFriends - a.mutualFriends || a.id - b.id)
    .slice(0, 3);
}

function countMutualFriends(userId, candidateId) {
  const userFriends = friendships[userId] || [];
  const candidateFriends = friendships[candidateId] || [];
  return userFriends.filter((friend) => candidateFriends.includes(friend)).length;
}

function renderUsers() {
  const container = document.getElementById('userGrid');
  container.innerHTML = users
    .map((user) => `
      <article class="profile-card">
        <div class="avatar">${user.initials}</div>
        <h3>${user.name}</h3>
        <p class="meta">${user.role}</p>
        <p class="meta">${user.friends} friends</p>
        <button class="btn btn-primary">View Profile</button>
      </article>
    `)
    .join('');
}

function renderRecommendations(userId) {
  const container = document.getElementById('recommendationResults');
  const recommendations = getRecommendations(userId);

  if (recommendations.length === 0) {
    container.innerHTML = '<p class="meta">No recommendations found for this user right now.</p>';
    return;
  }

  container.innerHTML = recommendations
    .map((item) => {
      const profile = users.find((user) => user.id === item.id);
      return `
        <article class="recommendation-card">
          <div class="avatar">${profile.initials}</div>
          <h3>${profile.name}</h3>
          <p class="meta">Mutual Friends: ${item.mutualFriends}</p>
          <p class="meta">Degree of Separation: 2</p>
          <button class="btn btn-primary">Add Friend</button>
        </article>
      `;
    })
    .join('');
}

function populateSelect() {
  const select = document.getElementById('userSelect');
  select.innerHTML = users
    .map((user) => `<option value="${user.id}">${user.name}</option>`)
    .join('');
}

window.addEventListener('DOMContentLoaded', () => {
  renderUsers();
  populateSelect();
  renderRecommendations(1);

  document.getElementById('recommendBtn').addEventListener('click', () => {
    const selectedUser = Number(document.getElementById('userSelect').value);
    renderRecommendations(selectedUser);
  });
});
