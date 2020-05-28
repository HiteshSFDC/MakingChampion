import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
const DELAY = 350;
export default class LwcSearchBar extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    inputVal;
    //DEBOUNCING it in order to reduce APEX calls.
    handleChange(event) {
        this.inputVal = event.target.value;
        //console.log('Debounce' + this.inputVal);
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {

            console.log('Debounce11' + this.inputVal + ' <<' + event.detail);
            fireEvent(this.pageRef, 'search_value_event', this.inputVal);
        }, DELAY);

    }
}
