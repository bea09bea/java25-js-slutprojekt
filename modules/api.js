export async function fetchUrl(url) {
     const API_KEY = "b4a1bd763a4bbcb282c0f2ba68ad8fa7";

     const options = {
          method: 'GET',
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGExYmQ3NjNhNGJiY2IyODJjMGYyYmE2OGFkOGZhNyIsIm5iZiI6MTc3NjM0Njc4NC44MjQsInN1YiI6IjY5ZTBlNmEwNTBmYzMxYjRiM2FmOWJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tlR1JZIz7Eiijho_rr-8Lg13BOSC3wbl81HrS1S2JiA'
          }
     };

     const response = await fetch(url, options);
     const data = await response.json();
     return data;
     
  }