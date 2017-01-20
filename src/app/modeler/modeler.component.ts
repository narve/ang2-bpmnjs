import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

import {PaletteProvider} from './palette';
import {CustomPropertiesProvider} from './props-provider';
import {BPMNStore, Link} from "../bpmn-store/bpmn-store.service";

const modeler = require("bpmn-js/lib/modeler.js");
const propertiesPanelModule = require('bpmn-js-properties-panel');
const propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/bpmn');

// const customModdleDescriptor = require('./props.json');

import {CustomModdle} from './custom-moddle';



const customPaletteModule = {
    paletteProvider: ['type', PaletteProvider]
};
const customPropertiesProviderModule = {
    __init__: [ 'propertiesProvider' ],
    propertiesProvider: [ 'type', CustomPropertiesProvider ]
};

const containerRef = '#js-canvas';
const propsPanelRef = '#js-properties-panel';

@Component({
    templateUrl: './modeler.component.html',
    styleUrls: ['./modeler.component.css'],
    providers: [BPMNStore]
})
export class ModelerComponent implements OnInit {
    modeler: any;
    // bpmnURL: string = "/diagrams/pizza-collaboration.bpmn";
    // bpmnURL: string = "http://localhost/pv/api/ProcDef/9/xml";

    private url:string;
    private _urls: Link[];
    constructor(private http: Http, private store: BPMNStore) {
    }

    get urls(): Link[] {
        return this._urls;
    }
    set urls(u: Link[]) {
        console.log("urls: ", u);
        this._urls = u;
        this.url = u[0].href;
    }

    ngOnInit() {
        this.modeler = new modeler({
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule,
                customPropertiesProviderModule,
                customPaletteModule
            ],
            moddleExtensions: {
                ne: CustomModdle
            },
            container: containerRef,
            propertiesPanel: {
                parent: propsPanelRef
            }
        });

        this.store.listDiagrams()
            .map( links => links.map( link => this.procDefToLink(link)))
            .subscribe( links => this.urls = links);
    }

    procDefToLink( procDef: any): Link {
        let s = "the procdef: " + procDef;
        return new Link( `/pv/api/ProcDef/${procDef.id}/xml`, `#${procDef.id} ${procDef.name}`);
    }

    loadBPMN() {
        console.log( 'load', this.url, this.store );
        this.store.listDiagrams();
        var canvas = this.modeler.get('canvas');
        this.http.get(this.url)
            .toPromise()
            .then(response => response.text())
            .then(data => this.modeler.importXML(data, this.handleError))
            .then( x => x ? this.handleError(x) : this.postLoad() )
            .catch(this.handleError);
    }

    postLoad() {
        var canvas = this.modeler.get('canvas');
        canvas.zoom('fit-viewport');
    }

    handleError(err: any) {
        console.log('error rendering', err);
    }

}

