---
layout: post
title:  "How to search only CSS files in the certain directory using Visul Studio Code"
date:   2019-03-14 17:50:44 +0100
categories: VSCode editing
tags: [VSCode, search, files, CSS, directory, query]
---
To search the text inside only certain type of files in some directory expand search options and enter directory name in "files to include" field.
Enter file extension using globstar matching, in my case I'm searching inside SCSS files: `**/*.scss`.

I'm looking for color property inside all SCSS files inside the libs directory, final query would look like: `./libs/**/*.scss`

![VSCode type serach](assets/posts/2019-03-14/vscode-file-type-search.jpg)
