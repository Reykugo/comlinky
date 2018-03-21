Pour pouvoir travailler sur le projet il faut:
installer node js version: 6.11.3 ou 6.11.4

installer angular:
    npm install -g @angular/cli

installer mongoDb:
    info:
        avant de lancer mongo il faut créer le dossier: C:\data\db
        ensuite aller dans les dossier d'installation de mongoDb dans le dossier bin et lancer mongod.exe

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

Architecture:
    angular-app:
        actuellement l'architecture est conçu de cette maniere:
            Nb: la quasi totalité du code va se retrouvé dans le dossier src/app:
             - la communication avec le serveur node se fait via les services. (voir src/app/services/user.service.ts)
             - le component html de base est dans le fichier src/app/app.component.html
             - le controller de base est dans le fichier src/app.component.ts
        Vous pouvez refactor à votre guise ces fichiers mais il est préferable de garder ce schéma pour chaque module

    node js:
        - le fichier servers.js est le serveur lui meme, il se charge la comunication avec la bdd et de donenr acces a l'angular app
        - les models de bases de données se trouve dans le dossier model (voir models/Users.js)
        - le dossier api:
            - le fichier index.js sert a créer les routes pour les modules d'api
            - les modeules api se chargent d'executer le process adapté en fonction du type de requete (voir api/user.js)
        
