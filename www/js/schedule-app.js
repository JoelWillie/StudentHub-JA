// Add functionality to use forms to add and update schedule items by saving it to the local storage that use created
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('scheduleForm');
  const itemsList = document.getElementById('scheduleItems');

  let items = JSON.parse(localStorage.getItem('scheduleItems') || '[]');

  function render() {
    itemsList.innerHTML = '';
    if (items.length === 0) {
      itemsList.innerHTML = '<li>No scheduled items yet.</li>';
      return;
    }

    items.forEach(function (it, idx) {
      var li = document.createElement('li');
      li.className = 'schedule-item';

      var header = document.createElement('div');
      header.className = 'si-header';
      header.textContent = it.course + ' — ' + it.date + ' ' + (it.time || '');

      var notes = document.createElement('div');
      notes.className = 'si-notes';
      notes.textContent = it.notes || '';

      var actions = document.createElement('div');
      actions.className = 'si-actions';

      var edit = document.createElement('button');
      edit.textContent = 'Edit';
      edit.addEventListener('click', function () {
        populateFormForEdit(idx);
      });

      var del = document.createElement('button');
      del.textContent = 'Delete';
      del.addEventListener('click', function () {
        if (!confirm('Delete this schedule item?')) return;
        items.splice(idx, 1);
        saveAndRender();
      });

      actions.appendChild(edit);
      actions.appendChild(del);

      li.appendChild(header);
      if (it.notes) li.appendChild(notes);
      li.appendChild(actions);

      itemsList.appendChild(li);
    });
  }

  function saveAndRender() {
    localStorage.setItem('scheduleItems', JSON.stringify(items));
    render();
  }

  function populateFormForEdit(idx) {
    const it = items[idx];
    document.getElementById('course').value = it.course;
    document.getElementById('date').value = it.date;
    document.getElementById('time').value = it.time || '';
    document.getElementById('notes').value = it.notes || '';
    // store index to form dataset for update
    form.dataset.editIndex = idx;
    document.getElementById('addScheduleBtn').textContent = 'Save';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const course = document.getElementById('course').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value.trim();

    if (!course || !date) return;

    if (form.dataset.editIndex !== undefined) {
      const idx = parseInt(form.dataset.editIndex, 10);
      items[idx] = { course: course, date: date, time: time, notes: notes };
      delete form.dataset.editIndex;
      document.getElementById('addScheduleBtn').textContent = 'Add to Schedule';
    } else {
      items.push({ course: course, date: date, time: time, notes: notes });
    }

    form.reset();
    saveAndRender();
  });

  render();
});
