/* The weekly digest, in the places it shows up: the team channel, and the
   worklist that waits in the app every day. Static server components;
   render each inside the Shot wrapper. */

export { DigestEmail } from "./DigestEmail";
export { SlackDigest } from "./SlackDigest";
export { TodayWorklistMini } from "./TodayWorklistMini";
export { DIGEST, DIGEST_EVENTS, WORKLIST_MINI } from "./data";
export type { DigestEvent, DigestSeverity } from "./data";
