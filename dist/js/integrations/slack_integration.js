// Generated by CoffeeScript 1.9.3
(function() {
  var Slack, SlackIntegration;

  Slack = require('slack-client');

  SlackIntegration = (function() {
    function SlackIntegration(opts) {
      this.token = opts.token;
      console.log("creating slack integration with token " + this.token);
      this.slack = new Slack(this.token, true, true);
      this.slack.login();
      this.channels = [];
      this.slack.on('error', function(err) {
        return console.log('Slack error!', err);
      });
      this.slack.on('open', (function(_this) {
        return function(data) {
          var channel, id;
          return _this.channels = (function() {
            var ref, results;
            ref = this.slack.channels;
            results = [];
            for (id in ref) {
              channel = ref[id];
              if (channel.is_member) {
                results.push(channel);
              }
            }
            return results;
          }).call(_this);
        };
      })(this));
    }

    SlackIntegration.prototype.sendNotification = function(player, game) {
      var channel, i, len, ref, results;
      console.log("Sending slack notification for " + player + " in " + game);
      if (!this.channels || !this.channels.length > 0) {
        return;
      }
      ref = this.channels;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        channel = ref[i];
        results.push(channel.send(player + " is playing " + game + "! Go join them!"));
      }
      return results;
    };

    module.exports = SlackIntegration;

    return SlackIntegration;

  })();

}).call(this);
