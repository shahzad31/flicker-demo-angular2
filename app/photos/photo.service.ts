import {Injectable} from 'angular2/core';
import {Http, Response,URLSearchParams,Headers} from 'angular2/http'
import 'rxjs/Rx';



export class Photo {
	constructor(public id: number, public title: string,public url_q:string) { }
}

@Injectable()
export class PhotoService {
	private _heroesUrl = 'https://api.flickr.com/services/rest/?';
	constructor (private http: Http) {}
	getPhotos(page,pageSize) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('api_key', 'a710162ffc6dff3a9f755c64ae24c90a');
		params.set('format','json');
		params.set('nojsoncallback','1');
		params.set('extras','url_q');
		params.set('per_page',pageSize);
		params.set('method','flickr.photos.search');
		params.set('text','*');
		params.set('page',page);
		//noinspection TypeScriptUnresolvedFunction
		return this.http.get(this._heroesUrl,{search:params,method:'GET',}).map(res => res.json().photos.photo)
			.do(data => console.log(data)) // eyeball results in the console
			.catch(this.handleError);
	}

	getPhoto(id: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('api_key', 'a710162ffc6dff3a9f755c64ae24c90a');
		params.set('format','json');
		params.set('photo_id',id);
		params.set('method','flickr.photos.getInfo');
		params.set('nojsoncallback','1');
		//noinspection TypeScriptUnresolvedFunction
		return this.http.get(this._heroesUrl,{search:params,method:'GET',}).map(res => res.json().photo)
			.do(data => console.log(data)) // eyeball results in the console
			.catch(this.handleError);
	}
	private handleError (error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
	}
}