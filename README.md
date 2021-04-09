# masonry-vanilla

This theme applies the Masonry layout to a Vanilla / Plain Roam Graph (i.e., no other CSS required).

![vanilla-masonry-1](https://user-images.githubusercontent.com/64155612/107065904-25ae5400-6792-11eb-9244-ce26cabe747c.png)

## How to Install

Simply add a CSS code block onto your roam/css page and copy the following into it (you can choose whether to include Optional-2 and Optional-3):

```
/* MAIN CSS - Required */
@import url('https://gitmurf.github.io/masonry-vanilla/masonry-main.css');

/* OPTIONAL 1 - Some additional options on top of Vanilla that Murf uses */
@import url('https://gitmurf.github.io/masonry-vanilla/masonry-optional-1.css');

/* OPTIONAL 2 - More customized formatting to Murf's liking (still Roam Vanilla base though) */
@import url('https://gitmurf.github.io/masonry-vanilla/masonry-optional-2.css');
```

To customize any of the main settings / colors, add the following UNDERNEATH the @import lines from above and modify accordingly:

```
:root {
    --main-left-bg: white;
    --right-sidebar-bg: rgb(247 248 249);
    --right-sidebar-drag-bg: #337ac6;
    --masonry-bg: white;
    --masonry-scrollbar-bg: lightgrey;
    --masonry-resizer-color: lightgrey;
    --masonry-startWidth: 550px; /* DEFAULT: 550px; Use "unset" to prevent loading in grid like format */
    --masonry-minWidth: 440px;
    --masonry-maxWidth: 1200px;
    --masonry-startHeight: 234px; /* DEFAULT: 243px; Use "unset" to prevent loading in grid like format */
    --masonry-minHeight: 200px;
    --masonry-border: 1px solid lightgrey;
    --closed-bullet-color: 4px solid #CED9E0;
    --code-color: crimson;
    --block-widths: 800px; /* Roam native: 800px; Murf's favorite: 1500px; Full screen: 3400px; */
}
```

It should look like this:

![vanilla-masonry-code-block-example](https://user-images.githubusercontent.com/64155612/107067038-93a74b00-6793-11eb-83a1-f47059b75ab0.png)

### FULL DEMO

https://user-images.githubusercontent.com/64155612/106953016-bf202c00-66e6-11eb-8345-9958fc719abd.mp4

### WANT MASONRY WITH A DARK THEME? Try Abhay's Dracula Pro!

Instructions here --> https://roamresearch.com/#/app/roamcss/page/aT9-qyjya

![Dracula-Pro-Masonry](https://user-images.githubusercontent.com/64155612/107068601-af135580-6795-11eb-9e23-c1b196c03e89.png)

## OPTIONAL roam/js Scripts

**Toggle sidebar full page width scrolling**

```
var tfps = document.createElement("script");
tfps.type = "text/javascript";
tfps.src = "https://gitmurf.github.io/masonry-vanilla/JS/toggleFullPageScroll.js";
document.getElementsByTagName("head")[0].appendChild(tfps);
```

![Toggle left window](https://user-images.githubusercontent.com/64155612/106884097-ba7f5780-6695-11eb-9812-3a6ce5869678.gif)

**Andy Matuschak mode with full height and toggles different sidebar widths with page widths**

```
var mms = document.createElement("script");
mms.type = "text/javascript";
mms.src = "https://gitmurf.github.io/masonry-vanilla/JS/matuschakModeSizer.js";
document.getElementsByTagName("head")[0].appendChild(mms);
```

![Andy Matuschak mode](https://user-images.githubusercontent.com/64155612/106884646-73459680-6696-11eb-838e-4b378e74839b.gif)

## Contributions / Inspiration

First and foremost I must give credit where credit is due (inspiration for Vanilla Masonry):

- Abhay (@abhayprasanna) for all his hardwork and collaboration on this. See his AMAZING Dracula Pro theme at: https://github.com/abhayprasanna/abhayprasanna.github.io
- Daniel van der Merwe (@vandermerwed) created the first Masonry layout that I know of. See his stuff at: https://github.com/vandermerwed/Roam-Research-Dark
- Azlen Elza (@azlen) for Zenith: https://github.com/azlen/roam-themes
- Viktor Tabori (@thesved) for his updates / fixes for Zenith: https://github.com/thesved/thesved.github.io
- Rob Haisfield (@classicrob) for his port of previous Masonry to Dracula Pro: https://github.com/classicrob/Current-themes/blob/master/Abhay-Dracula-Masonry
