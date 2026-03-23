const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //==============================================================
  //❓Create a new speech recognition
  //==============================================================
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  const video = document.querySelector("#bgVideo");

  //==============================================================
  //✅ Helper: play background video more smoothly
  //==============================================================
 let currentClip = "";

function playClip(path) {
  if (!video) return;

  // 如果已经在播同一个视频，就不要重新开始
  if (currentClip === path) return;

  currentClip = path;

  video.pause();
  video.src = path;
  video.load();

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

function clearVideo() {
  if (!video) return;

  currentClip = "";
  video.pause();
  video.removeAttribute("src");
}

  //==============================================================
  //❓Start recognition when "#startBtn" button is clicked
  //==============================================================
  document.querySelector("#startBtn").addEventListener("click", () => {
    recognition.start();
    document.querySelector("#startBtn").style.display = "none";
    document.body.classList.remove("beforeStart");
  });

  //==============================================================
  //✅ Define keywords and what happens when they are spoken
  //==============================================================
  const keywords = {
    "aki": () => {
      document.querySelector("#mainText1").textContent = "Hi, I am Aki";
      document.querySelector("#mainText3").className = "variable2";
      document.querySelector("#mainText3").innerHTML =
        "<p>Hi, I am a German Shepherd mix Husky.</p>" +
        "<p>I love playing learning, and spending time with you.</p>";

      document.querySelector("#image").style.display = "block";
      document.querySelector("#image").src = "./img/IMG_5597.JPG";

      clearVideo();
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#F5F3EB";
    },

    // -----------------------------
    // WARM UP / CAVALETTI
    // -----------------------------
    "warm up": () => {
      document.querySelector("#mainText1").className = "variable1";
      document.querySelector("#mainText1").textContent = "Warm Up";
      document.querySelector("#image").style.display = "none";
      document.querySelector("#mainText3").innerHTML =
        "<p>Cavaletti is part of my warm-up.</p>" +
        "<p>Stepping over poles just above my ankles wakes up my muscles and gets my body ready to move.</p>";

      document.body.style.backgroundColor = "transparent";
      playClip("./video/Cavaletti.mp4");
    },

    // -----------------------------
    // FIGURE EIGHT
    // -----------------------------
    "figure eight": () => {
      document.querySelector("#mainText1").textContent = "Figure Eight";
      document.querySelector("#mainText1").className = "variable1";
      document.querySelector("#image").style.display = "none";
      document.querySelector("#mainText3").innerHTML =
        "<p>You place two markers a few steps apart.</p>" +
        "<p>I weave around them in a soft eight. Left. Turn. Right. Turn. It keeps my back flexible and my spine strong.</p>";

      document.body.style.backgroundColor = "transparent";
      playClip("./video/Figure8.mp4");
    },

    "figure": () => {
      keywords["figure eight"]();
    },

    // -----------------------------
    // BOW
    // -----------------------------
    "bow": () => {
      document.querySelector("#mainText1").textContent = "Bow";
      document.querySelector("#mainText1").className = "variable1";
      document.querySelector("#image").style.display = "none";
      document.querySelector("#mainText3").innerHTML =
        "<p>Bow stretches my front legs and shoulders.</p>" +
        "<p>Front down, hips up. It loosens my body and prepares me to move.</p>";

      document.body.style.backgroundColor = "transparent";
      playClip("./video/bow.mp4");
    },

    // -----------------------------
    // SIT
    // -----------------------------
    "sit": () => {
      document.querySelector("#mainText1").textContent = "Sit";
      document.querySelector("#mainText1").className = "variable1";
      document.querySelector("#image").style.display = "none";
      document.querySelector("#mainText3").innerHTML =
        "<p>Sit is part of my exercise too.</p>" +
        "<p>When I sit properly, my back stays straight and my hind legs tuck in close. That is where balance begins.</p>";

      document.body.style.backgroundColor = "transparent";
      playClip("./video/Sit.mp4");
    },

    // -----------------------------
    // PLANK
    // -----------------------------
    "plank": () => {
      document.querySelector("#mainText1").textContent = "Plank";
      document.querySelector("#mainText1").className = "variable1";
      document.querySelector("#image").style.display = "none";
      document.querySelector("#mainText3").innerHTML =
        "<p>This is definitely the longest thirty seconds of my dog life.</p>" +
        "<p>But it helps me build strength and control.</p>";

      document.body.style.backgroundColor = "transparent";
      playClip("./video/Plank.mp4");
    },

    // -----------------------------
    // REST
    // -----------------------------
    "rest": () => {
      document.querySelector("#mainText1").textContent = "Post Exercise";
      document.querySelector("#mainText3").innerHTML =
        "<p>Now I rest.</p>" +
        "<p>Training is important, but recovery is part of the work too.</p>";

      document.querySelector("#image").style.display = "block";
      document.querySelector("#image").src = "./img/IMG_7456.JPG";

      clearVideo();
      document.querySelector("#bgVideo").style.display = "none";
      
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#F5F3EB";
    },

    // -----------------------------
    // RESTART
    // -----------------------------
    "again": () => {
      document.querySelector("#mainText1").textContent = "JOY WOOF";
      document.querySelector("#mainText1").className = "";
      document.querySelector("#mainText2").className = "";
      document.querySelector("#mainText2").textContent = "say: aki / warm up / figure eight / bow / sit / plank / rest";
      document.querySelector("#mainText3").innerHTML = "";

      document.querySelector("#image").style.display = "block";
      document.querySelector("#image").src = "./img/IMG_5597.JPG";

      clearVideo();
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#F5F3EB";
    },

    "返回": () => { keywords["restart"](); }
  };

  //==============================================================
  //❓Process recognized speech results
  //==============================================================
  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    document.querySelector("#mainText2").textContent = transcript;

    const lowerTranscript = transcript.toLowerCase();

    for (const key in keywords) {
      if (lowerTranscript.includes(key.toLowerCase())) {
        document.querySelector("#mainText2").textContent = key;
        keywords[key]();
        break;
      }
    }
  };

  //==============================================================
  //❓Restart recognition automatically when it ends
  //==============================================================
  recognition.onend = () => {
    recognition.start();
  };

} else {
  alert("SpeechRecognition not supported. Use Chrome.");
}