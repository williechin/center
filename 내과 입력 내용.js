// 내과 입력 내용.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  function loadForm() {
    const storedData = localStorage.getItem('internalDiagnosis');
    if (storedData) {
      const internalDiagnosis = JSON.parse(storedData);
  
      document.getElementById('reporting').value = internalDiagnosis.reporting.description || '';
      if (internalDiagnosis.reporting.rating) {
        document.querySelector(`input[name="reporting_rating"][value="${internalDiagnosis.reporting.rating}"]`).checked = true;
      }
  
      document.getElementById('workflow').value = internalDiagnosis.workflow.description || '';
      if (internalDiagnosis.workflow.rating) {
        document.querySelector(`input[name="workflow_rating"][value="${internalDiagnosis.workflow.rating}"]`).checked = true;
      }
  
      document.getElementById('communication').value = internalDiagnosis.communication.description || '';
      if (internalDiagnosis.communication.rating) {
        document.querySelector(`input[name="communication_rating"][value="${internalDiagnosis.communication.rating}"]`).checked = true;
      }
  
      document.getElementById('evaluation').value = internalDiagnosis.evaluation.description || '';
      if (internalDiagnosis.evaluation.rating) {
        document.querySelector(`input[name="evaluation_rating"][value="${internalDiagnosis.evaluation.rating}"]`).checked = true;
      }
    }
  }

  loadForm();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const internalDiagnosis = {
      reporting: {
        description: document.getElementById('reporting').value,
        rating: document.querySelector('input[name="reporting_rating"]:checked')?.value || ''
      },
      workflow: {
        description: document.getElementById('workflow').value,
        rating: document.querySelector('input[name="workflow_rating"]:checked')?.value || ''
      },
      communication: {
        description: document.getElementById('communication').value,
        rating: document.querySelector('input[name="communication_rating"]:checked')?.value || ''
      },
      evaluation: {
        description: document.getElementById('evaluation').value,
        rating: document.querySelector('input[name="evaluation_rating"]:checked')?.value || ''
      },
      diagnosisDateTime: new Date().toLocaleString()
    };
    
    localStorage.setItem('internalDiagnosis', JSON.stringify(internalDiagnosis));
    
    window.location.href = '조직진단_진단4_정신과진단.html';
  });
});
