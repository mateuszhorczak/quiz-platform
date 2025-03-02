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
