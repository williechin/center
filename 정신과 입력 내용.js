// 정신과 입력 내용.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const teamAtmosphere = document.getElementById('team-atmosphere');
  const atmosphereOther = document.getElementById('atmosphere-other');

  function loadForm() {
    const storedData = localStorage.getItem('psychiatricDiagnosis');
    if (storedData) {
      const psychiatricDiagnosis = JSON.parse(storedData);
  
      document.getElementById('team-mbti').value = psychiatricDiagnosis.teamMbti || '';
      document.getElementById('mbti-reason').value = psychiatricDiagnosis.mbtiReason || '';
      
      const teamAtmosphereElement = document.getElementById('team-atmosphere');
      if (teamAtmosphereElement) {
        teamAtmosphereElement.value = psychiatricDiagnosis.teamAtmosphere || '';
      }
  
      const atmosphereOtherElement = document.getElementById('atmosphere-other');
      if (atmosphereOtherElement) {
        atmosphereOtherElement.value = psychiatricDiagnosis.atmosphereOther || '';
      }
  
      document.getElementById('atmosphere-reason').value = psychiatricDiagnosis.atmosphereReason || '';
      document.getElementById('team-vision').value = psychiatricDiagnosis.teamVision || '';
      document.getElementById('team-mission').value = psychiatricDiagnosis.teamMission || '';
      document.getElementById('team-missionmindset').value = psychiatricDiagnosis.missionMindset || '';
    }
  }

  loadForm();

  teamAtmosphere.addEventListener('change', function() {
    if (this.value === '기타') {
      atmosphereOther.style.display = 'block';
    } else {
      atmosphereOther.style.display = 'none';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const psychiatricDiagnosis = {
      teamMbti: document.getElementById('team-mbti').value,
      mbtiReason: document.getElementById('mbti-reason').value,
      teamAtmosphere: teamAtmosphere.value,
      atmosphereOther: atmosphereOther.value,
      atmosphereReason: document.getElementById('atmosphere-reason').value,
      teamVision: document.getElementById('team-vision').value,
      teamMission: document.getElementById('team-mission').value,
      missionMindset: document.getElementById('team-missionmindset').value,
      diagnosisDateTime: new Date().toLocaleString()
    };
    
    localStorage.setItem('psychiatricDiagnosis', JSON.stringify(psychiatricDiagnosis));
    
    window.location.href = '조직진단_결과.html';
  });
});
