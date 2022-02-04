// Build App Here
function webApp() {
    const $ = document.querySelector.bind(document);
    // Fake gets data from here

    const questions = [
        {
            question: 'What is 2 + 2?',
            answers: [
                { text: '4', correct: true },
                { text: '22', correct: false }
            ],
            clickedAnswer: false,
            score: 100
        },
        {
            question: 'Who is the best YouTuber?',
            answers: [
                { text: 'Web Dev Simplified', correct: true },
                { text: 'Traversy Media', correct: true },
                { text: 'Dev Ed', correct: true },
                { text: 'Fun Fun Function', correct: true }
            ],
            clickedAnswer: false,
            score: 100
        },
        {
            question: 'Is web development fun?',
            answers: [
                { text: 'Kinda', correct: false },
                { text: 'YES!!!', correct: true },
                { text: 'Um no', correct: false },
                { text: 'IDK', correct: false }
            ],
            clickedAnswer: false,
            score: 100
        },
        {
            question: 'What is 4 * 2?',
            answers: [
                { text: '6', correct: false },
                { text: '8', correct: true }
            ],
            clickedAnswer: false,
            score: 100
        }
    ]

    // Declare and definition variables
    let shuffledQuestion, currentQuestionIndex, currentScore


    // Get DOM elements
    const startButton = $('#start-btn')
    const nextButton = $('#next-btn')
    const questionContainer = $('#question-container')
    const questionElement = $('#question')
    const answerButtonsElement = $('#answer-buttons')
    const scoreElement = $('#score')

    // Add and handle events
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    })
    answerButtonsElement.addEventListener('click', (e) => {
        const currentQuestion = shuffledQuestion[currentQuestionIndex]
        if (Array.from(e.target.classList).includes('answer-btn')) {
            currentQuestion.clickedAnswer = true;
        }
        if (currentQuestion.clickedAnswer) {
            (Array.from(answerButtonsElement.children)).forEach(answer => {
                answer.removeEventListener('click', selectAnswer)
            })
        }
    })

    // Declare and definition functions

    // Function Start App
    function startGame() {
        shuffledQuestion = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        currentScore = 0
        scoreElement.innerText=`Score: ${currentScore}`
        startButton.classList.add('hide')
        questionContainer.classList.remove('hide')
        setNextQuestion()
    }

    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestion[currentQuestionIndex])
    }

    function resetState() {
        clearState(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }

    function showQuestion(question) {
        questionElement.innerText = `${currentQuestionIndex + 1}. ${question.question}`
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            button.classList.add('answer-btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
        })
    }

    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = e.target.dataset.correct
        if(correct){
            currentScore+=shuffledQuestion[currentQuestionIndex].score
            scoreElement.innerText=`Score: ${currentScore}`
        }
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach((button) => {
            setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestion.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }

    }
    function setStatusClass(element, correct) {
        clearState(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }
    function clearState(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }
}

webApp()