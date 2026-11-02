@echo off
cd /d "C:\Users\MyBook PRO K7\Documents\Preloved"

git init
git config user.name Olivernoeru
git config user.email olivernoeru@example.com
git remote add origin https://github.com/Olivernoeru/ARCHIVE-01.git

:: Remove embedded git repo from frontend
if exist frontend\.git rm -rf frontend\.git

:: Add all files to staging
git add --all

:: Show status
git status