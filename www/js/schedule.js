
// Upload and preview timetable image 
      (function () {
        const fileInput = document.getElementById('timetableFile');
        const preview = document.getElementById('timetablePreview');
        const notice = document.getElementById('previewNotice');
        const useBtn = document.getElementById('useUploadedBtn');
        const removeBtn = document.getElementById('removeUploadedBtn');
//
        let currentObjectURL = null;

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
          if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
          currentObjectURL = url;
          const img = new Image();
          const MAX_DIM = 1080; // allowed maximum width and height in pixels
          img.onload = function () {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            if (w <= MAX_DIM && h <= MAX_DIM) {
              preview.src = url;
              preview.style.display = 'block';
              notice.style.display = 'none';
              useBtn.disabled = false;
              removeBtn.style.display = 'inline-block';
              notice.classList.remove('warning');
            } else {
              // image too large -- show warning (wont allow )
              preview.src = '';
              preview.style.display = 'none';
              notice.style.display = 'block';
              notice.classList.add('warning');
              notice.textContent = `Image is too large (${w}×${h}). Please upload an image with max 1080×1080.`;
              useBtn.disabled = true;
              removeBtn.style.display = 'inline-block';
              // free object URL
              if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
              currentObjectURL = null;
            }
          };
          img.onerror = function () {
            if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
            currentObjectURL = null;
            alert('Could not read the image. Try a different file.');
            fileInput.value = '';
            preview.style.display = 'none';
            notice.style.display = 'block';
            notice.textContent = 'No file chosen';
            useBtn.disabled = true;
            removeBtn.style.display = 'none';
          };
          img.src = url;
        });

        useBtn.addEventListener('click', () => {
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
          if (currentObjectURL) {
            URL.revokeObjectURL(currentObjectURL);
            currentObjectURL = null;
          }
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
