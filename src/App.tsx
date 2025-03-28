import { useState } from 'react';
import './App.scss';

const questions = [
  {
    title: 'Как дела?',
    variants: ['норм', 'супир!', 'ну так се'],
    correct: 1,
  },
  {
    title: 'Когда у меня день рождения?',
    variants: ['28 апреля', 'сегодня', '52 июня'],
    correct: 0,
  },
  {
    title: 'Что или кто для меня дороже всего?',
    variants: ['камень', 'чипсы', 'Арина'],
    correct: 2,
  },
];

type Question = {
  title: string;
  variants: string[];
  correct: number;
};

type GameProps = {
  question: Question;
  OnclickVariant: (index: number) => void;
  selected: number | null;
  isCorrect: boolean;
};

function Game({ question, OnclickVariant, selected, isCorrect }: GameProps) {
  return (
    <div className='card'>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          <li
            key={variant}
            onClick={() => OnclickVariant(index)}
            className={
              selected !== null && index === selected && isCorrect ? 'correct' : ''
            }
          >
            {variant}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions[step];

  const CorrectAnswers = () => {
    setCorrect(correct + 1);
  };

  const OnclickVariant = (index: number) => {
    setSelected(index);
    if (index === question.correct) {
      setIsCorrect(true);
      CorrectAnswers();
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setSelected(null);
      setStep(step + 1);
      setIsCorrect(false);
    }, 1000);
  };

  return (
    <>
      {step !== questions.length ? (
        <Game 
          question={question} 
          OnclickVariant={OnclickVariant} 
          selected={selected} 
          isCorrect={isCorrect} 
        />
      ) : (
        <div className='card'>
          <h1>Ты прошёл тест!</h1>
          <p>Правильных ответов: {correct}</p>
          <a href="/">пройти ещё раз</a>
        </div>
      )}
    </>
  );
}

export default App;