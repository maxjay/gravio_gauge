# Gravio Gauge

The Gravio Gauge can show sensor data from physical motion, magnet contact, button or Gravio Software Sesors in a HTML based gauge. A typical example would be that a camera software sensor would count the amount of people in a picture via Gravio and then passes that information on to this gauge.

![](gravio_gauge.gif)

# Prerequisites
- You will need Gravio (www.gravio.com) for this to work.
- Gravio needs to be in the same network so this gauge can pull the information from there frequently
- You need to ensure that the browser can request the data from the server. For Firefox, please download: https://addons.mozilla.org/en-GB/firefox/addon/cors-everywhere/ , for Chrome, please use this extension: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en
- 

# Installation

Follow these simple steps to create a gauge that shows the occupancy of a space using your built-in or USB camera.

- visit http://www.gravio.com and download the Gravio Studio app for your platform (either Windows, Mac or iOS) from your respective app store
- open the app, create a Gravio account and log in
- also download the Gravio Server for your platform (Windows, macOS or Linux) and install it on your machine according to https://doc.gravio.com/manuals/gravio-setup-guide/1/en/topic/installation-and-setup
- Open Gravio Studio, connect to your edge server and create an Area/Layer with the USBCamera Sensor
- Enable the sensor and set the "Number of People" inference
- Remember the IP address of your Gravio Server
- Clone this repository and open the index.html file in a browser that has the CORS plugin installed (see above)
- enter the URL https://IPOFYOURSERVER:29444/gappapi
- accept the security notice so the browser remembers it's ok that the ssl cert is self signed
- open the main.js file and the IP in ```gravioServer``` to match your Gravio's server
- comment out ```recentValue = Math.floor(Math.random()*500)+1``` to remove the "demo"
- adjust your gauge's parameters
- adjust the design as you desire


If you want hardware sensors:

- Sign up for Gravio basic from within the application (price will be displayed upon purchase)
- You can then order your sensors by going to your profile (little person icon on the top right on gravio.com) and logging in with your Gravio account
- They will send you the sensors after you have ordered them


