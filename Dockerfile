FROM node:10-stretch
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y dirmngr --install-recommends
RUN apt-get install -y software-properties-common
RUN apt-get install -y curl apt-transport-https
RUN apt-get update && apt-get upgrade -y
COPY ranke.asc / 
RUN apt-key add ranke.asc
RUN echo "deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/" >> /etc/apt/sources.list
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    build-essential \
    libcurl4-gnutls-dev \
    libxml2-dev \
    libssl-dev \
    r-base \
    pandoc

RUN R -e "install.packages('devtools', repos = 'http://cran.stat.nus.edu.sg')"
RUN R -e "install.packages('plyr', repos = 'http://cran.stat.nus.edu.sg')"
RUN R -e "install.packages('networkD3', repos = 'http://cran.stat.nus.edu.sg')"
RUN R -e "devtools::install_github('fbreitwieser/sankeyD3')"

ARG UNAME=testuser
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
WORKDIR /home/$UNAME/
RUN mkdir view

COPY krakenSankey.R ./
COPY package.json ./
COPY node.js ./
COPY runSankey.js ./
COPY removeFile.js ./
COPY index.html ./view/
COPY about.html ./view/

RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "node.js"]

