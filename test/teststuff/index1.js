const AppTabs = {
    init: function() {
  
      const appTabs = document.querySelectorAll('[data-hook=appTabs]');
      const tabList = document.querySelector('[role=tablist]');
      const tabs = document.querySelectorAll('[role=tab]');
      const tabPanels = document.querySelectorAll('[role=tabpanel]');
  
      // Populate data-id attribute of each appTabs component with a UUID
      appTabs.forEach( (appTabsItem, index) => {
        appTabsItem.setAttribute( 'data-id', AppTabs.generateUUID() );
      });
  
      // Adjust element atributes for tabs and attach event listeners
      tabs.forEach( (tab, index) => {
        let appTabIdentifier = tab.closest('[data-hook=appTabs]').getAttribute('data-id');
        tab.setAttribute( 'aria-controls', 'panel-' + appTabIdentifier + (index + parseInt(1)) );
        tab.setAttribute( 'id', 'tab-' + appTabIdentifier + (index + parseInt(1)) );
  
        if ( index === 0 ) {
          tab.setAttribute( 'aria-selected', 'true' );
          tab.setAttribute( 'tabindex', '0' );
        } else {
          tab.setAttribute( 'aria-selected', 'false' );
          tab.setAttribute( 'tabindex', '-1' );
        }
  
        tab.addEventListener('click', function(e) {
          const target = e.target;
          const parent = target.parentNode;
          const grandparent = parent.parentNode;
  
          // Remove all current selected tabs
          parent
            .querySelectorAll('[aria-selected="true"]')
            .forEach(t => t.setAttribute('aria-selected', false));
  
          // Set this tab as selected
          target.setAttribute('aria-selected', true);
  
          // Hide all tab panels
          grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach(p => p.setAttribute('hidden', true));
  
          // Show the selected panel
          grandparent.parentNode
            .querySelector(`#${target.getAttribute('aria-controls')}`)
            .removeAttribute('hidden');
        });
      });
  
      // Adjust element atributes for tab panels
      tabPanels.forEach( (tabPanel, index) => {
        let appTabIdentifier = tabPanel.closest('[data-hook=appTabs]').getAttribute('data-id');
        tabPanel.setAttribute( 'aria-labelledby', 'tab-' + appTabIdentifier + (index + parseInt(1)) );
        tabPanel.setAttribute( 'id', 'panel-' + appTabIdentifier + (index + parseInt(1)) )
        tabPanel.setAttribute( 'tabindex', '0' );
        if ( index === 0 ) {
        } else {
          tabPanel.hidden = true;
        }
      });
  
      // Enable arrow navigation between tabs in the tab list
      let tabFocus = 0;
      tabList.addEventListener('keydown', e => {
        // Move right
        if ( e.keyCode === 39 || e.keyCode === 37 ) {
          tabs[tabFocus].setAttribute('tabindex', -1);
          if ( e.keyCode === 39 ) {
            tabFocus++;
            // If we're at the end, go to the start
            if ( tabFocus >= tabs.length ) {
              tabFocus = 0;
            }
          // Move left
          } else if ( e.keyCode === 37 ) {
            tabFocus--;
            // If we're at the start, move to the end
            if ( tabFocus < 0 ) {
              tabFocus = tabs.length - 1;
            }
          }
  
          tabs[tabFocus].setAttribute('tabindex', 0);
          tabs[tabFocus].focus();
        }
      });
    },
  
    generateUUID: function () {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
      });
      return uuid;
    }
  
  }
  
  AppTabs.init();