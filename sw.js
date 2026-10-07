var CACHE = "noah-assets-v1";
self.addEventListener("fetch", function(event) {
  var url = event.request.url;
  if (event.request.method !== "GET" || url.indexOf("r2.dev") === -1) return;
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function(hit) {
        var fresh = fetch(event.request).then(function(response) {
          if (response && response.ok) cache.put(event.request, response.clone());
          return response;
        }).catch(function() { return hit; });
        return hit || fresh;
      });
    })
  );
});
