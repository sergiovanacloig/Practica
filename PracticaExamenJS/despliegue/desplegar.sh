#/bin/bash
cd ..
cd ..
cp -r PracticaExamenJS/ ../www
cd PracticaExamenJS
cp -r database/ ../../database
cd ..
cd ..
mkdir mysql
docker run -d -p 80:80 --net=red_docker --ip 192.168.1.111 --name mierder -v /opt/mierder/html:/var/www/html nimmis/apache-php7
docker run -d -p 3306:3306 --net=red_docker --ip 192.168.1.121 --name mysql_mierder -v /opt/mierder/sql/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -v /opt/mierder/database:/database mysql
docker exec -t mysql_mierder /bin/bash /database/import.sh
