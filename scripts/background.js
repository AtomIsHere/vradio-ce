const WEB_SOCKET_SERVER = "http://127.0.0.1:8000"

// Placeholder websocket variable
let webSocket = null

// Establish a websocket client
fetch(WEB_SOCKET_SERVER + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ user_id: 1 })
}).then(res => res.json().then(ws => {
    // Establish connection to the websocket through the URL in the register endpoint
    let sock = new WebSocket(ws.url)

    // Add a listener which prints everything received from websocket into the console
    sock.onmessage = (event) => {
        console.log(event.data)
    }

    // Set the websocket variable
    webSocket = sock
}))

chrome.runtime.onMessage.addListener(message => {
    // Return if the message is not a join message or web socket connection has not been established
    if(!Object.keys(message).includes("joinCode") || webSocket == null) {
        return
    }

    // Send join request to websocket
    webSocket.send("join_station=" + message.joinCode)
})