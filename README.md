# ng4-flickr-search

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

`ng n ng4-flickr-search --routing --style scss`

## Steps to run

prepare enviroment `npm install`
local run `ng serve`

## CI tool
This project is originally created in BitBucket, it's using BitBucket Pipeline to build/deploy to Heroku.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Setup/Run instance in EC2

Create instance in EC2


# SSH client - commands

192-168-1-2:angular4 JWK$ chmod 400 ng4-test.pem
192-168-1-2:angular4 JWK$ ssh -i "ng4-test.pem" 

ubuntu@ip-172-31-3-45:~$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
ubuntu@ip-172-31-3-45:~$ sudo apt-get install -y nodejs
ubuntu@ip-172-31-3-45:~$ sudo apt-get install git
ubuntu@ip-172-31-3-45:~$ git clone https://github.com/ampboris/ng4-flickr-search.git
ubuntu@ip-172-31-3-45:~$ cd ng4-flickr-search
ubuntu@ip-172-31-3-45:~/ng4-flickr-search$ npm install
ubuntu@ip-172-31-3-45:~/ng4-flickr-search$ npm npm install node-sass
ubuntu@ip-172-31-3-45:~/ng4-flickr-search$ npm run postinstall
ubuntu@ip-172-31-3-45:~/ng4-flickr-search$ node server

ubuntu@ip-172-31-10-57:~$ sudo npm install pm2 -g
ubuntu@ip-172-31-10-57:~/ng4-flickr-search$ pm2 start server.js

Production Process Manager for Node.js apps
                     with a built-in Load Balancer.


                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io
