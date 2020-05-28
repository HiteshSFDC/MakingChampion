public with sharing class AccountsController {
   
    @auraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchKey)
    {
        if(String.isBlank(searchKey)){
            return [SELECT Id,Name,CreatedDate
                          FROM Account 
                          ORDER BY Name
                          LIMIT 20];
        }
        else {
            return getSearchedAccounts(searchKey);
        }
   }
    @auraEnabled(cacheable=true)
    public static List<Account> getMoreAccounts(String lastRowId){
        return [SELECT Id,Name,CreatedDate
                                  FROM Account 
                                  WHERE Id > :lastRowId
                                  ORDER BY Name
                                  LIMIT 20];
    }

    @auraEnabled(cacheable=true)
    public static List<Account> getfilteredAccounts(String fromDate,String toDate){
        Date dateFrom = Date.valueOf(fromDate);
        Date dateTo = Date.valueOf(toDate);
        if(dateFrom==null)
        dateFrom = Date.newInstance(Date.today().year()-1,01,01); //setting it to some past date
        if(dateTo==null)
        dateTo = Date.newInstance(Date.today().year()+1,01,01); //setting it to some future date
        return [SELECT Id,Name,CreatedDate
                                  FROM Account 
                                  WHERE CreatedDate >= :DateTime.newInstance(dateFrom.year(),dateFrom.month(),dateFrom.day())
                                  AND  CreatedDate  <= :DateTime.newInstance(dateTo.year(),dateTo.month(),dateTo.day())
                                  ORDER BY Name
                                  LIMIT 20
                                  ];
    }
    @auraEnabled(cacheable=true)
    public static List<Account> getMorefilteredAccounts(String fromDate,String toDate,String lastRowId){
        Date dateFrom = Date.valueOf(fromDate);
        Date dateTo = Date.valueOf(toDate);
        if(dateFrom==null)
        dateFrom = Date.newInstance(Date.today().year()-1,01,01); //setting it to some past date
        if(dateTo==null)
        dateTo = Date.newInstance(Date.today().year()+1,01,01); //setting it to some future date
        return [SELECT Id,Name,CreatedDate
                                  FROM Account 
                                  WHERE Id > :lastRowId
                                  AND CreatedDate >= :DateTime.newInstance(dateFrom.year(),dateFrom.month(),dateFrom.day())
                                  AND  CreatedDate  <= :DateTime.newInstance(dateTo.year(),dateTo.month(),dateTo.day())
                                  ORDER BY Name
                                  LIMIT 20
                                  ];
    }
    private static List<Account> getSearchedAccounts(String searchKey){
        String key = '%'+searchKey+'%';
        return[
            SELECT Id,Name,CreatedDate
                          FROM Account 
                          WHERE Name 
                          LIKE :key
                          ORDER BY Name
                          LIMIT 20
        ];
    }
   
}
