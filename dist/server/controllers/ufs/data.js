'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let councils = [{
  name: 'Arts and Humanities Research Council',
  short: 'AHRC',
  value: 'AHRC',
  index: 0
}, {
  name: 'Biotechnology and Biological Sciences Research Council',
  short: 'BBSRC',
  value: 'BBSRC',
  index: 1
}, {
  name: 'Economic and Social Research Council',
  short: 'ESRC',
  value: 'ESRC',
  index: 2
}, {
  name: 'Engineering and Physical Sciences Research Council',
  short: 'EPSRC',
  value: 'EPSRC',
  index: 3
}, {
  name: 'Innovate UK',
  short: '',
  value: 'Innovate UK',
  index: 4
}, {
  name: 'Medical Research Council',
  short: 'MRC',
  value: 'MRC',
  index: 5
}, {
  name: 'Natural Environment Research Council',
  short: 'NERC',
  value: 'NERC',
  index: 6
}, {
  name: 'Research England',
  short: '',
  value: 'Research England',
  index: 7
}, {
  name: 'Science and Technology Facilities Council',
  short: 'STFC',
  value: 'STFC',
  index: 8
}, {
  name: 'UK Research and Innovation',
  short: 'UKRI',
  value: 'UKRI',
  index: 9
}];

const allCouncils = exports.allCouncils = councils;

let ethical = [{
  name: 'Animals',
  index: 0
}, {
  name: 'Human participants',
  index: 1
}, {
  name: 'Stem cells',
  index: 2
}, {
  name: 'Travel to hostile countries',
  index: 3
}, {
  name: 'Work with developing/ODA countries ',
  index: 4
}, {
  name: 'Responsible Innovation considerations',
  index: 5
}, {
  name: 'Other',
  index: 6
}, {
  name: 'Not applicable',
  index: 7
}];
const ethicalReasons = exports.ethicalReasons = ethical;