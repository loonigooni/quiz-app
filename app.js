/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How many hearts does an octopus have?',
      answers: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: '3'
    },
    {
      question: 'What color is the skin of a polar bear?',
      answers: [
        'White',
        'Brown',
        'Black',
        'Grey'
      ],
      correctAnswer: 'Black'
    },
    {
      question: 'How tall was the tallest colossal penguin found?',
      answers: [
        '0.8m',
        '1.1m',
        '1.6m',
        '2.0m'
      ],
      correctAnswer: '2.0m'
    },
    {
      question: 'What is the average length of a pigs orgasm',
      answers: [
        '10 seconds',
        '1 minute',
        '30 minutes',
        '2 hours'
      ],
      correctAnswer: '30 minutes'
    },
    {
      question: 'How many hours do koalas sleep in a day?',
      answers: [
        '13 hours',
        '14 hours',
        '19 hours',
        '22 hours'
      ],
      correctAnswer: '22 hours'
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.              
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

//generate the start screen html
function generateQuizStart() {
  return `
    <div class="quiz-start">
      <form>
        <p>How much do you know about animals? Take this quiz and find out!</p>
        <button type="submit" id="start" autofocus>Begin</button>
      </form>
    </div>
  `;
}
//generate the question number html
function generateQuestionNumber() {
  return `
    <ul class="question-number">
      <li>
        Question ${STORE.currentQuestion + 1} of ${STORE.questions.length}
      </li>
    </ul>
  `;
}
//generate current score html
function generateScore() {
  return `
    <ul>
      <li class="score">
        Score ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}

//generate answer and radio button
function generateAnswers() {
  const answersArray = STORE.questions[STORE.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}
//generate the the question and sumbmission html
function generateQuiz(currentQuestion) {
  console.log("does this work");
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${STORE.questions[STORE.currentQuestion].question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswers()}
          </div>
        </div>
        <button type="submit" id="submit" tabindex="5">Submit</button>
        <button type="button" id="next" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
}


//generate question

//generate feedback showing if answer is correct or incorrect. if incorrect, shows correct html
function generateFeedback(answer) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';
  if (answer === 'correct') {
    html = `
    <div class="right-answer">
      Correct!
    </div>
    `;
  }
  else if (answer === 'incorrect') {
    html = `
      <div class="wrong-answer">
        WRONG! The correct answer is ${correctAnswer}.
      </div>
    `;
  }
  return html;
}
//generate your score and restart button
function generateQuizResults(){
  return `
    <div class='quiz-results'>
      <p>Congrats! You completed the quiz!</p>
      <p>You scored ${STORE.score} out of ${STORE.questions.length}</p>            
      <button class="restart-quiz">Restart Quiz</button>      
    </div>   
  `;
}



// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

function render() {
  let html = '';

  if (STORE.quizStarted === false) {
    $('main').html(generateQuizStart());
    return;
  }
  else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    html = generateQuestionNumber();
    html += "\n";
    html += generateScore();
    html += "\n";
    html += generateQuestion();
    $('main').html(html);
  }
  else {
    $('main').html(generateQuizResults());
  }
}


// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

function quizStartScreen() {
$('main').submit('.quiz-start form', function(e){
  e.preventDefault();
  console.log("hello");
  $('body').html(generateQuiz(STORE.currentQuestion));

  $('body').append(generateScore(STORE.score));

  $('body').append(generateQuestionNumber(STORE.currentQuestion));
})

$('main').on('click', '#start', function(e){
  STORE.quizStarted = true;
})
}

function questionSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    console.log("yo");
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];
    let selectedOption = $('input[name=options]:checked').val();
    //let optionContainerId = `${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      console.log("wassap");
      STORE.score++;
      $('body .answers').append(generateAnswers('correct'));
    }
 
    else {
      console.log("hello");
      $('body .answers').append(generateAnswers('incorrect'));
    }
    STORE.currentQuestion++;
    $('#submit').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next').show();

  });
}


// These functions handle events (submit, click, etc)


$(render)
$(quizStartScreen)
$(questionSubmission)



