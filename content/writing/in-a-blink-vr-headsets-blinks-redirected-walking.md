---
title: "In a Blink: VR Researchers Turned the World and Nobody Noticed"
slug: "in-a-blink-vr-headsets-blinks-redirected-walking"
summary: "Researchers rotated virtual worlds 2–5° during people's blinks and nobody noticed. How it works, Apple's blink patent, and why eye data needs care."
category: "AR / VR"
layout: "feature"
date: "2026-10-14"
cover: "https://www.yasassri.me/assets/images/blog/in-a-blink/cover.webp"
ogImage: "https://www.yasassri.me/assets/images/blog/in-a-blink/cover-og.jpg"
coverAlt: "Cover: the words Don't blink behind Dr. Yasas Sri Wickramasinghe, with eye-tracking brackets on his eyes and a stylised sheet of Apple patent US 10,802,585"
keywords: "blink suppression, redirected walking, virtual reality, eye tracking, Apple patent US 10,802,585, saccades, Vision Pro, HCI"
takeaways: ["In a 2018 VR study, rotating the virtual world 2–5° during natural blinks went unnoticed.", "We blink 15–20 times a minute; with eye jumps, we are functionally blind about 10% of waking time.", "Apple's patent US 10,802,585 describes dimming, pausing, shifting or warping a display during blinks.", "Blink-timed redirection lets people walk long virtual paths inside small rooms.", "Eye data reveals attention, so it deserves privacy and transparency."]
faq: [{"q": "How much of the day are we blind because of blinking?", "a": "We blink about 15 to 20 times a minute, and each blink interrupts vision for roughly a third of a second. Researchers estimate that blinks and saccades together leave us functionally blind about 10% of the time we're awake."}, {"q": "Can a VR headset change the scene while you blink without you noticing?", "a": "Yes. In a 2018 study by Langbehn and colleagues, presented at SIGGRAPH, rotations of about 2 to 5 degrees and viewpoint shifts of about 4 to 9 cm made during natural blinks went unnoticed."}, {"q": "What is redirected walking in VR?", "a": "Redirected walking slowly rotates or shifts the virtual world as you move, so you walk along curves in a small real room while feeling that you are walking straight through a much larger virtual space."}, {"q": "What does Apple's patent US 10,802,585 describe?", "a": "It describes a head-mounted display that detects blinks and saccades with an eye tracker, then uses those moments of suppressed vision to change the display, for example dimming it, pausing frames, lowering the refresh rate or shifting pixels to reduce burn-in. A patent describes a method, not a shipped product."}, {"q": "Is eye-tracking data shared with apps on Apple Vision Pro?", "a": "Apple states that eye input on Vision Pro is not shared with apps, websites or Apple."}]
---
You blinked several times while reading that headline. You didn't see any of them.

In 2018, a team of VR researchers used that fact in a remarkable way. They put people in a virtual world, waited for them to blink, and **rotated the entire world by 2 to 5 degrees in the instant their eyes were shut.** When people's eyes opened, the world had turned. Nobody noticed.

Here's why that's possible:

- **You blink 15 to 20 times a minute.**
- **Each blink cuts your vision for about a third of a second.**
- **Researchers estimate we are functionally blind about 10% of the time we're awake**, once blinks and fast eye jumps (saccades) are added together. Over a 16-hour day, that comes to roughly an hour and a half. That last figure is my arithmetic, but the 10% is theirs.
- **Staring at a screen cuts your blink rate by a third to a half**, according to the American Academy of Ophthalmology.
- **Apple holds a patent on using exactly these moments.** It was granted in 2020, and Apple has been granted two follow-ups in the same family since.

Your brain stitches over every gap so smoothly that you experience one continuous view of the world. Engineers have noticed that this gives them a window. For a third of a second, many times a minute, they can change what's on the screen and you'll never see it happen.

This article is about that window: the experiment that turned the world, the science of why it works, what Apple's patent describes, and what we should and shouldn't do with it.

![Two bars showing a 16-hour day: thin orange gaps scattered across it, and the same gaps added up to about 96 minutes](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-1-you-miss-10-percent.webp "Blinks and eye jumps add up to roughly 10% of waking time. The 96-minute figure is my arithmetic.")

## Why this matters to me

I'm an AR researcher. Much of our work looks at presence in virtual reality, and at why some people feel sick in it. Both come down to the same thing: the gap between what your senses report and what your brain decides is real.

Blinks sit right in that gap. They're a part of human perception that headsets can measure precisely, and one that we, the users, have no conscious access to. That combination is powerful, and that's exactly why it's worth understanding.

## The world turned, and nobody noticed

This is the study I find most fascinating, so let me walk through it.

The paper is *In the blink of an eye*, by Eike Langbehn, Frank Steinicke, Markus Lappe, Gregory Welch and Gerd Bruder, from the University of Hamburg, the University of Münster and the University of Central Florida. It was presented at SIGGRAPH 2018 and published in *ACM Transactions on Graphics*.

Their starting point was a known problem. Virtual worlds are big and real rooms are small. To let people walk naturally, VR systems use *redirected walking*: they slowly rotate the virtual world as you move, so you curve through your real room while believing you're walking straight. If the rotation is too fast, people notice, or feel sick. As Langbehn put it in the SIGGRAPH press release: "Why don't we do the redirection during eye blinks?"

Here's how it worked:

1. **Walk.** Participants wore a VR headset with a built-in eye tracker. The authors point out that ordinary, off-the-shelf eye trackers and headsets are enough.
2. **Blink.** The system waited for natural blinks. Nobody was asked to blink on purpose.
3. **Turn.** At the moment of the blink, the virtual camera moved. The researchers measured how far it could go before people noticed.
4. **Carry on.** When the eyes reopened, the world had shifted slightly.

The results:

- **Rotations of about 2 to 5 degrees, in any direction, went unnoticed.**
- **Viewpoint shifts of about 4 to 9 cm also went unnoticed.**
- In a follow-up study, people walked along a curved virtual path. They **couldn't reliably tell which of two blinks** had their view changed.
- Because each blink allows a small change, **the changes can add up over many blinks.** If you blink 15 times a minute and the world turns 3 degrees each time, that's 45 degrees in a minute (my arithmetic, as an illustration).
- The authors estimate this could make redirected walking **about 50% more effective.**

Think about what that means. Your brain is so committed to a stable world that it rebuilds one after every blink, even when the world has quietly changed. In VR, that lets us fit long walks into small rooms. It also shows how much of what we "see" is our brain's best guess.

![How the blink study worked: walk, blink, the view turns 2–5 degrees, carry on unaware](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-2-the-world-turned.webp "How the 2018 blink study worked (Langbehn et al., SIGGRAPH 2018). The corridor and the 45° total are illustrations.")

## The blink you never see

Blinking isn't only about keeping your eyes wet.

In 2013, Tamami Nakano and colleagues scanned people's brains while they watched an episode of *Mr. Bean*. During blinks, activity briefly rose in the brain's default-mode network, the system active when we're resting or mind-wandering. When the researchers inserted blackouts of the same length into the video, that effect didn't appear. Their suggestion is that a blink may be a tiny mental pause, not just a mechanical wipe.

In 2018, David Hoppe and colleagues at TU Darmstadt showed that people learn to *time* their blinks. When participants expected something important to appear, they held off blinking, an unconscious trade-off between the urge to blink and the risk of missing information.

So your blinks are frequent, short, partly strategic, and invisible to you. From a computer's point of view, they're also very predictable. That's where the patent comes in.

## Inside Apple's blink patent

US Patent 10,802,585, *"Electronic devices with display operation based on eye activity"*, was first filed by Apple in July 2018 and granted in October 2020. The inventors are Mehmet N. Agaoglu and Andrew B. Watson. Two continuations followed: US 11,782,503 in 2023 and US 12,197,643 in January 2025.

The idea is simple. A head-mounted display tracks your eyes. When it detects a blink or a saccade, it uses that moment of suppressed vision to do things that would otherwise be noticeable.

The patent's description is full of specific numbers:

- An eye tracker can respond in **under 5 milliseconds**.
- A blink can be called when the eyelid has dropped about **10%**.
- The lid takes roughly **75 to 250 ms** to close, and a full blink lasts about **200 to 500 ms**.
- With the lid shut, more than **500 times** less light reaches the eye.
- Vision stays suppressed for about **100 to 200 ms** after the blink ends.
- Blinks happen around **10 to 20 times a minute**.

Put those together and a blink is enormous by computing standards: 40 to 100 times longer than the tracker needs to notice it.

![Chart of eyelid position over 700 milliseconds with five stages from detection to post-blink suppression](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-3-anatomy-of-a-blink.webp "Anatomy of a blink, using numbers from Apple’s US 10,802,585. The curve shape is illustrative.")

And what could a headset do in that time? The patent lists a range of options:

- **Dim:** lower the brightness, or switch off the backlight or part of the display.
- **Pause:** stop updating frames, repeat the last one, or show a blank frame.
- **Lower:** drop the refresh rate, resolution or colour depth for a moment.
- **Shift:** move the whole image by a number of pixels to reduce burn-in. The examples go up to 10–25 pixels.
- **Tint:** nudge colour or brightness in small steps, one blink at a time.
- **Warp:** shift, shear or re-project the geometry of the picture.

The stated benefits are practical: lower power use, less burn-in, better performance. For a battery-powered headset, or the glasses that may follow, those matter a lot.

The usual caution applies. A patent describes a method. It doesn't tell us what any Apple product does today, and Apple hasn't said.

![Six cards for display changes during a blink: dim, pause, lower, shift, tint, warp](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-4-while-your-eyes-are-shut.webp "Six things a headset can do during a blink, as listed in Apple’s patent, and the patent family timeline.")

## Walk forever in a small room

The blink study is part of a bigger effort to let people walk through huge virtual worlds inside small rooms. Others have used blinks and saccades in the same way:

- **2016:** Intel filed a patent (US 10,311,641, by Daniel Pohl) to change the virtual camera's orientation only during saccades. Its example uses a 15 × 15 ft physical space.
- **2018:** Alongside the blink study above, Qi Sun and colleagues from Stony Brook, NVIDIA and Adobe showed that saccades can significantly increase how much the world can be turned without people noticing, and without causing simulator sickness.
- **2020:** Researchers at Concordia University filed a patent (US 11,557,105, granted 2023) that rotates the *peripheral* part of the view, by up to **13.5 degrees**, during natural blinks and saccades. In their tests, inside a **4 × 4 m** space, one participant walked **58.51 m without needing a reset**. The longest recorded walk was **103.9 m**.

Your feet walk in circles. Your mind believes it walked down a long path.

![A looping path inside a 4 by 4 metre room next to a long path through a virtual space](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-5-walk-forever.webp "Redirected walking: small turns during blinks and eye jumps keep a long virtual walk inside a small room. Paths are illustrative.")

![Timeline from 2013 to 2025 of blink research and blink-related patents](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-6-engineering-the-gap.webp "From blink science to patents: a short history of designing for the gaps in vision.")

## The uncomfortable question

Everything above is useful. Saving battery, hiding glitches and making VR walking more natural are good goals, and in my field, anything that reduces discomfort in VR is welcome.

But think about what's actually being described: a system that knows when you can't see, and acts in exactly those moments.

Eye data is already sensitive. In 2011, Google filed a patent (US 8,510,166, granted 2013) for a head-mounted gaze tracker. It described logging the items a wearer looked at, charging advertisers per gaze, and inferring emotional states such as surprise or interest from pupil dilation. The same patent also mentions opt-in controls and removing personal identifiers.

When Apple launched Vision Pro in 2024, it took a clear position on gaze: "Your eye input is not shared with apps, websites, or Apple."

These are two very different approaches to the same kind of data. As eye tracking moves from headsets into everyday glasses, which approach wins will matter to all of us.

## What I take from this

If you design for XR, or for any technology that reads the body, here's where I've landed:

1. **Design with perception, not against it.** Human vision has gaps. Working with them can make devices cooler, longer-lasting and more comfortable.
2. **Treat eye data as intimate.** Where people look, and when they blink, reveals attention. Keep it on the device whenever possible.
3. **Say what you change.** If a system edits the world while people blink, they deserve to know that it does, even if they'd never notice it happening.
4. **Respect the pause.** Blinks may be small mental breaks, and screens already reduce them. Our designs shouldn't squeeze them out further.

![Four design principles and a list of good uses of the gap versus lines not to cross](https://www.yasassri.me/assets/images/blog/in-a-blink/fig-7-invisible-but-honest.webp "Four principles for technology that acts while you can’t see.")

## A closing thought

We tend to judge technology by what it shows us. The headset era is teaching us to pay attention to what happens when we're not looking, sometimes literally.

There's real beauty in a machine that understands human perception well enough to fit into its gaps. There's also a responsibility that comes with it. The more invisible a technology becomes, the more it has to earn our trust in the moments we *can* see.

You've blinked a few hundred times while reading this. I'd love to know: would you want your headset to tell you what it does in those moments, or would you rather never know?

## Sources

1. Apple, US 10,802,585 B2: [Electronic devices with display operation based on eye activity](https://patents.google.com/patent/US10802585B2/en) (priority July 2018, granted October 2020).
2. Apple continuations: [US 11,782,503](https://patents.justia.com/patent/11782503) (2023) and [US 12,197,643](https://patents.justia.com/patent/12197643) (2025).
3. SIGGRAPH 2018 press release: [Improving the VR experience with a blink of an eye](https://s2018.siggraph.org/press/news-releases/improving-vr-experience-blink-eye).
4. Langbehn, E., Steinicke, F., Lappe, M., Welch, G. F., & Bruder, G. (2018). [In the blink of an eye: leveraging blink-induced suppression for imperceptible position and orientation redirection in virtual reality](https://dl.acm.org/doi/10.1145/3197517.3201335). *ACM Transactions on Graphics* 37(4).
5. Sun, Q., et al. (2018). [Towards Virtual Reality Infinite Walking: Dynamic Saccadic Redirection](https://research.nvidia.com/labs/amri/publication/sun2018saccade). *ACM Transactions on Graphics* (SIGGRAPH).
6. Pohl, D. (Intel). [Using saccadic eye movements to improve redirected walking](https://patents.google.com/patent/US10311641B2/en), US 10,311,641 B2.
7. Joshi, Y., & Poullis, C. (Concordia University). [Managing real world and virtual motion](https://patents.google.com/patent/US11557105B2/en), US 11,557,105 B2.
8. Hoppe, D., Helfmann, S., & Rothkopf, C. A. (2018). Humans quickly learn to blink strategically in response to environmental task demands. *PNAS*. [TU Darmstadt summary](https://www.tu-darmstadt.de/universitaet/aktuelles_meldungen/archiv_2/2018/2018quartal1/neuesausdertueinzelansichtbreitespalte_199104.en.jsp).
9. Nakano, T., et al. (2013). Blink-related momentary activation of the default mode network while viewing videos. *PNAS*. [Osaka University release](https://resou.osaka-u.ac.jp/en/research/2012/20121225_1) · [Smithsonian coverage](https://www.smithsonianmag.com/science-nature/why-do-we-blink-so-frequently-172334883/).
10. American Academy of Ophthalmology: [Protect your eyes from too much screen time](https://aao.org/newsroom/news-releases/detail/protect-your-eyes-from-too-much-screen-time).
11. Google, US 8,510,166 B2: [Gaze tracking system](https://patents.google.com/patent/US8510166B2/en).
12. Apple: [Eyes, Hands & Privacy](https://www.apple.com/legal/privacy/data/en/eyes-hands/).
13. Sony, US 2017/0285736 A1: [Reducing rendering computation and power consumption by detecting saccades and blinks](https://patents.google.com/patent/US20170285736A1/en).

*Note: "about an hour and a half a day" is my own arithmetic (10% of a 16-hour waking day). The 10% estimate comes from the SIGGRAPH 2018 and TU Darmstadt sources.*
