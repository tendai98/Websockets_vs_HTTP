import asyncio
import websockets
import json

websocket_clients = {}

def bind_client(client_id, channel, websock):
	global websocket_clients
	websocket_clients.update({client_id: {'sock':websock, 'channel':channel}})
	print("[+] New Client ID -> {}".format(client_id))


async def forward_message(src_client_id, channel, message):
	global websocket_clients

	for client_id in websocket_clients:
		if (client_id != src_client_id and websocket_clients[client_id]['channel'] == channel):
			print("[+] Channel: {} <=> ( {} -> {} )".format(channel, src_client_id, client_id))
			await websocket_clients[client_id]['sock'].send(message)

# Define the WebSocket server functionality
async def server(websocket, path):
    try:

        # Start a loop to continuously receive and send messages
        while True:
            # Receive a message from the client
            message = await websocket.recv()
            msg_object = json.loads(message)

            if(msg_object['mode'] == 'SYNC'):
                bind_client(msg_object['src'], msg_object['channel'], websocket)
            else:
                await forward_message(msg_object['src'], msg_object['channel'], message)


    except websockets.exceptions.ConnectionClosedError:
        print("Connection Closed.")

# Start the WebSocket server
print("[+] Websocket Server : ONLINE")
start_server = websockets.serve(server, '0.0.0.0', 8765)

# Run the WebSocket server until manually stopped
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
