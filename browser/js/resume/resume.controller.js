'use strict';

app.controller('ResumeCtrl', function ($rootScope) {
  const options = {
    height: '800px',
  };
  PDFObject.embed($rootScope.creatorContent.resume, '#resumeDiv', options);
})
