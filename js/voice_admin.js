window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
  transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
  const statement = e.results[0][0].transcript;
  console.log(statement);
  // All commnand must start with "voice admin"
  if (statement.startsWith('voice admin ')) {
    const command = statement.replace('voice admin ', '');
    // Link command.
    if (command.startsWith('link ')) {
      const linkText = command.replace('link ', '');
      for (const a of document.querySelectorAll("a")) {
        if (a.textContent.toLowerCase() === linkText) {
          a.click();
        }
      }
      return;
    }
    // Hardcoded commands.
    if (command === "new page") {
      window.location.href = "/node/add/page";
    } else if (command === "new article") {
      window.location.href = "/node/add/article";
    } else if (command === "log out") {
      window.location.href = "/user/logout";
    } else if (command === "go home") {
      window.location.href = "/en";
    }
  }
  //


});

// When we stop talking, start the process again, so it'll record when we start
// talking again.
recognition.addEventListener('end', recognition.start);

recognition.start();
