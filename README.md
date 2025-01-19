# Useful Links

[Multiple Discriminated Unions in a object](https://github.com/colinhacks/zod/discussions/3259)

This code in this link first creates both Typescript type and the zod schema and uses the `SuperRefine` method to parse the schema with the defined type.
In our current scenario, `Choice.tsx`, values not in the schema could also be potentially submitted through the form.

1. First, if `inludeEmail` is checked, and email is entered.
2. Then, unchecked, and if form is submitted, value of email is still passed through the form.

> Check out `MultipleDiscriminatedValue.tsx` for a more complex example.

`SuperRefine.tsx`
: Same thing using `superRefine` method.

! Date
! File

---

[Reddit discriminated union](https://www.reddit.com/r/reactjs/comments/190ofb9/zod_make_a_field_as_optional_depending_on_the/?rdt=58830)

# Issues

- Custom Form Props type.
