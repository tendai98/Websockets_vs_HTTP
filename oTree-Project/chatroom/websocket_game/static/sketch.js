let canvas;

const clientId = window.location.href.split("/")[4]
const hostname = window.location.href.split("/")[2].split(':')[0]
const WEBSOCKET_PORT = 8765

const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const strokeWeightSlider = document.getElementById('strokeWeightSlider')
const colorPicker = document.getElementById('colorPicker')

let ws = null

/////////////////////////////////////// [Websocket functions] ///////////////////////////////////////////

function openWebSocket(){
	ws = new WebSocket(`ws://${hostname}:${WEBSOCKET_PORT}`)
	let msg = {src:clientId, channel:"SKETCH", mode:"SYNC", data:""}

	ws.onopen = (ev) => {
		console.log("[+] Websock: SYNC")
		ws.send(JSON.stringify(msg))
    alert("Client Connected")
	}

	ws.onmessage = recvMessage
}

function sendMessage(drawCoords){
	let msg = {src:clientId, mode:"DATA", channel:"SKETCH", data: drawCoords}
  if(ws){
	  ws.send(JSON.stringify(msg))
  }
}

function recvMessage(messageObject){
	let msg = JSON.parse(messageObject.data)
  let geo = msg.data
  line(geo.mX, geo.mY, geo.pX, geo.pY);
}

/////////////////////////////////////// [Websocket functions] ///////////////////////////////////////////

/////////////////////////////////////// [Drawing and Sketching Logic powered by p5.js] ///////////////////////////////////////////

function setup() {
  canvas = createCanvas(screen.width, screen.height/2);
  background(180);
}

function draw() {

  let strokeWeightValue = parseInt(strokeWeightSlider.value)
  let color = colorPicker.value

  stroke(`${color}`)
  strokeWeight(strokeWeightValue)
  if (mouseIsPressed) {
    sendMessage({mX: mouseX, mY: mouseY, pX: pmouseX, pY: pmouseY, stroke: color, strokeWeight: strokeWeightValue})
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function clearCanvas(){
  background(250);
}

/////////////////////////////////////// [Drawing and Sketching Logic powered by p5.js] ///////////////////////////////////////////
