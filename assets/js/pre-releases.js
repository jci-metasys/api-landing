function getBuildDetails(buildId, cb) {
  $.getJSON(tc_url + '/guestAuth/app/rest/builds/id:' + buildId, cb);
}

function createVersionLink(version, date, isLatest, buildId) {
  const container = $('#version-link-template').clone().attr('id', null);
  const content = container.html()
    .replace('~name~', version + ' &mdash; ' + moment(date, 'YYYYMMDDTHHmmssZ').format('MMM D, YYYY h:mmA') + (isLatest ? ' (latest)' : ''))
    .replace('~buildId~', buildId);

  return container.html(content).css('display', 'block');
}

function updateFrame(frame) {
  frame.attr('height', $("body").height() - $(".page-wrapper").height());
  frame.attr('width', $("body").width());
}

if (enable_prerelease) {
  const buildType = 'MetasysG4_CoreServer_ApiDocumentation_Pr';

  $(document).ready(function() {
    const isDetailsPage = window.location.pathname.indexOf('/api/pre-release/version') !== -1;
    const isListingPage = window.location.pathname.indexOf('/api/pre-release') !== -1 && !isDetailsPage;

    $.getJSON(tc_url + '/guestAuth/app/rest/builds/?locator=buildType:' + buildType + ',status:SUCCESS,pinned:true,branch:(default:any)', function (data) {
      const dropdown = $('#version-dropdown')
        .prepend($('<li class="dropdown-header">Public Versions</li>'))
        .append($('<li class="dropdown-header">Pre-release Versions</li>'));

      let isFirst = true;

      data.build.forEach(build => {
        const name = build.branchName + '-' + build.number;
        const id = build.id;

        dropdown.append($('<li><a href="' + baseurl + 'api/pre-release/version/?build=' + id + '">' + name + '</a></li>'));

        if (isListingPage) {
          const isLatest = isFirst;
          getBuildDetails(id, details => {
            createVersionLink(name, details.finishDate, isLatest, id).appendTo($('.version-container'));
          });
        }

        isFirst = false;
      });
    });

    if (isDetailsPage) {
      const buildId = window.location.search.replace('?build=', '');
      const previewUrl = tc_url + '/repository/download/' + buildType + '/' + buildId + ':id/metasys-api.zip%21/previews/index.html';
      const frame = $('<iframe src="' + previewUrl + '"></iframe>');

      $('body').append(frame);

      getBuildDetails(buildId, build => {
        $('.breadcrumb > .active').text(build.branchName + '-' + build.number);
      });

      $(window).resize(function() {
        updateFrame(frame);
      });

      updateFrame(frame);
    }
  });
}