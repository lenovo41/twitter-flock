'use strict'

const AbstractUsersBatchJob = require('./abstract-users-batch-job')

/**
 * Sends template-based tweets in bulk, each one mentionning a target user.
 *
 * Example template: `'Hey @{{user.screen_name}}, check out my latest project https://github.com/saasify-sh/twitter-flock'`.
 *
 * @see https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update
 */
class BatchJobTwitterSendTweets extends AbstractUsersBatchJob {
  static type = 'twitter:send-tweets'

  constructor(data, opts) {
    super(
      'BatchJobTwitterSendTweets',
      {
        state: {
          offset: 0
        },
        ...data,
        type: BatchJobTwitterSendTweets.type
      },
      {
        cooldown: 24 * 60 * 60,
        ...opts
      }
    )
  }

  async _runQueryForUser(user, text) {
    await this._twitterClient.resolveTwitterQuery({
      endpoint: 'statuses/update',
      method: 'post',
      params: {
        status: text
      }
    })
  }
}

module.exports = BatchJobTwitterSendTweets
