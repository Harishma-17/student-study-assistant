async function sendMessage() {

    const input = document.getElementById("userInput");
    const question = input.value;

    if (!question.trim()) return;

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<p><b>You:</b> ${question}</p>`;

    input.value = "";

    try {

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "You are a Student Study Assistant. Answer study-related questions clearly. Question: " + question
                    }]
                }]
            })
        });

        const data = await response.json();

        const answer =
            data.candidates[0].content.parts[0].text;

        chatBox.innerHTML += `<p><b>Bot:</b> ${answer}</p>`;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML +=
            `<p><b>Bot:</b> Error connecting to Gemini API.</p>`;
    }
}