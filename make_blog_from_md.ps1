param([string]$Name)
$markdown = Get-Content -ReadCount 0 -Path ".\in\$Name.md"
$title = $markdown[0] -Split "# "
$title = $title[1]
$content = $markdown[1..($markdown.length - 1)]
$end_content = ""
$in_ul = false
$in_ol = false
echo $title
for ($i = 0; $i -lt $content.length; $i++) {
    $line = $content[$i].ToCharArray()
    $test_char = $line[0]
    switch ($test_char) {
        "#" {
            $header_level = "1"
            $n = 0
            while ($test_char -eq "#") {
                $test_char = $line[$n]
                $header_level++
                $n++
            }
            $content_to_show = $line[($header_level + 1)..($line.length - 1)]
            $end_content = $end_content + "<h$header_level>"

        }
        ""
    }
}



$template = "<!DOCTYPE html><html><head><title>$title</title><link rel = 'stylesheet' href = 'style.css' /><script src = 'script.js'></script><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body id = 'body' class = 'css light' onload = 'checkPreferences()'><a href = 'index.html'>Home</a><button id = 'css-toggle' onclick = 'toggleReadability()'>this is unreadable</button><button id = 'darkmode-toggle' onclick = 'toggleDarkMode()'>MY EYES</button><div id = 'content'>$end_content</div></body></html>"
echo $template > "out/$Name.html"
