import { Injectable } from '@angular/core';
// import axios from 'axios'

export const BASE_URL = 'https://api.themoviedb.org/3'; 
export const API_KEY = '8a732f489f66fcfb6feee9839dc02d76'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
    constructor() { }
    async fetchMovies(page: number = 1) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
                .then(res => res.json())
                .then(response => {
                    resolve(response);
                })
            }
            catch(error) {
                reject({ message: 'An error occurred', error })
            }
        })
    }

}
