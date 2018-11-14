FROM node:10

ENV DEBIAN_FRONTEND=noninteractive
COPY ranke.asc /
RUN echo "deb http://cran.stat.nus.edu.sg/bin/linux/debian jessie-cran35/" >> /etc/apt/sources.list
RUN apt-key add ranke.asc
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    build-essential \
    libcurl4-gnutls-dev \
    libxml2-dev \
    libssl-dev \
    r-base \
    pandoc

RUN R -e "install.packages('devtools', repos = 'http://cran.stat.nus.edu.sg')"
RUN R -e "install.packages('networkD3', repos = 'http://cran.stat.nus.edu.sg')"
RUN R -e "devtools::install_github('fbreitwieser/sankeyD3')"



ARG UNAME=testuser
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
WORKDIR /home/$UNAME/

COPY krakenSankey.R ./
COPY package.json ./
COPY node.js ./
COPY runDocker.js ./

EXPOSE 80/tcp
