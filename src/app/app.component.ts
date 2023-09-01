import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public readonly year = new Date().getFullYear();
  public readonly contact = {
    items: [
      {name: 'LinkedIn', link: 'https://www.linkedin.com/in/endermejia/', img: 'linkedin'},
      {name: 'GitHub', link: 'https://github.com/endermejia', img: 'github'},
      {name: 'Instagram', link: 'https://www.instagram.com/gabri.mejia/', img: 'instagram'},
    ]
  }

}
