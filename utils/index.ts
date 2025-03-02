interface Question {
    id: number;
    name: string;
    quizId: number;
    answers: any[];
}

interface QuestionItem {
    label: string;
    id: number;
    answers: any[];
}

export default function convertQuestionTypeToAccordionItem(questions: Question[]): QuestionItem[] {
    return questions.map(question => ({
        label: question.name,
        id: question.id,
        answers: question.answers
    }));
}
