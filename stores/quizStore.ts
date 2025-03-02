import type { Quiz, Question, Answer, QuizNames } from "~/types";

export const useQuizStore = defineStore('quiz', () => {
    const quizId = ref(0)

    // Quiz section ----
    const { data: currentQuiz, refresh: refreshCurrentQuiz, error: errorFetchCurrentQuiz } = useFetch<
        Quiz
    >("/api/quiz", {
        // headers: { Authorization: 'Bearer ' + auth.token },
        query: { id: quizId },
        // @ts-ignore
        transform: (response) => response.data,
        lazy: true,
        watch: [quizId],
        immediate: false
    })

    const fetchQuiz = async (id: number) => {
        quizId.value = id
        await refreshCurrentQuiz()
        if (errorFetchCurrentQuiz.value) {
            console.error(errorFetchCurrentQuiz.value)
        }
    }

    const { data: allQuizzes, refresh: refreshAllQuizzes, error: errorFetchAllQuizzes } = useFetch<
        QuizNames
    >("/api/quiz/all", {
        // headers: { Authorization: 'Bearer ' + auth.token },
        // @ts-ignore
        transform: (response) => response.data,
        // lazy: true, // TODO: don't necessary IMO
        immediate: false
    })

    const fetchAllQuizzes = async () => {
        await refreshAllQuizzes()
        if (errorFetchAllQuizzes.value) {
            console.error(errorFetchAllQuizzes.value)
        }
    }

    const createQuiz = async (name: string, description: string) => {
        // notesCollectionId.value = collectionId TODO: not needed in this case IMO but check it

        await $fetch("/api/quiz", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "POST",
            body: {
                name: name,
                description: description
            },
        }).catch((err) => console.error(err));

        await refreshAllQuizzes()
    }

    const updateQuiz = async (id: number, name: string) => {
        await $fetch("/api/quiz", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "PATCH",
            body: {
                id: id,
                name: name
            },
        }).catch((err) => console.error(err));

        // await refreshQuestion()
    }

    const deleteQuiz = async (id: number) => {
        await $fetch("/api/quiz", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "DELETE",
            query: {
                id: id,
            },
        }).catch((err) => console.error(err));

        // await refreshQuestion()
    }

    // Question section ----
    const questionId = ref(0)
    const { data: question, refresh: refreshQuestion, error: errorFetchQuestion } = useFetch<
        Question
    >("/api/quiz/question", {
        // headers: { Authorization: 'Bearer ' + auth.token },
        query: { id: questionId },
        // @ts-ignore
        transform: (response) => response.data,
        lazy: true,
        watch: [questionId],
        immediate: false
    })

    const fetchQuestion = async (id: number) => {
        questionId.value = id
        await refreshQuestion()
        if (errorFetchQuestion.value) {
            console.error(errorFetchQuestion.value)
        }
    }

    const createQuestion = async (name: string, quizId: number) => {
        // notesCollectionId.value = collectionId TODO: not needed in this case IMO but check it

        await $fetch("/api/quiz/question", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "POST",
            body: {
                name: name,
                quizId: quizId
            },
        }).catch((err) => console.error(err));

        await refreshCurrentQuiz()
    }

    const updateQuestion = async (id: number, name: string) => {
        await $fetch("/api/quiz/question", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "PATCH",
            body: {
                id: id,
                name: name
            },
        }).catch((err) => console.error(err));

        await refreshQuestion()
    }

    const deleteQuestion = async (id: number) => {
        await $fetch("/api/quiz/question", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "DELETE",
            query: {
                id: id,
            },
        }).catch((err) => console.error(err));

        await refreshCurrentQuiz()
    }

    // Answer section ----
    const answerId = ref(0)
    const { data: answer, refresh: refreshAnswer, error: errorFetchAnswer } = useFetch<
        Answer
    >("/api/quiz/answer", {
        // headers: { Authorization: 'Bearer ' + auth.token },
        query: { id: answerId },
        // @ts-ignore
        transform: (response) => response.data,
        lazy: true,
        watch: [answerId],
        immediate: false
    })

    const fetchAnswer = async (id: number) => {
        answerId.value = id
        await refreshAnswer()
        if (errorFetchAnswer.value) {
            console.error(errorFetchAnswer.value)
        }
    }

    const createAnswer = async (name: string, questionId: number) => {
        // notesCollectionId.value = collectionId TODO: not needed in this case IMO but check it

        await $fetch("/api/quiz/answer", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "POST",
            body: {
                name: name,
                questionId: questionId
            },
        }).catch((err) => console.error(err));

        await refreshCurrentQuiz()
    }

    const updateAnswer = async (id: number, isCorrect: boolean) => {
        await $fetch("/api/quiz/answer", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "PATCH",
            body: {
                id: id,
                isCorrect: isCorrect
            },
        }).catch((err) => console.error(err));

        // await refreshAnswer()
    }

    const deleteAnswer = async (id: number) => {
        await $fetch("/api/quiz/answer", {
            // headers: { Authorization: 'Bearer ' + auth.token },
            method: "DELETE",
            query: {
                id: id,
            },
        }).catch((err) => console.error(err));

        await refreshCurrentQuiz()
    }

    return {
        // Quizzes section
        currentQuiz,
        fetchQuiz,
        allQuizzes,
        fetchAllQuizzes,
        createQuiz,
        updateQuiz,
        deleteQuiz,

        // Question section
        question,
        fetchQuestion,
        createQuestion,
        updateQuestion,
        deleteQuestion,

        // Answer section
        answer,
        fetchAnswer,
        createAnswer,
        updateAnswer,
        deleteAnswer
    }
})
