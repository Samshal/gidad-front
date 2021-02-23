import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventPublisherService {

  private behaviorSubjects: Map<string, BehaviorSubject<any>>;

	constructor() {
		this.behaviorSubjects = new Map<string, BehaviorSubject<any>>();
	}

  private getBehaviorSubject(identifier: string): BehaviorSubject<any> {
		let behaviorSubject: BehaviorSubject<any> = this.behaviorSubjects.get(identifier);
		if (!behaviorSubject) {
			behaviorSubject = new BehaviorSubject<any>(null);
			this.behaviorSubjects.set(identifier, behaviorSubject);
		}

		return behaviorSubject;
	}

  public getEvents(event: string): BehaviorSubject<any> {
		const behaviorSubject = this.getBehaviorSubject(event);
		return behaviorSubject;
	}

  public publishEvent(event: string, eventData: string): void {
		this.getBehaviorSubject(event).next(eventData);
	}  
}
