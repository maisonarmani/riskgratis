#Express - An extensible, minimalistic web framework for Node.js that deals with routing and templating
#pm2 - A production process manager that ensures your application stays running, and restarts it if stopped
#nginx - A HTTP and reverse proxy server great at serving static files, load balancing, and caching

npm install # to install all the required dependencies

# first of all install the production process manager
sudo npm install -g pm2
pm2 start ./bin/www.js # must be in the apps roots directory
pm2 startup # run this "sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u <current-user>"

# install nginx
ln -s <app-loc>/riskgratis/config/app.conf  /etc/nginx/conf.d/riskgratis.conf

