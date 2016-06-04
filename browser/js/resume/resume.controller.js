'use strict';

app.controller('ResumeCtrl', function ($scope, creatorContent) {
  const options = {
    height: '800px',
  };
  $scope.creatorContent = creatorContent;
  PDFObject.embed(creatorContent.resume, '#resumeDiv', options);
})
