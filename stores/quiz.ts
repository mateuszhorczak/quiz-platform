import type { Quiz, Question, Answer, QuizNames } from "~/types";

export const useQuizStore = defineStore('quiz', () => {
    const allQuizzes = ref<QuizNames[]>([])
    const currentQuiz = ref<Quiz>()
    const currentQuestion = ref<Question>()
    const currentAnswer = ref<Answer>()

    const createQuiz = async (name: string, description: string) => {
      try {
        await $fetch('/api/quiz', {
          method: 'POST',
          body: {
            name,
            description
          },
        })
        await getAllQuizzes()
      }
      catch (error) {
        console.error(error)
      }
    }

    const updateQuiz = async (id: number, name: string) => {
      try {
        await $fetch(`/api/quiz/${ id }`, {
          method: 'PATCH',
          body: {
            name
          }
        })

        await getQuizById(id)
      }
      catch (error) {
        console.error(error)
      }
    }

    const deleteQuiz = async (id: number) => {
      try {
        await $fetch(`/api/quiz/${ id }`, {
          method: 'DELETE',
        })

        await getAllQuizzes()
      }
      catch (error) {
        console.error(error)
      }
    }

    const getQuizById = async (id: number) => {
      try {
        const { data } = await useFetch<{ data: Quiz }>(`/api/quiz/${ id }`, {
          method: 'GET'
        })

        if (data.value) {
          currentQuiz.value = data.value.data
        }

      }
      catch (error) {
        console.error(error)
      }
    }

    const getAllQuizzes = async () => {
      try {
        const { data } = await useFetch<{ data: QuizNames[] }>("/api/quiz/all", {
          method: "GET",
        })

        if (data.value) {
          allQuizzes.value = data.value.data
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    const getQuestionById = async (id: number) => {
      try {
        const { data } = await useFetch<{ data: Question }>(`/api/quiz/${ id }`, {
          method: 'GET'
        })

        if (data.value) {
          currentQuestion.value = data.value.data
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    const deleteQuestion = async (id: number, quizId: number) => {
      try {
        await $fetch(`/api/question/${ id }`, {
          method: 'DELETE',
        })
        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }

    const updateQuestion = async (id: number, name: string, quizId: number) => {
      try {
        await $fetch(`/api/question/${ id }`, {
          method: 'PATCH',
          body: {
            name
          }
        })

        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }

    const createQuestion = async (name: string, quizId: number) => {
      try {
        await $fetch('/api/question', {
          method: 'POST',
          body: {
            name,
            quizId
          }
        })

        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }

    const getAnswerById = async (id: number) => {
      try {
        const { data } = await useFetch<{ data: Answer }>(`/api/answer/${ id }`, {
          method: 'GET'
        })

        if (data.value) {
          currentAnswer.value = data.value.data
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    const deleteAnswer = async (id: number, quizId: number) => {
      try {
        await $fetch(`/api/answer/${ id }`, {
          method: 'DELETE',
        })

        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }

    const updateAnswer = async (id: number, isCorrect: boolean, quizId: number) => {
      try {
        await $fetch(`/api/answer/${ id }`, {
          method: 'PATCH',
          body: {
            isCorrect
          }
        })

        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }

    const createAnswer = async (name: string, questionId: number, quizId: number) => {
      try {
        await $fetch('/api/answer', {
          method: 'POST',
          body: {
            name,
            questionId
          }
        })

        await getQuizById(quizId)
      }
      catch (error) {
        console.error(error)
      }
    }


    return {
      currentQuiz,
      allQuizzes,
      createQuiz,
      updateQuiz,
      deleteQuiz,
      getQuizById,
      getAllQuizzes,

      currentQuestion,
      getQuestionById,
      deleteQuestion,
      updateQuestion,
      createQuestion,

      currentAnswer,
      getAnswerById,
      deleteAnswer,
      updateAnswer,
      createAnswer,
    }
  }
)
