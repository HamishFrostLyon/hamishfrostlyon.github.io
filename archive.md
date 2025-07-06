---
layout: page
title: Archive
permalink: /archive/
---

{% for post in site.posts %}
  <article>
    <h3>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h3>
    <time>{{ post.date | date: "%B %d, %Y" }}</time>
  </article>
{% endfor %}
