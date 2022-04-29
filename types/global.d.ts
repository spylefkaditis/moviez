export {};

declare global {
  interface Movie {
    title: string;
    photoUrL: string;
    id: string;
  }
  interface Category {
    id: string;
    items: Movie[];
    title: string;
  }

  interface BallotType {
    items?: Category[];
  }
}
