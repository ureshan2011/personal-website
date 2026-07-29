---
title: "Game Development with Augmented Reality"
slug: game-development-with-augmented-reality
summary: "A look at what makes AR game development different from traditional game design, from spatial anchoring to real-world interaction. Covers the tools and considerations developers face building AR-native gameplay."
category: "AR / Gaming"
originalUrl: https://readclub.me/game-development-with-augmented-reality/
originalSource: "readclub.me"
---
Step by step tutorial to designing state-of-the-art AR apps with Niantic Lightship ARDK for Android and iOS

![Augmented Reality on UNIBOA.fr](https://images.unsplash.com/photo-1590126141992-d6a613152c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGF1Z21lbnRlZCUyMHJlYWxpdHl8ZW58MHx8fHwxNjY1MjQ1NzA1&ixlib=rb-1.2.1&q=80&w=2000)

*Photo by [UNIBOA](https://unsplash.com/@uniboa?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)*

## Prerequisites

-   Install [Unity Hub](https://unity3d.com/get-unity/download?ref=readclub.me)
-   Install [Unity version 2020.3.2f1](https://prf.hn/click/camref:1011lr4gQ?ref=readclub.me)
-   Download Niantic [Lightship ARDK](https://lightship.dev/account/downloads?ref=readclub.me), Lightship Example Projects, ARDK Sample Mock Meshes, ARDK Mock Environments and Lightship Hub files

### Optional

-   [Apple Developer Account](https://developer.apple.com/programs/enroll/?ref=readclub.me) and [XCode](https://developer.apple.com/xcode/?ref=readclub.me) (if you plan to create apps for iOS (You need to have a Mac also)
-   [Android SDK](https://lightship.dev/docs/building_android.html?ref=readclub.me) _(if you plan to create apps for Android, this can be downloaded via Unity as well)_

* * *

### Step 01: Open Unity Hub

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-9.37.40-PM.png)

### Step 02: Create a New Unity 3D/3D Mobile Project

-   Go to Create -> New Project and select the 3D (or 3D Mobile) template.
-   Give a project name and click the "Create project" button.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-9.40.39-PM.png)

-   It will take a few minutes, and you will get a new Unity 3D project.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-9.57.11-PM.png)

### Step 03: Importing Lightship ARDK packages to Unity

-   Import ARDK files to Unity via Assets --> Import Package --> Custom Package
-   Make sure to select all the downloaded files following the above process starting with `ardk-x.x.x.unitypackage`.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-10.05.09-PM.png)

### Step 04: Integrate Lightship ARDK Account with Unity Project

-   Create an account on the [Lightship Developer Platform](https://lightship.dev/?ref=readclub.me).
-   Login to your Lightship developer account, go to the Projects section and click on the "New Project" button to create a new project.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-10.17.18-PM.png)

-   You can rename your newly created project and create a new API key by clicking the "+Create New Key" button. Then you need to copy your newly created API key by clicking the Copy button.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-10.53.53-PM.png)

-   Then open Configuration Helper Window through Lightship --> Lightship Hub --> Configuration Helper Window.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-10-at-11.16.32-PM.png)

-   Paste the previously copied API key to the "API Key" input box and click the "Setup" button.
-   You may get a popup message to confirm the API key submission is successful. Now you may close the "Configuration Helper" window.

⚠️

Make sure you have only one ArdkAuthCongig.asset in your Project. You can search and verify it. If multiple ArdkAuthConfig.asset files are found, delete the duplicates and keep only one (which is located at _Assets/LightshipHUB/Resources/ARDK path.)_

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-6.42.37-PM.png)

## Subscribe ReadClub™

### Receive the Latest Blog Posts Directly to Your Email for FREE

[Subscribe Now](https://readclub.me/#/portal/signup)

### Step 05: Use Lightship Templates

-   Open Lightship Hub through Lightship --> Lightship Hub --> Welcome

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-8.21.03-PM.png)

-   You will get get "Lightship Templates Gallery" window.
-   These pre-made AR applications include various AR functionalities ranging from basic AR object placement to Shared AR and Visual Positioning System (VPS) based experiences.
-   As a beginner, you can use one of these templates and customize one to get familiar with AR.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-8.21.42-PM.png)

-   Let's pick the "Object Placement" template. Once you click on it, your Unity will be updated with all the project resources and configurations.

### Step 06: Use Mock Environment and Test the AR App

-   Now you have an AR app ready to test. But first, let's open Virtual Studio and load a mock environment so you can test your AR app within the Unity editor.
-   Go to Lightship --> ARDK --> Virtual Studio

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-8.52.36-PM.png)

-   You will get the Lightship Virtual Studio as below. Next, go to the "Mock" tab and select "MeshInteriorScene" from the Mock Scene drop-down.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-8.58.25-PM.png)

-   Now you can run your AR app by clicking the run button on top of your Unity editor.

![](https://readclub.me/content/images/2022/10/Screenshot-2022-10-11-at-9.00.07-PM.png)

-   You can use the mouse and WASD keys to navigate the mock environment and place the AR object on horizontal surfaces.

![](https://readclub.me/content/images/2022/10/Screen-Recording-2022-10-11-at-9.01.33-PM-2.gif)

## This post is for subscribers only

Subscribe now

Already have an account? Sign in
