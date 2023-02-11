const courseContainer = document.querySelector('.course-container')
const questionsContainer = document.querySelector('.questions-container')
const submitBtn = document.querySelector('.submit')
const pointsEl = document.querySelector('.points')
const numbersEl = document.querySelector('.numbers')

let courses = ["Digital Electronics", "Statistics for computing", "Introduction to Programming", "Computer Application Package"]
let activeCourse = 0
let done = false
let points = 0

const renderNumbers = () => {
    let count = 0
    questions.forEach(question => {
        if (question.category == courses[activeCourse]) {
            count += 1
        const numberEl = document.createElement('a')
        numberEl.setAttribute('href', `#${count}`)
        numberEl.innerHTML = count

        numbersEl.appendChild(numberEl)
        }
    })
}

renderNumbers()

const renderCourses = () => {
    courses.forEach((course, index) => {
        const courseEl = document.createElement('div')
        courseEl.classList.add("course")
        courseEl.innerHTML = course

        courseEl.addEventListener('click', () => {
            console.log(course, index)
            setActiveCourse(index)
        })

        courseContainer.appendChild(courseEl)
    })

    document.querySelectorAll('.course')[activeCourse].classList.add('active')
}

const setActiveCourse = (index) => {
    activeCourse = index
    done = false
    points = 0
    courseContainer.innerHTML = ""
    questionsContainer.innerHTML = ""
    numbersEl.innerHTML = ""
    renderCourses()
    renderQuestions()
    renderNumbers()
    
}

const renderQuestions = () => {
    let count = 0
    questions.forEach((question) => {
        if (question.category == courses[activeCourse]) {
            // console.log(question)
            console.log(courses[activeCourse])
            count += 1
        const questionContainerEl = document.createElement('div')
        questionContainerEl.classList.add('question-container')
        questionContainerEl.setAttribute('id', count)
        const questionEl = document.createElement('div')
        questionEl.classList.add('question')
        questionEl.innerHTML = `<span>${count}</span>. ${question.question}`
        
        const optionsContainerEl = document.createElement('div')
        optionsContainerEl.classList.add('options-container')
        
        renderOptions(optionsContainerEl, question)

        questionContainerEl.appendChild(questionEl)
        questionContainerEl.appendChild(optionsContainerEl)
        questionsContainer.appendChild(questionContainerEl)
        }
    })
}

const renderOptions = (optionsContainerEl, question) => {
    question.options.forEach(option => {
        const optionEl = document.createElement('div')
        optionEl.classList.add('option')
        optionEl.innerHTML = option
        if(done && question.category === courses[activeCourse]) {
            if (optionEl.innerHTML === question.selected) {
                if (question.selected === question.answer) {
                    optionEl.classList.add('correct')
                    points += 1
                } else {
                    optionEl.classList.add('wrong')
                }
            }
            if (optionEl.innerHTML === question.answer) {
                optionEl.classList.add('correct')
            }
            console.log('done')
        }
        optionEl.addEventListener('click', () => {
            selectAnswer(optionEl, optionsContainerEl, question)
        })

        optionsContainerEl.appendChild(optionEl)
    }) 
    pointsEl.innerHTML = `Points: ${points}`
    // console.log(question)
    // done = false
}

const selectAnswer = (optionEl, optionsContainerEl, question) => {
    optionsContainerEl.innerHTML = ""
    // numbersEl.innerHTML = ""
    // renderNumbers()
    renderOptions(optionsContainerEl, question)
    question.selected = optionEl.innerHTML
    const options = optionsContainerEl.querySelectorAll('.option')
    options.forEach(option => {
        if (question.selected === option.innerHTML) {
            option.classList.add('selected')
            // console.log(option)
        } else {
            option.classList.remove('correct')
            option.classList.remove('wrong')
        }
    })
    
}

const checkAnswer = () => {
    questionsContainer.innerHTML = ""
    done = true
    console.log(points)
    renderQuestions()
    console.log('eu')
}

submitBtn.addEventListener('click', () => {
    checkAnswer()
})

renderQuestions()
renderCourses()