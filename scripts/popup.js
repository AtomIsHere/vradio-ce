const joinButton = document.getElementById("join-button")
const joinCodeField = document.getElementById("join-code")

let joined = false

joinButton.addEventListener("click", function () {
    if(!joined) {
        chrome.runtime.sendMessage({ joinCode: joinCodeField.value })
    }
})