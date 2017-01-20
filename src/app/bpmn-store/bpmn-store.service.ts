import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable, Subscription} from "rxjs";

export class Link {
    constructor (public readonly href: string, public readonly text?:string, public readonly rel?:string, )
    {
    }

    static parseHref(s: string) {
        return Link.stripQuotes(s.trim());
    }

    static parseRelType(s: string = "") {
        return Link.stripQuotes(s.split("=")[1]);
    }

    static stripQuotes(s: string) {
        return (s && s.length >= 2) ? s.substring(1, s.length-1) : null;
    }
}

@Injectable()
export class BPMNStore {

    // private dummyList:string[] = [ "/diagrams/pizza-collaboration.bpmn"];
    // private dummyList:string[] = [ "http://localhost/pv/api/ProcDef/9/xml"];

    private api:any;

    public links: Link[] = [ new Link("/diagrams/pizza-collaboration.bpmn")];

    constructor (private http: Http) {
        console.log( 'Constructing service', this);
        this.fetchRootLinks()
            .subscribe( links => this.setRootLinks(links));
    }

    fetchRootLinks(): Observable<Link[]> {
        return this.http.get("/pv/api")
            .map( x => ({json: x.json(), links: this.parseLinks(x.headers)}))
            .map( o => o.links);
    }

    listDiagrams(): Observable<Link[]> {
        console.log( 'listDiagrams', this);
        let defLink = this.links.find( l => l.rel == "definitions");
        if( !defLink) {
            // throw new Error( "Does not have defLink yet? " + this.links.length);
            return this.fetchRootLinks()
                .map( links => links.find( l => l.rel == "definitions"))
                .flatMap( l => this.http.get(l.href).map( r => r.json()));
                // .subscribe( l => console.log( 'now got link', l));
            // return null;
        }
        return this.http
            .get( defLink.href)
            .map( r => r.json());
            // .subscribe(
            //     r => console.log( "OK defs: ", r),
            //     r => console.log( "ERROR defs: ", r),
            // );
        // return this.links.map( l => l.href);
    }

    private parseLinks(headers: Headers): Link[] {
        return headers
            .get("link")
            .split( ",")
            .map( s => s.split( ";"))
            .map( sa => new Link(Link.parseHref( sa[0]), sa[2], Link.parseRelType( sa[1])));
    }

    private setRootLinks(links: Link[]) {
        this.links = links;
        links.forEach( l => console.log( "Link: ", l));
    }
}