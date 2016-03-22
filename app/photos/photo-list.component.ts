
import {Component, OnInit}   from 'angular2/core';
import {Photo, PhotoService}   from './photo.service';
import {Router, RouteParams} from 'angular2/router';

@Component({
  templateUrl:'app/photos/photoTemplate.html'
})
export class PhotoListComponent implements OnInit {
  photos: Photo[];
  show:string;
  errorMessage: string;
  private _selectedId: number;
  counter:Number;
  private data=[];

  constructor(
    private _service: PhotoService,
    private _router: Router,
    routeParams: RouteParams) {
      this._selectedId = +routeParams.get('id');
  }

  isSelected(photo: Photo) { return photo.id === this._selectedId; }

  onSelect(photo: Photo) {
    this._router.navigate( ['PhotoDetail', { id: photo.id }] );
  }
  ngOnInit() {
    this.counter=1;
    this.show='show';
    this.getPhotos();
  }
  getPhotos() {
    this._service.getPhotos(this.counter,15)
        .subscribe(
            photos =>  {this.data=this.data.concat(photos);this.photos=<Photo[]>this.data;this.show='hide';},
            error =>  this.errorMessage = <any>error);
  }
  getPhoto(id: number | string) {
    return  this.data.filter(h => h.id === +id)[0];
  }
  onScroll () {
    //noinspection TypeScriptValidateTypes
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      this.counter++;
      this.show='show';
      this.getPhotos();
    }
  }
}