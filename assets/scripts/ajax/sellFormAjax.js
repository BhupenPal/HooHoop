const uploadForm = document.getElementById('uploadForm');
const videoFile = document.getElementById('ExteriorInp');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressBarText = document.getElementById('progress-bar-text');

uploadForm.addEventListener("submit", uploadData)

function uploadData(e){
    e.preventDefault();
    document.getElementById('uploadFormSubmit').disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/car-submit/submit', true);
    xhr.upload.addEventListener('progress', e => {
        const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
        progressBarFill.style.width = percent.toFixed(2) + "%";
        progressBarText.textContent = percent.toFixed(2) + "%";
        progressBarText.style.left = "60%"
    })

    xhr.addEventListener("load", function () {
        if (xhr.status == 200) {
            window.location.href = 'http://localhost:8080/my-ads'
        }
    });
    
    xhr.send(new FormData(uploadForm))
}

