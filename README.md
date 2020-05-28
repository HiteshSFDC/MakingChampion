# Making Champion Task : 2

Offset is default set to 20.
## Features
1. Dynamic Search Functionality.
2. Dynamic Filtering on the basis of Dates.
3. Ability to fetch bulk records.
4. Records are retuned alphabetically.
5. Components are designed by following the Reusability approach.

## Concepts used in order to get 70,000 records :

As we know that we can get a max of 2000 records in a single query(here for the demo purpose I'm fetching 20 records).So what I'm doing is getting the Id of the last row returned i.e 2000th record( 20th in our case) and then when the used click on 'Increase row Offset button' the next 2000 records are being fetched if exists otherwise a toast poput appears saying "No more records in the org".
Reffered [DANIEL ZEIDLER's](https://sfdc.danielzeidler.com/2019/08/18/building-querymore-functionality-in-apex-a-soql-offset-alternative/) blog post for this.

## Scenarios Covered
### 1. If FILTER is applied

1.1 If filters are applied and there are more than 2000 records(20 in our case) for that particular filter, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records that satisfies that filter will be returned.
1.2 If User again click on the 'Increase row offset button' and if there are no more records a popup(toast notification specifically) will be fired stating that 'No more records fot the APPLIED FILTER'.

### 2. If no FILTER is applied.

2.1 If filter is not applied and there are more than 2000 records(20 in our case) in the org, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records will be returned.

2.2 If User again click on the 'Increase row offset button' and if there are no more records in the ORG a popup(toast notification specifically) will be fired stating that 'No more records in the ORG'.
