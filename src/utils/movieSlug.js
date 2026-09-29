export function createMovieSlug(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getMovieTitleFromSlug(slug) {
  return decodeURIComponent(slug).replace(/-/g, " ");
}