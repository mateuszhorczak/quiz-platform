export default defineEventHandler(async () => {

  try {
    // Delete quiz // TODO: delete quiz
    console.log('WORK IN PROGRESS ')
  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
