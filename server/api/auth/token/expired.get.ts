import { isTokenExpired } from "~/server/jwtModule";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    if (query.token) {
      const isExpired = isTokenExpired(query.token as string)
      return { data: isExpired }
    }

  }
  catch (error) {
    console.error("Error processing request:", error);
  }
});
