import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import PopUp from "./PopUp";

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution)  // hooks need to start with use
    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            setTimeout(() => setShowPopUp(true), 1500)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowPopUp(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])



    return (
        <div>
            {/* <div>Solution: {solution}</div> */}
            {/* <div>Current guess: {currentGuess}</div> */}
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keyboard usedKeys={usedKeys} />
            {showPopUp && <PopUp isCorrect={isCorrect} turn={turn} solution={solution} />}

        </div>
    )
}