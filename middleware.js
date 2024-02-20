// Middleware is for the whole project
// when the user is not signed in, the user cannot see the content

export { default } from "next-auth/middleware";

// Applies next-auth only to the specific routes

export const config = { matcher: ["/secret"] };
