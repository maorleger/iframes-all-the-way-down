// copied to individual folders as part of `npm start`
console.dir({
  url: window.location.href,
  referrer: window.document.referrer,
  // https://developer.mozilla.org/en-US/docs/Web/API/Location/ancestorOrigins
  // NOT SUPPORTED IN FF! So we will need to consider another approach for FF unfortunately
  ancestorOrigins: window.location.ancestorOrigins,
})
