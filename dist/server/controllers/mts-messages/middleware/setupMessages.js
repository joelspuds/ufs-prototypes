'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMessages = undefined;

var _data = require('../data');

var _filters = require('../helpers/filters');

var filters = _interopRequireWildcard(_filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * addPinnedItems - Adds is pinned state to special notices
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
// Gets message data object
const addPinnedItems = message => {
  // If message is a special notice and is not currently acknowledged
  if (message.type == 'Special notice' && message.state.acknowledged == false) {
    // Set message state to isPinned
    message.state.isPinned = true;
  }

  // return message
  return message;
};

/**
 * addIndices - Updates messages objects indicies
 *
 * @param {message} Object - Object containing message info
 * @returns {Object} message - Message object
 */
const addIndices = (message, index) => {
  // Adds ID to message
  message.id = index;

  // return message
  return message;
};

/**
 * GET Middleware - Sets messages to req.session if non existent
 *
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.Response} next - Express next object
 */
const setupMessages = exports.setupMessages = (req, res, next) => {
  // if viewData already exists return to next middleware method
  if (req.session.viewData) return next();

  // Adds pinned items, adds indices
  const messages = _data.data.map(addPinnedItems).map(addIndices);

  // Setup viewData
  const viewData = {
    messages,
    archive: [],
    isPinnedCount: [],
    isActionedCount: [],
    isNewsCount: []
  };

  // Set session viewData
  req.session.viewData = viewData;

  // Run next middleware
  next();
};