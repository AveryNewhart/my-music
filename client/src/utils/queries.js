import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    id
    username
    email
    savedMusic {
        musicId
        artist
        albumName
        songName
        releaseDate
        genre
    }
    reviews {
      reviewId
      reviewText
      reviewAuthor
      createdAt
      musicTitle {
        artist
        albumName
        songName
      }
    }
  }
}
`;

export const QUERY_PROTECTED = gql`
query protected {
  protected {
    id
    username
    email
    savedMusic {
        musicId
        artist
        albumName
        songName
        releaseDate
        genre
    }
    reviews {
      reviewId
      reviewText
      reviewAuthor
      musicTitle {
        artist
        albumName
        songName
      }
    }

  }
}
`;