/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
TestControls = SC.Application.create(
  /** @scope TestControls.prototype */ {

  NAMESPACE: 'TestControls',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN __sc_chance.js */
if (typeof CHANCE_SLICES === 'undefined') var CHANCE_SLICES = [];CHANCE_SLICES = CHANCE_SLICES.concat([]);

/* >>>>>>>>>> BEGIN source/controllers/alert.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

TestControls.alertController = SC.Controller.create({
  alertType: 'error',
  buttonCount: 1,

  message: "Hello, World!",
  description: "This is a description...",
  caption: "And this is a caption.",

  button1Title: "OK",
  button2Title: "Cancel",
  button3Title: "Nokay",

  showAlert: function() {
    var args = [];
    args.push(this.get('message'));
    args.push(this.get('description'));
    args.push(this.get('caption'));
    args.push(this.get('button1Title'));

    if (this.get('buttonCount') > 1) {
      args.push(this.get('button2Title'));
    }

    if (this.get('buttonCount') > 2) {
      args.push(this.get('button3Title'));
    }

    SC.AlertPane[this.get('alertType')].apply(SC.AlertPane, args);
  }
});


/* >>>>>>>>>> BEGIN source/controllers/buttons.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

TestControls.buttonsController = SC.Controller.create({
  theme: 'square',
  
  toggleable: YES,
  selected: NO,
  disabled: NO,
  'default': NO,
  
  buttonBehavior: function() {
    if (this.get('toggleable')) return SC.TOGGLE_BEHAVIOR;
    return SC.PUSH_BEHAVIOR;
  }.property('toggleable').cacheable()
});
/* >>>>>>>>>> BEGIN source/controllers/categories.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

/** @class
  @extends SC.CategoriesController
*/
TestControls.rootCategory = SC.Object.create({
  treeItemIsExpanded: YES,
  treeItemChildren: [
    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Controls",
      treeItemChildren: [
        SC.Object.create({
          name: "Buttons",
          show: "buttons_page"
        }),
        SC.Object.create({
          name: "Checkboxes",
          show: "checkboxes_page"
        }),
        SC.Object.create({
          name: "Progress",
          show: "progress_page"
        }),
        SC.Object.create({
          name: "Radio",
          show: "radio_page"
        }),
        SC.Object.create({
          name: "Segmented Button",
          show: "segmented_page"
        }),
        SC.Object.create({
          name: "Select Button",
          show: "select_page"
        }),
        SC.Object.create({
          name: "Sliders",
          show: "sliders_page"
        }),
        SC.Object.create({
          name: "Tabbed View",
          show: "tab_page"
        })
      ]
    }),

    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: 'Panels',
      treeItemChildren: [
        SC.Object.create({
          name: 'Panels',
          show: 'panels_page'
        })
      ]
    }),

    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Collections",
      treeItemChildren: [
        SC.Object.create({
          name: "List",
          show: "list_page"
        })
      ]
    }),
    
    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Fields",
      treeItemChildren: [
        SC.Object.create({
          name: "Text Field",
          show: "text_field_page"
        })
      ]
    }),
    
    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Layout",
      treeItemChildren: [
        SC.Object.create({
          name: "Flowed Layout",
          show: "flow_layout_page"
        }),
        SC.Object.create({
          name: "Split",
          show: "split_page"
        })
      ]
    }),
    
    SC.Object.create({
      treeItemIsExpanded: YES,
      group: true,
      name: "Scroll",
      treeItemChildren: [
        SC.Object.create({
          name: "Simple",
          show: "scroll_page"
        })
      ]
    })
    
  ]
});

TestControls.categoriesController = SC.TreeController.create(
/** @scope SampleControls.appController.prototype */ {
  treeItemIsGrouped: YES
}) ;

/* >>>>>>>>>> BEGIN source/controllers/category.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TestControls.categoryController = SC.ObjectController.create(
/** @scope SampleControls.categoryController.prototype */ {
  contentBinding: "TestControls.categoriesController.selection",
  contentBindingDefault: SC.Binding.single(),
  
  nowShowing: "welcome",
  
  delayShow: function() {
    // wait a moment before loading to let things finish...
    this.set("nowShowing", this.get("show") || "welcome");
    this.hideMasterPicker();
  }.observes("show"),
  
  hideMasterPicker: function() {
    TestControls.mainPage.mainPane.split.hideMasterPicker();
  },
  
  useDarkTheme: NO,
  themeName: function() {
    return this.get('useDarkTheme') ? 'dark' : 'ace';
  }.property('useDarkTheme').cacheable()
}) ;

/* >>>>>>>>>> BEGIN source/controllers/select.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

TestControls.buttonsController = SC.Controller.create({
  selectedValue: 'printer:a'
});


/* >>>>>>>>>> BEGIN source/controllers/split.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2010 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

TestControls.splitController = SC.Controller.create({
  shouldResizeChildrenToFit: YES,
  layoutDirection: SC.LAYOUT_HORIZONTAL,
  
  shouldResizeChildrenToFitDidChange: function() {
    this.invokeLater(function() { 
      TestControls.mainPage.split_page.scroll.contentView.set('layout', {
        left: 0, right: 0, top: 0, bottom: 0
      });
    });
  }.observes('shouldResizeChildrenToFit'),
  
  addChild: function() {
    TestControls.mainPage.split_page.scroll.contentView.appendChild(
      TestControls.SplitColumn.create()
    );
    
    // it is nice to have a divider at the end if not shouldResizeChildrenToFit
    if (this.get('shouldResizeChildrenToFit')) return;
    TestControls.mainPage.split_page.scroll.contentView.appendChild(
      SC.SplitDividerView.create()
    );
  },
  
  removeChild: function() {
    var split = TestControls.mainPage.split_page.scroll.contentView,
        c = split.get('childViews');
    if (c.length > 0) {
      split.removeChild(c[c.length - 1]);
    }
  },

  children: [],

  allAllowIndirect: function(key, value) {
    if (value !== undefined) {
      this.get('children').setEach('allowsIndirectAdjustments', value);
      return value;
    } else {
      if (!this.get('children')) return NO;
      var isYES = this.get('children').everyProperty('allowsIndirectAdjustments', YES),
          isNO = this.get('children').everyProperty('allowsIndirectAdjustments', NO);

      if (isYES) return YES;
      if (isNO) return NO;
      return SC.MIXED_STATE;
    }
  }.property('children', 'children.@each.allowsIndirectAdjustments').cacheable(),

  allCompensateForMovement: function(key, value) {
    if (value !== undefined) {
      this.get('children').setEach('compensatesForMovement', value);
      return value;
    } else {
      if (!this.get('children')) return NO;
      var isYES = this.get('children').everyProperty('compensatesForMovement', YES),
          isNO = this.get('children').everyProperty('compensatesForMovement', NO);

      if (isYES) return YES;
      if (isNO) return NO;
      return SC.MIXED_STATE;
    }
  }.property('children', 'children.@each.compensatesForMovement').cacheable()

  
});

/* >>>>>>>>>> BEGIN source/resources/strings.js */
// ==========================================================================
// SampleControls English Strings
// ==========================================================================

// Place strings you want to localize here.  In your app, use the key and
// localize it using "key string".loc().  HINT: For your key names, use the
// english string with an underscore in front.  This way you can still see
// how your UI will look and you'll notice right away when something needs a
// localized string added to this file!
//
SC.stringsFor('en',{
  
  "Loc.Title": "Localized Title!",
  "Loc.Label": "Localized Label!",
  
 // Global
  "Class": "Class",
 // TabView
  "Welcome_tab": "Welcome",
  "Collections_tab": "Collections",
  "Collections2_tab": "Collections2",
  "Buttons_tab": "Buttons",
  "Panes_tab": "Panes",
  "Forms_tab": "Forms",
  "Icons_tab": "Icons",

 // Text body.rhtml
  "Title_body": "Sample Controls",
  "Text_body": "SproutCore comes bundled with a wide array of controls that you can use in your own applications. Most of these controls can be created very easily using the built-in view helper functions. Consult the source code of this application for samples code to use in your own application.",

 // Text collections.rhtml

 // Text collections2.rhtml

 // Text forms.rhtml
  "Title_forms": "Forms",
  "Text_forms": "SproutCore has built in support for form validation, and for buffering form input into a controller before it is committed to your backend model. The examples below show the built in validators and variety of controls that are supported.",
  "FName_forms": "First Name",
  "LName_forms": "Last Name",
  "Email_forms": "Email",
  "PNumber_forms": "Phone Number",
  "CCard_forms": "Credit Card",
  "Address_forms": "Address",
  "Crazinnes_forms": "Crazinness",

  // Text Buttons form.rhtml
   "Submit_buttom_forms": "Submit",
   "Cancel_buttom_forms": "Cancel",
   "SChanges_buttom_forms": "Save Changes"
}) ;

/* >>>>>>>>>> BEGIN source/theme.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  Styling becomes easier when your app has its own theme to target.
  The theme's name will be included in every view's class names in DOM,
  so you can apply styles without being exceedingly specific.
  
  If working with Chance, the $theme variable (which has its initial
  value set in your Buildfile) will allow you to target the theme
  automatically:
  
  Example:
  
      $theme.button {
        border: 1px solid black;
      }
*/
TestControls.Theme = SC.AceTheme.create({ 
  name: 'test-controls'
});

SC.Theme.addTheme(TestControls.Theme);

// this makes all panes use your app's theme by default
// QUESTION: should we make this be set by the Buildfile?
//    :theme => 'test-controls' 
// generates JS: 
//    SC.defaultTheme = 'test-controls'
SC.defaultTheme = 'test-controls';

/* >>>>>>>>>> BEGIN source/resources/buttons_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.buttonsPage = SC.View.design({
  childViews: "scroll".w(),
  scroll: SC.ScrollView.design({
    delaysContentTouches: NO,
    
    contentView: SC.FormView.design({
      labelWidth: 100,
      flowPadding: { left: 20, top: 30, bottom: 40, right: 20 },
      classNames: ["sample_controls"],
      childViews: "header style flags small normal huge jumbo icon space disclosureHeader disclosureClosed disclosureOpen".w(),
      header: SC.LabelView.design({
        fillWidth: YES,
        layout: {width: 200, height: 24 },
        
        classNames: "header".w(),
        value: "Buttons"
      }),
      
      style: SC.FormView.row("Theme", SC.SegmentedView.design({
        controlSize: SC.LARGE_CONTROL_SIZE,
        flowSpacing: { bottom: 20 },
        
        align: 'left',
        layout: { width: 300, height: 30 },
        items: [
          {name: 'Normal', 'value': 'square'},
          {name: 'Point Left', value: 'point-left'},
          {name: 'Point Right', value: 'point-right'},
          {name: 'Capsule', value: 'capsule'}
        ],
        
        itemTitleKey: 'name',
        itemValueKey: 'value',
        
        valueBinding: 'TestControls.buttonsController.theme'
      })),
      
      flags: SC.FormView.row(SC.View.design(SC.FlowedLayout, {
        childViews: 'shouldToggle shouldDisable shouldBeDefault shouldBeCancel'.w(),
        
        isSpacer: YES,
        
        shouldToggle: SC.CheckboxView.design({
          layout: { width: 100, height: 24 },
          title: "Toggleable",
          valueBinding: 'TestControls.buttonsController.toggleable'
        }),

        shouldDisable: SC.CheckboxView.design({
          layout: { width: 100, height: 24 },
          title: "Disable",
          valueBinding: 'TestControls.buttonsController.disabled'
        }),

        shouldBeDefault: SC.CheckboxView.design({
          layout: { width: 100, height: 24 },
          title: "Default",
          valueBinding: 'TestControls.buttonsController.default'
        }),

        shouldBeCancel: SC.CheckboxView.design({
          layout: { width: 100, height: 24 },
          title: "Cancel",
          valueBinding: 'TestControls.buttonsController.cancel'
        })
      })),
      
      normal: SC.FormView.row(SC.ButtonView.design(SC.AutoResize, {
        controlSize: SC.REGULAR_CONTROL_SIZE,
        layout: { height: 24, width: 100 },
        title: "Click Me",
        
        themeNameBinding: 'TestControls.buttonsController.theme',
        buttonBehaviorBinding: 'TestControls.buttonsController.buttonBehavior',
        isEnabledBinding: SC.Binding.not('TestControls.buttonsController.disabled'),
        isDefaultBinding: 'TestControls.buttonsController.default',
        isCancelBinding: 'TestControls.buttonsController.cancel'
      })),

      small: SC.FormView.row(SC.ButtonView.design(SC.AutoResize, {
        controlSize: SC.SMALL_CONTROL_SIZE,
        layout: { height: 18, width: 100 },
        title: "Click Me",
        
        themeNameBinding: 'TestControls.buttonsController.theme',
        buttonBehaviorBinding: 'TestControls.buttonsController.buttonBehavior',
        isEnabledBinding: SC.Binding.not('TestControls.buttonsController.disabled'),
        isDefaultBinding: 'TestControls.buttonsController.default',
        isCancelBinding: 'TestControls.buttonsController.cancel'
      })),

      huge: SC.FormView.row(SC.ButtonView.design(SC.AutoResize, {
        controlSize: SC.HUGE_CONTROL_SIZE,
        layout: { height: 30, width: 100 },
        title: "Click Me",
        
        themeNameBinding: 'TestControls.buttonsController.theme',
        buttonBehaviorBinding: 'TestControls.buttonsController.buttonBehavior',
        isEnabledBinding: SC.Binding.not('TestControls.buttonsController.disabled'),
        isDefaultBinding: 'TestControls.buttonsController.default',
        isCancelBinding: 'TestControls.buttonsController.cancel'
      })),

      jumbo: SC.FormView.row(SC.ButtonView.design(SC.AutoResize, {
        controlSize: SC.JUMBO_CONTROL_SIZE,
        layout: { height: 44, width: 100 },
        title: "Click Me",
        
        themeNameBinding: 'TestControls.buttonsController.theme',
        buttonBehaviorBinding: 'TestControls.buttonsController.buttonBehavior',
        isEnabledBinding: SC.Binding.not('TestControls.buttonsController.disabled'),
        isDefaultBinding: 'TestControls.buttonsController.default',
        isCancelBinding: 'TestControls.buttonsController.cancel'
      })),

      icon: SC.FormView.row(SC.ButtonView.design({
        layout: { height: 24, width: 100 },
        title: "Click Me",
        icon: "sc-icon-info-16",

        themeNameBinding: 'TestControls.buttonsController.theme',
        buttonBehaviorBinding: 'TestControls.buttonsController.buttonBehavior',
        isEnabledBinding: SC.Binding.not('TestControls.buttonsController.disabled'),
        isDefaultBinding: 'TestControls.buttonsController.default',
        isCancelBinding: 'TestControls.buttonsController.cancel'
      })),
      
      space: SC.View.design({
        fillWidth: YES,
        layout: { width: 400, height: 20 }
      }),
      disclosureHeader: SC.LabelView.design({
        fillWidth: YES,
        layout: { width: 400, height: 24 },
        classNames: "header".w(),
        value: "Disclosure Buttons"
      }),
      disclosureClosed: SC.FormView.row(SC.DisclosureView.design({
        layout: { height: 24, width: 100 },
        title: "Disclosure Closed",
        value: NO
      })),
      disclosureOpen: SC.FormView.row(SC.DisclosureView.design({
        layout: { height: 24, width: 150 },
        title: "Disclosure Open",
        value: YES
      }))
    })
  })
});

/* >>>>>>>>>> BEGIN source/resources/checkboxes_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.checkboxesPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header small normal disabled multiple icon".w(),
    
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 200, height: 24 },
      classNames: "header".w(),
      value: "Checkboxes"
    }),
    
    small: SC.FormView.row(SC.CheckboxView.design({
      layout: {width: 150, height: 24},
      title: "Check Me",
      controlSize: SC.SMALL_CONTROL_SIZE
    })),
    
    normal: SC.FormView.row(SC.CheckboxView.design({
      layout: { width: 150, height: 24 },
      title: "Check Me"
    })),
    
    disabled: SC.FormView.row(SC.CheckboxView.design({
      layout: { width: 150, height: 24 },
      isEnabled: NO,
      title: "Don't Check Me"
    })),
    
    multiple: SC.FormView.row(SC.CheckboxView.design({
      layout: { width: 150, height: 24 },
      value: [YES, NO],
      title: "Multiple? Really?"
    })),

    icon: SC.FormView.row(SC.CheckboxView.design({
      layout: { width: 150, height: 24 },
      value: [YES, NO],
      title: "Icon",
      icon: "sc-icon-info-16"
    }))
  })
});

/* >>>>>>>>>> BEGIN source/resources/flow_layout_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.flowLayoutPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header normal vertical".w(),
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 300, height: 24 },
      classNames: "header".w(),
      value: "Flow Layout"
    }),
    normal: SC.FormView.row(SC.View.extend(SC.Animatable, SC.FlowedLayout, SC.AutoMixin, {
      isSpacer: YES,
      
      init: function() {
        arguments.callee.base.apply(this,arguments);
        this.style.overflow = "visible";
        SC.Timer.schedule({
          target: this,
          action: "hideOne",
          interval: 1000,
          repeats: YES
        });
      },
      
      hideOne: function() {
        if (this._hasHidden) this.b.set("isHidden", NO);
        else this.b.set("isHidden", YES);
        this._hasHidden = !this._hasHidden;
      },
      
      autoMixins: [SC.Animatable, {
        transitions: { left: 0.25, top: 0.25, width: 0.25, opacity: 0.25 }
      }],
      
      childViews: "a s b s2 c d".w(),
      layout: { width: 600 },
      align: SC.ALIGN_RIGHT,
      layoutDirection: SC.LAYOUT_HORIZONTAL,
      defaultFlowSpacing: {
        left: 10, top: 10, right: 10, bottom: 0
      },
      a: SC.ButtonView.design({ flowSpacing: { top: 5, left: 4, right: 3, bottom: 2 }, layout: {width: 150, height: 24}, title: "a" }),
      s: SC.View.design({ isSpacer: YES, spaceUnits: 2, backgroundColor: "gray", layout: {width: 0, height: 24} }),
      b: SC.ButtonView.design({ 
        layout: {width: 190, height: 24}, 
        title: "b",
        isHiddenDidChange: function() {
          this.adjust("opacity", this.get("isHidden") ? 0 : 1);
          this.set('useAbsoluteLayout', this.get('isHidden'));
        }.observes("isHidden")
      }),
      s2: SC.View.design({ isSpacer: YES, spaceUnits: 1, backgroundColor: "gray", layout: {width: 0, height: 24} }),
      c: SC.ButtonView.design({ layout: {width: 120, height: 24 }, title: "c" }),
      d: SC.ButtonView.design({ layout: {width: 200, height: 24 }, title: "d" })
    })),
    
    vertical: SC.FormView.row(SC.View.extend(SC.FlowedLayout, {
      layout: { height: 100 },
      childViews: "a s b s2 c d".w(),
      isSpacer: YES,
      
      layoutDirection: SC.LAYOUT_VERTICAL,
      align: SC.ALIGN_CENTER,
      defaultFlowSpacing: {
        left: 10, top: 10, right: 10, bottom: 0
      },
      a: SC.ButtonView.design({ flowSpacing: { top: 5, left: 4, right: 3, bottom: 2 }, layout: {width: 150, height: 24}, title: "a" }),
      s: SC.View.design({ fillWidth: YES, isSpacer: YES, spaceUnits: 2 }),
      b: SC.ButtonView.design({ layout: {width: 190, height: 24}, title: "b" }),
      s2: SC.View.design({ fillWidth: YES, isSpacer: YES, spaceUnits: 1 }),
      c: SC.ButtonView.design({ layout: {width: 120, height: 24 }, title: "c" }),
      d: SC.ButtonView.design({ layout: {width: 200, height: 24 }, title: "d" })
    }))
  })
});
/* >>>>>>>>>> BEGIN source/resources/list_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.listPage = SC.View.design({
  childViews: "scroll".w(),
  scroll: SC.ScrollView.design({
    backgroundColor: "white",
    contentView: SC.ListView.design({
      hasContentIcon: YES,
      hasContentRightIcon: YES,
      contentIconKey: "icon",
      contentRightIconKey: "rightIcon",
      contentCheckboxKey: "isChecked",
      contentUnreadCountKey: "unread",
      
      
      classNames: ['big-list'],
      rowHeight: 44,
      content: function() {
        var idx = 0, ret = [];
        for (idx = 0; idx < 1000; idx++) {
          ret.push(SC.Object.create({
            "title": "Item " + idx,
            "icon": "sc-icon-document-16",
            "unread": idx,
            rightIcon: "sc-icon-info-16",
            isChecked: YES
          }));
        }
        return ret;
      }.property().cacheable(),
      contentValueKey: "title"
    })
  })
});
/* >>>>>>>>>> BEGIN source/resources/progress_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.progressPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    
    childViews: "header normal disabled".w(),
    
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 250, height: 18 },
      value: "Progress Bars",
      classNames: "header".w()
    }),

    normal: SC.FormView.row(SC.ProgressView.design({
      layout: { height: 20, width: 200 }
    })),

    disabled: SC.FormView.row(SC.ProgressView.design({
      layout: { height: 20, width: 200 },
      isEnabled: NO
    }))
  })
});

/* >>>>>>>>>> BEGIN source/resources/radio_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.radioPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header normal disabled multiple horizontal icon".w(),
    // Plain Views
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 250, height: 18 },
      value: "Radio Views",
      classNames: "header".w()
    }),
    normal: SC.FormView.row(SC.RadioView.design({
      layout: { width: 150, height: 60},
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),
    disabled: SC.FormView.row(SC.RadioView.design({
      layout: { width: 150, height: 60},
      isEnabled: NO,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: "one"
    })),
    multiple: SC.FormView.row(SC.RadioView.design({
      layout: {width: 150, height: 60},
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: ["one", "three"]
    })),
    horizontal: SC.FormView.row(SC.RadioView.design({
      layout: {width: 450, height: 20},
      layoutDirection: SC.LAYOUT_HORIZONTAL,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),
    icon: SC.FormView.row(SC.RadioView.design({
      layout: { width: 150, height: 60},
      items: [ { title: "One", value: "one", icon: "sc-icon-info-16" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value", itemIconKey: "icon",
      value: null
    }))
  })
});

/* >>>>>>>>>> BEGIN source/resources/select_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.selectPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header normal strings disabled".w(),
    
    // Plain Views
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 250, height: 18 },
      value: "Select View",
      classNames: "header".w()
    }),
    
    normal: SC.FormView.row(SC.SelectView.design({
      layout: { width: 150, height: 24 },
      items: [
        {"name": "Printer A", "value": "printer:a"},
        {"name": "Printer B", "value": "printer:b"},
        {"name": "Printer C", "value": "printer:c"},

        {"name": "Printer D", "value": "printer:d"},
        {"name": "Printer E", "value": "printer:e"},
        {"name": "Printer F", "value": "printer:f"},

        {"separator": YES, name: "none" },
        {"name": "MICR 1", "value": "printer:m1"},
        {"name": "MICR 2", "value": "printer:m2"},

        {"separator": YES, name: "Hi" },
        {"name": "This name is Really Really Long, OK?", "value": "LONG" }
      ],
      itemTitleKey: "name", itemValueKey: "value", itemSeparatorKey: "separator",
      value: 'printer:a',
      valueBinding: 'TestControls.buttonsController.selectedValue'
    })),

    strings: SC.FormView.row(SC.SelectView.design({
      layout: { width: 150, height: 24 },
      items: ["printer:a", "printer:b", "printer:c", "printer:d", "printer:e", "printer:f", "printer:m1", "printer:m2", "LONG"],
      value: 'printer:a',
      valueBinding: 'TestControls.buttonsController.selectedValue'
    })),

    disabled: SC.FormView.row(SC.SelectView.design({
      layout: { width: 150, height: 24 },
      
      controlSize: SC.REGULAR_CONTROL_SIZE,
      isEnabled: NO,
      
      items: [
        {"name": "Printer A", "value": "printer:a"},
        {"name": "Printer B", "value": "printer:b"},
        {"name": "Printer C", "value": "printer:c"},
        {"separator": YES, name: "none" },
        {"name": "Printer D", "value": "printer:d"},
        {"name": "Printer E", "value": "printer:e"},
        {"name": "Printer F", "value": "printer:f"},
        {"name": "MICR 1", "value": "printer:m1"},
        {"name": "MICR 2", "value": "printer:m2"}
      ],
      itemTitleKey: "name", itemValueKey: "value", itemSeparatorKey: "separator",
      value: null
    }))
  })
});

/* >>>>>>>>>> BEGIN source/resources/segmented_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.segmentedPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header small normal large jumbo disabled multiple multiple_side_by_side overflow".w(),
    
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: {width:300, height:24},
      classNames: "header".w(),
      value: "Segmented Views "
    }),
    
    small: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      layout: { left: 0, width: 350, height: 18, centerY: 0},
      align: SC.ALIGN_LEFT,
      controlSize: SC.SMALL_CONTROL_SIZE,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),
    
    normal: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      layout: { left: 0, width: 350, height: 24, centerY: 0},
      align: SC.ALIGN_LEFT,
      controlSize: SC.REGULAR_CONTROL_SIZE,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),

    large: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      layout: { left: 0, width: 350, height: 30, centerY: 0},
      align: SC.ALIGN_LEFT,
      controlSize: SC.LARGE_CONTROL_SIZE,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),

    jumbo: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      layout: { left: 0, width: 350, height: 44, centerY: 0},
      align: SC.ALIGN_LEFT,
      controlSize: SC.JUMBO_CONTROL_SIZE,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    })),
    
    disabled: SC.FormView.row(SC.SegmentedView.design({
      layout: { left: 0, width: 350, height: 24, centerY: 0},
      align: SC.ALIGN_LEFT,
      isEnabled: NO,
      items: [ { icon: "sc-icon-info-16", title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value", itemIconKey: "icon",
      value: "one"
    })),
    multiple: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      allowsMultipleSelection: YES,
      layout: { left: 0, width: 350, height: 24, centerY: 0},
      align: SC.ALIGN_LEFT,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: ["one", "three"]
    })),
    
    multiple_side_by_side: SC.FormView.row(SC.SegmentedView.design({
      allowsEmptySelection: YES,
      allowsMultipleSelection: YES,
      layout: { left: 0, width: 350, height: 24, centerY: 0},
      align: SC.ALIGN_LEFT,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: ["one", "two"]
    })),
    
    overflow: SC.FormView.row(SC.SegmentedView.design({
      layout: { left: 0, width: 350, height: 24, centerY: 0},
      align: SC.ALIGN_LEFT,
      items: [ { title: "One", value: "one" },{ title: "Two", value: "two" },{ title: "Three", value: "three"},{ title: "Four", value: "four" },{ title: "Five", value: "five" },{ title: "Six", value: "six" },{ title: "Seven", value: "seven" },{ title: "Eight", value: "eight" } ],
      itemTitleKey: "title", itemValueKey: "value",
      value: null
    }))
  })
});
/* >>>>>>>>>> BEGIN source/resources/sliders_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.slidersPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header small normal jumbo disabled".w(),
    // Plain Views
    header: SC.LabelView.design({
      fillWidth: YES,
      layout: { width: 250, height: 18 },
      value: "Sliders",
      classNames: "header".w()
    }),
    
    small: SC.FormView.row(SC.SliderView.design({
      layout: { width: 150, height: 14 },
      controlSize: SC.SMALL_CONTROL_SIZE,
      minimum: 0,
      maximum: 10,
      value: 2
    })),
    
    normal: SC.FormView.row(SC.SliderView.design({
      layout: { width: 150, height: 16 },
      minimum: 0,
      maximum: 10,
      value: 2
    })),
    
    jumbo: SC.FormView.row(SC.SliderView.design({
      controlSize: SC.JUMBO_CONTROL_SIZE,
      layout: { width: 150, height: 22 },
      minimum: 0,
      maximum: 10,
      value: 2
    })),
    
    disabled: SC.FormView.row(SC.SliderView.design({
      layout: { width: 150, height: 16},
      isEnabled: NO,
      minimum: 0,
      maximum: 10,
      value: 2
    }))
  })
});
/* >>>>>>>>>> BEGIN source/resources/text_field_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.textFieldPage = SC.View.design({
  childViews: "form".w(),
  form: SC.ScrollView.design({
    
    
    contentView: SC.FormView.design({
      theme: "iphone-form",
    
      classNames: ["sample_controls"],
      layout: { left: 20, top: 40, right: 20, bottom: 40 },
      childViews: "header normal autoResize textArea textAreaAutoResize disabled".w(),
    
      header: SC.LabelView.design({
        layout: { width: 200, height: 44 },
        classNames: "header".w(),
        value: "Text Fields",
        fillWidth: YES
      }),
    
      normal: SC.FormView.row(SC.TextFieldView.design({
        layout: { left: 0, width: 150, height: 44, centerY: 0},
        value: "Text",
        isSpacer: YES
      }), { classNames: ["first"] }),

      autoResize: SC.FormView.row(SC.TextFieldView.design(SC.AutoResize, {
        layout: { left: 0, width: 150, height: 44, centerY: 0 },
        value: "Hello, World!"
      })),

      textArea: SC.FormView.row(SC.TextFieldView.design({
        layout: { left: 0, width: 150, height: 144, centerY: 0 },
        value: "Hello, World!",
        isTextArea: YES,

        isSpacer: YES
      })),


      textAreaAutoResize: SC.FormView.row(SC.TextFieldView.design(SC.AutoResize, {
        layout: { left: 0, width: 150, height: 144, maxWidth: 200, centerY: 0 },
        value: "Hello, World!",
        isTextArea: YES,

        shouldResizeHeight: YES
      })),


      disabled: SC.FormView.row(SC.TextFieldView.design({
        layout: { left: 0, width: 150, height: 44, centerY: 0},
        isEnabled: NO,
        value: "Disabled",
        isSpacer: YES
      }))
    })
  })
});

/* >>>>>>>>>> BEGIN source/resources/scroll_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.scrollPage = SC.View.design({
  childViews: "scroll".w(),
  scroll: SC.ScrollView.design({
    contentView: SC.FormView.design({
      flowPadding: { top: 0, bottom: 100, right: 0, left: 0},
      classNames: ["sample_controls"],
      layout: { left: 20, top: 40, right: 20, bottom: 40 },
      childViews: "header list incrementalList imageList".w(),
      header: SC.LabelView.design({
        fillWidth: YES,
        layout: { width: 300, height: 24 },
        classNames: "header".w(),
        value: "Scroll Views"
      }),
      list: SC.FormView.row(SC.ScrollView.design({
        backgroundColor: "white",
        layout: { width: 320, height: 460 },
        contentView: SC.ListView.design({
          computeNowShowing: function() {
            return this.get('allContentIndexes');
          },
          classNames: ['big-list'],
          rowHeight: 44,
          content: function() {
            var idx = 0, ret = [];
            for (idx = 0; idx < 100; idx++) {
              ret.push(SC.Object.create({"title": "Item " + idx}));
            }
            return ret;
          }.property().cacheable(),
          contentValueKey: "title"
        })
      })),
      incrementalList: SC.FormView.row(SC.ScrollView.design({
        backgroundColor: "white",
        layout: { width: 320, height: 460 },
        contentView: SC.ListView.design({
          classNames: ['big-list'],
          rowHeight: 44,
          content: function() {
            var idx = 0, ret = [];
            for (idx = 0; idx < 1000; idx++) {
              ret.push(SC.Object.create({"title": "Item " + idx}));
            }
            return ret;
          }.property().cacheable(),
          contentValueKey: "title"
        })
      })),
      imageList: SC.FormView.row(SC.ScrollView.design({
        backgroundColor: "gray",
        canScale: YES,
        layout: { width: 320, height: 460 },
        contentView: SC.ListView.design({
          classNames: ['big-list'],
          rowHeight: 44,
          content: function() {
            var idx = 0, ret = [];
            for (idx = 0; idx < 1000; idx++) {
              ret.push(SC.Object.create({"title": "Item " + idx}));
            }
            return ret;
          }.property().cacheable(),
          contentValueKey: "title"
        })
      }))
    })
  })
});
/* >>>>>>>>>> BEGIN source/resources/split_page.js */
/*global TestControls*/
SC.mixin(SC.SplitDividerView.prototype, { wantsAcceleratedLayer: YES });

TestControls.SplitColumn = SC.View.design(SC.SplitChild, {
  autoResizeStyle: SC.RESIZE_AUTOMATIC,
  
  size: 100,
  
  minimumSize: 100,
  
  backgroundColor: 'white',
  wantsAcceleratedLayer: YES,
  compensatesForMovement: YES,
  
  childViews: 'allowIndirect compensates resizeStyle'.w(),
  
  allowIndirect: SC.CheckboxView.design({
    layout: { top: 10, left: 10, width: 200, height: 24 },
    title: "Allow Indirect Adjustments",
    valueBinding: '*parentView.allowsIndirectAdjustments'
  }),

  compensates: SC.CheckboxView.design({
    layout: { top: 40, left: 10, width: 200, height: 24 },
    title: "Compensates for Movement",
    valueBinding: '*parentView.compensatesForMovement'
  }),
  
  resizeStyle: SC.SelectView.design({
    layout: { left: 10, top: 70, width: 120, height: 24 },
    items: [
      {title: 'Fixed Size', value: SC.FIXED_SIZE },
      {title: 'Manual Resize', value: SC.RESIZE_MANUAL },
      { title: 'Auto Resize', value: SC.RESIZE_AUTOMATIC }
    ],
    
    itemTitleKey: 'title',
    itemValueKey: 'value',
    
    value: SC.RESIZE_AUTOMATIC,
    valueBinding: '*parentView.autoResizeStyle'
  })
});

TestControls.splitPage = SC.View.design({
  childViews: 'toolbar scroll'.w(),
  
  toolbar: SC.ToolbarView.design(SC.FlowedLayout, SC.AutoMixin, {
    autoMixins: [{ wantsAcceleratedLayer: YES }],
    align: SC.ALIGN_RIGHT,
    canWrap: NO,
    
    layout: { height: 44, bottom: 0 },
    
    flowPadding: { top: 7 },
    defaultFlowSpacing: { right: 5, left: 5 },
    
    childViews: 'direction resize allAllowIndirect allCompensateForMovement spacer add remove'.w(),
    
    direction: SC.SelectView.design({
      flowSpacing: { left: 5, top: 3, right: 5 },
      
      layout: { width:200, height: 24 },
      items: [
        {title: 'Horizontal', value: SC.LAYOUT_HORIZONTAL},
        {title: 'Vertical', value: SC.LAYOUT_VERTICAL}
      ],
      
      itemTitleKey: 'title',
      itemValueKey: 'value',
      value: SC.LAYOUT_VERTICAL,
      valueBinding: 'TestControls.splitController.layoutDirection'
    }),
    
    resize: SC.CheckboxView.design({
      flowSpacing: { top: 6, left: 5, right: 5 },
      layout: { width: 170 },
      title: "Resize Children to Fit",
      valueBinding: 'TestControls.splitController.shouldResizeChildrenToFit'
    }),

    allAllowIndirect: SC.CheckboxView.design({
      flowSpacing: { top: 6, left: 5, right: 5 },
      layout: {width:150},
      title: "Allow Indirect",
      valueBinding: 'TestControls.splitController.allAllowIndirect'
    }),

    allCompensateForMovement: SC.CheckboxView.design({
      flowSpacing: { top: 6, left: 5, right: 5 },
      layout: { width:200 },
      title: "Compensate for Movement",
      valueBinding: 'TestControls.splitController.allCompensateForMovement'
    }),

    
    spacer: SC.View.design({ isSpacer: YES }),
    
    add: SC.ButtonView.design(SC.AutoResize, {
      layout: { height: 30 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      autoResizeField: 'title',
      title: "Add",
      
      target: 'TestControls.splitController',
      action: 'addChild'
    }),
    
    remove: SC.ButtonView.design(SC.AutoResize, {
      layout: { height: 30 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      
      autoResizeField: 'title',
      title: "Remove",
      
      target: 'TestControls.splitController',
      action: 'removeChild'
    })
  }),
  
  scroll: SC.ScrollView.design({
    borderStyle: SC.BORDER_NONE,
    layout: { bottom: 44 },
    
    contentView: SC.SplitView.design({
      init: function() {
        arguments.callee.base.apply(this,arguments);
        TestControls.splitController.bind('children', this, 'childViews');
      },

      layoutDirectionBinding: 'TestControls.splitController.layoutDirection',
      
      shouldResizeChildrenToFitBinding: 'TestControls.splitController.shouldResizeChildrenToFit',

      childViews: 'initial'.w(),

      initial: TestControls.SplitColumn.design()
    })
  })
  
});

/* >>>>>>>>>> BEGIN source/resources/tab_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions Â©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.tabPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    layout: { left: 20, top: 40, right: 20, bottom: 40 },
    childViews: "header top topToolbar bottom overflow icon".w(),
    
    header: SC.LabelView.design({
      layout: {width:300, height:24},
      classNames: "header".w(),
      value: "Tab Views",
      fillWidth: YES
    }),
    
    top: SC.FormView.row(SC.TabView.design({
      layout: { width: 300, height: 100, centerY: 0 },
      items: ["Item 1", "Item 2", "Item 3"],
      tabLocation: SC.TOP_LOCATION
    })),
    
    topToolbar: SC.FormView.row(SC.TabView.design({
      layout: { width: 300, height: 100, centerY: 0 },
      items: ["Item 1", "Item 2", "Item 3"],
      tabLocation: SC.TOP_TOOLBAR_LOCATION
    })),
    
    bottom: SC.FormView.row(SC.TabView.design({
      layout: { width: 300, height: 100, centerY: 0 },
      items: ["Item 1", "Item 2", "Item 3"],
      tabLocation: SC.BOTTOM_LOCATION
    })),
    
    overflow: SC.FormView.row(SC.TabView.design({
      layout: { width: 300, height: 100, centerY: 0 },
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"]
    })),

    icon: SC.FormView.row(SC.TabView.design({
      layout: { width: 300, height: 100, centerY: 0 },
      items: [{ title: "Item 1", icon: "sc-icon-info-16" }, { title: "Item 2" }, { title: "Item 3" }],
      itemTitleKey: 'title',
      itemIconKey: 'icon',
      tabLocation: SC.TOP_LOCATION
    }))
  })
});

/* >>>>>>>>>> BEGIN source/resources/panels_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals TestControls Forms*/
TestControls.panelsPage = SC.View.design({
  childViews: "form".w(),
  form: SC.FormView.design({
    classNames: ["sample_controls"],
    layout: { left: 20, top: 40, right: 20, bottom: 40 },

    childViews: 'header buttonCount alertType show'.w(),

    header: SC.LabelView.design({
      layout: { width: 250, height: 18 },
      value: "Alerts",
      classNames: "header".w()
    }),

    buttonCount: SC.FormView.row(SC.RadioView.design({
      layout: { height: 24 * 3, width: 200 },
      items: [
        { 'title': 'One Button', 'value': 1 },
        { 'title': 'Two Buttons', 'value': 2 },
        { 'title': 'Three Buttons', 'value': 3 }
      ],

      itemTitleKey: 'title',
      itemValueKey: 'value',

      valueBinding: 'TestControls.alertController.buttonCount'
    })),

    alertType: SC.FormView.row(SC.SelectView.design({
      layout: { height: 24, width: 200 },
      items: [
        { title: 'Error', value: 'error' },
        { title: 'Info', value: 'info' },
        { title: 'Plain', value: 'plain' },
        { title: 'Show', value: 'show' },
        { title: 'Warn', value: 'warn' }
      ],

      itemTitleKey: 'title',
      itemValueKey: 'value',

      valueBinding: 'TestControls.alertController.alertType'
    })),

    show: SC.ButtonView.design({
      layout: { height: 24, width: 100 },
      title: 'Alert',
      target: TestControls.alertController,
      action: 'showAlert'
    })

  })
});


/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*global TestControls tile Forms */

sc_require("resources/progress_page");
sc_require("resources/buttons_page");
sc_require("resources/checkboxes_page");
sc_require("resources/radio_page");
sc_require("resources/select_page");
sc_require("resources/segmented_page");
sc_require("resources/sliders_page");
sc_require("resources/text_field_page");
sc_require("resources/flow_layout_page");
sc_require("resources/scroll_page");
sc_require("resources/split_page");
sc_require("resources/list_page");
sc_require("resources/tab_page");
sc_require("resources/panels_page");

TestControls.mainPage = SC.Page.create({
  
  mainPane: SC.MainPane.design(SC.Animatable, {
    childViews: "split".w(),
    wantsTouchIntercept: YES,
    
    split: SC.MasterDetailView.design ({
      classNames: [ window.navigator.standalone ? "round-toolbars" : "normal" ],
      autoHideMaster: YES,
      
      pickerPane: SC.PickerPane.extend(SC.Animatable, {
        transitions: { 
          opacity: { 
            duration: 0.25, 
            timing: SC.Animatable.TRANSITION_EASE_IN_OUT,
            action: function(){ 
              if (this.style.opacity === 0) this._call_when_done();
            } 
          }
        },
        style: { opacity: 1 },
        layout: { width: 250, height: 480 },
        theme: "popover",
        
        append: function() {
          this.disableAnimation();
          this.adjust("opacity", 1).updateLayout();
          this.enableAnimation();
          arguments.callee.base.apply(this,arguments);
        },
        
        remove: function() {
          this._call_when_done = arguments.callee.base;
          this.adjust("opacity", 0);
        }
      }),
      
      masterView: SC.WorkspaceView.design({
        topToolbar: SC.ToolbarView.design({
          layout: { top: 0, left: 0, right: 0, height: 32 },
          childViews: "label".w(),
          label: SC.LabelView.design({
            layout: { left: 10, centerY: 0, height: 21, width: 200 },
            value: "Test Controls",
            classNames: "embossed".w()
          })
        }),
        
        contentView: SC.ScrollView.design({
          classNames: ["sc-source-list-background"],
          contentView: SC.SourceListView.design({
            layout: { left: 0, top: 0, right: 0, bottom: 0 },
            contentValueKey: "name",
            contentBinding: "TestControls.categoriesController.arrangedObjects",
            selectionBinding: "TestControls.categoriesController.selection"
          })
        })
      }),
      detailView: SC.WorkspaceView.design({
        themeName: 'ace',
        themeNameBinding: 'TestControls.categoryController.themeName',
        topToolbar: SC.ToolbarView.design({
          layout: { top: 0, left: 0, right: 0, height: 32 },
          childViews: "showMaster label useDarkTheme".w(),
          showMaster: SC.ButtonView.design({
            layout: { left: 7, centerY: 0, height: 30, width: 100 },
            controlSize: SC.HUGE_CONTROL_SIZE,
            isVisible: NO,
            isVisibleBinding: ".parentView.masterIsHidden",
            title: "Tests",
            action: "toggleMasterPicker"
          }),
          
          label: SC.LabelView.design({
            layout: { left: 120, centerY: 0, height: 21, width: 200 },
            value: "Test Controls",
            classNames: "embossed".w(),
            isVisible: NO,
            isVisibleBinding: SC.Binding.from(".parentView.masterIsHidden")
          }),
          
          useDarkTheme: SC.CheckboxView.design({
            layout: { right: 10, centerY: 0, height: 18, width: 150 },
            title: "Use Dark Theme",
            valueBinding: 'TestControls.categoryController.useDarkTheme'
          })
        }),
        contentView: SC.ContainerView.design({
          nowShowingBinding: "TestControls.categoryController.nowShowing"
        })
      })
    })
  }),

  welcome: SC.LabelView.design({
    escapeHTML: NO,
    classNames: 'welcome-tab',
    value: "<h1>Test Controls</h1><p>SproutCore comes bundled with a wide array of controls that you can use in your own applications. Most of these controls can be created very easily using the built-in view helper functions. Consult the source code of this application for samples code to use in your own application.</p>"
  }),
  
  progress_page: TestControls.progressPage,
  
  buttons_page: TestControls.buttonsPage,
  
  checkboxes_page: TestControls.checkboxesPage,
  
  radio_page: TestControls.radioPage,
  
  select_page: TestControls.selectPage,

  sliders_page: TestControls.slidersPage,
  
  text_field_page: TestControls.textFieldPage,
  
  segmented_page: TestControls.segmentedPage,

  panels_page: TestControls.panelsPage,
  
  flow_layout_page: TestControls.flowLayoutPage,
  
  scroll_page: TestControls.scrollPage,

  split_page: TestControls.splitPage,
  
  list_page: TestControls.listPage,
  
  tab_page: TestControls.tabPage
});

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals TestControls */

TestControls.main = function main() {
  TestControls.getPath('mainPage.mainPane').append() ;
  TestControls.categoriesController.set("content", TestControls.rootCategory);
} ;

function main() { TestControls.main(); }

