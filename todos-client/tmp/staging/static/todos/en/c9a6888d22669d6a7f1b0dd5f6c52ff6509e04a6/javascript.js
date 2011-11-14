/* >>>>>>>>>> BEGIN source/todos.js */
// ==========================================================================
// Project:   Todos
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

Todos = SC.Application.create({
  store: SC.Store.create({
           commitRecordsAutomatically: YES
         }).from('Todos.Neo4jDataSource')
});

Todos.Todo = SC.Record.extend({
  primaryKey: 'id',
  title: SC.Record.attr(String),
  isDone: SC.Record.attr(Boolean, { defaultValue: NO })
});

Todos.Todo.mixin({
  resourcePath: 'todo',
  pluralResourcePath: 'todos'
});

Todos.CreateTodoView = SC.TextField.extend({
  insertNewline: function() {
                   var value = this.get('value');

                   if (value) {
                     Todos.todoListController.createTodo(value);
                     this.set('value', '');
                   }
                 }
});

Todos.MarkDoneView = SC.Checkbox.extend({
  titleBinding: '.parentView.content.title',
  valueBinding: '.parentView.content.isDone'
});

Todos.StatsView = SC.TemplateView.extend({
  remainingBinding: 'Todos.todoListController.remaining',

  displayRemaining: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining == 1 ? " item" : " items");
  }.property('remaining')
});

Todos.todoListController = SC.ArrayController.create({
  // Initialize the array controller with an empty array
  content: [],

  createTodo: function(title) {
    var newTodo = Todos.store.createRecord(Todos.Todo, { title: title });
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length')
  }.property('@each.isDone'),
  
  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach( function(item) {
      item.destroy();
    });
  },

  allAreDone: function(key,value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
      return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')

});

SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });

  var todos = Todos.store.find(Todos.Todo);
  Todos.todoListController.set('content', todos);
});



/* >>>>>>>>>> BEGIN __sc_chance.js */
if (typeof CHANCE_SLICES === 'undefined') var CHANCE_SLICES = [];CHANCE_SLICES = CHANCE_SLICES.concat([]);

/* >>>>>>>>>> BEGIN source/data_sources/neo4j_data_source.js */
// ==========================================================================
// Project:   Todos.RestDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Todos.Neo4jDataSource = SC.DataSource.extend(
/** @scope Todos.Neo4jDataSource.prototype */ {

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
    var recordType = store.recordTypeFor(storeKey),
      id = store.idFor(storeKey);
  
    SC.Request.deleteUrl("/api/%@/%@".fmt(recordType.pluralResourcePath, id))
      .header({'Accept': 'application/json'})
      .notify(this, 'destroyRecordDidComplete', store, storeKey)
      .json().send();
  
    return YES;
  },

  destroyRecordDidComplete: function(response, store, storeKey) {
    var body = response.get('body');
    if(SC.ok(response) && response.get('status') === 200) {
      // Tell the store that we have successfully updated
      store.dataSourceDidDestroy(storeKey);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  }
  
  
}) ;

/* >>>>>>>>>> BEGIN source/resources/templates/todos.handlebars */
SC.TEMPLATES["todos"] = SC.Handlebars.compile("<h1>Todos</h1>\n{{#view Todos.CreateTodoView}}\n<input id=\"new-todo\" type=\"text\"\n       placeholder=\"What needs to be done?\" >\n{{/view}}\n\n{{#view Todos.StatsView id=\"stats\"}}\n  {{#view SC.Button classBinding=\"isActive\"\n    target=\"Todos.todoListController\"\n    action=\"clearCompletedTodos\"}}\n    Clear Completed Todos\n  {{/view}}\n  {{displayRemaining}} remaining\n{{/view}}\n\n{{view SC.Checkbox class=\"mark-all-done\" title=\"Mark All as Done\"\n  valueBinding=\"Todos.todoListController.allAreDone\"}}\n\n{{#collection SC.TemplateCollectionView \n  contentBinding=\"Todos.todoListController\"\n  itemClassBinding=\"content.isDone\"\n  itemClass=\"foo\"}}\n  {{view Todos.MarkDoneView}}\n{{/collection}}\n\n");
