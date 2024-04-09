# F526Bus-WebHook-withLineBot

## Introduction
This project utilizes a Line bot to retrieve the arrival time of buses at a specified bus stop. Input any text to receive the estimated bus arrival times for the bus stop located downstairs from my home.

### Modify Line Bot Channel Access Token in 'src/index.js'

### Install Wrangler
```
$ npm install wrangler --save-dev
```

## Deployment on Cloudflare Workers
```
$ wrangler deploy
```

## Demo
This demo illustrates how to use the tool to retrieve the bus arrival times for the bus stop located downstairs from my home. Simply input any text to trigger the request.
![image](https://github.com/jason61306/F526Bus-WebHook-withLineBot/blob/master/demo.gif)
