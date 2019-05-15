window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
  transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
  const statement = e.results[0][0].transcript;
  console.log(statement);
  if (statement.startsWith('voice admin ')) {
    const command = statement.replace('voice admin ', '');
    if (command.startsWith('link ')) {
      const linkText = command.replace('link ', '');
      for (const a of document.querySelectorAll("a")) {
        if (a.textContent.toLowerCase() == linkText) {
          a.click();
        }
      }
    }
  }

});

// When we stop talking, start the process again, so it'll record when we start
// talking again.
recognition.addEventListener('end', recognition.start);

recognition.start();
