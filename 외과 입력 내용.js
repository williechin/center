// 외과 입력 내용.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const addTaskBtn = document.querySelector('.add-task-btn');
  const taskList = document.getElementById('task-list');

  function loadForm() {
    const storedData = localStorage.getItem('teamStructureInfo');
    if (storedData) {
      const teamStructureInfo = JSON.parse(storedData);
  
      if (teamStructureInfo.tasks && Array.isArray(teamStructureInfo.tasks)) {
        adjustTasksToData(teamStructureInfo.tasks);
      }
  
      document.getElementById('team-formation').value = teamStructureInfo.teamFormation || '';
      if (teamStructureInfo.teamFormationRating) {
        document.querySelector(`input[name="team-formation-rating"][value="${teamStructureInfo.teamFormationRating}"]`).checked = true;
      }
      document.getElementById('team-leader').value = teamStructureInfo.teamLeader || '';
      document.getElementById('leader-style').value = teamStructureInfo.leaderStyle || '';
      if (teamStructureInfo.leadershipRating) {
        document.querySelector(`input[name="leadership-rating"][value="${teamStructureInfo.leadershipRating}"]`).checked = true;
      }
      document.getElementById('team-gap').value = teamStructureInfo.teamGap || '';
    }
  }

  function adjustTasksToData(tasksArray) {
    const currentTasksCount = taskList.children.length;
    const requiredTasksCount = tasksArray.length;
  
    if (currentTasksCount < requiredTasksCount) {
      for (let i = currentTasksCount; i < requiredTasksCount; i++) {
        addTask(tasksArray[i]);
      }
    }
  
    if (currentTasksCount > requiredTasksCount) {
      for (let i = currentTasksCount; i > requiredTasksCount; i--) {
        taskList.lastElementChild.remove();
      }
    }
  
    updateTaskIds();

    tasksArray.forEach((task, index) => {
      const taskId = `task-${index + 1}`;
      const taskInput = document.getElementById(taskId);
      if (taskInput) {
        taskInput.value = task;
      }
    });
  }

  function updateTaskIds() {
    const tasks = taskList.querySelectorAll('.task-group');
    tasks.forEach((taskGroup, index) => {
      const input = taskGroup.querySelector('input');
      const taskId = `task-${index + 1}`;
      input.id = taskId;
      input.name = taskId;
    });
  }

  loadForm();

  // 업무 추가 버튼 이벤트 리스너
  addTaskBtn.addEventListener('click', function() {
    const taskGroup = document.createElement('div');
    taskGroup.className = 'task-group';
    const taskId = `task-${taskList.children.length + 1}`;
    taskGroup.innerHTML = `
      <input id="${taskId}" name="${taskId}" type="text" placeholder="업무를 입력하세요">
      <button class="remove-task-btn" type="button">X</button>
    `;
    taskList.appendChild(taskGroup);
  });

  // 업무 제거 버튼 이벤트 리스너 (이벤트 위임 사용)
  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-task-btn')) {
      e.target.parentElement.remove();
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tasks = Array.from(taskList.querySelectorAll('input')).map(input => input.value);
    const teamFormationRating = document.querySelector('input[name="team-formation-rating"]:checked');
    const leadershipRating = document.querySelector('input[name="leadership-rating"]:checked');

    const teamStructureInfo = {
      tasks: tasks,
      teamFormation: document.getElementById('team-formation').value,
      teamFormationRating: teamFormationRating ? teamFormationRating.value : '',
      teamLeader: document.getElementById('team-leader').value,
      leaderStyle: document.getElementById('leader-style').value,
      leadershipRating: leadershipRating ? leadershipRating.value : '',
      teamGap: document.getElementById('team-gap').value,
      diagnosisDateTime: new Date().toLocaleString()
    };
    
    localStorage.setItem('teamStructureInfo', JSON.stringify(teamStructureInfo));
    
    window.location.href = '조직진단_진단3_내과진단.html';
  });
});
