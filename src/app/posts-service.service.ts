import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interfaccia dei comments del post
export interface Comment {
  author: string;
  message: string;
}
// interfaccia dei post
export interface Post {
  id?: number;
  author: string;
  image: string;
  message: string;
  like?:[];
  comments?: Comment[];
}


@Injectable({
  providedIn: 'root'
})
export class PostsServiceService  {

  public apiUrl = 'https://fake-tweets-api.herokuapp.com/posts';
  private author = '';
  
  constructor(public httpClient: HttpClient) { }

  public allPost(): Promise<Post[]> {
    return this.httpClient.get<Post[]>(this.apiUrl).toPromise();
  }

  public newPost(post: Post): Promise<Post> {
    return this.httpClient.post<Post>(this.apiUrl, post).toPromise();
  }

  public getById(id: number): Promise<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/${id}`).toPromise();
  }

  public addMessage(postId: number, comment: Comment): Promise<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/${postId}/comments`, comment).toPromise();
  }

  getAuthor(): string {
      return this.author;
  }

  setAuthor(author: string) {
      this.author = author;
  }




}