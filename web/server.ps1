param(
    [int]$Port = 8080
)

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
$listener.Start()

Write-Host "Server pornit: http://localhost:$Port/"
Write-Host "Dashboard: http://localhost:$Port/web/index.html"
Write-Host "Apasa Ctrl+C pentru oprire."

function Get-ContentType {
    param([string]$Path)

    switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
        ".html" { "text/html; charset=utf-8" }
        ".css" { "text/css; charset=utf-8" }
        ".js" { "application/javascript; charset=utf-8" }
        ".json" { "application/json; charset=utf-8" }
        default { "application/octet-stream" }
    }
}

function Send-Response {
    param(
        [System.IO.Stream]$Stream,
        [string]$Status,
        [string]$ContentType,
        [byte[]]$Body
    )

    $header = "HTTP/1.1 $Status`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)
    $Stream.Write($Body, 0, $Body.Length)
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()

        try {
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $requestLine = $reader.ReadLine()

            while (($line = $reader.ReadLine()) -ne $null -and $line -ne "") {}

            if (-not $requestLine -or -not $requestLine.StartsWith("GET ")) {
                $body = [System.Text.Encoding]::UTF8.GetBytes("405 Method Not Allowed")
                Send-Response $stream "405 Method Not Allowed" "text/plain; charset=utf-8" $body
                continue
            }

            $requestPath = $requestLine.Split(" ")[1].Split("?")[0].TrimStart("/")
            $requestPath = [Uri]::UnescapeDataString($requestPath)
            if ([string]::IsNullOrWhiteSpace($requestPath)) {
                $requestPath = "web/index.html"
            }

            $localPath = Join-Path $root $requestPath
            $resolvedPath = Resolve-Path $localPath -ErrorAction SilentlyContinue

            if ($resolvedPath -and $resolvedPath.Path.StartsWith($root.Path) -and (Test-Path $resolvedPath.Path -PathType Leaf)) {
                $bytes = [System.IO.File]::ReadAllBytes($resolvedPath.Path)
                Send-Response $stream "200 OK" (Get-ContentType $resolvedPath.Path) $bytes
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                Send-Response $stream "404 Not Found" "text/plain; charset=utf-8" $body
            }
        } finally {
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
