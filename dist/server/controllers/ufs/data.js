'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let councils = [{
  name: 'Arts and Humanities Research Council',
  short: 'AHRC',
  index: 0
}, {
  name: 'Biotechnology and Biological Sciences Research Council',
  short: 'BBSRC',
  index: 1
}, {
  name: 'Economic and Social Research Council',
  short: 'ESRC',
  index: 2
}, {
  name: 'Engineering and Physical Sciences Research Council',
  short: 'EPSRC',
  index: 3
}, {
  name: 'Innovate UK',
  short: '',
  index: 4
}, {
  name: 'Medical Research Council',
  short: 'MRC',
  index: 5
}, {
  name: 'Natural Environment Research Council',
  short: 'NERC',
  index: 6
}, {
  name: 'Research England',
  short: '',
  index: 7
}, {
  name: 'Science and Technology Facilities Council',
  short: 'STFC',
  index: 8
}, {
  name: 'UK Research and Innovation',
  short: 'UKRI',
  index: 9
}, {
  name: 'Other',
  short: '',
  index: 10
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
}];
const ethicalReasons = exports.ethicalReasons = ethical;