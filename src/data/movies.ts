import { Movie, TVShow, Genre } from '../types';

export const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const trendingMovies: Movie[] = [
  {
    id: 1,
    title: 'Interstellar',
    overview:
      'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    poster_path: 'https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg',
    release_date: '2014-11-07',
    vote_average: 8.6,
    genre_ids: [878, 12, 18],
  },
  {
    id: 2,
    title: 'The Dark Knight',
    overview:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster_path: 'https://images.pexels.com/photos/3217681/pexels-photo-3217681.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    genre_ids: [28, 80, 18],
  },
  {
    id: 3,
    title: 'Inception',
    overview:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/1252812/pexels-photo-1252812.jpeg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    genre_ids: [28, 878, 12],
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster_path: 'https://images.pexels.com/photos/8112112/pexels-photo-8112112.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/7234213/pexels-photo-7234213.jpeg',
    release_date: '1994-10-14',
    vote_average: 8.9,
    genre_ids: [53, 80],
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster_path: 'https://images.pexels.com/photos/1687678/pexels-photo-1687678.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/2373729/pexels-photo-2373729.jpeg',
    release_date: '1994-09-23',
    vote_average: 9.3,
    genre_ids: [18, 80],
  },
  {
    id: 6,
    title: 'The Godfather',
    overview:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster_path: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg',
    release_date: '1972-03-24',
    vote_average: 9.2,
    genre_ids: [18, 80],
  },
];

export const trendingTVShows: TVShow[] = [
  {
    id: 101,
    name: 'Breaking Bad',
    overview:
      'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    poster_path: 'https://images.pexels.com/photos/7772415/pexels-photo-7772415.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    first_air_date: '2008-01-20',
    vote_average: 9.5,
    genre_ids: [18, 80],
  },
  {
    id: 102,
    name: 'Stranger Things',
    overview:
      'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.',
    poster_path: 'https://images.pexels.com/photos/7319086/pexels-photo-7319086.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/3354778/pexels-photo-3354778.jpeg',
    first_air_date: '2016-07-15',
    vote_average: 8.7,
    genre_ids: [18, 9648, 878],
  },
  {
    id: 103,
    name: 'Game of Thrones',
    overview:
      'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    poster_path: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/18368283/pexels-photo-18368283/free-photo-of-a-small-castle-on-a-mountain.jpeg',
    first_air_date: '2011-04-17',
    vote_average: 9.3,
    genre_ids: [10765, 18, 10759],
  },
  {
    id: 104,
    name: 'The Crown',
    overview:
      'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    poster_path: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/1484576/pexels-photo-1484576.jpeg',
    first_air_date: '2016-11-04',
    vote_average: 8.6,
    genre_ids: [18, 36],
  },
  {
    id: 105,
    name: 'The Mandalorian',
    overview:
      'After the fall of the Galactic Empire, a lone gunfighter makes his way through the lawless galaxy with his foundling.',
    poster_path: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/1276314/pexels-photo-1276314.jpeg',
    first_air_date: '2019-11-12',
    vote_average: 8.5,
    genre_ids: [10765, 10759, 18],
  },
  {
    id: 106,
    name: 'Succession',
    overview:
      'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.',
    poster_path: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg',
    backdrop_path: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg',
    first_air_date: '2018-06-03',
    vote_average: 8.8,
    genre_ids: [18, 35],
  },
];

export const actionMovies: Movie[] = trendingMovies.filter(movie => 
  movie.genre_ids.includes(28)
);

export const dramaMovies: Movie[] = trendingMovies.filter(movie => 
  movie.genre_ids.includes(18)
);

export const dramaShows: TVShow[] = trendingTVShows.filter(show => 
  show.genre_ids.includes(18)
);

export function getGenreNames(genreIds: number[]): string[] {
  return genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : '';
  }).filter(Boolean);
}