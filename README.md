## A Savoir
[Variable d'environnement]

La mise en production n'a pas été réalisée efficacement, ce qui a entraîné l'apparition de nombreuses erreurs. Pour cette raison, l'application devra être testée en local.
## Commandes
[Clone Symfony]
```
https://github.com/theomgrn/WRA506-Symfony.git
git@github.com:theomgrn/WRA506-Symfony.git
```
[Clone Vue]
```
VITE_API_URI=http://localhost:8888/WRA506-Symfony/public/index.php/api/
VITE_UPLOADS_URI=http://localhost:8888/WRA506-Symfony/public/uploads/
```
[Génération des clés JWT]
```
php bin/console lexik:jwt:generate-keypair
```
[Créer la base de donnée - Mise à jour]
```
php bin/console d:d:c
php bin/console d:s:u -f
```
[Mise en place des fixtures]
```
php bin/console d:f:l
```

## Aide
[Variable d'environnement] 
```
VITE_API_URI=http://localhost:8888/WRA506-Symfony/public/index.php/api/
VITE_UPLOADS_URI=http://localhost:8888/WRA506-Symfony/public/uploads/
```

[Compte ADMIN pour effectuer les reqête API] 

Aucune page a part celle du login n'est visible ou accessible avant la connexion de l'utilisateur
```
username: user@mail.com
password: test
```