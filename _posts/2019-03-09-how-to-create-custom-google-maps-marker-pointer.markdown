---
layout: post
title:  "How to create google maps like marker pointer"
date:   2019-03-09 19:50:44 +0100
categories: css maps
tags: [google, marker, custom, pointer, css]
---
In tutorial bellow you'll find how to create custom google maps like marker with pure CSS and HTML

<div id="csstutor" data-height="470" data-href="5c8a43e6a7c1e07300012265"></div>
<script src="http://frontendundefined.com/learn/eb.js"></script>

Create custom overlay for the google maps

    <h3>My Google Maps Demo</h3>
    <!--The div element for the map -->
    <div id="map"></div>
        <script>
        // Initialize and add the map
    function initMap() {
      // The location of Uluru
      var uluru = {lat: -25.344, lng: 131.036};
      // The map, centered at Uluru
      var map = new google.maps.Map(
          document.getElementById('map'), {zoom: 4, center: uluru});
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({position: uluru, map: map});
    }
    console.log("abl")
    </script>

    <!--Load the API from the specified URL
    * The async attribute allows the browser to render the page while the API loads
    * The key parameter will contain your own API key (which is not needed for this tutorial)
    * The callback parameter executes the initMap() function
    -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>

