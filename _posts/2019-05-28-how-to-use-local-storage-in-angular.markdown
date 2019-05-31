---
layout: post
title:  "How use local storage in angular"
date:   2019-05-27 19:50:44 +0100
categories: angular css
tags: [angular, angular7, typescript, localStorage, sessionStorage]
---

### Note: No need for extra library 

Use getters/setters for that in your service:

```
  private _accessToken: string;

  constructor() {
    this._accessToken = localStorage.getItem('accessToken');
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
    localStorage.setItem('accessToken', value)
  }
```

Now you can easily retrieve or update values in localStorage (inject service to controller):


retrieve the value

`const accessToken = this.localStorageService.accessToken;`

update the localStorage

`this.localStorageService.accessToken = "new-token";`


## Find full example below

<iframe style="width: 100%;height: 800px;border: none;" src="https://stackblitz.com/edit/angular-local-storage-get-set?file=src/app/app.component.ts"></iframe>
