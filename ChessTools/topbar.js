let loginbutton = ''

if (localStorage.getItem('loggedin') == true) loginbutton = `<button id="loginbutton" class="loginsysbutton">Login</button>`

document.write(`
<div id="open">
</div>

<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet">

<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nerko+One&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/styles.css">
<link rel="stylesheet" href="/css/chessboard.css">

<div>
    <h1>Chess Tools.</h1>

    ${loginbutton}
</div>
<hr>

<nav>
    <div>
        <a href="/">Home</a>
    </div>
    <div>
        <a href="/Chessboard">Chessboard Tools</a>
    </div>
</nav>
`)

setTimeout(function() {
    document.getElementById('open').setAttribute('class', 'starttrans')
}, 200)