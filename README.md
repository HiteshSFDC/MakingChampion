# Making Champion Task : 2

Offset is default set to 20.
## Features
1. Dynamic Search Functionality.
2. Dynamic Filtering on the basis of Dates.
3. Ability to fetch bulk records.
4. Records are retuned alphabetically.
5. Components are designed by following the Reusability approach.

Read [this](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_offset.htm) before going further. You will understand better:)

## Concepts used in order to get 70,000 records :

We can use the OFFSET keyword in our query to et the subsequent records but as the requirement goes i.e getting 70,000 records here we can not use the OFFSET keyword, you know the reason now as you have gone through the above documentaion link.

So what I'm doing for solving the scenario is getting the Id of the last row returned i.e 2000th record( 20th in our case) on every apex call made and then when the used click on 'Increase row Offset button' the next 2000 records are being fetched using that last record Id from the previous apex call. And if no more records exist a toast popup appears saying "No more records in the org".
Reffered [DANIEL ZEIDLER's](https://sfdc.danielzeidler.com/2019/08/18/building-querymore-functionality-in-apex-a-soql-offset-alternative/) blog post for this.

## Scenarios Covered
### 1. If FILTER is applied

1.1 If filters are applied and there are more than 2000 records(20 in our case) for that particular filter, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records that satisfies that filter will be returned.
1.2 If User again click on the 'Increase row offset button' and if there are no more records a popup(toast notification specifically) will be fired stating that 'No more records fot the APPLIED FILTER'.

### 2. If no FILTER is applied.

2.1 If filter is not applied and there are more than 2000 records(20 in our case) in the org, fist 2000 records were returned and when the user click on 'increase row offset' the remaining records will be returned.

2.2 If User again click on the 'Increase row offset button' and if there are no more records in the ORG a popup(toast notification specifically) will be fired stating that 'No more records in the ORG'.
