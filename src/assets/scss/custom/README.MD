# Changes made to govuk files:

## adding new grid widths

`/src/assets/govuk/settings/_measurements.scss`

```$xslt
$govuk-page-width: 960px !default;
>>> $govuk-page-width-wide: 1380px !default;
```


```
$govuk-grid-widths: (
  one-quarter: 25%,
  one-third: 33.3333%,
  one-half: 50%,
  two-thirds: 66.6666%,
  three-quarters: 75%,
  full: 100%,
  >>> one-of-twelve: 8.3333333%,
  >>> two-of-twelve: 16.6666666%,
  >>> five-of-twelve: 16.6666666%,

) !default;

```

## /src/assets/govuk/objects/_width-container.scss
```$xslt
@include govuk-exports("govuk/objects/width-container") {
  .govuk-width-container {
    @include govuk-width-container;

 >>>   &--wide {
 >>>     max-width: $govuk-page-width-wide;
 >>>   }
  }
}
```

