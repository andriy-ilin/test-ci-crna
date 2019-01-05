#!/bin/sh

# Install watchman
git clone https://github.com/facebook/watchman.git
cd watchman
./autogen.sh
./configure
make
sudo make install
cd ..

# Watch del
watchman watch-del-all
