//
      (function () {
        const fileInput = document.getElementById('timetableFile');
        const preview = document.getElementById('timetablePreview');
        const notice = document.getElementById('previewNotice');
        const useBtn = document.getElementById('useUploadedBtn');
        const removeBtn = document.getElementById('removeUploadedBtn');
//
        fileInput.addEventListener('change', () => {
          const file = fileInput.files && fileInput.files[0];
          if (!file) {
            preview.style.display = 'none';
            notice.style.display = 'block';
            notice.textContent = 'No file chosen';
            useBtn.disabled = true;
            removeBtn.style.display = 'none';
            return;
          }

          const valid = /^(image\/(jpeg|png))$/.test(file.type) || /\.(jpe?g|png)$/i.test(file.name);
          if (!valid) {
            alert('Please upload a JPG or PNG image.');
            fileInput.value = '';
            return;
          }

          const url = URL.createObjectURL(file);
          preview.src = url;
          preview.style.display = 'block';
          notice.style.display = 'none';
          useBtn.disabled = false;
          removeBtn.style.display = 'inline-block';
        });

        useBtn.addEventListener('click', () => {
          // Hide table and show the uploaded image below the upload area
          const table = document.getElementById('timetable');
          if (table) table.style.display = 'none';

          let inserted = document.getElementById('uploadedTimetable');
          if (!inserted) {
            inserted = document.createElement('img');
            inserted.id = 'uploadedTimetable';
            inserted.style.maxWidth = '100%';
            inserted.style.marginTop = '1rem';
            preview.parentNode.appendChild(inserted);
          }
          inserted.src = preview.src;
        });

        removeBtn.addEventListener('click', () => {
          fileInput.value = '';
          preview.src = '';
          preview.style.display = 'none';
          notice.style.display = 'block';
          notice.textContent = 'No file chosen';
          useBtn.disabled = true;
          removeBtn.style.display = 'none';

          const inserted = document.getElementById('uploadedTimetable');
          if (inserted) inserted.remove();

          const table = document.getElementById('timetable');
          if (table) table.style.display = '';
        });
      })();
//
