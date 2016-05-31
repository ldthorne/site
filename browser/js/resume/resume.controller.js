'use strict';

app.controller('ResumeCtrl', function ($scope) {
  const options = {
    height: '800px',
  };

  PDFObject.embed('/resume.pdf', '#resumeDiv', options);
})
