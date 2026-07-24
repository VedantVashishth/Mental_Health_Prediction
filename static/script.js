/*=====================================================
    MENTAL HEALTH PREDICTION
    PART 1
=====================================================*/

"use strict";

/*=====================================================
    API
=====================================================*/

const API_URL = "/predict";

/*=====================================================
    DOM ELEMENTS
=====================================================*/

const form = document.getElementById("predictionForm");

const steps = document.querySelectorAll(".step");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const submitBtn = document.getElementById("submitBtn");

const progressFill = document.getElementById("progressFill");

const progressText = document.getElementById("progressText");

const startBtn = document.getElementById("startBtn");

const container = document.querySelector(".container");

const particlesContainer = document.getElementById("particles");

/*=====================================================
    CURRENT STEP
=====================================================*/

let currentStep = 0;

/*=====================================================
    HERO BUTTON
=====================================================*/

startBtn.addEventListener("click", () => {

    container.scrollIntoView({

        behavior: "smooth"

    });

});

/*=====================================================
    PARTICLE GENERATOR
=====================================================*/

function createParticle() {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 5 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration =

        Math.random() * 12 + 8 + "s";

    particle.style.animationDelay =

        Math.random() * 4 + "s";

    particle.style.opacity =

        Math.random();

    particlesContainer.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 22000);

}

/*=====================================================
    CREATE PARTICLES
=====================================================*/

setInterval(createParticle, 250);

for (let i = 0; i < 40; i++) {

    createParticle();

}

/*=====================================================
    SHOW STEP
=====================================================*/

function showStep(index) {

    steps.forEach(step => {

        step.classList.remove("active");

    });

    steps[index].classList.add("active");

    progressFill.style.width =

        ((index + 1) / steps.length) * 100 + "%";

    progressText.innerHTML =

        `Step ${index + 1} of ${steps.length}`;

    prevBtn.style.display =

        index === 0 ? "none" : "block";

    if (index === steps.length - 1) {

        nextBtn.style.display = "none";

        submitBtn.style.display = "block";

    }

    else {

        nextBtn.style.display = "block";

        submitBtn.style.display = "none";

    }

}

/*=====================================================
    VALIDATION
=====================================================*/

function validateStep(stepIndex) {

    const currentInputs =

        steps[stepIndex].querySelectorAll(

            "input, select"

        );

    let valid = true;

    currentInputs.forEach(input => {

        input.classList.remove("input-error");

        if (

            input.value.trim() === ""

        ) {

            input.classList.add(

                "input-error"

            );

            valid = false;

        }

    });

    return valid;

}

/*=====================================================
    NEXT
=====================================================*/

nextBtn.addEventListener("click", () => {

    if (!validateStep(currentStep)) {

        showToast(

            "Please complete all fields.",

            "error"

        );

        return;

    }

    if (currentStep < steps.length - 1) {

        steps[currentStep].classList.add(

            "fade-out"

        );

        setTimeout(() => {

            steps[currentStep].classList.remove(

                "fade-out"

            );

            currentStep++;

            showStep(currentStep);

            steps[currentStep].classList.add(

                "fade-in"

            );

        }, 200);

    }

});

/*=====================================================
    PREVIOUS
=====================================================*/

prevBtn.addEventListener("click", () => {

    if (currentStep > 0) {

        currentStep--;

        showStep(currentStep);

    }

});

/*=====================================================
    KEYBOARD SUPPORT
=====================================================*/

document.addEventListener(

    "keydown",

    e => {

        if (

            e.key === "Enter" &&

            currentStep < steps.length - 1

        ) {

            e.preventDefault();

            nextBtn.click();

        }

    }

);

/*=====================================================
    INITIALIZE
=====================================================*/

showStep(currentStep);

/*=====================================================
    FORM DATA
=====================================================*/

function getFormData() {

    return {

        age: Number(

            document.getElementById("age").value

        ),

        gender:

            document.getElementById("gender").value,

        country:

            document.getElementById("country").value,

        academic_level:

            document.getElementById(

                "academic_level"

            ).value,

        most_used_platform:

            document.getElementById(

                "most_used_platform"

            ).value,

        purpose_of_use:

            document.getElementById(

                "purpose_of_use"

            ).value,

        avg_daily_usage_hours:

            Number(

                document.getElementById(

                    "avg_daily_usage_hours"

                ).value

            ),

        daily_unlocks:

            Number(

                document.getElementById(

                    "daily_unlocks"

                ).value

            ),

        study_hours:

            Number(

                document.getElementById(

                    "study_hours"

                ).value

            ),

        physical_activity_hours:

            Number(

                document.getElementById(

                    "physical_activity_hours"

                ).value

            ),

        sleep_hours_per_night:

            Number(

                document.getElementById(

                    "sleep_hours_per_night"

                ).value

            ),

        stress_level:

            document.getElementById(

                "stress_level"

            ).value

    };

}

/*=====================================================
    PART 2
    API + LOADING + TOAST
=====================================================*/

/*=====================================================
    DOM
=====================================================*/

const loadingScreen = document.getElementById("loadingScreen");

const loadingText = document.getElementById("loadingText");

const toast = document.getElementById("toast");

/*=====================================================
    LOADING MESSAGES
=====================================================*/

const loadingMessages = [

    "Analyzing your digital behavior...",

    "Evaluating lifestyle habits...",

    "Understanding social media usage...",

    "Calculating AI confidence...",

    "Generating prediction..."

];

let loadingInterval;

/*=====================================================
    SHOW LOADING
=====================================================*/

function showLoading(){

    loadingScreen.classList.add("active");

    let index = 0;

    loadingText.textContent = loadingMessages[index];

    loadingInterval = setInterval(()=>{

        index++;

        if(index >= loadingMessages.length){

            index = 0;

        }

        loadingText.style.opacity = "0";

        setTimeout(()=>{

            loadingText.textContent = loadingMessages[index];

            loadingText.style.opacity = "1";

        },300);

    },1800);

}

/*=====================================================
    HIDE LOADING
=====================================================*/

function hideLoading(){

    clearInterval(loadingInterval);

    loadingScreen.classList.remove("active");

}

/*=====================================================
    TOAST
=====================================================*/

function showToast(message,type="info"){

    toast.className = "toast";

    toast.classList.add(type);

    toast.classList.add("show");

    toast.innerHTML = message;

    setTimeout(()=>{

        toast.classList.remove("show");

    },3500);

}

/*=====================================================
    SUBMIT FORM
=====================================================*/

form.addEventListener("submit", async function(e){

    e.preventDefault();

    if(!validateStep(currentStep)){

        showToast(

            "Please complete all required fields.",

            "error"

        );

        return;

    }

    const formData = getFormData();

    showLoading();

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(formData)

        });

        if(!response.ok){

            throw new Error(

                "Prediction failed."

            );

        }

        const data = await response.json();

        hideLoading();

        showToast(

            "Prediction generated successfully!",

            "success"

        );

        /*
            Part 3 will implement this function.
        */

        showResult(

            data.predicted_mental_health_score

        );

    }

    catch(error){

        console.error(error);

        hideLoading();

        showToast(

            "Unable to connect to FastAPI server.",

            "error"

        );

    }

});

/*=====================================================
    CONNECTION CHECK
=====================================================*/

async function checkAPI(){

    try{

        const res = await fetch(

            "/"

        );

        if(res.ok){

            console.log(

                "FastAPI Connected"

            );

        }

    }

    catch{

        console.warn(

            "Backend Offline"

        );

    }

}

checkAPI();

/*=====================================================
    PART 3
    RESULT ANIMATION
=====================================================*/

const resultSection = document.getElementById("resultSection");

const scoreValue = document.getElementById("scoreValue");

const progressCircle = document.getElementById("progressCircle");

const scoreTitle = document.getElementById("scoreTitle");

const scoreDescription = document.getElementById("scoreDescription");

/*=====================================================
    SVG
=====================================================*/

const radius = 95;

const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;

progressCircle.style.strokeDashoffset = circumference;

/*=====================================================
    SHOW RESULT
=====================================================*/

function showResult(score){

    form.parentElement.style.display = "none";

    resultSection.classList.add("active");

    animateCircle(score);

    animateScore(score);

    updateInterpretation(score);

    setTimeout(()=>{

        /*
            Implemented in Part 4
        */

        openVideoRecommendation(score);

    },2500);

}

/*=====================================================
    CIRCLE
=====================================================*/

function animateCircle(score){

    const percentage = score / 10;

    const offset = circumference -

        (percentage * circumference);

    progressCircle.style.strokeDashoffset = offset;

}

/*=====================================================
    COUNT ANIMATION
=====================================================*/

function animateScore(target){

    let current = 0;

    const duration = 1800;

    const fps = 60;

    const increment =

        target / (duration / (1000 / fps));

    const timer = setInterval(()=>{

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        scoreValue.textContent =

            current.toFixed(2);

    },1000/fps);

}

/*=====================================================
    INTERPRETATION
=====================================================*/

function updateInterpretation(score){

    scoreTitle.className = "";

    if(score >= 8){

        progressCircle.style.stroke = "#2ee59d";

        scoreTitle.classList.add("low-risk");

        scoreTitle.innerHTML = "Excellent Mental Health";

        scoreDescription.innerHTML =
        "Your digital habits and lifestyle indicate excellent mental well-being. Keep maintaining these healthy routines.";

    }

    else if(score >= 6){

        progressCircle.style.stroke = "#5fe7ff";

        scoreTitle.classList.add("good");

        scoreTitle.innerHTML = "Very Good";

        scoreDescription.innerHTML =
        "Your mental well-being appears to be in a healthy range. Continue balancing your digital habits with rest and physical activity.";

    }

    else if(score >= 4){

        progressCircle.style.stroke = "#ffb547";

        scoreTitle.classList.add("medium");

        scoreTitle.innerHTML = "Moderate";

        scoreDescription.innerHTML =
        "Your mental health is moderate. Small improvements in sleep, stress management, and screen time may help.";

    }

    else if(score >= 2){

        progressCircle.style.stroke = "#ff8a47";

        scoreTitle.classList.add("medium");

        scoreTitle.innerHTML = "Needs Attention";

        scoreDescription.innerHTML =
        "Your current lifestyle may be affecting your mental well-being. Consider adopting healthier daily habits.";

    }

    else{

        progressCircle.style.stroke = "#ff5b6b";

        scoreTitle.classList.add("high-risk");

        scoreTitle.innerHTML = "High Risk";

        scoreDescription.innerHTML =
        "Your score suggests poor mental well-being. Consider talking with trusted friends, family, or a qualified mental health professional if needed.";

    }

}

/*=====================================================
    RESTART
=====================================================*/

function restartAssessment(){

    currentStep = 0;

    resultSection.classList.remove("active");

    form.reset();

    form.parentElement.style.display = "block";

    showStep(0);

    progressCircle.style.strokeDashoffset = circumference;

    scoreValue.textContent = "0.00";

}
/*=====================================================
    PART 4
    VIDEO RECOMMENDATION
=====================================================*/

const videoModal = document.getElementById("videoModal");
const watchVideoBtn = document.getElementById("watchVideo");
const closeModalBtn = document.getElementById("closeModal");
const videoMessage = document.getElementById("videoMessage");

let recommendedVideo = "";

/*=====================================================
    VIDEO MAPPING
=====================================================*/

function getVideoRecommendation(score){

    if(score >= 1 && score < 2){

        return {
            url:"https://www.youtube.com/watch?v=DbiRVNeZPnw",
            message:"🌸 You're doing amazing! Here's a short video to keep your positive mindset growing."
        };

    }

    else if(score >= 2 && score < 3){

        return {
            url:"https://www.youtube.com/watch?v=3DepZzDRpkI",
            message:"✨ Great progress! Small positive habits every day create a happier future."
        };

    }

    else if(score >= 3 && score < 4){

        return {
            url:"https://www.youtube.com/watch?v=iEARJyRo1YE",
            message:"💙 Keep believing in yourself. A few mindful changes can make a big difference."
        };

    }

    else if(score >= 4 && score < 5){

        return {
            url:"https://www.youtube.com/watch?v=9fvETktnaRw",
            message:"🌟 Take a short break and enjoy this motivational message. Your mental health matters."
        };

    }

    else if(score >= 5 && score < 6){

        return {
            url:"https://www.youtube.com/watch?v=RQy3MqPMSqY",
            message:"💜 Progress isn't always fast. Every small improvement counts."
        };

    }

    else if(score >= 6 && score < 7){

        return {
            url:"https://www.youtube.com/watch?v=-av-Y516iKs",
            message:"⚡ Life can be overwhelming sometimes. Take things one step at a time."
        };

    }

    else if(score >= 7 && score < 8){

        return {
            url:"https://www.youtube.com/watch?v=R9UROWr2_IA",
            message:"💖 You deserve kindness—from yourself too. Take a moment to recharge."
        };

    }

    else{

        return {
            url:"https://www.youtube.com/watch?v=uqLegI7c2Es",
            message:"🌈 Remember, asking for support is a sign of strength. You're not alone."
        };

    }

}

/*=====================================================
    OPEN MODAL
=====================================================*/

function openVideoRecommendation(score){

    const recommendation = getVideoRecommendation(score);

    recommendedVideo = recommendation.url;

    videoMessage.innerHTML = recommendation.message;

    videoModal.classList.add("active");

}

/*=====================================================
    WATCH BUTTON
=====================================================*/

watchVideoBtn.addEventListener("click",()=>{

    window.open(

        recommendedVideo,

        "_blank"

    );

    videoModal.classList.remove("active");

});

/*=====================================================
    CLOSE
=====================================================*/

closeModalBtn.addEventListener("click",()=>{

    videoModal.classList.remove("active");

});

/*=====================================================
    CLICK OUTSIDE
=====================================================*/

videoModal.addEventListener("click",(e)=>{

    if(e.target===videoModal){

        videoModal.classList.remove("active");

    }

});

/*=====================================================
    ESC KEY
=====================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        videoModal.classList.remove("active");

    }

});

/*=====================================================
    OPTIONAL RESTART BUTTON
=====================================================*/

const restartButton = document.createElement("button");

restartButton.innerHTML = "Start New Assessment";

restartButton.style.marginTop = "35px";

restartButton.style.padding = "15px 35px";

restartButton.style.border = "none";

restartButton.style.borderRadius = "16px";

restartButton.style.cursor = "pointer";

restartButton.style.background =
"linear-gradient(135deg,#4da3ff,#8d6bff)";

restartButton.style.color = "#fff";

restartButton.style.fontWeight = "600";

restartButton.style.fontSize = "16px";

restartButton.style.transition = ".35s";

restartButton.addEventListener("mouseenter",()=>{

    restartButton.style.transform="translateY(-4px)";

});

restartButton.addEventListener("mouseleave",()=>{

    restartButton.style.transform="translateY(0px)";

});

restartButton.addEventListener("click",()=>{

    videoModal.classList.remove("active");

    restartAssessment();

});

document.querySelector(".result-card")
.appendChild(restartButton);

/*=====================================================
    INITIALIZATION
=====================================================*/

window.addEventListener("load",()=>{

    console.log(
        "Mental Health Prediction UI Loaded"
    );

    showToast(
        "Welcome! Begin your AI assessment.",
        "info"
    );

});