import { responseHandler, BadRequest } from '../../core';

import Activity from '../../models/activity';

const debug = require('debug')('boldrAPI:activity-controller');

/**
 * Return a list of all recent activities from the database
 * @method listActivities
 * @param  {Object}      req      the request object
 * @param  {Object}      res      the response object
 * @param  {Function}    next     move to the next middleware
 * @return {Promise}              Promise containing all activities
 */
export async function listActivities(req, res, next) {
  try {
    const activities = await Activity
    .query()
    .skipUndefined()
    .orderBy('created_at', 'desc')
    .limit(10)
    .eager('[actionType,owner,post,member,attachment,menuDetail,tag]');

    return responseHandler(res, 200, activities);
  } catch (error) {
    return next(new BadRequest(error));
  }
}
