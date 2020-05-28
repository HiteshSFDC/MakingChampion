import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountsController.getAccounts';
import getMoreAccounts from '@salesforce/apex/AccountsController.getMoreAccounts';
import getfilteredAccounts from '@salesforce/apex/AccountsController.getfilteredAccounts';
import getMorefilteredAccounts from '@salesforce/apex/AccountsController.getMorefilteredAccounts';
const columns = [
    { label: 'Label', fieldName: 'Name' },
    {
        label: 'Created Date', fieldName: 'CreatedDate', type: 'Date', typeAttributes: {  
            day: 'numeric',  
            month: 'short',  
            year: 'numeric',  
            hour: '2-digit',  
            minute: '2-digit',  
            second: '2-digit',  
            hour12: true},
    }
];
export default class LwcPanel extends LightningElement {
    data = [];
    count = 0;
    error;
    columns = columns;
    rowOffset = 0;
    lastRowId;
    isFilterApplied = false;
    toDate;
    fromDate;
    @wire(CurrentPageReference) pageRef;
    calledAgain = false;
    connectedCallback() {
        registerListener(
            'search_value_event',
            this.handleSearchChange,
            this
        );
        registerListener(
            'filter_event',
            this.handleFilterChange,
            this
        );
        if (!this.calledAgain) {
            getAccounts({ searchKey: '' })
                .then(result => {
                    this.data = result;
                    this.count = result.length;
                    this.lastRowId = this.data[this.data.length - 1];
                    const evt = new ShowToastEvent({
                        title: 'Toast Info',
                        message: this.count + ' ACCOUNTS RETURNED',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                })
                .catch(error => {
                    this.error = error;
                });
            this.calledAgain = true;
        }
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    //calling an Apex method imperatively
    increaseRowOffset() {
        console.log('increaseRowOffset');
        if (!this.isFilterApplied) {
            getMoreAccounts({ lastRowId: this.lastRowId.Id })
                .then(result => {
                    if (result.length == 0) {
                        const evt = new ShowToastEvent({
                            title: 'Toast Info',
                            message: 'NO MORE RECORDS IN THE ORG',
                            variant: 'error',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(evt);
                    }
                    else {
                        this.data = [...this.data, ...result];
                        this.lastRowId = this.data[this.data.length - 1];
                        this.count = result.length;
                        const evt = new ShowToastEvent({
                            title: 'Toast Info',
                            message: this.count + ' MORE ACCOUNTS RETURNED',
                            variant: 'success',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(evt);
                    }
                })
                .catch(error => {
                    this.error = error;
                    console.log('error' + error);
                });
        }
        else {
            getMorefilteredAccounts({ fromDate: this.fromDate, toDate: this.toDate, lastRowId: this.lastRowId.Id })
                .then(result => {
                    if (result.length == 0) {
                        const evt = new ShowToastEvent({
                            title: 'Toast Info',
                            message: 'No more records for the applied filter',
                            variant: 'error',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(evt);
                    }
                    else {
                        this.data = [...this.data, ...result];
                        this.lastRowId = this.data[this.data.length - 1];
                        this.count = result.length;
                        const evt = new ShowToastEvent({
                            title: 'Toast Info',
                            message: this.count + ' MORE FILTERED ACCOUNTS RETURNED',
                            variant: 'success',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(evt);
                    }
                })
                .catch(error => {
                    this.error = error;
                    console.log('error' + error);
                });
        }
    }
    handleSearchChange(inputVal) {
        getAccounts({ searchKey: inputVal })
            .then(result => {
                this.data = result;
            })
            .catch(error => {
                this.error = error;
            });
    }
    handleFilterChange(filters) {
        if (filters.fromDate === '' && filters.toDate === '') {
            this.isFilterApplied = false;
            getAccounts({ searchKey: '' })
                .then(result => {
                    this.data = result;
                    this.lastRowId = this.data[this.data.length - 1];
                    this.count = result.length;
                    const evt = new ShowToastEvent({
                        title: 'Info',
                        message: 'FILTER CLEARED',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                })
                .catch(error => {
                    this.error = error;
                });
        }
        else {
            this.isFilterApplied = true;
            this.fromDate = filters.fromDate;
            this.toDate = filters.toDate;
            getfilteredAccounts({ fromDate: this.fromDate, toDate: this.toDate })
                .then(result => {
                    this.data = result;
                    this.lastRowId = this.data[this.data.length - 1];
                    this.count = result.length;
                    const evt = new ShowToastEvent({
                        title: 'FILTER SUCCESSFULLY APPLIED',
                        message: this.count + ' ACCOUNTS RETURNED',
                        variant: 'success',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                })
                .catch(error => {
                    this.error = error;
                });
        }
    }
}