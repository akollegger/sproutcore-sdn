// ==========================================================================
// Project:   Todos.RestDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Todos.RestDataSource = SC.DataSource.extend(
/** @scope Todos.RestDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    //SC.Request.getUrl('http://localhost:8080/roo-todo/%@/'.fmt(query.recordType.pluralResourcePath))
    SC.Request
      .getUrl('/api/%@'.fmt(query.recordType.pluralResourcePath))
      .header({'Accept': 'application/json'})
      .json()
      .notify(this, 'fetchDidComplete', store, query)
      .send()
 
    return YES;
  },
 
  fetchDidComplete: function(response, store, query) {
    if(SC.ok(response)) {
      var recordType = query.get('recordType'),
        records = response.get('body');
     
      store.loadRecords(recordType, records);
      store.dataSourceDidFetchQuery(query);
     
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey),
      data = store.readDataHash(storeKey);
   
    SC.Request.postUrl("/api/%@".fmt(recordType.pluralResourcePath))
      .header({'Accept': 'application/json'})
      .notify(this, 'createRecordDidComplete', store, storeKey)
      .json().send(data);
   
    return YES;
  },
 
  createRecordDidComplete: function(response, store, storeKey) {
    var body = response.get('body');
    if(SC.ok(response) && response.get('status') === 200) {
      // Tell the store that we have successfully updated
      store.dataSourceDidComplete(storeKey, null, body.id);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.
    var recordType = store.recordTypeFor(storeKey),
      id = store.idFor(storeKey),
      data = store.readDataHash(storeKey);
   
    SC.Request.putUrl("/api/%@/%@".fmt(recordType.pluralResourcePath, id))
      .notify(this, 'updateRecordDidComplete', store, storeKey, id)
      .header({'Accept': 'application/json'})
      .json().send(data);
   
    return YES;
  },
 
  updateRecordDidComplete: function(response, store, storeKey, id) {
    if(SC.ok(response) && response.get('status') === 200) {
      // Tell the store that we have successfully updated
      store.dataSourceDidComplete(storeKey);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
    
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('todos');