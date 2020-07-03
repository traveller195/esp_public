 #14.06.2020, 17:11 Uhr
#dieses Dockerfile baut einen individuellen Node.JS, der fuer mich zum Programmieren gut geeignet ist
#evt den Pfad zu der requirements-txt als ARGUMENT uebergeben? oder mit COPY alle Dateien aus aktuellem Verzeichnis inkl. requirements-txt kopieren

#see https://kis5.geoinformation.htw-dresden.de/gitlab/gi/es-project-template


FROM ubuntu:latest
#ubuntu is required!
#eventuell anstelle ubuntu ein alpine linux verwenden, da es nur 5MB an Speicher braucht

LABEL version="1.0" maintainer="Theodor Rieche <test@test.com>"

#how could I improve labelling also for columns TAG and REPOSITORY in list of "sudo docker images"?

#++++++++++ install nodejs ++++++++++

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm

#++++++++++ ES project template einrichten , siehe Link auf kis5.server ++++++++++


# das Template mit allen Verzeichnissen und Daten importieren!



RUN mkdir /code

#copy all files from current dir to /code within container
COPY . /code

#working directory
WORKDIR /code

RUN npm install -g npm@latest

#Starten des Development-Servers
#RUN npm run-script start

#Linten des Quellcodes
#RUN npm run-script lint

#Erstellen eines Production-Builds
#RUN npm run-script build


#++++++++++++++++++++++++++++++++++
# ol bootstrap es-abstract framework7 jquery bundle
RUN npm install -y jquery && npm install -y popper.js@1.16.0 && npm install -y ol && npm install -y bootstrap && npm install -y framework7 && npm install -y npm-bundle

#++++++++++install required modules for Node JS programming. read from textfile++++++++++

#++++++++++ structure of image / container’s file system ++++++++++	
	



#VOLUME /code



#EXPOSE 8888

# an USER denken, damit später nicht root rechte genutzt werden
# spaeter dann gleich mit COPY oder ADD alle SourceCode-Dateien beim Erstellen in den Container kopieren... .dockerignore nutzen

# !!!!!!!!am Ende den Container noch mit sudo docker start  starten ?
# wie kann man ihn sofort auf "Up" setzen, nicht dass er gleich "Exited" ist


