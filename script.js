// create a list to store all quiz questions
// [] - list 
// {} - dictinary
const questionBank = [
    {
        question : "What's the fastest land animal?",
        options : ["Hyena", "Lion", "Cheetah", "Tiger"],
        answer : "Cheetah"
    },

    {
        question : "How many hearts does an octopus have?",
        options : ["1", "2", "3", "4"],
        answer : "3"
    },

    {
        question : "Which bird is famous for being able to sleep while in flight?",
        options : ["Duck", "Heron", "Finch", "Swift"],
        answer : "Swift"
    },

    {
        question : "Which animal is the fastest bird in a dive?",
        options : ["Golden Eagle", "Peregrine Falcon", "Osprey", "Albatross"],
        answer : "Peregrine Falcon"
    },

    {
        question : "Which of the following is the only bird known to be able to fly backward?",
        options : ["Hummingbird", "Swift", "Swallow", "Kingfisher"],
        answer : "Hummingbird"
    },
]

const questionLabel = document.getElementById("question")
const startBtn = document.getElementById("btn")
const optionBox = document.getElementById("optionBox")
const timerText = document.getElementById("timer")
const scoreLabel = document.getElementById("scoreLabel")
const feedbackLabel = document.getElementById("feedbackLabel")
const progressbarfill =document.getElementById("fill")

startBtn.addEventListener("click", StartQuiz)

let timer
let score = 0
let message = ""
let questionNum = 0


function StartQuiz()
{
    if(questionNum < questionBank.length)
    { 
        startBtn.style.display = "none"
        const questionSet = questionBank[questionNum]
        questionLabel.textContent = questionSet.question

        //remove previous option buttons
        optionBox.innerHTML = ""

        //reset timer
        timerText.textContent = 17

        //reset feedback label
        feedbackLabel.textContent = ""

        // update progress bar
        progressbarfill.style.width = `${((questionNum + 1) / questionBank.length ) * 100}%`

        // create 4 html buttons 
        questionSet.options.forEach((item) => {
        const button = document.createElement("button")
        button.textContent = item
        button.classList.add("optionBtn")
        optionBox.appendChild(button)

            // apply on-click event listener to each and every option button
            button.addEventListener("click", () => {
                DisableOptionButtons()
                clearInterval(timer)
                CheckAnswer(item)     // item - the answer we selected
            })

        })

        // countdown starts
        timer = setInterval(() => {
        timerText.textContent = parseInt(timerText.textContent) - 1
        if(parseInt(timerText.textContent)=== 0)
        {
                clearInterval(timer)
                DisableOptionButtons()
                CheckAnswer(null)
        }
        }, 1000)
    } else {
        EndQuiz()    
    }
}   

function DisableOptionButtons()
{
    const allOptionButton = document.querySelectorAll(".optionBtn")

    allOptionButton.forEach(button => {
        button.disabled = true
    })
}

function CheckAnswer(item)
{
    const actualAns = questionBank[questionNum].answer

    if(item === actualAns)
    {
        score += 1
        message = "That's correct!"
    } else if (item === null)
    {
        message = "Time's up, you were too late."
    } else
    {
        message = "That's incorrect."
    }

    feedbackLabel.textContent = message
    scoreLabel.textContent = `Score: ${score}`

    //hold for 3 seconds before it loads the next question
    setTimeout(() => {
        questionNum += 1
        StartQuiz()
    }, 3000)
}

function EndQuiz()
{
    clearInterval(timer)
    questionLabel.textContent = "Hooray! Quiz has ended!"
    feedbackLabel.textContent = "Thanks for playing."
    scoreLabel.textContent = `You scored ${score} points.`
    optionBox.style.display = "none"
    timerText.textContent = "🥳"
}


