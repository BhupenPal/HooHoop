let front = `/assets/Uploads/MRL932/interior/interiorFront.JPG`;
let middle = `/assets/Uploads/MRL932/interior/interiorMiddle.JPG`;
let rear = `/assets/Uploads/MRL932/interior/interiorRear.JPG`;

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

front = doesFileExist(front)
console.log(front)

middle = doesFileExist(middle)
console.log(middle)

rear = doesFileExist(rear)
console.log(rear)