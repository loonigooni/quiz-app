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
  score: 0
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
      <h4>Question Number: ${store.questionNumber + 1}.</h4>
    </div>
  `;
}

//generate the question, answers using radio input, and submit using form
function generateQuiz() {

  return `
    <form>
      <fieldset>
        <div class="question">
          <legend> ${store.questions[store.questionNumber].question}</legend>
        </div>
        <div class="answers">
          ${generateAnswers()}
        </div>
        <button type="sumbit' id="submit">Submit</button>
      </fieldset>
    </form>
  `;
}


//generate answers using radio input and submit using form
function generateAnswers() {

}
//generate answer feedback and next button
function generateFeedback() {

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
$('main','#start').on('click'), function(){
  console.log("Hello");
  store.quizStarted = true;
  $('main').html(generateQuiz(store.questionNumber));
  
}
$(render)