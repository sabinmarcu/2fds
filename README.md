# 2 Frameworks Design System

Links:
- [Storybook](https://2fds-storybook.vercel.app/)
- [Application](https://2fds.vercel.app/)

---

In short, this projects is a proof of concept: a small collection of components built in parallel for both React and Vue.
Styling was done with [vanilla-extract](https://vanilla-extract.style/). Approaches will be detailed lower in this document.

> [!WARNING]
> I have approached this project with almost no knowledge or experience in building applications with Vue3. This was a 3 day learning experience.

Included are a few components:
- Number / Text inputs
- Checkbox (+ Checkbox group to showcase intermediate mixed state)
- Button

## Showcase

The [main application](https://2fds.vercel.app/) was built with Vite, and, can run either application (React or Vue) by altering an env variable (`FRAMEWORK=react|vue`), or will run them side by side.

Each component has its showcase in the [storybook](https://2fds-storybook.vercel.app/). The final storybook is a composite project of a React and a Vue storybook instance, running separately.

## Coding approach

I have done my best not to return to components already built to show a timeline of the learning experience. This may be apparent in some cases.

### Button

I've started with the Button component, as, mechanically it was the easiest to implement, starting with Vue and then React.
Being a simple component, accessibility comes out of the box, and the interactions are pretty straight-forward

### Checkbox

Next on the line was the checkbox and, more interestingly, the checkbox group. 
Checkboxes by themselves are fairly simple in implementation and accessibility requirements.

More interesting was showcasing the indeterminate state for checkboxes. To demo that state, I decided to go for a checkbox group.

The group would contain a few checkboxes, tracked independently, with one root, or global, checkbox that would act as an "all-or-nothing" switch for the others. Its state would be checked if all children are checked, unchecked if all children are unchecked, and indeterminate in a mixed situation.

This was also interesting accessibility-wise, as the control itself (root checkbox) would have to be controlled by its children, and also have an aria attribute set to `true|false|mixed` depending on its children's states.

I wanted the checkbox group to be able to control N checkboxes as children, for example:

```jsx
<group label='Check all or nothing'>
  <checkbox first bind={ref1}>
  <checkbox second bind={ref2}>
  <checkbox third bind={ref3}>
  [...]
  <checkbox Nth bind={refN}>
```

At the same time, I wanted to have common logic between frameworks in this case (as a proof of concept), and, as such, had to break from components and rely on pure JS manipulation.

### Inputs
The last component was the Text and Number Inputs. To build them, I first built a generic TextField component that would be composed to create the final input components.

I've built a super simple validation setup for the inputs, a list of "predicates" that return a string (the error message) instead of a boolean if the input does not pass the predicate.
This way we can have a list of errors with the input for this proof of concept

For the Number input, I reused a slightly restyled Button component (described above), disabling the text field's animation/outline state when the buttons are focused to avoid confusion in the overlap.

Accessibility-wise though, I relied on native components again, using aria attributes only to enhance the experience for screen readers

## Caveats

Given the states described in Figma, I started getting issues with state combinations (`:hover` and `[aria-invalid]`, for example, an invalid input that is being hovered).
To solve this problem, I had to generate increasingly complex selectors (`:hover:not([aria-invalid])`) to avoid style conflicts, but some reactivity is lost along the way. I consider this a good future improvement (see below)

## Accessibility

Normally, I would try to find a headless library with accessibility built in for more complex components (combo box, alerts, etc). 
However, considering the challenge, and the relative small complexity of the components, I did my best to include a minimum of accessibility:

- wherever possible, use native functionality
  - native attributes (`disabled` as opposed to `class="{ [disabled]: condition }"`)
  - augment with aria attributes when necessary (`aria-errormessage`, `aria-labelledby`, etc)
  - use native attributes for styling (`aria-invalid` for error state)
- when needed, run computation on JS side (validation) and use result in native or aria attributes in DOM
- animations and transitions are turned off if `(prefers-reduced-motion)` is present
- all components have their outline animated to draw the attention
  - button animation is continuous, as it isn't too intrusive
  - checkbox and input animations are slowed down (one "pulse" every few seconds) to not distract too much and still let the user know what is currently focused

## Mistakes

At the very end I realized that error state was done on component level, and not replicated on form level (component displays errors but the data is sent to the parent regardless).
This is something that I would fix as quickly as possible, by having an internal state for components, and only sending the information out of the component (event, model binding, etc) when valid.

Another thing I have noticed at the end is that the animation for the checkboxes and inputs is rather sudden at the end, even if the keyframes should allow for a smooth transition. 
I would like to look into it and see what I've done wrong, or what I've missed

## Future Improvements

- implement validation with a library (perhaps something `zed`-related)
- fine-tune animations and styles
- implement better mixed states
  - eg. without complex selectors, `:hover` would overwrite other state's styles, which is fine. for example:
    - `[aria-invalid]`'s red box turns blue
    - `[aria-invalid]:focus`'s red box turns blue, and the outline is still red
  - what we would need is styling for the `[aria-invalid]:hover` combination
    - darker red box on `[aria-invalid]:hover` for example
- better accessibility for the number input field
  - currently I reused the Button component, and hid the outline focus indicator for the input while the buttons are focused
  - I have a feeling this can be done better in the future

## Closing notes
- I would probably spend more time fine-tuning `tsconfig.json` files
  - language servers would get confused rather quickly in both VSCode and NVim with trying to reconcile vue and react formats
  - eslint was also not running properly in vue files (probably configuration issue, assuming typescript-eslint was not taking the script section of the file into account when parsing)
