import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";

export class Link {
    constructor (public readonly href: string, public readonly text?:string, public readonly rel?:string, )
    {
        this.text = text || href;
        this.rel = rel || "none";
    }

}

@Injectable()
export class BPMNStore {
    private api:any;

    public links: Link[] = [];

    constructor (private http: Http) {
    }

    listDiagrams(): Observable<Link[]> {
        console.log( 'listDiagrams', this);
        return Observable.of([ new Link("/diagrams/pizza-collaboration.bpmn")]);
    }

}