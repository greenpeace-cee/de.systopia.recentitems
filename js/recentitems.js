/*-------------------------------------------------------+
| SYSTOPIA Recently viewed items extension               |
| Copyright (C) 2018 SYSTOPIA                            |
| Author: J. Schuppe (schuppe@systopia.de)               |
+--------------------------------------------------------+
| This program is released as free software under the    |
| Affero GPL license. You can redistribute it and/or     |
| modify it under the terms of this license which you    |
| can read by viewing the included agpl.txt or online    |
| at www.gnu.org/licenses/agpl.html. Removal of this     |
| copyright header is strictly prohibited without        |
| written permission from the original author(s).        |
+-------------------------------------------------------*/

(function($) {
  $(document).on('crmLoad', function(event) {
    var $recentMenuItem = $('#civicrm-menu').find('.menumain.crm-Recent');

    var recentItems = CRM.api3('RecentItems', 'get')
      .done(function(result) {
        var $newMenuItem= $(result.values);
        $recentMenuItem.replaceWith($newMenuItem);

        // Re-initialise navigation menu behavior for the new menu item.
        // Copied from CiviCRM's /templates/CRM/common/navigation.js.tpl
        // TODO: This does not make the "Recent items" menu item part of the
        // menu, which causes some odd behavior with mouseOver on open sub
        // menus.
        $newMenuItem.menuBar({arrowSrc: CRM.config.resourceBase + 'packages/jquery/css/images/arrow.png'});

        // Replace icons with shoreditch's replacement.
        // Copied from shoreditch's /js/crm-ui.js
        // TODO: Find a method to do this without copying code.
        if (CRM.recentitems.shoreditch) {
          $('#root-menu-div .menu-item-arrow').each(function ($element) {
            var $arrow = $(this);

            $arrow.before('<i class="fa fa-caret-right menu-item-arrow"></i>');
            $arrow.remove();
          });
        }

      });
  });
})(cj);
