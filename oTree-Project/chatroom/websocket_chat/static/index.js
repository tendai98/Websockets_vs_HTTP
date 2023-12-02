const clientId = window.location.href.split("/")[4]
const hostname = window.location.href.split("/")[2].split(':')[0]
const WEBSOCKET_PORT = 8765

const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const form = document.getElementById('form')

let ws = null

function openWebSocket(){
	ws = new WebSocket(`ws://${hostname}:${WEBSOCKET_PORT}`)
	let msg = {src:clientId, mode:"SYNC",  channel:"CHAT", data:""}

	ws.onopen = (ev) => {
		console.log("[+] Websock: SYNC")
		ws.send(JSON.stringify(msg))
		alert("Connected")
	}

	ws.onmessage = recvMessage
}

function sendMessage(){
	if(ws){
		let msg = {src:clientId, mode:"DATA", channel:"CHAT", data: messageInput.value}
		ws.send(JSON.stringify(msg))
		appendMessageChat("ME", msg.data)
		messageInput.value = ""
	}
}

function appendMessageChat(userId, message){
	messageContainer.innerHTML += `<p>${userId}:  ${message}</p`
}

form.addEventListener("keypress", function(event) {
	if(event.key === 'Enter'){
		sendMessage()
		event.preventDefault()
	}
});

function recvMessage(messageObject){
	let msg = JSON.parse(messageObject.data)
	appendMessageChat(msg.src, msg.data)
}

openWebSocket()
