#!/usr/bin/env bash

set -m

LOCAL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOCAL_COMPOSER="$LOCAL_DIR/composer.phar"
HOST="localhost"
PORT="8056"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

function checkPhp {
  if ! hash php 2>/dev/null; then
    echo "It appears you don't have PHP installed. Please install PHP 5.5.9 or newer and try again."
    exit 1;
  fi

  PHP_VERSION_ID=$(php -r "echo PHP_VERSION_ID;")
  if ! [[ ${PHP_VERSION_ID} > 50509 ]] ; then
    echo "The installed version of PHP is not compatible with the Contentful PHP SDK. Please update to PHP 5.5.9 or newer and try again."
    exit 1;
  fi
}

function loadComposer {
  EXPECTED_SIGNATURE=$(php -r "echo file_get_contents('https://composer.github.io/installer.sig');")
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  ACTUAL_SIGNATURE=$(php -r "echo hash_file('SHA384', 'composer-setup.php');")
  if [[ ${EXPECTED_SIGNATURE} != ${ACTUAL_SIGNATURE} ]]
  then
    >&2 echo 'ERROR: Invalid composer installer signature. Please visit https://getcomposer.org and install it manually.'
    rm composer-setup.php
    exit 1
  fi

  php composer-setup.php
  RESULT=$?
  rm composer-setup.php
  if [[ ${RESULT} > 0 ]]
  then
    echo "Error trying to install composer. Please visit https://getcomposer.org and install it yourself."
    exit $RESULT
  fi
}
function checkOrLoadComposer {
  if ! hash composer 2>/dev/null; then
    if ! [ -f ${LOCAL_COMPOSER} ] ; then
      echo "No global composer found; installing locale composer."
      loadComposer
    fi
  fi
}

function installDependencies {
  if hash composer 2>/dev/null; then
    composer install --quiet
  elif [ -f ${LOCAL_COMPOSER} ] ; then
    echo  "using local composer"
    php ${LOCAL_COMPOSER} install --quiet
  else
    echo "Could not download a local copy of composer. Please visit https://getcomposer.org and install it yourself."
  fi
}

function openBrowser {
  if hash open 2>/dev/null; then
    open "http://${HOST}:${PORT}"
  else
    echo -e "${GREEN}Open your browser and navigate to http://${HOST}:${PORT}${NC}"
  fi
}

checkPhp
checkOrLoadComposer
installDependencies
command php -S "${HOST}:${PORT}" -t "${LOCAL_DIR}" > /dev/null &
openBrowser
echo -e "${RED}Press Ctrl-C to quit the server.${NC}"
fg > /dev/null
