Pour pouvoir travailler sur le projet il faut:
installer node js version: 6.11.3 ou 6.11.4

installer angular:
    npm install -g @angular/cli

installer mongoDb:
    info:
        avant de lancer mongo il faut créer le dossier: C:\data\db
        ensuite aller dans les dosseri d'installation de mongoDb dans le dossier bin et lancer mongod.exe

installer les dependances du projet:
     - aller dans le dossier du projet puis faire npm install
     - aller dans le dossier Application/angular-app et faire npm install


pour rafraichir l'app angular apres modification et avant de lancer le serveur il faut faire dans le dossier Application/angular-app:
    ng build
pour lancer le serveur node js du projet il suffit d'aller dans le dossier du projet puis:
    node Application/bin/www

pour acceder au site:
    http://localhost::3000

tuto:
 https://www.supinfo.com/articles/single/4571-todo-app-une-introduction-au-mean-stack-mongodb-express-angular-2-nodejs