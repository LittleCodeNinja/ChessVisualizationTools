const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    // readyState 4 means request completed, status 200 means request succesful
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
};

xhr.open('get', 'dummy.txt', true);
xhr.send();