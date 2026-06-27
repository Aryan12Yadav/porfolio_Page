import { useState, useEffect } from 'react';
import './Typewriter.css';

export default function Typewriter({ phrases, delay = 100, eraseDelay = 1500 }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(phrase.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(phrase.substring(0, currentText.length + 1));
      }, delay + (Math.random() * 40 - 20));
    }

    if (!isDeleting && currentText === phrase) {
      timer = setTimeout(() => setIsDeleting(true), eraseDelay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, delay, eraseDelay]);

  return (
    <span>
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
