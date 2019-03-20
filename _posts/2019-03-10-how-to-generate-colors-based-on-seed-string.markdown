---
layout: post
title:  "How to generate colors based on the seed string"
date:   2019-03-10 12:50:44 +0100
categories: generators script
tags: [generate, color, script]
---
Use the function bellow to generate colors based on string. String input is seed which means that we will get always same color for the same string: `getRandomColor("Vechicle 1") => "#d8bf1a"`

```
  function getRandomColor(str) {

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
```
