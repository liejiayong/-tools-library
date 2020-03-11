  // nav menu
  if ($('#btnNavMenu')) {
    var activeCls = 'active';
    $('#btnNavMenu').on('click', function () {
      if ($(this).hasClass(activeCls)) {
        $(this).removeClass(activeCls);
        $('#navbar').fadeOut().removeClass(activeCls);
      } else {
        $(this).addClass(activeCls);
        $('#navbar').fadeIn().addClass(activeCls);
      }
    })

  }
