param([string]$Name)
$markdown = Get-Content -ReadCount 0 -Path ".\in\$Name.md"
$title = $markdown[0] -Split "# "
$title = $title[1]
$content = "yap"
echo $title




$template = "<!DOCTYPE html><html><head><title>$title</title><link rel = 'stylesheet' href = 'style.css' /><script src = 'script.js'></script><meta name='viewport' content='width=device-width, initial-scale=1' /><title>$title</title></head><body id = 'body' class = 'css light' onload = 'checkPreferences()'><a href = 'index.html'>Home</a><button id = 'css-toggle' onclick = 'toggleReadability()'>this is unreadable</button><button id = 'darkmode-toggle' onclick = 'toggleDarkMode()'>MY EYES</button><div id = 'content'>$content</div></body></html>"
echo $template > "out/$Name.html"
