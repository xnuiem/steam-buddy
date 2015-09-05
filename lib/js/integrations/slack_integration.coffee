Slack = require('slack-client')

class SlackIntegration

  constructor: (opts)->
    {
      @token
    } = opts

    @slack = new Slack(@token, true, true)
    @slack.login()
    @channels = [] # Populate channels here

    @slack.on 'error', (err)->
      console.log 'Slack error!', err

    @slack.on 'open', (data)=>
      @channels = (channel for id, channel of @slack.channels when channel.is_member)

  sendNotification: (player, game)->
    return if not @channels or not @channels.length > 0
    channel.send("#{player} is playing #{game}! Go join them!") for channel in @channels

  module.exports = SlackIntegration
