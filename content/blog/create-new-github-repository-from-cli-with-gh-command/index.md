---
title: Create new GitHub repository from CLI with gh command
date: 2023-02-05 05:59:16
tags: 
  - quick-tips
  - cli
  - gh
  - github
  - git
image:
  src: ./thumbnail.png
  alt: command to create new GitHub repository
---

Having to visit [GitHub website](https://github.com/new) every time we want to 
create repo can be cumbersome when we do it so often, especially for vim users.
Instead of visiting the website, we can use [GitHub CLI](https://cli.github.com/).

After installing GitHub CLI, we can create repo with:

```sh
gh repo create
```

Then follow the instruction

{% image "./gh-repo-create-instruction.png", "Creating a GitHub repository by running the command and following the instruction" %}
