import { ApiService, BASE_URL, API_KEY } from './../services/api/apiService/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

interface MovieObj {
    page?: number
    results?: Array<Movie>
    total_results?: number
    total_pages?: number
}

interface Movie {
    poster_path?: string,
    adult?: boolean,
    overview?: string,
    release_date?: string,
    genre_ids?: Array<number>,
    id?: number,
    original_title?: string,
    original_language?: string,
    title?: string,
    backdrop_path?: string,
    popularity?: number,
    vote_count?: number,
    video?: false,
    vote_average?: number
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

    movieObj: MovieObj;

    movieList: Array<Movie> = [];

    baseUrl = 'https://image.tmdb.org/t/p/original';
    apiKey = API_KEY;
    activeMovie: Movie = null
    showing: boolean = false

    constructor(public apiService: ApiService, public loadingController: LoadingController) {}

    ngOnInit(): void {
        this.init();
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Updating List...',
        });
        await loading.present();
    
        return loading;
    }

    async init() {
        const loading = await this.presentLoading();
        try {
            this.movieObj = await this.apiService.fetchMovies();
            this.movieList = this.movieObj.results
        }
        catch (err) {
            console.log(err)
        }
        finally {
            await loading.dismiss();
        }
    }

    async updateMovieList(event: any) {
        const loading = await this.presentLoading();
        try {
            const page = Boolean(this.movieObj?.page) ? this.movieObj.page + 1 : 1
            this.movieObj = await this.apiService.fetchMovies(page);

            this.movieList = this.movieList.concat(this.movieObj.results)
            event.target.complete();
        }
        catch (err) {
            console.log(err)
        }
        finally {
            await loading.dismiss();
        }
    }

    showMovie (movie: Movie) {
        this.activeMovie = movie;
        this.showing = true
    }

    closeModal () {
        this.activeMovie = null;
        this.showing = false
    }

}
