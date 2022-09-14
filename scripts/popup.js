const joinButton = document.getElementById("join-button")
const joinCodeField = document.getElementById("join-code")

let joined = false

// Listen to when the user clicks the join button
joinButton.addEventListener("click", function () {
    // Check if user already joined a station
    if(!joined) {
        // Send message to background script containing the join code
        chrome.runtime.sendMessage({ joinCode: joinCodeField.value })
        // Set variable to indicate user has joined the station
        joined = true
    }
})