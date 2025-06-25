export interface Answer {
  id: number;
  name: string;
  questionId: number;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  name: string;
  quizId: number;
  answers: Answer[];
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}

export interface QuizNames {
  id: number;
  name: string;
  description: string;
}

export interface AnswerSolve {
  id: number;
  name: string;
  questionId: number;
  selected: boolean;
}

export interface QuestionSolve {
  id: number;
  name: string;
  quizId: number;
  answers: AnswerSolve[];
}

export interface QuizSolve {
  id: number;
  name: string;
  description: string;
  questions: QuestionSolve[];
}

export interface QuestionWithUserAnswers {
  questionId: number;
  selectedAnswers: number[];
}

export interface AnswerResult {
  id: number,
  name: string,
  questionId: number,
  isCorrect: boolean,
  userSelected: boolean,
}

export interface QuestionResult {
  id: number;
  name: string;
  quizId: number;
  answers: AnswerResult[];
}

export interface QuizResult {
  id: number;
  name: string;
  description: string;
  questions: QuestionResult[];
}

export interface Result {
  quiz: QuizResult;
  score: {
    correct: number;
    total: number;
  }
}

export interface User {
  id: number
  email: string
  username: string
  userQuizzesId: number[]
}

export interface NewUser {
  email: string
  username: string
  password: string
}

export interface UserAuthentication {
  username: string
  password: string
}
