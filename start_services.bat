@echo off
echo Iniciando microservicios...

start cmd /k "cd services/api-gateway && npm start"
start cmd /k "cd services/semantic && npm start"
start cmd /k "cd services/risk && npm start"
start cmd /k "cd services/cipher && npm start"
start cmd /k "cd services/decipher && npm start"
start cmd /k "cd services/logging && npm start"

echo Todos los servicios están ejecutándose.
pause
