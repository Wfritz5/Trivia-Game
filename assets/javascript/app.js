$(document).ready(function () {
    
    var options = [
        {
            question: "How many Super Bowls has the Denver Broncos won?", 
            choice: ["1","3","2","4"],
            answer: 1,
            photo: "assets/images/broncos.jpg"
        },
        {
            question: "What is the Major League Baseball team for the state of Colorado?", 
            choice: ["Rockies", "Nuggets", "Broncos", "Avalanche"],
            answer: 0,
            photo: "assets/images/rockies.png"
        },
        {
            question: "In what year did the Colorado Rockies make it to the World Series?",
            choice: ["2006", "2007", "2008", "2009"],
            answer: 1,
            photo: "assets/images/ws07.png"
        },
        {
            question: "What is the NBA team for Colorado?",
            choice: ["Broncos", "Rockies", "Avalanche", "Nuggets"],
            answer: 3,
            photo: "assets/images/nuggets.jpg"
        },
        {
            question:"Who is the head coach of the Denver Broncos?",
            choice: ["Vance Joseph", "John Fox", "Vic Fangio", "Josh McDaniels"],
            answer: 2,
            photo: "assets/images/vf.jpg"
        },
        {
            question: "In Super Bowl 50, who was the Denver Broncos quaterback?",
            choice: ["Brock Osweiler", "Jay Cutler", "Peyton Manning", "Trevor Siemian"],
            answer: 2,
            photo: "assets/images/pm.jpg"
        },
        {
            question: "What was the Colorado Rockies win/loss record in the 2018 season?",
            choice: ["72-91", "91-72", "85-78", "78-85"],
            answer: 1,
            photo: "assets/images/rec.png"
        },

    ];
    
    var correctAnswerCount = 0;
    var wrongAnswerCount = 0;
    var noAnswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timerDiv").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            noAnswerCount++;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questions").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answers").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctAnswerCount++;
            userGuess="";
            $("#answers").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongAnswerCount++;
            userGuess="";
            $("#answers").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answers").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answers").empty();
            timer= 10;
    
        //run the score screen if all questions answered
        if ((wrongAnswerCount + correctAnswerCount + noAnswerCount) === qCount) {
            $("#questions").empty();
            $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answers").append("<h4> Correct: " + correctAnswerCount + "</h4>" );
            $("#answers").append("<h4> Incorrect: " + wrongAnswerCount + "</h4>" );
            $("#answers").append("<h4> Unanswered: " + noAnswerCount + "</h4>" );
            $("#reset").show();
            correctAnswerCount = 0;
            wrongAnswerCount = 0;
            noAnswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })