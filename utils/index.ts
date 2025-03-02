interface Question {
    id: number;
    name: string;
    quizId: number;
    answers: any[];
}

interface QuestionItem {
    label: string;
    slot: number;
    answers: any[];
}

export default function convertQuestionTypeToAccordionItem(questions: Question[]): QuestionItem[] {
    return questions.map(question => ({
        label: question.name,
        slot: question.id,
        content: question.answers
    }));
}
