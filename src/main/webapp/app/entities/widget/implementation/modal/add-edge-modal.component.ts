import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationService } from 'app/shared/services';
import 'rxjs/add/observable/of';
import { WidgetService } from '../..';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-add-edge-modal',
    templateUrl: './add-edge-modal.component.html',
    styleUrls: ['./add-edge-modal.component.scss']
})
export class AddEdgeModalComponent implements OnInit, AfterViewInit, OnDestroy {

    edgeClassesNames: string[];
    chosenEdgeClassName: string;
    sourceNode: any;
    targetNode: any;
    invertDirection: boolean = false;

    constructor(private eventManager: JhiEventManager,
        protected notificationService: NotificationService,
        public modalRef: BsModalRef,
        protected widgetService: WidgetService) { }

    ngOnInit() { }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }

    triggerEdgeSaving() {
        // trigger the edge-save event
        this.eventManager.broadcast({
            name: 'edgeClassChosenForNewEdge',
            edgeClassName: this.chosenEdgeClassName,
            action: 'save',
            sourceNode: this.sourceNode,
            targetNode: this.targetNode,
            invertDirection: this.invertDirection
        });

        this.modalRef.hide();
    }

    discardTempEdge() {
        // trigger the edge-save event
        this.eventManager.broadcast({
            name: 'edgeClassChosenForNewEdge',
            edgeClassName: this.chosenEdgeClassName,
            action: 'cancel'
        });

        this.modalRef.hide();
    }

    invertEdgeDirection() {
        const tmp = this.sourceNode;
        this.sourceNode = this.targetNode;
        this.targetNode = tmp;
        this.invertDirection = !this.invertDirection;
    }

}
