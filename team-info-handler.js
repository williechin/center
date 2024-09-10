// team-info-handler.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  function loadForm() {
    const storedData = localStorage.getItem('teamInfo');
    if (storedData) {
      const teamInfo = JSON.parse(storedData);

      document.getElementById('team-name').value = teamInfo.teamName || '';
      document.getElementById('industry').value = teamInfo.industry || '';
      document.getElementById('team-size').value = teamInfo.teamSize || '';
      document.getElementById('team-goals').value = teamInfo.teamGoals || '';
      document.getElementById('team-current-status').value = teamInfo.teamCurrentStatus || '';
      document.getElementById('team-strengths').value = teamInfo.teamStrengths || '';
    }
  }

  loadForm();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamInfo = {
      teamName: document.getElementById('team-name').value,
      industry: document.getElementById('industry').value,
      teamSize: document.getElementById('team-size').value,
      teamGoals: document.getElementById('team-goals').value,
      teamCurrentStatus: document.getElementById('team-current-status').value,
      teamStrengths: document.getElementById('team-strengths').value,
      diagnosisDateTime: new Date().toLocaleString()
    };
    
    localStorage.setItem('teamInfo', JSON.stringify(teamInfo));

    window.location.href = '조직진단_진단2_외과진단.html';
    
  });
});
