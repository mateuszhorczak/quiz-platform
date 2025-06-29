import type {
  Quiz,
  Question,
  Answer,
  QuizNames,
  QuizSolve,
  QuestionWithUserAnswers,
  Result
} from "~/types";

export const useQuizStore = defineStore('quiz', () => {
    const allQuizzes = ref<QuizNames[]>([])
    const userQuizzes = ref<QuizNames[]>([])
    const currentQuiz = ref<Quiz>()
    const currentQuestion = ref<Question>()
    const currentAnswer = ref<Answer>()
    const quizToSolve = ref<QuizSolve>()
    const solvedQuiz = ref<Result>()

    const allQuestionInQuiz = useCookie<boolean>("settings:allQuestionInQuiz", { default: () => false, watch: true })

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

    const getUserQuizzes = async (userId: number) => {
      try {
        const { data } = await useFetch<{ data: QuizNames[] }>(`/api/quiz/user/${ userId }`, {
          method: "GET",
        })

        if (data.value) {
          userQuizzes.value = data.value.data
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

        if (!data.value) return
        currentAnswer.value = data.value.data
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

    const getQuizToSolveByQuizId = async (id: number) => {
      try {
        const { data } = await useFetch<{ data: QuizSolve }>(`/api/quiz/${ id }/solve`, {
          method: 'GET',
          query: { allQuestionInQuiz }
        })

        if (!data.value) return
        quizToSolve.value = data.value.data
      }
      catch (error) {
        console.error(error)
      }
    }

    const solveQuiz = async (id: number, userAnswers: QuestionWithUserAnswers[]) => {
      // solve quiz and return results and user answer
      const { data } = await useFetch<{ data: Result }>(`/api/quiz/${ id }/solve`, {
        method: 'POST',
        body: {
          userAnswers
        }
      })
      if (!data.value) return

      solvedQuiz.value = data.value.data
    }

    return {
      currentQuiz,
      allQuizzes,
      userQuizzes,
      createQuiz,
      updateQuiz,
      deleteQuiz,
      getQuizById,
      getAllQuizzes,
      getUserQuizzes,

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

      quizToSolve,
      solvedQuiz,
      getQuizToSolveByQuizId,
      solveQuiz,

      allQuestionInQuiz,
    }
  }
)
