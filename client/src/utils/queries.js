import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    id
    username
    email
    profilePicture
    listenedAlbums {
        id
        title
        artist
        albumPic
        releaseDate
      }
      wannaListenAlbums {
        id
        title
        artist
        albumPic
        releaseDate
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
    profilePicture
    listenedAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        # Add any additional fields you need from the listenedAlbums
        # ...
      }
      wannaListenAlbums {
        id
        albumName
        artistName
        albumPic
        releaseDate
        # Add any additional fields you need from the wannaListenAlbums
        # ...
      }
  }
}
`;