# Navigate to repository directory
Set-Location "C:\wamp64\www\Company-site"

# Safety: ensure no sensitive files are ever tracked
git rm --cached .env --ignore-unmatch 2>$null | Out-Null
git rm --cached .env.local --ignore-unmatch 2>$null | Out-Null
git rm --cached .env.production --ignore-unmatch 2>$null | Out-Null

# Initialize repo and set remote if this is the first time
if (-Not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/IMMANUEL1345/A.Elnerge.git
    Write-Host "Git initialized and remote set." -ForegroundColor Green
} else {
    git remote set-url origin https://github.com/IMMANUEL1345/A.Elnerge.git
}

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Changes detected, committing..." -ForegroundColor Yellow

    # Add all changes
    git add .

    # Double-check no .env files sneaked in
    $stagedEnv = git diff --cached --name-only | Select-String ".env"
    if ($stagedEnv) {
        Write-Host "WARNING: .env file detected in staging - unstaging..." -ForegroundColor Red
        git reset HEAD -- "*.env" 2>$null | Out-Null
    }

    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Deploy: A.Elnerge website - $timestamp"

    # Set branch to main and push
    git branch -M main
    git push origin main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Site pushed to GitHub successfully!" -ForegroundColor Green
        Write-Host "Vercel will auto-deploy in a few seconds." -ForegroundColor Cyan
        Write-Host "https://github.com/IMMANUEL1345/A.Elnerge" -ForegroundColor Cyan
    } else {
        Write-Host "Push failed. Check your GitHub authentication." -ForegroundColor Red
        Write-Host "Generate a token at: https://github.com/settings/tokens" -ForegroundColor Yellow
        Write-Host "Scopes needed: repo (full control)" -ForegroundColor Yellow
    }
} else {
    Write-Host "No changes to commit." -ForegroundColor Cyan
}