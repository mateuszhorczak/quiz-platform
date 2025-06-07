export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body.userAnswers)
  return { data: null }
})
