import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }
  
  getUser() {
    const token = this.getToken();
    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken);
    //   return decodedToken.user; // Assuming the user object is stored under the "user" property in the token payload
    // }
    return decodedToken.data.username || decodedToken.data.email;
  }
    return null;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

// eslint-disable-next-line
export default new AuthService();


// import decode from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

//   loggedIn() {
//     const token = this.getToken();
//     // If there is a token and it's not expired, return `true`
//     return token && !this.isTokenExpired(token) ? true : false;
//   }

//   isTokenExpired(token) {
//     // Decode the token to get its expiration time that was set by the server
//     const decoded = decode(token);
//     // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
//     if (decoded.exp < Date.now() / 1000) {
//       localStorage.removeItem('id_token');
//       return true;
//     }
//     // If token hasn't passed its expiration time, return `false`
//     return false;
//   }

//   getUser() {
//     const token = this.getToken();
//     if (token) {
//       const decodedToken = decode(token);
//       return decodedToken.user; // Assuming the user object is stored under the "user" property in the token payload
//     }
//     return null;
//   }


//   getToken() {
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     localStorage.removeItem('id_token');
//     window.location.reload();
//   }
// }
// eslint-disable-next-line
// export default new AuthService();
