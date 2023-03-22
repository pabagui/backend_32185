ejecutar app en src/index.js


0. PARA DESAFIO 15
* En config.js descomentar PORT para PM2 y comentar PORT original
* Para iniciar pm2: pm2 start index.js

1. MODO FORK
* pm2 start index.js --name="ServerX" --watch -- PORT
* pm2 start index.js --name="Server1" --watch -- 8081
* pm2 start index.js --name="Server2" --watch -- 8082
* pm2 start index.js --name="Server3" --watch -- 8083
* pm2 start index.js --name="Server4" --watch -- 8084
* pm2 start index.js --name="Server5" --watch -- 8085

2. MODO CLUSTER
* pm2 start index.js --name="ServerX" --watch -i max -- PORT
* pm2 start index.js --name="Server1" --watch -i max -- 8081
* pm2 start index.js --name="Server2" --watch -i max -- 8082
* pm2 start index.js --name="Server3" --watch -i max -- 8083
* pm2 start index.js --name="Server4" --watch -i max -- 8084
* pm2 start index.js --name="Server5" --watch -i max -- 8085

3. DETENER TODO
* pm2 delete all