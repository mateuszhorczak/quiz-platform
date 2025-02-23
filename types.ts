export interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    question: string;
    answers: Answer[];
}
