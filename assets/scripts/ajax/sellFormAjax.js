const uploadForm = document.getElementById('uploadForm');
const videoFile = document.getElementById('ExteriorInp');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressBarText = document.getElementById('progress-bar-text');

uploadForm.addEventListener("submit", uploadData)

function uploadData(e){
    e.preventDefault();
    document.getElementById('uploadFormSubmit').disabled = true;
    let PlateCheck = document.getElementById('vinExchange').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/car-submit/submit', true);
    xhr.setRequestHeader('platecheck' , `${PlateCheck}`)
    xhr.upload.addEventListener('progress', e => {
        const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
        progressBarFill.style.width = percent.toFixed(2) + "%";
        progressBarText.textContent = percent.toFixed(2) + "%";
        progressBarText.style.left = "60%"
    })

    xhr.addEventListener("load", function () {
        document.body.style.cursor = "progress"
        if (xhr.status == 200) {
            if(xhr.response == "Done"){
                window.location.href = '/my-ads'
                document.body.style.cursor = "normal"
            } else {
                console.log('ERROR')
            }
        }
    });
    
    xhr.send(new FormData(uploadForm))
}

