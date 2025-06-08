import type { Answer, Question } from '~/types'

interface QuestionItem {
  label: string;
  id: number;
  answers: Answer[];
}

export default function convertQuestionTypeToAccordionItem(questions: Question[]): QuestionItem[] {
  if (!questions.length) return []
  return questions.map(question => ({
    label: question.name,
    id: question.id,
    answers: question.answers
  }));
}
