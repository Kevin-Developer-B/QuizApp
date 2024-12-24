let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer-1": "Robbie Williams",
        "answer-2": "Lady Gaga",
        "answer-3": "Tim Berners-Lee",
        "answer-4": "Justin Bieber",
        "right-answer": 3
    },
    {
        "question": "Welches Attribut wird verwendet, um einem HTML-Element eine eindeutige Kennung zu geben?",
        "answer-1": "class",
        "answer-2": "id",
        "answer-3": "name",
        "answer-4": "style",
        "right-answer": 2
    },
    {
        "question": "Welches Tag wird verwendet, um einen Absatz zu erstellen?",
        "answer-1": "p",
        "answer-2": "div",
        "answer-3": "span",
        "answer-4": "section",
        "right-answer": 1
    },
    {
        "question": "Welches Tag wird verwendet, um ein Bild in HTML einzufügen?",
        "answer-1": "img",
        "answer-2": "image",
        "answer-3": "picture",
        "answer-4": "photo",
        "right-answer": 1
    },
    {
        "question": "Wie verlinkt man eine externe Webseite in HTML?",
        "answer-1": "link",
        "answer-2": "a href='URL'",
        "answer-3": "url",
        "answer-4": "connect",
        "right-answer": 2
    },
    {
        "question": "Welches Attribut wird verwendet, um einen Tooltip (Hinweistext) anzuzeigen?",
        "answer-1": "alt",
        "answer-2": "tooltip",
        "answer-3": "title",
        "answer-4": "info",
        "right-answer": 3
    },
    {
        "question": "Welches HTML-Tag wird verwendet, um eine ungeordnete Liste zu erstellen?",
        "answer-1": "list",
        "answer-2": "li",
        "answer-3": "ol",
        "answer-4": "ul",
        "right-answer": 4
    },
    {
        "question": "Welches Attribut wird verwendet, um das Ziel eines Links zu öffnen (z. B. in einem neuen Tab)?",
        "answer-1": "src",
        "answer-2": "href",
        "answer-3": "rel",
        "answer-4": "target",
        "right-answer": 4
    },
    {
        "question": "Welches HTML-Tag wird verwendet, um ein Formular zu erstellen?",
        "answer-1": "input",
        "answer-2": "form",
        "answer-3": "button",
        "answer-4": "textarea",
        "right-answer": 2
    },
    {
        "question": "Welches HTML-Tag wird verwendet, um die größte Überschrift zu erstellen?",
        "answer-1": "h6",
        "answer-2": "h1",
        "answer-3": "header",
        "answer-4": "title",
        "right-answer": 2
    }
]

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCES = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/glitched-alarm-loop.mp3');

function init() {
    showQuestion()
}

function startQuestion() {
    document.getElementById('start-screen').style = 'display: none'
    document.getElementById('question-body').style = "";
    document.getElementById('next-question-button').style = "";
    document.getElementById('progress').style = "";
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else{
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('end-screen').style = "";
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('next-question-button').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
}

function updateProgressBar() {
    let percent = (currentQuestion +1) / questions.length;
        percent = Math.round(percent * 100);
        // document.getElementById('progress-bar').innerHTML = `${percent}%`;
        document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
        let question = questions[currentQuestion];
        document.getElementById('questionText').innerHTML = question['question'];
        document.getElementById('answer-1').innerHTML = question['answer-1'];
        document.getElementById('answer-2').innerHTML = question['answer-2'];
        document.getElementById('answer-3').innerHTML = question['answer-3'];
        document.getElementById('answer-4').innerHTML = question['answer-4'];

    // Verschiebe die "active"-Klasse in der Liste
    // let listItems = document.querySelectorAll('.list-group-item');
    // listItems.forEach((item, index) => {
    //     if (index === currentQuestion) {
    //         item.classList.add('active'); // Füge "active" zur aktuellen Frage hinzu
    //     } else {
    //         item.classList.remove('active'); // Entferne "active" von den anderen
    //     }
    // });
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOFRightAnswer = `answer-${question['right-answer']}`
    if (selectedQuestionNumber == question['right-answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCES.play();
        rightQuestions++;
    }else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOFRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButton()
    showQuestion()
}


function resetAnswerButton() {
    document.getElementById('answer-1').parentNode.classList.remove('bg-danger')
    document.getElementById('answer-1').parentNode.classList.remove('bg-success')
    document.getElementById('answer-2').parentNode.classList.remove('bg-danger')
    document.getElementById('answer-2').parentNode.classList.remove('bg-success')
    document.getElementById('answer-3').parentNode.classList.remove('bg-danger')
    document.getElementById('answer-3').parentNode.classList.remove('bg-success')
    document.getElementById('answer-4').parentNode.classList.remove('bg-danger')
    document.getElementById('answer-4').parentNode.classList.remove('bg-success')
}

function restartGame() {
    rightQuestions = 0;
    currentQuestion = 0
    init()

    document.getElementById('end-screen').style = 'display: none';
    document.getElementById('question-body').style = 'display: "" ';
    document.getElementById('next-question-button').style = 'display: "" ';
}