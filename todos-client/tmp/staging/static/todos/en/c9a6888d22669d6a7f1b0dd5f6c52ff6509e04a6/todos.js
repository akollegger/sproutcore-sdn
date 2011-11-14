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


