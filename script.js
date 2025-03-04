function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
    let chatbox = document.getElementById("chatbox");

    let userMessage = document.createElement("p");
    userMessage.textContent = "You: " + userInput;
    chatbox.appendChild(userMessage);

    let botResponse = document.createElement("p");
    botResponse.textContent = "BreathEase: " + getBotResponse(userInput);
    chatbox.appendChild(botResponse);

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes("meditation")) {
        return "Let's begin a 5-minute guided meditation. Close your eyes and take a deep breath...";
    } else if (input.includes("breathing")) {
        return "Try this: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat 5 times.";
    } else if (input.includes("mood")) {
        return "How are you feeling today? Happy, sad, or neutral?";
    } else {
        return "I'm here to help with meditation, breathing exercises, and mood tracking. How can I assist you?";
    }
}