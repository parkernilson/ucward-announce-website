// Prerender every page to complete static HTML at build time, so crawlers and reviewers
// (e.g. the toll-free verification check) can read the content without running JavaScript.
// The page then hydrates in the browser as usual.
export const prerender = true;
