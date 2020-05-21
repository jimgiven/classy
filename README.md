# 🎩 Classy

A CSS-in-JS utility for class based styling.

## Motivation

This largely came about from me wanting to use [Tailwind CSS](https://tailwindcss.com/) for quick easy styling, while leveraging the superior readability of a CSS-in-JS solution like [Styled Components](https://styled-components.com/).

## Useage

The syntax is largely based off of styled-components except where you would put CSS, you put classes instead.

### Basics
 
Like styled-components, classy exports a generic function to class-ify complex components as well as helper methods to class-ify base HTML components as well.

```jsx
const ClassyComponent = classy.div`my-class`
```

becomes

```jsx
<div class="my-class"/>
```

and

```jsx
const ComplexComponent = () => (<div>ComplexComponent</div>)
const ClassyComplexComponent = classy(ComplexComponent)`my-class`
```

becomes

```jsx
<div class="my-class">ComplexComponent</div>
```

### Prop Based Classes

Like styled-components, you are able to add functions of props to control classes.

```jsx
const DynamicComponent = classy.div`
 ${props => props.isPrimary ? 'has-primary-color' : 'has-secondary-color'}
`
```

can result in both

```jsx
<DynamicComponent isPrimary /> === <div class="has-primary-color"/>

<DynamicComponent /> === <div class='has-secondary-color'/>
```

Note: To enable your custom components to be classy-ified, forward the `className` prop through to the outer most HTML component.
