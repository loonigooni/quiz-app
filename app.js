const store = {
  questions: [
    {
      question: 'How many hearts does an octopus have?',
      answers: ['1','2','3','4'],
      correctAnswer: '3'
    },
    {
      question: 'What color is the skin of a polar bear?',
      answers: ['White','Brown','Black','Grey'],
      correctAnswer: 'Black'
    },
    {
      question: 'How tall was the tallest colossal penguin found?',
      answers: ['0.8m','1.1m','1.6m','2.0m'],
      correctAnswer: '2.0m'
    },
    {
      question: 'What is the average length of a pigs orgasm?',
      answers: ['10 seconds','1 minute','30 minutes','2 hours'],
      correctAnswer: '30 minutes'
    },
    {
      question: 'How many hours do koalas sleep in a day?',
      answers: ['13 hours','14 hours','19 hours','22 hours'],
      correctAnswer: '22 hours'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,

};

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

//generate the quiz start screen
function generateQuizStart() {
  return `
    <div class="quiz-start">
      <h2>How much do you know about animals? Take this quiz and find out!</h2>
      <button id="start">Start</button>
    </div>
  `;
}

//generate the question number
function generateQuestionNumber() {
  return `
    <div class="question-number">
      <h4>Question Number: ${store.questionNumber + 1}</h4>
    </div>
  `;
}

//generate the question, answers using radio input, and submit using form
function generateQuiz() {
  return `
    <formid="question-form" class="question-form'>
      <fieldset>
        <div class="question">
          <legend> ${store.questions[store.questionNumber].question}</legend>
        </div>
        <div id="answers" class="answers">
          <script>generateAnswers()</script>
        </div>
        <button type="submit" id="submit">Submit</button>
        <button type="button" id="next">Next</button>
      </fieldset>
    </form>
    
  `;
}

//generate answers using radio input and submit using form
function generateAnswers() {
  for (let i = 0; i < store.questions[store.questionNumber].answers.length; i++) {
    let answer = store.questions[store.questionNumber].answers[i];
    console.log(answer);
    $(document).find('#answers').append(`<input type='radio' name='options' id='options${answer}' value='${answer}'><label for='${answer}'>${answer}</label>`)
  }
}

//generate answer feedback and next button
function generateFeedback(answerStatus) {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="correct-answer">
      Correct!
    </div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
    <div class="incorrect-answer">
      WRONG! The correct answer is ${correctAnswer}.
    </div>
    `;
  }
  return html;
}

//generate current score
function generateScore() {
  return `
    <div class="score">
      <h4>Score ${store.score} / ${store.questions.length}</h4>
    </div>
  `;
}

//generate final score and restart button
function generateQuizEnd() {
  return `
  <div class="results">
    <form id="restart-quiz">
      <fieldset>
          <div class="finale-score">
            <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
          </div>
          <div class="restart-quiz">
            <button type="button" id="restart">Restart Quiz</button>
          </div>
      </fieldset>
  </form>
  </div>
`;
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store

//render function that conditionally regenerates view each time the store is updated

function render() {
  let html = '';

  if (store.quizStarted === false) {
    $('main').html(generateQuizStart());
    return;
  }
  else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    html = generateQuestionNumber();
    html += "\n";
    html += generateScore();
    html += "\n";
    html += generateQuiz();
    $('main').html(html);
  }
  else {
    $('main').html(generateQuizEnd());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)


$("main").on("click", "#start", function() {
  console.log( $(this).text() );
  store.quizStarted = true;
  render();
  $('#next').hide();
});

$('body').on('click', '#next', (event) => {
  render();
  $('#next').hide();
});


$("main").on("click", "#submit", (event) => {
  event.preventDefault();
  console.log('submitting answer');
  let questionNumber = store.questions[store.questionNumber];
  let selectedOption = $('input[name=options]:checked').val()
  if (selectedOption === questionNumber.correctAnswer) {
    store.score++;
    $(document).find('#answers').append(generateFeedback('correct'));
  }
  else {
    $(document).find('#answers').append(generateFeedback('incorrect'));
  }
  store.questionNumber++
  $('#submit').hide()
  $('input[type=radio]').each(() => {
    $('input[type=radio]').attr('disabled', true);
  });
  $('#next').show();
})

function restartQuiz() {
  store.quizStarted === false;
  store.questionNumber = 0;
  store.score = 0;
}

function restartButton() {
  $('main').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

$(render)