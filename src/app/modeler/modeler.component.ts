import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

import {PaletteProvider} from './palette';
import {CustomPropertiesProvider} from './props-provider';
import {BPMNStore, Link} from "../bpmn-store/bpmn-store.service";

const modeler = require("bpmn-js/lib/Modeler.js");
const propertiesPanelModule = require('bpmn-js-properties-panel');
const propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/bpmn');

import {CustomModdle} from './custom-moddle';
import {Observable} from "rxjs";

const customPaletteModule = {
    paletteProvider: ['type', PaletteProvider]
};
const customPropertiesProviderModule = {
    __init__: ['propertiesProvider'],
    propertiesProvider: ['type', CustomPropertiesProvider]
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

    url: string;
    _urls: Link[];
    extraPaletteEntries: any;

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
        this.store.listDiagrams()
            .do(links => this.urls = links)
            .do(() => console.log('Got links: ', this.urls))
            .flatMap(() => this.store.paletteEntries())
            .do(entries => this.extraPaletteEntries = entries)
            .do(() => console.log('Got entries: ', this.extraPaletteEntries))
            .subscribe(() => this.createModeler());
    }

    createModeler() {
        console.log('Creating modeler, injecting extraPaletteEntries: ', this.extraPaletteEntries);
        this.modeler = new modeler({
            container: containerRef,
            propertiesPanel: {
                parent: propsPanelRef
            },
            additionalModules: [
                {'extraPaletteEntries': ['type', () => this.extraPaletteEntries]},
                propertiesPanelModule,
                propertiesProviderModule,
                customPropertiesProviderModule,
                customPaletteModule,
            ],
            moddleExtensions: {
                ne: CustomModdle
            },
        });

        // Start with an empty diagram:
        this.url = this.urls[0].href;
        this.loadBPMN();
    }

    loadBPMN() {
        console.log('load', this.url, this.store);
        var canvas = this.modeler.get('canvas');
        this.http.get(this.url)
            .map(response => response.text())
            .map(data => this.modeler.importXML(data, this.handleError))
            .subscribe(x => x ? this.handleError(x) : this.postLoad())
        ;
    }

    postLoad() {
        var canvas = this.modeler.get('canvas');
        canvas.zoom('fit-viewport');
    }

    handleError(err: any) {
        if (err)
            console.log('error rendering', err);
    }

}

