"use strict";

const MAX_SAMPLE_COUNT = 100

var globalTimer = 0;
var delay = 0;
var isConnected = false
var isDataSampleBufferLocked = false

var deltaTimeSampler = []
var connection = new signalR.HubConnectionBuilder().withUrl("/time").build();

connection.start().then(function () {
    isConnected = true
    console.log("[+] Connected")
}).catch(function (err) {
    return console.error(err.toString());
});


connection.on("Time", function (timer) {
    globalTimer = timer
    let timeDelta = millis() - delay;

    if(!isDataSampleBufferLocked){
        if(deltaTimeSampler.length < MAX_SAMPLE_COUNT){
            deltaTimeSampler.push(timeDelta)
        }
    }
    
    // Shader Redner Update Code
    shaderObject.setUniform("resolution", [float(CUSTOM_WIDTH), float(CUSTOM_HEIGHT)]);
    shaderObject.setUniform("time", (globalTimer));
    rect(0, 0, CUSTOM_WIDTH, CUSTOM_HEIGHT);
    // Shader Redner Update Code
    
});

function updateTimer(){
    if(isConnected){
        delay = millis();
        connection.invoke("ComputeTime", (millis() / 1000.0)).catch(function (err) {
            return console.error(err.toString());
        });
    }
}

function updateProfileChart(){
    if(deltaTimeSampler.length == MAX_SAMPLE_COUNT){
        isDataSampleBufferLocked = true
        updateChart(deltaTimeSampler)
        isDataSampleBufferLocked = false
        deltaTimeSampler = []
    }
}

setInterval(updateProfileChart, 2000)
setInterval(updateTimer, 10)