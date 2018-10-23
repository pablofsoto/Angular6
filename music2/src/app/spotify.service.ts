import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';  
import { map, filter, scan } from 'rxjs/operators';
//import { environment } from '../environments/environment';
 
 
// import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(public http: Http) { }

     query(
      URL: string,
      params?: Array<string>
    ): Observable<any[]> {
      let queryURL = `${SpotifyService.BASE_URL}${URL}`;
      if (params) {
        queryURL = `${queryURL}?${params.join('&')}`;
      }
      const apiKey = 'BQBs-DAUHeU1aPPCLD9LezuD9I3Q-Bww8KsnrtkpssgXPTpDaDRifeMsq8IFs5fo_xu_5VL-ZRFUb10EcUmJ5bNn-C7QpyKdE8WJzSRXKh_NWFifQhENVDlFV9fhuO2uNl73X1TzUIGlrY2MkAzXf2S0w0G9X1RM89oMniYhueH9z2Asi0pMQyYTn9nmWzEs9W6sTvqa0KbxyVPsjLd9T3S7b3rkP5f-deYoHnPDVwLZucpN6Vgd9krs_ShqaQn1XWO2y5KQJwk_tr-h'; //environment.SpotifyApiKey;
      const headers = new Headers({
        Authorization: `Bearer ${apiKey}`
      });
      const options = new RequestOptions({
        headers: headers
      });

      return this.http
        .request(queryURL, options)
        .pipe(map((res: any) => res.json()));
    }

    search(query: string, type: string): Observable<any[]> {
      return this.query(`/search`, [
        `q=${query}`,
        `type=${type}`
      ]);
    }

    searchTrack(query: string): Observable<any[]> {
      return this.search(query, 'track');
    }

    getTrack(id: string): Observable<any[]> {
      return this.query(`/tracks/${id}`);
    }
  
    getArtist(id: string): Observable<any[]> {
      return this.query(`/artists/${id}`);
    }
  
    getAlbum(id: string): Observable<any[]> {
      return this.query(`/albums/${id}`);
    }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
