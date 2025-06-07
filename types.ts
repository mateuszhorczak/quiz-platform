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
    // TODO: add text answer
    questionId: number;
    selectedAnswers: number[];
}
