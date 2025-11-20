// In this we are using the local storage to store the tasks
// local storage is a way to store data in the browser a way refresh the page when it is closed
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('taskInput');
  var addBtn = document.getElementById('addBtn');
  var list = document.getElementById('taskList');

  var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

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