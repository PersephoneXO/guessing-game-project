/*readline interface*/
const readline=require("readline");

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


/*Begin by initializing a variable in the global scope named secretNumber to any positive integer.
Later we will program this variable to be assigned at random, but for now we'll hard-code a value
that we can test for quickly.*/
let secretNumber=0;

let numAttempts=0;


function randomInRange(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
}


function askRange(){
    let maxF=0;
    let minF=0;
    rl.question("Enter a max number: ",handleMaxResponse);
    function handleMaxResponse(max){
        maxF=max;
        rl.question("Enter a min number: ",handleMinResponse);
    }
    function handleMinResponse(min){
        minF=min;
        console.log(`I'm thinking of a number between ${minF} and ${maxF}...`)

        secretNumber=randomInRange(Number(minF),Number(maxF));

        askGuess();
    }


}

function askLimit(){
    rl.question("How many attempts do you want to guess the number?",handleLimitResponse);
    function handleLimitResponse(limit){
        numAttempts=limit;
        askRange();
    }

}

/*Define a function named checkGuess that accepts a number as an argument. It should compare that
argument against the global secretNumber. It should have the following behavior:

- when the argument is larger than secretNumber, it should print 'Too high.' and return false
- when the argument is smaller than secretNumber, it should print 'Too low.' and return false
- when the argument is equal to secretNumber, it should print 'Correct!' and return true*/
function checkGuess(num){
    if (num==secretNumber){
        console.log("Correct!");
        return true;
    }
    if (num>secretNumber){
        console.log("Too high.");
        return false;
    }
    if (num<secretNumber){
        console.log("Too low.");
        return false;
    }
}


function askGuess(){
    rl.question("Enter a guess:",answer=>{
        let value=checkGuess(Number(answer));
        if (value==true){
            console.log("You win!");
            rl.close();
        }
        else{
            numAttempts--;
            if (numAttempts==0){
                console.log("You Lose.");
                rl.close();
            }
            else{
            askGuess();
            }
        }
    });
}



askLimit();
