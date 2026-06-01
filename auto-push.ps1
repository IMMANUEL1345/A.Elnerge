# Navigate to repository directory
Set-Location "C:\wamp64\www\Company-site"

# Safety: ensure no sensitive files are ever tracked
git rm --cached .env --ignore-unmatch 2>$null | Out-Null
git rm --cached .env.local --ignore-unmatch 2>$null | Out-Null

# Initialize repo if first time
if (-Not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/IMMANUEL1345/A.Elnerge.git
    Write-Host "Git initialized." -ForegroundColor Green
} else {
    git remote set-url origin https://github.com/IMMANUEL1345/A.Elnerge.git
}

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Changes detected, committing..." -ForegroundColor Yellow
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Deploy: A.Elnerge website - $timestamp"
    git branch -M main
    git push origin main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Site pushed to GitHub successfully!" -ForegroundColor Green
        Write-Host "Vercel will auto-deploy in a few seconds." -ForegroundColor Cyan
        Write-Host "https://github.com/IMMANUEL1345/A.Elnerge" -ForegroundColor Cyan
    } else {
        Write-Host "Push failed. Check your GitHub authentication." -ForegroundColor Red
        Write-Host "Generate a token at: https://github.com/settings/tokens" -ForegroundColor Yellow
    }
} else {
    Write-Host "No changes to commit." -ForegroundColor Cyan
}