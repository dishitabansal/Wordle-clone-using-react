import React from "react";

const PopUp = ({ isCorrect, turn, solution }) => {
    return (
        <div className="popup">
            {isCorrect && (
                <div>
                    <h1>Congrats, you win!</h1>
                    <p className="solution">You guessed it right: {solution}</p>
                    <p>You took {turn} guesses to arrive at the solution :&#x29;</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Oh no, you ran out of turns!</h1>
                    <p className="solution">The word was: {solution}</p>
                    <p>Better luck next time :&#x28;</p>
                </div>
            )}
        </div>
    );
}

export default PopUp;