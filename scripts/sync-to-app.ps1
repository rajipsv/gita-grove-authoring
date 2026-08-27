# Sync Grove authoring content -> littleepicminds app repo (feature/gita-grove).
# Authoring tooling (grove-manuscript, grove-kdp, export scripts) stays in this repo only.
param(
    [string]$AppRepo = "$env:USERPROFILE\Projects\littleepicminds"
)

$Root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path $AppRepo)) {
    Write-Error "App repo not found: $AppRepo. Set -AppRepo path."
    exit 1
}

# Content the app / curriculum consumers need - NOT KDP export scripts.
$Pairs = @(
    @("$Root\docs\gita-grove-capabilities.md", "$AppRepo\docs\gita-grove-capabilities.md"),
    @("$Root\docs\gita-grove-series-v2.md", "$AppRepo\docs\gita-grove-series-v2.md"),
    @("$Root\docs\character-bible.md", "$AppRepo\docs\character-bible.md"),
    @("$Root\docs\universe-bible.md", "$AppRepo\docs\universe-bible.md"),
    @("$Root\docs\book-format-spec.md", "$AppRepo\docs\book-format-spec.md"),
    @("$Root\docs\books", "$AppRepo\docs\books"),
    @("$Root\scripts\data\gita-grove-curriculum.json", "$AppRepo\scripts\data\gita-grove-curriculum.json")
)

Write-Host "Syncing content from gita-grove-authoring -> littleepicminds"
Write-Host "(docs, books, *.story.json, curriculum only - no export scripts)"
Write-Host ""

foreach ($pair in $Pairs) {
    $src, $dst = $pair
    if (-not (Test-Path $src)) { Write-Warning "Skip missing: $src"; continue }
    $dstDir = Split-Path -Parent $dst
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Force -Path $dstDir | Out-Null }
    Copy-Item -Path $src -Destination $dst -Recurse -Force
    Write-Host "Copied $src -> $dst"
}

Write-Host ""
Write-Host "Done. Review git diff in $AppRepo (branch: feature/gita-grove)."
Write-Host "Author here: npm run grove:validate / grove:compile / grove:export-kdp"
