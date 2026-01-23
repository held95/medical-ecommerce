@echo off
REM Script para fazer push para o GitHub no Windows
REM Substitua SEU-USUARIO pelo seu username do GitHub

echo ========================================
echo  Push para GitHub - MediShop
echo ========================================
echo.

set /p REPO_URL="Digite a URL do repositorio (ex: https://github.com/SEU-USUARIO/medical-ecommerce.git): "

echo.
echo Conectando ao repositorio...
git remote add origin %REPO_URL%

echo.
echo Fazendo push para o GitHub...
git push -u origin master

echo.
echo ========================================
echo  Push concluido!
echo ========================================
echo.
echo Acesse https://vercel.com para fazer deploy
echo.
pause
