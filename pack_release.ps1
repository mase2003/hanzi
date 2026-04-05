# 生成可上传服务器的 zip（在项目根目录执行）
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$zipName = "hanzi-gesture-app.zip"
$zipPath = Join-Path $root $zipName

$items = @(
    "app.py",
    "requirements.txt",
    "README.md",
    ".env.example",
    "static",
    "templates",
    "assets"
)
$missing = @()
foreach ($name in $items) {
    if (-not (Test-Path (Join-Path $root $name))) { $missing += $name }
}
if ($missing.Count -gt 0) {
    Write-Error "缺少: $($missing -join ', ')"
}

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path ($items | ForEach-Object { Join-Path $root $_ }) -DestinationPath $zipPath -CompressionLevel Optimal
Write-Host "已生成: $zipPath"
