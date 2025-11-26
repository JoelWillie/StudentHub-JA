
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('taskList');

  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  function render() {
    list.innerHTML = '';
    tasks.forEach(function (t, idx) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.textContent = t;
      li.appendChild(span);

      var del = document.createElement('button');
      del.textContent = 'Delete';
      del.className = 'delete-btn';
      del.addEventListener('click', function () {
        tasks.splice(idx, 1);
        saveAndRender();
      });

      li.appendChild(del);
      list.appendChild(li);
    });
  }

  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
  }

  addBtn.addEventListener('click', function () {
    var val = input.value.trim();
    if (!val) return;
    tasks.push(val);
    input.value = '';
    saveAndRender();
  });

  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addBtn.click();
  });

  render();
});