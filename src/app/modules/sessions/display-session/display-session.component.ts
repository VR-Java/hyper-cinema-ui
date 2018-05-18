import { Component, OnInit } from '@angular/core';
import {SessionService} from '../shared/session.service'
import { Session } from '../session-edit/session.model';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

export const sessionInStorage = "sessionInStorage";

@Component({
  selector: 'app-display-session',
  templateUrl: './display-session.component.html',
  styleUrls: ['./display-session.component.css']
})
export class DisplaySessionComponent implements OnInit {
  sessions:Session[] = [];
  session:Session;
  id :number;
  sub: Subscription;
  constructor(private sessionService: SessionService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.sessionService.get(id).subscribe((car: any) => {
          if (car) {
            this.session = car;
            console.log(car);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            
          }
        });
      }
    });


    
    // this.sessionService.get(this.id).subscribe(results => {
    //   this.session = results;
    //   console.log(this.session);
    // });
    
  }

  public setSessionToLocalStorage(session: DisplaySessionComponent){
    localStorage.setItem(sessionInStorage, JSON.stringify(session));
    console.log(localStorage.getItem(sessionInStorage));
    console.log("session send to the local storage");
  }

}
