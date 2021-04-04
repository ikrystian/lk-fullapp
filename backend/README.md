Run backend with docker
./vendor/bin/sail up (with linux subsystem on windows)
./vendor/bin/sail shell - to go to console and install composer updates
set database connection and mail settings in .env file 
php artisan migrate 

Run frontend 
npm i
ng serve
