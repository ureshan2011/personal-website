---
title: "If a Machine Can Make You Feel You Did Something You Didn’t, Who Decides the Timing?"
slug: "machine-moved-first-sense-of-agency-muscle-stimulation"
summary: "Muscle stimulation fired 160 ms after a cue made people react 80 ms faster, and it still felt like their own move. What five HCI studies mean for design."
category: "HCI"
layout: "feature"
date: "2026-10-17"
cover: "https://www.yasassri.me/assets/images/blog/machine-moved-first/cover.webp"
ogImage: "https://www.yasassri.me/assets/images/blog/machine-moved-first/cover-og.jpg"
coverAlt: "Cover: the giant number 80 ms above the words faster than you, beside Dr. Yasas Sri Wickramasinghe, with a card comparing a person's own reaction to one where muscle stimulation fires at 160 ms"
keywords: "sense of agency, electrical muscle stimulation, EMS, Preemptive Action, Primed Action, My(o) Action, TMS, reaction time, human augmentation, HCI"
takeaways: ["Firing muscle stimulation 160 ms after a cue made people tap about 80 ms faster, and much of the feeling of control stayed.", "Fire it instantly and people said the movement wasn’t theirs; fire it too late and there was no speed gain.", "Training with just-in-time stimulation left people about 8 ms faster after the electrodes came off.", "Whoever touched first, person or machine, decided whether a tap felt like mine, even when the machine was right.", "Systems that wait for the person’s own muscle signal, then help, kept speed and control together."]
faq: [{"q": "What is the sense of agency?", "a": "It is the feeling that you caused your own action, the quiet sense of I did that which your brain attaches to every movement. HCI researchers measure it by asking people to rate how much they felt they caused a movement, often on a 1 to 7 scale."}, {"q": "Can electrical muscle stimulation make you react faster?", "a": "Yes. In a 2019 CHI study, firing EMS 160 ms after a visual target made people tap about 80 ms faster than their usual reaction, while much of their sense of agency stayed. Firing it immediately was even faster but felt like the machine had taken over."}, {"q": "Why does machine-driven movement feel like it isn’t yours?", "a": "In these studies, the feeling depended on timing and agreement. When the machine moved the body before the person was about to move, or against what they intended, people disowned the movement, even when the machine chose the right answer."}, {"q": "What is My(o) Action?", "a": "A system presented at CHI 2026 that reads the muscle’s own electrical signal (EMG) as you start to move, then uses EMS to finish the movement faster. In its study, people reacted about 23 ms faster and could still stop on red-light trials 89% of the time."}]
---
Your hand moves. It feels like your decision.

But what if a machine started that movement for you, and you still felt it was yours?

HCI researchers have been running that experiment for 15 years. Here's what they built, what people felt, and what it means for every piece of technology that tries to help us a split second early.

## First, the problem: a body that feels hacked

![Illustration of the PossessedHand setup: a forearm wearing two belts of electrode pads wired to a stimulator, the hand over the strings of a koto, with the quote I felt like my body was hacked](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-1-when-the-machine-takes-over.webp "PossessedHand (2011): 28 electrode pads moved the fingers to guide koto playing, and it felt like being hacked.")

In 2011, researchers in Tokyo built **PossessedHand**: two belts with 28 electrode pads wrapped around the forearm. Small electrical pulses, called **electrical muscle stimulation (EMS)**, made the muscles contract and moved the fingers. It was enough to guide beginners through playing the koto, a Japanese harp.

It worked as a guide. But one participant summed up the feeling:

> "I felt like my body was hacked."

That missing feeling has a name: the **sense of agency**. It's the quiet "I did that" your brain attaches to every movement you make.

## Study 1: what if timing is the problem?

![Illustration of the Preemptive Action study: a hand on a touchscreen with EMS pads on the forearm, the ring finger tapping a target; cards read fire instantly not me, fire at 160 ms mostly me and 80 ms faster, fire too late me but no speed gain](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-2-fire-just-in-time.webp "Preemptive Action (2019): timing decided whether a machine-started tap felt like “me”.")

**What they did.** In 2019, Shunichi Kasahara, Jun Nishida and Pedro Lopes put EMS pads on the forearm muscle that bends the ring finger. A target appeared on a touchscreen, and 12 people tapped it as fast as they could. On each tap the machine fired at a different moment, anywhere from 200 ms before the target appeared to 400 ms after. After every tap, people rated one statement from 1 to 7: *"I did that."*

**What they found.**

- **Fire instantly:** the finger moved very fast, but people said it wasn't them.
- **Fire too late:** it felt like theirs, but there was no speed gain.
- **Fire at 160 ms:** people tapped about **80 ms faster** than usual, and much of the "I did that" feeling stayed.

A second study with 12 new people confirmed it: firing at 160 ms felt clearly more "mine" than firing right away. The project was later listed by Guinness World Records.

**Why it matters.** Your brain doesn't seem to check *who* started a movement. It checks whether the movement arrived when and where you were about to move anyway.

## Study 2: does the speed stay behind?

![Two panels: training with EMS pads while tapping a button when a light flashes, then testing without them; only the nudge just before them left people 8 ms faster](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-3-does-the-speed-stay.webp "EMS training (2021): only “just before you” training left people faster after the pads came off.")

**What they did.** In 2021, the team asked 17 people to tap a button with their ring finger whenever an LED flashed. Each person trained with EMS on three separate days, each with a different timing: a nudge at the flash, a nudge 40 ms before their own reaction, or a nudge after it. Then the pads came off and everyone was tested again.

**What they found.** Only the "just before you" training left people faster on their own: about **8 ms** on average, and up to 20 ms for some. Nudging at the flash or after them made no reliable difference.

**Why it matters.** It's a small effect, but a telling one. Help that feels like yours may also be help your body learns from.

## Study 3: who touched first?

![Two hands on a tablet showing TOUCH RED with the word BLUE printed in red and RED printed in blue, EMS pads on both forearms; you touched first means I did that, the machine touched first means not me](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-4-who-touched-first.webp "Whose Touch Is This? (2022): the feeling of control followed whoever touched first.")

**What they did.** Researchers turned the task into a colour game. The screen said something like "TOUCH RED" and showed two words, for example "BLUE" printed in red and "RED" printed in blue. Fifteen people had to tap the word in the right colour, using the ring finger of the hand on that side. Sometimes EMS pushed a finger, onto the right answer or the wrong one, at different moments.

**What they found.** The feeling of control came down to one thing: **who touched first**. If the person got there first, they said "I did that." If the machine got there first, they said "not me", **even when the machine picked the right answer.**

**Why it matters.** Being right isn't enough. A system that acts before you do takes the feeling of control away, even when it helps.

## Study 4: nudge the brain, not the muscle

![A seated person pressing a key when a monitor flashes and beeps, with a magnetic coil on a stand above their head; the feeling of control was kept and the speed gain was about 8 ms](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-5-nudge-the-brain.webp "Primed Action (2025): a weak brain pulse kept the feeling of control but added little speed.")

**What they did.** In 2025, Yudai Tanaka, Hunter Mathews and Pedro Lopes skipped the muscle entirely. A magnetic coil on a stand sat over the movement area of the brain (transcranial magnetic stimulation, or TMS). When the screen flashed and a beep sounded, it sent one very weak pulse, too weak to move the hand or be felt there. Twelve people pressed a key as fast as they could. The team compared this with EMS and with a placebo pulse aimed at a brain area that doesn't control movement.

**What they found.** The feeling of control stayed as high as with the placebo, and far above EMS. But the speed gain was tiny: about 8 ms in a finer analysis, and their main statistical test found no reliable difference.

**Why it matters.** It makes the trade-off visible. **Force the movement and you get speed. Only prepare it and you keep the feeling.**

## Study 5: let the person go first

![A forearm with an EMG sensor and EMS pads, fingers on a pressure pad, next to green tap and red don't lights; 23 ms faster and 89% held back on red lights](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-6-let-the-person-go-first.webp "My(o) Action (2026): the machine waits for your muscle to start, then helps.")

**What they did.** At CHI 2026, the same lab presented **My(o) Action**. A sensor on the forearm (EMG) listens for the muscle's own electrical signal as you start to move. Only then does EMS fire to finish the tap. Twelve people rested their fingers on a pressure pad. Green light: tap. Red light: don't.

**What they found.**

- People tapped about **23 ms faster** than their own reaction.
- On red lights they held back **89%** of the time. With EMS firing on a timer, only **50%**, because the machine kept tapping for them.
- On those red-light trials, their sense of control averaged **6.1 out of 7**, compared with **1.5** for timed EMS.

**Why it matters.** The machine never starts anything. It only speeds up what you've already decided to do.

## The bigger picture: every assistant faces this choice

![Three numbered rules: arrive just before them, go where they were going, let them go first, applying to autocomplete, driver assist, aim assist and snapping cursors](https://www.yasassri.me/assets/images/blog/machine-moved-first/fig-7-help-that-feels-like-yours.webp "Three rules for help that feels like yours.")

Few of us will ever wear muscle stimulators. But plenty of everyday technology acts a split second ahead of us: autocomplete, driver assist, aim assist in games, cursors that snap to buttons.

A 2012 CHI study tested exactly this with a mouse. Researchers made on-screen targets "sticky" at four levels of assistance. Mild help felt fine. Beyond a certain level, people's sense of agency dropped, **even though the computer correctly guessed where they were going.**

Put the studies together and three design rules appear:

- **Arrive just before them.** Help that comes too early feels like a takeover.
- **Go where they were already going.** Overriding a choice breaks the feeling, even when the machine is right.
- **Let them go first.** The best systems wait for a signal, then help.

## The question I can't shake

If good timing can make us feel we did something we didn't fully do, **who decides that timing?** And should we be told when it's happening?

*Where would you draw the line: sports training, accessibility, games, cars?*

## Sources

1. Tamaki, E., Miyaki, T., & Rekimoto, J. (2011). [PossessedHand: Techniques for Controlling Human Hands Using Electrical Muscles Stimuli](https://doi.org/10.1145/1978942.1979018). CHI. Participant quote as cited in Tanaka et al. (2025).
2. Kasahara, S., Nishida, J., & Lopes, P. (2019). [Preemptive Action: Accelerating Human Reaction using Electrical Muscle Stimulation Without Compromising Agency](https://doi.org/10.1145/3290605.3300873). CHI.
3. Kasahara, S., Takada, K., Nishida, J., Shibata, K., Shimojo, S., & Lopes, P. (2021). [Preserving Agency During Electrical Muscle Stimulation Training Speeds up Reaction Time Directly After Removing EMS](https://doi.org/10.1145/3411764.3445147). CHI.
4. Tajima, D., Nishida, J., Lopes, P., & Kasahara, S. (2022). [Whose Touch is This?: Understanding the Agency Trade-Off Between User-Driven Touch vs. Computer-Driven Touch](https://doi.org/10.1145/3489608). ACM TOCHI 29(3).
5. Tanaka, Y., Mathews, H., & Lopes, P. (2025). [Primed Action: Preserving Agency while Accelerating Reaction Time via Subthreshold Brain Stimulation](https://doi.org/10.1145/3746059.3747634). UIST.
6. Tanaka, Y., Hsu, C.-W., Felalaga, B., & Lopes, P. (2026). [My(o) Action: Accelerating Voluntary Actions via Electromyography and Muscle Stimulation](https://lab.plopes.org/published/2026-CHI-MyoAction.pdf). CHI.
7. Coyle, D., Moore, J., Kristensson, P. O., Fletcher, P., & Blackwell, A. (2012). [I did that! Measuring users' experience of agency in their own actions](https://doi.org/10.1145/2207676.2208350). CHI.
8. Human Computer Integration Lab, University of Chicago. [Agency project page](https://lab.plopes.org/projects/agency.html).

*The illustrations are my recreations of each study's setup, not figures from the papers.*
