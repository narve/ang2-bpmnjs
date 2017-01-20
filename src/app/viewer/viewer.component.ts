import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'bpmn-js';

const bpmn = require("bpmn-js");

@Component({
    selector: 'viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
    viewer: any;
    title: string = 'Angular 2 with BPMN-JS';

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.viewer = new bpmn({container: '#canvas'});
        this.loadSampleBPMN();
    }

    handleError(err: any) {
        if (err) {
            console.log('error rendering', err);
        } else {
            console.log('rendered');
        }
    }

    loadSampleBPMN() {
        const url = '/diagrams/pizza-collaboration.bpmn';
        this.http.get(url)
            .toPromise()
            .then(response => response.text())
            .then(data => this.viewer.importXML(data, this.handleError))
            .catch(this.handleError);
    }

}
