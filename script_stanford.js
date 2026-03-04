document.addEventListener('DOMContentLoaded', () => {
	console.log('tigerspend++ loaded');

	const uploadText = document.getElementById('uploadText');
	const csvInput = document.getElementById('csvInput');
	const fileListContainer = document.getElementById('fileListContainer');
	const fileList = document.getElementById('fileList');
	const viewStatsContainer = document.getElementById('viewStatsContainer');
	const uploadAnotherBtn = document.getElementById('uploadAnotherBtn');
	const viewStatsBtn = document.getElementById('viewStatsBtn');

	// maintain a list of files to upload
	let fileQueue = [];

	// render the file list UI
	function renderFileList() {
		fileList.innerHTML = '';
		if (fileQueue.length === 0) {
			fileListContainer.style.display = 'none';
			viewStatsContainer.style.display = 'none';
			return;
		}

		fileListContainer.style.display = 'block';
		viewStatsContainer.style.display = 'block';

		fileQueue.forEach((file, index) => {
			const item = document.createElement('div');
			item.className = 'file-list-item';
			item.innerHTML = `
				<span class="file-name">${file.name}</span>
				<button class="remove-file-btn" data-index="${index}">Remove</button>
			`;
			fileList.appendChild(item);
		});

		// attach remove event listeners
		document.querySelectorAll('.remove-file-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const index = parseInt(e.target.dataset.index, 10);
				fileQueue.splice(index, 1);
				renderFileList();
			});
		});
	}

	// combine all files in queue into a single CSV text
	function combineFiles() {
		return new Promise((resolve) => {
			let combinedText = '';
			let filesProcessed = 0;

			fileQueue.forEach((file, index) => {
				const reader = new FileReader();
				reader.onload = (ev) => {
					const text = ev.target.result;
					// skip header for subsequent files
					if (index > 0) {
						const lines = text.split(/\r?\n/);
						combinedText += '\n' + lines.slice(1).join('\n');
					} else {
						combinedText = text;
					}
					filesProcessed++;

					if (filesProcessed === fileQueue.length) {
						resolve(combinedText);
					}
				};
				reader.readAsText(file);
			});
		});
	}

	if (uploadText && csvInput) {
		uploadText.addEventListener('click', () => csvInput.click());

		csvInput.addEventListener('change', (e) => {
			const files = e.target.files;
			if (!files || files.length === 0) return;

			// add new files to queue
			fileQueue.push(...Array.from(files));
			renderFileList();

			// reset input so the same file can be selected again
			csvInput.value = '';
		});
	}

	// handle Upload Another button click
	if (uploadAnotherBtn) {
		uploadAnotherBtn.addEventListener('click', () => csvInput.click());
	}

	// handle View Statistics button click
	if (viewStatsBtn) {
		viewStatsBtn.addEventListener('click', async () => {
			// combine all files
			const combinedText = await combineFiles();

			// expose for other scripts
			window.uploadedCSVFiles = fileQueue;
			window.uploadedCSVText = combinedText;

			try {
				sessionStorage.setItem('uploadedCSVText', combinedText);
			} catch (err) {
				console.warn('Could not save CSV to sessionStorage:', err);
			}

			// remember how many files were combined so the stats page can report it
			try {
				sessionStorage.setItem('uploadedCSVFileCount', String(fileQueue.length));
			} catch (err) {
				console.warn('Could not save uploadedCSVFileCount to sessionStorage:', err);
			}

			// dispatch event
			const event = new CustomEvent('csv:loaded', { detail: { files: fileQueue, text: combinedText } });
			window.dispatchEvent(event);
			console.log('CSV loaded, bytes:', combinedText.length);

			// navigate
			try {
				window.location.href = 'dining_stanford.html';
			} catch (err) {
				console.warn('Navigation to dining_stanford.html failed:', err);
			}
		});
	}
});
