import { Component, OnInit } from '@angular/core';
import {PostService} from '../Service/post.service';
import {PostData} from '../../model/post-data';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: Observable<Array<PostData>> ;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {

    this.posts = this.postService.getAllPost();


  }
}
