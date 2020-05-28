import { LightningElement } from 'lwc';

export default class LwcPaginator extends LightningElement {
    handlePrevious(){
        this.dispatchEvent(new CustomEvent('previous'));
    }
    handleNext(){
        this.dispatchEvent(new CustomEvent('next'));
    }
}