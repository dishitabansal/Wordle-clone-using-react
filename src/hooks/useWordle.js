import { useState } from "react";

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array  // array of array of objects
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})  // {letter: 'color'}

    // format guess into array of objects w properties key (letter) and color
    const formatGuess = () => {
        let solutionArray = [...solution]  // spread syntax
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        // find green letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                letter.color = 'green'
                solutionArray[i] = null;
            }
        })

        // find yellow letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                letter.color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess

    }

    // store guesses
    const addNewguess = (formatted) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuess) => {
            let newGuesses = [...prevGuess]
            newGuesses[turn] = formatted
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys }

            // doesnt work because yellow cant be updated to green etc
            // formatted.forEach(letter => {
            //     const currentColor = newKeys[letter.key]
            //     if (!currentColor) {
            //         newKeys[letter.key] = letter.color
            //     }
            // })

            formatted.forEach(letter => {
                const currentColor = newKeys[letter.key]
                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }
                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess('')
    }

    // track current guess
    const handleKeyup = ({ key }) => {

        if (key === 'Enter') {
            // only add guess if turn < 5
            if (turn > 5) {
                console.log('All guesses used')
                return
            }
            // no duplicates
            if (history.includes(currentGuess)) {
                console.log('No duplicates allowed')
                return
            }
            // length = 5 chars
            if (currentGuess.length !== 5) {
                console.log('Word must contain 5 letters')
                return
            }
            const formatted = formatGuess()
            addNewguess(formatted)

        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }

    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }

}

export default useWordle;