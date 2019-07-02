function getBuildDetails(buildId, cb) {
  $.getJSON(tc_url + '/guestAuth/app/rest/builds/id:' + buildId, cb);
}

function createVersionLink(container, version, date, isLatest, buildId) {
  const content = container.html()
    .replace('~name~', version + ' &mdash; ' + moment(date, 'YYYYMMDDTHHmmssZ').format('MMM D, YYYY h:mmA') + (isLatest ? ' (latest)' : ''))
    .replace('~buildId~', buildId);

  container.attr('id', null);
  return container.html(content).css('display', 'block');
}

function updateFrame(frame) {
  frame.attr('height', $("body").height() - $(".page-wrapper").height());
  frame.attr('width', $("body").width());
}

if (enable_prerelease) {
  const buildType = 'MetasysG4_CoreServer_ApiDocumentation_Pr';

  $(document).ready(function() {
    const path = window.location.pathname;
    const isDetailsPage = path.endsWith('/api/pre-release') || path.endsWith('/api/pre-release/');
    const isListingPage = (path.endsWith('/api') || path.endsWith('/api/')) && !isDetailsPage;

    if (isListingPage) {
      $.getJSON(tc_url + '/guestAuth/app/rest/builds/?locator=buildType:' + buildType + ',status:SUCCESS,pinned:true,branch:(default:any)', function (data) {
        let isFirst = true;

        data.build.sort((a, b) => b.id - a.id).forEach(build => {
          const name = build.branchName + '-' + build.number;
          const id = build.id;

          const isLatest = isFirst;
          const container = $('#version-link-template').clone();
          container.appendTo($('.version-container-pinned'));

          getBuildDetails(id, details => {
            createVersionLink(container, name, details.finishDate, isLatest, id)
          });

          isFirst = false;
        });
      });

      $.getJSON(tc_url + '/guestAuth/app/rest/builds/?locator=buildType:' + buildType + ',status:SUCCESS,pinned:false,branch:(default:any)', function (data) {
        data.build.sort((a, b) => b.id - a.id).forEach(build => {
          const name = build.branchName + '-' + build.number;
          const id = build.id;

          const container = $('#version-link-template').clone();
          container.appendTo($('.version-container-pr'));

          getBuildDetails(id, details => {
            createVersionLink(container, name, details.finishDate, false, id);
          });

          isFirst = false;
        });
      });
    }

    if (isDetailsPage) {
      const buildId = window.location.search.replace('?build=', '');
      const previewUrl = tc_url + '/guestAuth/repository/download/' + buildType + '/' + buildId + ':id/metasys-api.zip%21/previews/index.html';
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