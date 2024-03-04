document.addEventListener("DOMContentLoaded", function () {

    startCountdown();

function startCountdown() {
    const target = document.getElementById("targetDate");
    const countdownElement = document.getElementById("countdown");


    const targetDate = new Date("04/01/2024");
    
    const timeDifference = targetDate.getTime() - new Date().getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until April Break`;
    target.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until April edede`;

}

});