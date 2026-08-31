param(
  [string]$ProjectDir,
  [string]$ArchivePath
)

$dist = Join-Path $ProjectDir 'dist'
$hosting = Join-Path $ProjectDir '.openai/hosting.json'
$stage = Join-Path $ProjectDir '.site-stage'

if (Test-Path $stage) {
  Remove-Item $stage -Recurse -Force
}

New-Item -ItemType Directory -Force -Path (Join-Path $stage 'dist/.openai') | Out-Null
Copy-Item -Path (Join-Path $dist '*') -Destination (Join-Path $stage 'dist') -Recurse -Force
Copy-Item -Path $hosting -Destination (Join-Path $stage 'dist/.openai/hosting.json') -Force

if (Test-Path $ArchivePath) {
  Remove-Item $ArchivePath -Force
}

tar -czf $ArchivePath -C $stage dist

Remove-Item $stage -Recurse -Force
