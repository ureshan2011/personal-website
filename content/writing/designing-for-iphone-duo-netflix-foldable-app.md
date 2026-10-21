---
title: "iPhone Duo Design Guidelines: What Netflix’s Foldable App Gets Right"
slug: "designing-for-iphone-duo-netflix-foldable-app"
summary: "Netflix rebuilt its app for Apple’s foldable iPhone Duo. What it changed, Apple’s new iPhone Duo design guidelines in plain English, and what it means for HCI."
category: "HCI"
layout: "feature"
date: "2026-10-22"
cover: "https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/cover.webp"
ogImage: "https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/cover-og.jpg"
coverAlt: "Cover: Built for the bend, with an iPhone Duo-style foldable shown closed, open and propped up like a tiny laptop, playing a sunset film"
keywords: "iPhone Duo, designing for iPhone Duo, Apple Human Interface Guidelines, foldable iPhone, Netflix iPhone Duo, foldable app design, device poses, displacement, reserved regions, arrangement views, HCI"
takeaways: ["Apple published “Designing for iPhone Duo” in its Human Interface Guidelines on 9 September 2026, the day it announced the phone.", "Netflix’s Clips keep playing when you open the phone, switching from vertical to horizontal video.", "Prop the phone up like a laptop and Netflix puts the picture on the top half and the controls on the bottom half.", "Apple asks for one layout that resizes well, not a separate design for every pose.", "Toolbars and tab bars move to the side of the screen, and apps shouldn’t fight that.", "When the phone folds, move things just enough to keep them off the crease, nothing more."]
faq: [{"q": "What is iPhone Duo?", "a": "iPhone Duo is Apple’s first foldable iPhone, announced on 9 September 2026 and on sale from 23 October 2026. It has a 5.4-inch outer screen when closed and a 7.6-inch inner screen when open, and Apple says both screens share the same aspect ratio."}, {"q": "What did Netflix change for iPhone Duo?", "a": "Three things were reported: Clips that keep playing when you open the phone and switch from vertical to horizontal video, playback controls that adapt to whether the phone is flat, folded or propped up, and a larger Billboard on the home screen with more dynamic visual effects."}, {"q": "What do Apple’s iPhone Duo design guidelines say?", "a": "In short: build one layout that resizes well instead of a design per pose, keep the same features on both screens, let the system move toolbars and tab bars to the side, keep content clear of reserved regions like the fold and cameras, and avoid big layout changes when people fold the phone."}, {"q": "What are device poses on iPhone Duo?", "a": "Poses are the ways people hold or place the phone, such as partially folded like a book, flat on a surface, standing on an edge, or propped up like a small laptop. Apple asks apps to handle every pose using size classes rather than a custom layout for each one."}, {"q": "Do Android foldables already do this?", "a": "Partly. On foldables like the Galaxy Z Fold and Pixel Fold, the Netflix Android app can already show video on the top half and controls on the bottom half. What is new on iPhone Duo is Apple’s full set of system-wide design rules for the fold."}]
---
A short Instagram reel of the Netflix app running on the new iPhone Duo sent me down a rabbit hole this week.

On the surface it looks simple. You watch a clip on the small screen, you open the phone, and the clip keeps going on the big screen. But that tiny moment hides a lot of design decisions. Where do the buttons go? What happens to the picture when the screen bends in the middle? What if the phone is standing on a table?

Apple has written down its answers. On the same day it announced iPhone Duo, it published a new page in its Human Interface Guidelines called **“Designing for iPhone Duo”**. Netflix was one of the first apps to follow it.

So I want to walk through both: what Netflix built, and the design rules behind it. I'll keep it simple for anyone who uses a phone, and I'll add a few notes at the end for my fellow HCI researchers.

## What is iPhone Duo?

**iPhone Duo is Apple's first foldable iPhone.** It was announced on 9 September 2026 and goes on sale on 23 October. Closed, it has a 5.4-inch outer screen. Open, it has a 7.6-inch inner screen. Apple says both screens share the same aspect ratio, so content scales without awkward cropping.

![Apple press photo: one hand holds iPhone Duo closed, showing its 5.4-inch outer screen, the other holds it open, showing the 7.6-inch inner screen](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/iphone-duo-outer-and-inner-screens.webp "The outer and inner screens. Image: Apple Newsroom, 9 September 2026.")

Folding phones are not new. Samsung launched the first mainstream foldable in 2019, and foldables still make up a very small share of phones sold. What is new is Apple bringing its whole app ecosystem, and a fairly strict set of design rules, to the shape.

## What did Netflix change for iPhone Duo?

**Netflix made three changes: Clips that carry on when you open the phone, playback controls that follow the fold, and a bigger Billboard.** Apple put Netflix on stage as an example of an app built for the fold, and Variety and What's on Netflix reported the details.

### 1. Clips that follow you from the small screen to the big one

Netflix already has Clips, a scrolling feed of short videos from its shows and films. On iPhone Duo you can scroll Clips on the outer screen with the phone closed. When you open the phone, the same clip carries on, and the video switches from vertical to horizontal.

![Animation: a foldable phone shows a vertical sunset clip on its outer screen, then opens like a book and the same clip continues in widescreen at the same timestamp](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/netflix-clips-outer-to-inner-screen.webp "Closed, a vertical clip. Open, the same moment in widescreen. My illustration: the phone, the show and the screens are drawn by me, not taken from the app.")

This sounds small, but it's the whole point of a foldable. You start something in your pocket-sized mode and continue it in your big-screen mode without losing your place.

### 2. Playback controls that move with the phone

This is the feature I find the most clever. The video player changes its layout depending on how you hold the phone: fully open, folded, or propped up.

If you stand the phone on a table half open, like a tiny laptop, the picture stays on the upright top half and the controls drop to the bottom half lying on the table.

![Animation: flat, the play button sits on the fold line; when the phone is propped up like a laptop, the video moves to the top half and the playback controls move to the bottom half](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/netflix-playback-controls-propped-up.webp "Flat, the play button sits right on the crease. Propped up, the picture and the controls each get their own half.")

Look at the first state in that animation. With the phone flat, the play button lands right on the fold line. That's fine when the screen is flat. It's not fine when the screen is bent, because you'd be tapping into a valley. Moving the controls to the bottom half solves that, and it also puts them where your finger can rest on a stable surface.

To be fair to the rest of the industry, Android foldables like the Galaxy Z Fold and Pixel Fold already let Netflix do something similar: video on the top half, controls on the bottom. So this is less of an invention and more of a good idea arriving on a new platform.

### 3. A bigger, livelier Billboard

The Billboard is the large banner at the top of the Netflix home screen. On iPhone Duo it uses the larger display for more dynamic visual effects. The reports so far don't describe those effects in detail, so I won't guess.

![Apple press image of the Netflix app on the iPhone Duo inner screen in landscape, with status, actions and tab bar stacked down the right edge](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/netflix-iphone-duo-inner-screen.webp "Netflix on the inner screen. Notice the controls stacked down the right edge. Image: Apple Newsroom.")

A Netflix spokesperson told Variety that members want the “same immersive, big-screen feeling to travel with them”. You can see that idea in all three features. The app isn't trying to be different on each screen. It's trying to feel like one continuous experience.

## What do Apple's iPhone Duo design guidelines say?

**In one line: build one layout that resizes well, keep it the same app on both screens, let controls move to the side, and when the phone folds, move things just enough.** The Human Interface Guidelines page is short and quite readable. Here is my summary of the parts that matter most.

### Rule 1: Don't design six layouts. Design one that resizes well.

Apple calls the different ways you can hold the phone **poses**. Folded like a book, flat on a table, standing on its edge, propped like a laptop, and so on.

![Six line drawings from Apple's guidelines showing iPhone Duo poses: closed, tent, flat, book, portrait and laptop](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/iphone-duo-device-poses-hig.webp "The poses Apple shows in its guidelines. Image: Apple Human Interface Guidelines.")

You might expect Apple to ask for a special design for each pose. It does the opposite. It says apps should use the same layout tools they already use for different screen sizes (Apple calls them size classes, margins and safe areas) and let the layout stretch. Avoid fixed widths. Avoid anything tied to one specific screen.

I like this rule a lot. It's the boring answer, and boring answers usually age well.

### Rule 2: It's the same app on both screens.

Apple asks apps to keep the same features and the same state across both screens. The inner screen can show one extra level of detail if it helps. Apple's example is Mail. Closed, you see either your inbox or one email. Open, you see both side by side.

What you shouldn't do is hide a feature on one screen, or make people learn a different app when they open the phone.

### Rule 3: The controls move to the side.

This is the most visible change. On the outer screen, which is wider and shorter than a normal iPhone, the system moves toolbars and tab bars from the top and bottom to the right edge. That keeps more height for your content.

![Animation: a typical iPhone photo library with bars at the top and bottom morphs into the wider iPhone Duo outer screen, where status, toolbar and tab bar stack along the right edge](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/iphone-duo-controls-move-to-the-side.webp "A typical iPhone layout turns into the iPhone Duo outer screen: same controls, new home along the side. My illustration based on Apple’s guidelines.")

Apple is clear that apps should, in general, not override this. The side position is meant to become something your hands just know, across every app. The guidelines also cover the details: back and close at the top, frequent actions kept visible longest, symbols instead of text labels where possible, and one shared overflow menu.

### Rule 4: When it folds, move things just enough.

Some parts of the screen are special. Apple calls them **reserved regions**: the outer camera, the inner camera when it's on, and the fold itself when the phone is half open. Content should stay out of these spots.

The system already handles a lot of this. Alerts, menus and sheets move away from the fold on their own. Split views adjust their columns. Apple's guidelines even suggest using an even number of columns in grids, so the fold falls between items rather than through one.

![Animation: an episode list and detail view on a flat inner screen with an alert over the crease; as the phone half folds, the panes become equal and the alert slides into the right half](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/iphone-duo-fold-displacement.webp "Half open, the panes even out and the alert slides off the crease. My illustration based on Apple’s guidelines.")

![Apple's Notes example on the iPhone Duo inner screen: flat, the note list is narrower than the note; half folded, both panes are the same width](https://www.yasassri.me/assets/images/blog/iphone-duo-netflix/iphone-duo-notes-split-view-fold.webp "Apple’s own example in Notes, flat and half folded. Image: Apple Human Interface Guidelines.")

But the key line is about restraint. Apple asks designers to avoid big layout changes when people fold the phone. Move only what you need to keep things visible and easy to tap. If buttons jump around, people lose track of them.

Netflix's playback design fits this rule. The controls move once, to a place that makes sense, and stay there.

### Rule 5: Games should fill the screen.

A smaller point, but a nice one. Games can lock to portrait or landscape, but they should still fill the screen as the pose changes. Apple prefers changing the aspect ratio over adding black bars. If bars can't be avoided, it suggests filling them with artwork so it still feels full screen.

## Why does iPhone Duo matter for HCI research?

**Because it turns ideas the research community has studied in the lab into everyday behaviour for millions of people.** Here are the threads I find most interesting.

**Posture as context.** Research prototypes have looked at how the angle between two screens changes what people want to do. One well-known example is Codex, a dual-screen tablet prototype from Hinckley and colleagues at CHI 2009. Apple has now turned “pose” into a first-class design concept. That gives us a chance to study posture-aware interfaces outside the lab.

**Spatial memory and stable controls.** Apple's “move just enough” rule lines up with what we know about spatial memory in interfaces. People become fast when commands stay in the same place, and lose that speed when layouts shift. Cockburn and colleagues' survey on novice-to-expert transitions (ACM Computing Surveys, 2014) is a good starting point. An open question is whether one shared side position across all apps speeds up learning, or whether the switch between side bars (outer screen) and normal bars (inner screen in portrait) causes small but real errors.

**Noticing layout changes.** When content moves during a fold, users have to re-find things. The change blindness literature, for example Rensink, O'Regan and Clark (1997), suggests that changes during a physical action can be easy to miss. It would be interesting to measure how much animated, minimal movement actually helps compared with simply re-flowing the layout.

**Reach and grip.** Moving controls to one edge is a strong bet about how people hold a wider phone. It would be worth testing with left-handed users and people with smaller hands, since the controls stay on the same side even in right-to-left languages.

If anyone is already running studies on any of this, I'd love to hear about it.

## What can app makers learn from Netflix?

**Start with a layout that resizes cleanly, then design carefully for the one or two moments where the fold really changes things.** As a checklist:

- Make sure your layout resizes cleanly before you add anything special.
- Keep the same features on both screens.
- Use the system bars and let them move to the side.
- Find the moments where the fold genuinely changes the experience, like Netflix's propped-up playback, and design those with care.
- Keep everything else calm.

## Final thought

The hinge gets the headlines, but the guidelines are the real story. Apple's message is basically: don't treat the fold as a gimmick, treat it as a change in context, and only respond where it helps people.

Netflix's version of that is a play button that knows where your finger will be when the phone is on a table. That's a small thing. Good design usually is.

*What app would you most like to see redesigned for a folding phone?*

## Sources

1. Apple. [Designing for iPhone Duo](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo). Human Interface Guidelines, 9 September 2026.
2. Apple Newsroom. [Apple unveils iPhone Duo](https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/). 9 September 2026.
3. Variety. [Netflix and Apple iPhone Duo features](https://variety.com/2026/digital/news/netflix-apple-iphone-duo-foldable-features-1236856362/). 9 September 2026.
4. Hurst, A. [Netflix Has Redesigned its Mobile App for iPhone Duo: What's Different?](https://www.whats-on-netflix.com/news/netflix-has-redesigned-its-mobile-app-for-iphone-duo-whats-different/). What's on Netflix, 10 September 2026.
5. Unagar, S. [Designing for iPhone Duo: HIG Guide in 5 Minutes](https://www.sagarunagar.com/blog/iphone-duo-human-interface-guidelines). 12 September 2026.
6. Hinckley, K., Dixon, M., Sarin, R., Guimbretière, F., & Balakrishnan, R. (2009). [Codex: A Dual Screen Tablet Computer](https://doi.org/10.1145/1518701.1518996). CHI.
7. Cockburn, A., Gutwin, C., Scarr, J., & Malacria, S. (2014). [Supporting Novice to Expert Transitions in User Interfaces](https://doi.org/10.1145/2659796). ACM Computing Surveys 47(2).
8. Rensink, R. A., O'Regan, J. K., & Clark, J. J. (1997). [To See or Not to See: The Need for Attention to Perceive Changes in Scenes](https://doi.org/10.1111/j.1467-9280.1997.tb00427.x). Psychological Science 8(5).

*Images credited to Apple Newsroom and Apple Human Interface Guidelines belong to Apple Inc. and are used for commentary. The animations are my own illustrations; the show “Northbound” and its artwork are made up.*
