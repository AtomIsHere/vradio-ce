const WEB_SOCKET_SERVER = "http://127.0.0.1:8000"

let webSocket = null

fetch(WEB_SOCKET_SERVER + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ user_id: 1 })
}).then(res => res.json().then(ws => {
    let sock = new WebSocket(ws.url)

    sock.onmessage = (event) => {
        console.log(event.data)
    }

    webSocket = sock
}))

chrome.runtime.onMessage.addListener(message => {
    if(!Object.keys(message).includes("joinCode") || webSocket == null) {
        return
    }

    webSocket.send("join_station=" + message.joinCode)
})