 var buttonColors=["red","blue","green","yellow"];
 var gamePatterns=[];
 var userClicked=[];
var started=false;
var level=0;

$(document).keypress(function()
{
    if(!started)
    {
      $("#level-title").text("level "+level);
      nextSequence();
      started=true;
}

});




 $(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClicked.push(userChosenColor);
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClicked.length-1);
})

function playSound(name)
{
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}


 function nextSequence(randomNumber)
{
    userClicked = [];
    level++;

    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    gamePatterns.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
   
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
function checkAnswer(currentLevel)
{
    if (gamePatterns[currentLevel] === userClicked[currentLevel]) {

        console.log("success");

        if (userClicked.length === gamePatterns.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");


        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
  
      }
}

function startOver()
{
    level=0;
    gamePatterns=[];
    started=false;

}