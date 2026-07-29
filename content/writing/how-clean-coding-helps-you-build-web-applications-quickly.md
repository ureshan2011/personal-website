---
title: "How Clean Coding Helps You Build Web Applications Quickly"
slug: how-clean-coding-helps-you-build-web-applications-quickly
summary: "Argues that clean, well-structured code speeds up development rather than slowing it down. Covers habits and conventions that keep a growing web application maintainable."
category: "Software"
originalUrl: https://yasassri.medium.com/how-clean-coding-helps-you-to-build-web-applications-quickly-91c5669fe097
originalDate: 2022-10-09
originalSource: "Medium"
---
[

![Yasas Sri Wickramasinghe](https://miro.medium.com/v2/resize:fill:64:64/1*abNALGUtTLIDn8RcSNFJWA.jpeg)

](/?source=post_page---byline--91c5669fe097---------------------------------------)

[Yasas Sri Wickramasinghe](/?source=post_page---byline--91c5669fe097---------------------------------------)

7 min readApr 14, 2021

\--

Press enter or click to view image in full size

As newbies to the software engineering field, most of us focuses a lot on building web apps that are ‘working’ or at least ‘demo-able’, which is somewhat understandable. But I have seen most of the newbies into software engineering are having various problems when they are supposed to complete a project within a certain time period. If you are a software engineering undergraduate, I guess you have experienced some issues related to your code such as,

-   Your code is giving a lot of compile errors.
-   Your IDE (integrated development environment — simply the tool you use to code) shows so many red markings, alerts and you can’t run your code.
-   You can’t remember the execution flow of your code.
-   Your project proposal contains some set of diagrams that are opposite to your current implementation (and you have no idea how to modify your diagrams reflecting the current code you have).
-   You can’t write unit tests for your code (Your methods/functions are not testable).
-   When you are looking at your code, You don’t ‘feel good’ to read your code.

If so, you may continue reading this article to be inspired with “clean coding practices” meanwhile you are working on writing web applications so that you can build great solutions with less time. And of course, you will find the above problems are getting resolved without much additional effort!

If you are someone who wants to know What is “Clean Coding” and “How You Can Start Writing Clean Code”, this 5-minute article is for you.

> What you are going to learn…

1.  _How to Name Files in JavaScript_
2.  _How to Name Boolean Type Variables_
3.  _How to Name Private Variables or Functions/Methods_
4.  _How to Name Constants_
5.  _How to Name Functions_
6.  _How to Name Classes_
7.  _How to Name Components_
8.  _Some General Tips_

In this article, I’ll guide you to write Clean Code from the basics. However, Clean Coding is a skill and you can improve your skill by practising it whenever possible. Here I’m using general examples using JavaScript but the concepts are mostly the same in other programming languages/frameworks except for few scenarios. Please follow official guidelines/documentation of your language for further details.

_Let’s get started with one famous quote from Martin Fowler, an American software engineer and one of the founders of Agile Manifesto._

Press enter or click to view image in full size

### As a beginner, How can you improve your Clean Coding skills?

**Let’s start with the basics of Naming Variables, Functions, Methods and Classes**

Variables names are used to identify a value stored in memory locations instead of using memory addresses. So when you are supposed to define a variable, make sure to put a meaningful name instead of using a very generic or random name. Some examples of ‘not so good’ variable names are,

> _int i= 10,_
> 
> _String s = “abc”,_
> 
> _Student stu = new Student();_

Whenever you are going to give a name to a variable, method, function or class, make sure to give a clear specific name that helps you and other developers to understand the use of it.

> **But I know, it’s easier said than done.**

How do you verify your identifier whether it is ‘Good’?

Simple, If your name tells,

-   Why It exists
-   What It does
-   How It is used

You have chosen a ‘Good’ name.

_but If your name requires a comment to explain it, probably your name is ‘Not So Good’._

### Let’s look into Clean Coding Practices related to JavaScript.

_The below clean code practices apply to Angular, React, Vue or any other JS-based front end frameworks as well._

Some Good JS Variable Names,

> var remainingTimeInDays;
> 
> var daysUntilShipment;
> 
> var daysSinceModification;

## **Did you know that in JavaScript, variable names are Case Sensitive?**

*In JavaScript, if you define the same variable name using different caps, those variables will be treated differently. so remember, CAPS count!*

### 1\. How to Name Files in JavaScript

*In this example, front-end JS file names are written in PascalCase, back-end JS file names are written in kebab-case*

If you are going to name project files in any JavaScript framework, you may use PascalCase for frontend projects with JavaScript Frameworks like React. If you are working with Backend Framework (Express/Node etc.) you can use kebab-case.

-   **Important Note**: This is a generic pattern you can follow in JavaScript based frameworks. But file naming standards are different in other Non-JS based Frameworks. I advise you to refer to official style guides specific to your framework or use Google Style Guide to explore more. I have linked them at the end of this article.

### 2\. How to Name Boolean Type Variables

When you are going to name a variable that defines a boolean type value, It is always good to give a name that can express the variable whether it can either be ‘true’ or ‘false’. One approach is to start with ‘is’ as a prefix. Ex: isStudent, isValid etc.

You may use other prefix terms like ‘has’, ‘can’, ‘should’ as well, but make sure not to give nouns just like you give for other variables, but treat boolean variables differently.

### 3\. How to Name Private Variables or Functions/Methods

If you see an underscore (\_) in front of a name, it implies that the variable, function or method is private.

Press enter or click to view image in full size

### 4\. How to Name Constants

Constants are the variables you declare with a value that is expected to remain unchanged. These variables are named with CAPITAL letters.

Press enter or click to view image in full size

**_Before moving further, Let me refresh your knowledge…_**

Are you familiar with **camelCase** and **PascalCase**?

Press enter or click to view image in full size

*PascalCase and camelCase are commonly used in naming functions and classes*

## Here is a $200 for FREE on DigitalOcean. One Click, Simpler Web Hosting for you!

[

## DigitalOcean - The developer cloud

### Businesses grow faster when developers can build on the simple, affordable cloud they love. DigitalOcean has the cloud…

m.do.co

](https://m.do.co/c/22ae290baec3?source=post_page-----91c5669fe097---------------------------------------)

### 5\. How to Name Functions/Methods

applicable to JS Frameworks like Angular, React etc. and Backed Frameworks like Java SpringBoot, .NET etc.

When you are naming a Function/Method, **use** **camelCase**.

Press enter or click to view image in full size

### 6\. How to Name Classes

applicable to JS Frameworks like Angular, React etc. and Backed Frameworks like Java SpringBoot, .NET etc.

When you are naming a Class, **use PascalCase.**

Press enter or click to view image in full size

### 7\. How to Name Components

applicable to any JS Framework like Angular, React etc.

When you are naming a Component, **use PascalCase.** Components are common in modern JavaScript frameworks like Angular and React.

Press enter or click to view image in full size

When you name your components in PascalCase, it is easier for you to identify in HTML component bindings because HTML tags will be in simple letters and your component will be in PascalCase.

### 8\. Some General Tips

-   Make sure to give pronounceable names for your identifiers.
-   Avoid giving numbers in the middle of your code unexpectedly. Try to use variables appropriately.

Press enter or click to view image in full size

-   When you are using axios or any other web service call and declaring your API path, don’t hardcode path in every place where you call your backend APIs. Make sure to define your backend path as a base URL and import it whenever you need to call your API.

Press enter or click to view image in full size

*_Read axios Best Practices:_ [_https://github.com/axios/axios#config-defaults_](https://github.com/axios/axios#config-defaults)*

-   Make your words/naming styles consistent across your application. For example, if you use **get**Student(), **get**Scores() kind of pattern for your methods/functions, don’t define some other similar functions like **fetch**Time(), **fetch**Name() etc. Make them consistent as previous methods by naming getTime(), getName() etc.
-   Make sure your functions/methods do just one thing. For example, calculateExamGrade() should do only calculating the Grade. But if it is calculating Grade AND saving the Grade in a database or sending an API request or even if it is performing a validation within the same calculateExamGrade method, it is ‘not nice’.
-   Try to maintain minimum number of arguments/parameters you pass to a function/method.
-   Know your programming language’s style conventions. Best resource is to read official style guides available. I’ll list some below for your reference.

Angular Style Guide: [https://angular.io/guide/styleguide](https://angular.io/guide/styleguide)

React Style Guide: [https://react-styleguidist.js.org](https://react-styleguidist.js.org/)

VueJS Style Guide: [https://vuejs.org/v2/style-guide](https://vuejs.org/v2/style-guide/)

Google Style Guide for Backend and Frontend Frameworks: [https://google.github.io/styleguide](https://google.github.io/styleguide/)

## Summary

Clean Coding is a skill every developer should practice more often. This article presented some basic steps that you can think of when you are coding next time. Clean Coding is not just about naming conventions, but I believe this is a very good starting point for anyone who is new to this topic. In the next article, I will write further details and aspects of clean coding.

Do you know that you can automate most of the above practices using some plugins? You can configure your IDE to ensure Clean Coding standards and check the compliance of your coding style with official style guides very easily. Let me know if you are interested to learn how to do it, So I’ll write further covering those aspects as well.

Please leave your feedback as a comment and **don’t forget to subscribe to my Newsletter below.**
