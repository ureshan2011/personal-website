---
title: "Computer Architect's View on Apple M1 Ultra Chip"
slug: computer-architect-s-view-on-apple-m1-ultra-chip
summary: "A computer-architecture perspective on Apple's M1 Ultra chip, examining how its UltraFusion interconnect fuses two dies into a single unified processor. Considers what that design choice means for chip architecture more broadly."
category: "Architecture"
originalUrl: https://yasassri.medium.com/computer-architects-view-on-apple-m1-ultra-chip-821805860c42
originalSource: "Medium"
---
Computer Architecture

Computer Organization

Cpu

Benchmark

Processors

[

![Yasas Sri Wickramasinghe](https://miro.medium.com/v2/resize:fill:64:64/1*abNALGUtTLIDn8RcSNFJWA.jpeg)

](/?source=post_page---byline--821805860c42---------------------------------------)

[Yasas Sri Wickramasinghe](/?source=post_page---byline--821805860c42---------------------------------------)

6 min readMar 20, 2022

\--

Did Apple Just Release a Breakthrough Design in CPU Structure and Organization?

Press enter or click to view image in full size

The Apple event on 8th March 2022 unleashed a truly unprecedented computer system packed in a boxy compact design. They called this machine as the “Mac Studio”.

As an enthusiast and researcher on computer architecture, the CPU design included in Mac Studio caught my attention and it made me to think that did Apple just released a breakthrough System On Chip (SoC)?

This article brings you a detailed review on Apple M1 Ultra chip, which was included as one of two processor variations available with Apple’s Mac Studio, more focused on the CPU organization, architecture and data flow.

## Apple Silicon M1 Series

The long Intel chip history in apple products is gradually coming to an end with the M1 Series of Apple’s in-house silicon chips. It is exciting to see the breakthrough change that Apple brings into their MacBooks, iPads, and many more devices.

They first released the M1 chip in November 2020 with MacBook Air to the market, and it was a big HIT! The processor’s efficiency was top-notch, and the MacBook Air laptops had ~10-hour battery life without compromising performance.

The Apple M1 Pro and M1 Max chips were another step ahead, released on October 2021 Apple event featuring high-performance MacBook Pro models.

A few weeks ago, Apple released their latest M1 Chip, Ultra with “Mac Studio,” and they [claim](https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/) this chip to be the “world’s most powerful chip for a personal computer.”

Press enter or click to view image in full size

Usually, the general-purpose computers use Complex Instruction Set Computing (CISC) architecture for CPUs. Still, the Apple M1 platform is based on ARM, in Reduced Instruction Set Computing (RISC). RISC Processors are mostly used for mobile computing devices such as smartphones.

> But how did Apple adapt the RISC architecture for their high-performance laptops and nail the benchmark scores?

Let’s analyze the Apple M1 Chip Structure from a Computer architect’s point of view.

## **Computer Architectures — RISC and CISC**

There are two main CPU design architectures in-use today. Based on the Instruction Set Architecture, this categorization is done as below.

1.  Reduced Instruction Set Computing (RISC)
2.  Complex Instruction Set Computing (CISC)

Press enter or click to view image in full size

*Two different CPU designs*

In a nutshell, Instruction Set Architecture (ISA) is a well-defined hardware/software interface that acts as a “contract” between software and hardware. Instruction Set provides the ability to perform operations such as add, multiply, branch, load, store, etc.

If the CPU is RISC, that denotes a small, highly compact ISA, which is more optimized to run on the processor. So definitely, it sounds more efficient but limited in flexibility. That is why the RISC is a prominent candidate for mobile CPU design.

On the other hand, CISC is a more complicated yet flexible design, allowing a more comprehensive range of instruction. Still, it asks for more CPU clock cycles to execute instructions. This is commonly used for general-purpose computers.

## **Learn more about Computer Architecture**

Are you a university student reading for Computer Science or Information Technology subjects, or curios to learn how computers work at the hardware level?

I released my latest course — The Computer Architecture and Computer Organization Full Course on Udemy. I packed everything you need to know in the subject, including Instruction Set Architecture, RISC and CISC, Calculating Performance Benchmark Scores, etc.

Press enter or click to view image in full size

Press enter or click to view image in full size

***Enroll in learning** [**Computer Architecture and Organization**](https://www.udemy.com/course/computer-organization-and-architecture-course-masterclass/?referralCode=283EE8EE4B939642F32B) **now***

If you like to learn Computer Organization and Architecture with the latest examples, tools, and concepts, click here to enroll in [my new course.](https://www.udemy.com/course/computer-organization-and-architecture-course-masterclass/?referralCode=283EE8EE4B939642F32B)

## CPU Organization of M1 Ultra and Performance

The System on Chip (SoC) M1 chipset is remarkably efficient due to its energy-efficient and high-performance cores. M1 chip is already a considerable performance gain featured on MacBook Air 2020 models. It evolved so much until the M1 Max, which now features on MacBook Pros.

Press enter or click to view image in full size

*M1 Chip Series (Image from [Apple Newsroom](https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/))*

The Ultra chip design is incredibly simple at a glance, but an engineering marvel in another hand. The M1 Ultra chip is literally a combination of 2 M1 Max chips.

Press enter or click to view image in full size

*M1 Ultra SoC Design (Image from [Apple Newsroom](https://www.apple.com/newsroom/2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer/))*

It is not magic to connect two chips together, but how Apple created this connection is a breakthrough. They call this technology **UltraFusion Architecture.**

### The UltraFusion Architecture

This is a custom-built packaging architecture that Apple used to design the M1 Ultra Chip. A most conventional way of improving performance is to connect two chips via motherboard busses. Still, it gives a number of bottlenecks in terms of data transfer latencies and less power-efficient designs. However, Apple’s invented a state-of-the-art architecture that uses a silicon interposer and connects the chips across more than 10,000 signals, providing a massive 2.5TB/s of low latency, 4x inter-processor bandwidth of the leading multi-chip interconnect technologies. This made the M1 Ultra chip a truly groundbreaking product.

## Final Thoughts

We are not surprised to witness dramatic performance improvements in computer processors every year. Moore’s Law also presents this fact.

> **The number of transistors in a dense integrated circuit (IC) doubles every two years**. — Gordon Moore in 1965

However, the Apple M1 Ultra Architecture brings a big performance leap in an energy-efficient manner. This article analyzed this breakthrough innovation from a computer architect’s perspective.

The M1 Ultra is available only on the “Mac Studio” device yet, costing a few thousand bucks. Sometimes, the consumers only focus on the performance. Still, it is worth mentioning that power consumption, thermal performance, and price are critical.

I hope this article helps you explore more on Computer Organization and Architecture and make your buying decisions with more knowledge. Thank you for reading!

Press enter or click to view image in full size

## You might be interested,

### Learn Augmented Reality with Step by step Guide

[

## Beginners Guide to Augmented Reality Game Development

### Step by step tutorial to designing state-of-the-art AR apps with Niantic Lightship ARDK for Android and iOS

readclub.me

](https://readclub.me/game-development-with-augmented-reality/?source=post_page-----821805860c42---------------------------------------)

### **Are you looking for starting your own blog or website?**

[

## Start a Money Making Blog on Ghost

### Guide to Creating a Ghost CMS and Self-host with Zero Cost

yasassri.medium.com

](/start-a-money-making-blog-on-ghost-497c1d2c99c7?source=post_page-----821805860c42---------------------------------------)

### Beginners Guide: Clean Code Practices in JavaScript in 2022

[

## How to Write JavaScript Clean Code in 8 Steps

### Clean Coding Practices for JavaScript Beginners in 2022 As newbies to the software engineering field, most of us focus…

readclub.me

](https://readclub.me/how-to-write-javascript-clean-code-and-clean-coding-practices/?source=post_page-----821805860c42---------------------------------------)

*Start your own blog with $200 free with [this link](https://m.do.co/c/22ae290baec3)*
