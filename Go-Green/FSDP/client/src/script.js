document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    displayMessage(userInput, 'user');
    processInput(userInput);
    document.getElementById('userInput').value = '';
});

function displayMessage(message, sender) {
    const messageArea = document.getElementById('messageArea');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = message;
    messageArea.appendChild(msgDiv);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function processInput(input) {
    fetch(`/api/game/part/${input}`)
        .then(response => response.json())
        .then(part => {
            displayMessage(part.content, 'system');
            if (part.nextPartId) {
                displayMessage(`Type ${part.nextPartId} to continue...`, 'system');
            } else {
                displayMessage('End of story.', 'system');
            }
        })
        .catch(err => console.error('Error:', err));
}
