---
title: "Creating a Design System Using React Material UI"
slug: creating-a-design-system-using-react-material-ui
summary: "Walks through building a consistent design system on top of React and Material UI. Covers component structure and design tokens as the foundation for a reusable UI library."
category: "Frontend"
originalUrl: https://levelup.gitconnected.com/creating-a-design-system-using-react-material-ui-498e2e9d3480
originalDate: 2021-06-22
originalSource: "Level Up Coding"
---
## **Building a custom design system using Material UI library**

[

![Yasas Sri Wickramasinghe](https://miro.medium.com/v2/resize:fill:64:64/1*abNALGUtTLIDn8RcSNFJWA.jpeg)

](https://yasassri.medium.com/?source=post_page---byline--498e2e9d3480---------------------------------------)

[Yasas Sri Wickramasinghe](https://yasassri.medium.com/?source=post_page---byline--498e2e9d3480---------------------------------------)

5 min readJun 22, 2021

\--

Press enter or click to view image in full size

Modern design systems rely heavily on rich UI component libraries. They promote code reusability, enable consistency in design (in and across apps) and speed up overall development.

This article shares how I used React Material UI with [Bit open source](https://github.com/teambit/bit) platform to create a custom design system focused on consistency with high governance.

You can preview each [independent components](https://blog.bitsrc.io/independent-components-the-webs-new-building-blocks-59c893ef0f65) by visiting the [Bit collection URL](https://bit.dev/enlear/react-material-design/).

[

](https://bit.dev/enlear/react-material-design/)

*Overview of the design system: [https://bit.dev/enlear/react-material-design/](https://bit.dev/enlear/react-material-design/)*

Here, each component in the design system is authored, versioned, and shared individually and not as part of a single monolithic library, that creates countless benefits such as;

-   Import only the components that are used within your application.
-   Allow any developer in your organization to contribute back to each component.
-   Better DX (Developer experience) in using components as a first-class citizen.

## Using React Material UI

As we all know [**React Material UI**](https://material-ui.com/) provides a range of UI components that are ready to use. However, think of a scenario where you want to add a React button component, and you know it supports different attributes. You can have a button with rounded edges, a button with a label, a button with an icon, or even a button in disabled status.

Press enter or click to view image in full size

*Different button variants in React Material UI*

## Consistency Over Flexibility?

Though it’s one of the prime objectives of a UI library to allow customization, if we expose this flexibility to developers, it could adversely affect the consistency of the user interfaces.

But we have the options to restrict this behavior. One approach is to build an abstraction on top of React Material UI components by exposing only a given set of properties.

> This what I refer to as wrapping the components.

Following this approach clearly brings control over each UI component props and actions.

## High-Level Objectives of the Design System

Besides, there are several objectives I wanted to meet with the design system.

-   **Well-defined structure** — All the components, documentation, and best practices in one place for developers to follow in a well-defined structure.
-   **Limit the jargon** — Choose a subset of components from React Material UI for the design system.
-   **Customize the component’s API** — Choose my own API that alters, limits, or extends the MUI components.

## What are the Building Blocks?

For the design system, I’ve developed the following categories to group UI components at different levels.

-   **UI/Inputs** — Basic UI components act as the foundational elements.
-   **Layouts** — Abstract layout components like grids, boxes, containers.
-   **Surfaces** — Components used as containers with a meaning.
-   **Widgets** — Business components.
-   **Pages** — Composition of components that reassembles a web page.

Then you might wonder why I chose to group them in this way.

## Get Yasas Sri Wickramasinghe’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

For lower-order components such as UI/Inputs, Layouts, and Surfaces, I’ve followed the same structure as in React Material UI library.

For higher-order components, I’ve introduced Widgets and Pages out of thin air. 🙂

### Starting with UI/Inputs

At first, I got stuck on choosing the basic building blocks for the design system. I’ve decided to select a subset of components from React Material UI **wrap** them to create the Button, Radio, Select and Text field as the foundation. These components you can find under the UI/Inputs, as shown below.

[

](https://bit.dev/enlear/react-material-design/ui/inputs/button/~code/button.tsx)

*Button component in the design system at bit.dev*

> For instance, I don’t want developers to make spontaneous decisions on how a button should look or behave, breaking the consistency.

Though the button’s functionality is limited, we can gradually add more functionality having complete control since it’s the only button reused elsewhere in the application. Besides, it also reduces the coupling of React Material UI with higher-order components.

### Higher-Order Components

Then, gradually the higher-order components were defined. The below example shows how the product page components look like.

[

](https://bit.dev/enlear/react-material-design/pages/products)

*Products page component composition in bit.dev*

[

](https://bit.dev/enlear/react-material-design/pages/products/~code/products.tsx)

*Product page code example in bit.dev*

Furthermore, to understand its dependencies, let’s look at the complete dependency graph of the products page.

[

](https://bit.dev/enlear/react-material-design/pages/products/~dependencies)

*Dependency graph of product page component*

As you can see, the design system clearly reuses its foundational building blocks, which is a good sign that it’s working.

## Theming Support

Typically theming applies to basic UI components. With React Material UI, each component inherits from the default theme. So if we can override that, we can implement custom themes.

> That’s precisely the theme provider global overrides supposed to do.

Following are some of the properties we can override by creating a custom theme provider.

[

](https://material-ui.com/customization/theming/#theming)

*Theme overrides in React Material UI*

For example, suppose I override the “primary” property of the palette object inside a custom theme provider. As a result, it directly overrides the color of the button component in the design system.

Press enter or click to view image in full size

*Overriding primary color palette in React Material UI*

## Conclusion

I believe design system should become the norm to bridge the gap between designers and developers to establish consistency in frontend development.

> However, in the current design system, I’m still doubtful whether to wrap the React Material UI components or not, which has both ups and downs. If you have a different opinion, please do mention it in the comments below.

**Some Final Tips,**

-   React Material UI allows developers to design their own custom design systems. Always use that freedom and try to implement simple, reusable components with React theming support. [React Material UI documentation](https://material-ui.com/getting-started/usage/) is always an excellent resource to follow.
-   Build your own terminology for your project structure.
-   You can use the theming with global overrides to customize components for consistency and reusability.
-   Using [bit.dev](https://bit.dev/) will help to visualize and share your design system across multiple development teams.

Thank you for reading !! 🙂
