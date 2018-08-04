# Meal Prep
A website to plan out meals with premade or custom recipes. Recipes can be catalogued using a database of ingredients and custom instructions. 

#### Setup:
1. Install dependencies with `npm install`
2. Build the client `cd client && npm install && npm run build`
3. Start the server: `npm start`

#### Development
1. `npm run dev` from root to start back end development.
2. `npm start` from /client to start front end development.

## Issues and solutions
During development errors may arise from your system's maximum allotment of file watchers has been reached or exceeded. 
Solution:
In the terminal type `cat /proc/sys/fs/inotify/max_user_watches` if the outputted value is less than 524288 follow these steps to increase the number of available watchers. 

Open configuration for max user watches(and more) located at.
`/etc/sysctl.conf`
Set max watches to maximum value by adding this line to the end of the config file.
`fs.inotify.max_user_watches=524288`