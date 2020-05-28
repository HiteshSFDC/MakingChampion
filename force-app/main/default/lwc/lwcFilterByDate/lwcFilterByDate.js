import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
const DELAY = 400;
export default class LwcFilterByDate extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    toDate;
    fromDate;
    handleFromDateChange(event) {
        this.fromDate = event.target.value;
        console.log('handlefromDateChange<<<<<' + this.fromDate);
    }
    handleToDateChange(event) {
        this.toDate = event.target.value;
    }
    handleClearFilter() {
        this.toDate = '';
        this.fromDate = '';
        this.handleApplyFilter();
    }
    handleApplyFilter() {
        const filters = {
            toDate: this.toDate,
            fromDate: this.fromDate
        };
        fireEvent(this.pageRef, 'filter_event', filters);
    }
}
