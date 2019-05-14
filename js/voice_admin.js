window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.interimResults = true;

      recognition.addEventListener('result', e => {
        transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        const statement = e.results[0][0].transcript;
        console.log(statement);
        if (statement === "voice admin new page") {
          window.location.href = "/node/add/page";
        } else if (statement === "voice admin new article") {
          window.location.href = "/node/add/article";
        } else if (statement === "voice admin log out") {
          window.location.href = "/user/logout";
        } else if (statement === "voice admin go home") {
          window.location.href = "/en";
        } 
      });

      // When we stop talking, start the process again, so it'll record when we start
      // talking again.
      recognition.addEventListener('end', recognition.start);

      recognition.start();