# Changelog 🗒️
All notable changes included in tagged releases will be documented in this file.

## Unreleased
- Changed paths for library dependencies used in MTS as mis-leadingly labeled 'old'
- jQuery 1.1.11 left in this repo but may be removed once confirmed remains unused in MTS

## [1.3.14] - 2019-04-11
### Added
- Max width for images added to Special Notice markdown

## [1.3.13] - 2019-04-07
### Added
- Responsive Table to MTS Component Library

## [1.3.12] - 2019-03-21
### Added
- Utility class for grey border
- Adds image for MTS messages markdown

## [1.3.11] - 2019-03-20
### Changed
- Increased width of Action panel buttons used in Site Review
- MOTH Accordion - last border-bottom fix on History panels
- Bottom spacing on `<details>` element for mobile

## [1.3.10] - 2019-03-18
### Changed
- Various Tablet and Touch affordances on the core MTS journey
- Interrupt panel component

## [1.3.9] - 2019-02-13
### Added
- Utility CSS class to remove border bottom on 'last-of-type'

## [1.3.8] - 2019-02-08
### Changed
- Updated tests for MOTH elements, so no warning shown for elements which shouldn't be present

## [1.3.7] - 2019-02-08
### Changed
- Updated tests for MOTH elements.

## [1.3.6] - 2019-02-08
### Changed
- Directory maintenance
- Extended GDS Summary List component for Change links in titles

## [1.3.5] - 2019-02-07
### Added
- npm script for copying files to MOTH (MOT History) project
- MOTH accordion UI tweak

## [1.3.4] - 2019-02-05
### Changed
- Mobile-optimised behaviour for bdefect tree UI in MTS

## [1.3.3] - 2019-02-04
### Changed
- Removes relative sizing at the root element to allow easier use of GDS components which use `rem` units.
- Breadcrumbs which relied on root component for `rem` sizing are updated to retain expected font size

## [1.3.2] - 2019-01-30
### Changed
- Updated asset paths for new directory names in MOTH application

## [1.3.1] - 2019-01-28
### Changed
- Responsive table component
- Percentage complete badge component used in this table
- Updated 'Check your answers' pattern to be GovUK's own summary list with overrides for MTS
- Removed legacy 'Check your answers' pattern

## [1.3] - 2019-01-24
### Changed
- Breaking change for Action Panels used in Site Review and MOT Test Results

## [1.2.47] - 2019-01-24
### Added
- Utility class for borders

## [1.2.46] - 2019-01-17
### Changed
- Button display property bug for brake test panel

## [1.2.44] - 2018-12-13
### Changed
- MTS messages: Persist filter state between Message view and Inbox 
- Adds 'Check Your Answers' GDS pattern
- Mobile-friendly links on 2fa login page
`filter-messages/filter-messages.js`  

## [1.2.43] - 2018-12-12
### Changed
- CSS Border-box fix for use in MOTH accordions and MTS Messages filters
- Fonts now loaded via font files, removing use of base64 fonts for a smaller CSS file. SASS Partial _fonts-64.scss now deprecated and not used. To be eventually deleted.

### Added 
- Changelog ;) 


## References
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
