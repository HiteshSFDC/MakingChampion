# Making Champion Task : 2

Offset is set to default 20.
Records are returned alphabetically.

## Concepts used in order to get 70,000 records :

As we know that we can get a max of 2000 records in a single query(here for the demo purpose I'm fetching 20 records).So what I'm doing is getting the Id of the last row returned i.e 2000th record( 20th in our case) and then when the used click on 'Increase row Offset button' the next 2000 records are being fetched if exists otherwise a toast poput appears saying "No more records in the org".

## Scenarios Covered
### 1. If FILTER is applied

1.1 If filters are applied and there are more than 2000 records(20 in our case) for that particular filter, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records that satisfies that filter will be returned.
1.2 If User again click on the 'Increase row offset button' and if there are no more records a popup(toast notification specifically) will be fired stating that 'No more records fot the APPLIED FILTER'.

### 2. If no FILTER is applied.

2.1 If filter is not applied and there are more than 2000 records(20 in our case) in the org, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records will be returned.

2.2 If User again click on the 'Increase row offset button' and if there are no more records in the ORG a popup(toast notification specifically) will be fired stating that 'No more records in the ORG'.
