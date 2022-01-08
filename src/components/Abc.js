import React, { useState, useEffect } from 'react'
import SpeachRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Abc() {

    // useEffect(() => {
    //     SpeachRecognition.startListening()
    // })

    const [message, setMessage] = useState('')
    const commands = [
        {
            command: 'I would like to order *',
            callback: (food) => setMessage(`Your order is for: ${food}`)
        },
        {
            command: 'The weather is :condition today',
            callback: (condition) => setMessage(`Today, the weather is ${condition}`)
        },
        {
            command: 'My top sports are * and *',
            callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
        },
        {
            command: 'Pass the salt (please)',
            callback: () => setMessage('My pleasure')
        },
        {
            command: ['Hello', 'Hi'],
            callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
            matchInterim: true
        },
        {
            command: 'Beijing',
            callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
            // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2
        },
        {
            command: ['eat', 'sleep', 'leave'],
            callback: (command) => setMessage(`Best matching command: ${command}`),
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        },
        {
            command: 'stop',
            callback: () =>SpeachRecognition.stopListening()
        },
        {
            command: '* present',
            callback: (id) =>setMessage(`${id} was present`)
        },
        {
            command: '* absent',
            callback: (id) =>setMessage(`${id} was absent`)
        }
    ]

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <div>
            <p>{message}</p>
            <p>{transcript}</p>
            <button onClick={SpeachRecognition.startListening}>Start</button>
            <button onClick={SpeachRecognition.stopListening}>Stop</button>
        </div>
    )
}
